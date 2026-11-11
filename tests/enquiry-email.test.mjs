import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildEnquiryEmail, escapeHtml, isValidEmail, logSendError, FROM_EMAIL } from "../lib/contact.ts";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const DISPLAY = "hello@seftoncoast.network";
const DELIVERY = "damian@churchtownmedia.co.uk";
const changed = ["lib/contact.ts", "app/api/contact/route.ts", "app/page.tsx", "components/HomePage.tsx", "components/ContactForm.tsx"];

test("DISPLAY_EMAIL is hello@seftoncoast.network and DELIVERY_EMAIL is damian@churchtownmedia.co.uk", () => {
  const src = read("lib/contact.ts");
  const d = src.match(/export const DISPLAY_EMAIL\s*=\s*"([^"]+)"/);
  const v = src.match(/export const DELIVERY_EMAIL\s*=\s*"([^"]+)"/);
  assert.ok(d && v, "constants not found");
  assert.equal(d[1], DISPLAY);
  assert.equal(v[1], DELIVERY);
  for (const m of [d, v]) assert.match(m[1], /^[\x20-\x7e]+$/, "must be plain ASCII");
});

test("forms deliver to DELIVERY_EMAIL, built in lib/contact.ts and used by the route", () => {
  assert.match(read("lib/contact.ts"), /to:\s*\[\s*DELIVERY_EMAIL\s*\]/);
  assert.match(read("app/api/contact/route.ts"), /buildEnquiryEmail\(/);
  assert.deepEqual(buildEnquiryEmail({ name: "a", email: "a@b.co", type: "t", message: "m" }).to, [DELIVERY]);
});

test("no hard-coded address of ours outside lib/contact.ts, except the FROM address", () => {
  const re = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}/g;
  for (const f of changed) {
    let src = read(f);
    // The FROM sender address is deliberately left as is.
    src = src.replace(/^\s*\/\/.*$/gm, "").replace(/FROM_EMAIL\s*=\s*"[^"]*"/, "");
    const found = src.match(re) ?? [];
    if (f === "lib/contact.ts") assert.deepEqual(found, [DISPLAY, DELIVERY]);
    else assert.deepEqual(found, [], `${f} hard-codes ${found}`);
  }
});

test("pages that print the address use the constant", () => {
  assert.match(read("components/HomePage.tsx"), /mailto:\$\{DISPLAY_EMAIL\}/);
  assert.match(read("components/ContactForm.tsx"), /\{DISPLAY_EMAIL\}/);
});

test("form field names are read by the route and every option is accepted", () => {
  const route = read("app/api/contact/route.ts");
  const page = read("components/HomePage.tsx");
  const cf = read("components/ContactForm.tsx");
  const lib = read("lib/contact.ts");

  // Field the home page form sends in its JSON body.
  const sent = page.match(/\n\s*(\w+):\s*data\.get\("type"\)/);
  assert.ok(sent, "home page form does not send the select as expected");
  assert.ok(route.includes(`body.${sent[1]}`), `route does not read body.${sent[1]}`);
  // Field ContactForm sends.
  assert.ok(/body\.enquiryType\b/.test(route), "route does not read body.enquiryType");
  assert.ok(/enquiryType:\s*""/.test(cf));

  // Accepted values.
  const block = lib.match(/ENQUIRY_TYPES\s*=\s*\[([\s\S]*?)\]/)[1];
  const accepted = [...block.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  assert.ok(accepted.length > 0);
  assert.match(route, /ENQUIRY_TYPES/);
  assert.match(route, /DEFAULT_ENQUIRY_TYPE/);

  // Home page options (value-bearing, not the disabled placeholder).
  const select = page.match(/<select name="type"[\s\S]*?<\/select>/)[0];
  const pageOpts = [...select.matchAll(/<option>([^<]+)<\/option>/g)].map((m) => m[1]);
  assert.deepEqual(pageOpts, accepted);

  // ContactForm options.
  const cfBlock = cf.match(/ENQUIRY_TYPES\s*=\s*\[([\s\S]*?)\]/)[1];
  assert.deepEqual([...cfBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]), accepted);
});

test("FROM_EMAIL is the verified Southport Guide sender", () => {
  assert.equal(FROM_EMAIL, "Sefton Coast Network <noreply@southportguide.co.uk>");
  assert.equal(buildEnquiryEmail({ name: "a", email: "a@b.co", type: "t", message: "m" }).from, FROM_EMAIL);
});

test("escapeHtml escapes & < > double and single quotes", () => {
  assert.equal(escapeHtml(`&<>"'`), "&amp;&lt;&gt;&quot;&#39;");
});

test("<script> and & in each of the four fields are escaped in the html", () => {
  const evil = "<script>x</script>&";
  const base = { name: "n", email: "e@x.co", type: "t", message: "m" };
  for (const field of ["name", "email", "type", "message"]) {
    const html = buildEnquiryEmail({ ...base, [field]: evil }).html;
    assert.ok(!html.includes("<script>"), field + " not escaped");
    assert.ok(html.includes("&lt;script&gt;x&lt;/script&gt;&amp;"), field + " missing escaped text");
  }
  assert.ok(buildEnquiryEmail({ ...base, message: "a\nb" }).html.includes("a<br>b"));
});

test("replyTo is the enquirer address; unsafe addresses are rejected", () => {
  assert.equal(buildEnquiryEmail({ name: "n", email: "visitor@example.com", type: "t", message: "m" }).replyTo, "visitor@example.com");
  for (const bad of ["a@b.co, c@d.co", "a@b.co\nBcc: x@y.co", "a b@c.co", "<a@b.co>", "nodomain", "a@b", "x".repeat(250) + "@b.co"]) {
    assert.equal(isValidEmail(bad), false, bad);
    assert.equal(buildEnquiryEmail({ name: "n", email: bad, type: "t", message: "m" }).replyTo, undefined, bad);
  }
});

test("subject has no CR or LF", () => {
  const subject = buildEnquiryEmail({ name: "a\r\nBcc: x", email: "a@b.co", type: "t\n", message: "m" }).subject;
  assert.doesNotMatch(subject, /[\r\n]/);
});

test("logSendError logs only the name and message", () => {
  const calls = [];
  const orig = console.error;
  console.error = (...args) => calls.push(args);
  try {
    logSendError({ name: "validation_error", message: "domain not verified", to: "secret@x.co", body: "private text" });
  } finally {
    console.error = orig;
  }
  assert.equal(calls.length, 1);
  const out = calls[0].join(" ");
  assert.match(out, /validation_error/);
  assert.match(out, /domain not verified/);
  assert.doesNotMatch(out, /secret@x\.co|private text/);
});

test("route uses the helpers and checks the result of resend.emails.send", () => {
  const src = read("app/api/contact/route.ts");
  assert.match(src, /import\s*\{[^}]*buildEnquiryEmail[^}]*logSendError[^}]*\}\s*from\s*"@\/lib\/contact"/);
  assert.match(src, /const\s*\{\s*error\s*\}\s*=\s*await\s+resend\.emails\.send\(/);
  assert.match(src, /if\s*\(error\)\s*logSendError\(error\)/);
  assert.match(src, /catch\s*\(err\)\s*\{\s*logSendError\(err\)/);
  assert.match(src, /isValidEmail\(email\)/);
});

test("no route or helper can fall back to Resend's test sender (resend.dev)", async () => {
  const { readdirSync, statSync } = await import("node:fs");
  const { join } = await import("node:path");
  const root = new URL("..", import.meta.url);
  const walk = (dir) =>
    readdirSync(new URL(dir, root)).flatMap((name) => {
      const rel = join(dir, name).split(String.fromCharCode(92)).join("/");
      return statSync(new URL(rel, root)).isDirectory() ? walk(rel + "/") : [rel];
    });
  const files = [...walk("app/"), ...walk("lib/"), ...walk("components/")].filter((f) => /\.(ts|tsx|js|mjs)$/.test(f));
  for (const f of files) assert.ok(!read(f).includes("resend.dev"), `${f} mentions resend.dev`);
});
