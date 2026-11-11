import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const EXPECTED = "hello@seftoncoast.network";
const changed = ["lib/contact.ts", "app/api/contact/route.ts", "app/page.tsx", "components/ContactForm.tsx"];

test("ENQUIRY_EMAIL constant is hello@seftoncoast.network", () => {
  const m = read("lib/contact.ts").match(/export const ENQUIRY_EMAIL\s*=\s*"([^"]+)"/);
  assert.ok(m, "constant not found");
  assert.equal(m[1], EXPECTED);
  assert.match(m[1], /^[\x20-\x7e]+$/, "must be plain ASCII");
});

test("contact route imports and uses the constant for `to`", () => {
  const src = read("app/api/contact/route.ts");
  assert.match(src, /import\s*\{[^}]*\bENQUIRY_EMAIL\b[^}]*\}\s*from\s*"@\/lib\/contact"/);
  assert.match(src, /to:\s*\[\s*ENQUIRY_EMAIL\s*\]/);
});

test("no hard-coded address of ours outside lib/contact.ts, except the FROM address", () => {
  const re = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}/g;
  for (const f of changed) {
    let src = read(f);
    // The FROM sender address is deliberately left as is.
    src = src.replace(/from:\s*"Sefton Coast Network <[^>]+>"/, "");
    const found = src.match(re) ?? [];
    if (f === "lib/contact.ts") assert.deepEqual(found, [EXPECTED]);
    else assert.deepEqual(found, [], `${f} hard-codes ${found}`);
  }
});

test("pages that print the address use the constant", () => {
  assert.match(read("app/page.tsx"), /mailto:\$\{ENQUIRY_EMAIL\}/);
  assert.match(read("components/ContactForm.tsx"), /\{ENQUIRY_EMAIL\}/);
});

test("form field names are read by the route and every option is accepted", () => {
  const route = read("app/api/contact/route.ts");
  const page = read("app/page.tsx");
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
