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
  assert.match(src, /import\s*\{\s*ENQUIRY_EMAIL\s*\}\s*from\s*"@\/lib\/contact"/);
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
