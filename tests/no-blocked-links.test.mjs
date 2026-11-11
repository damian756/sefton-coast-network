// Fails if any served or source text file links to one of the six organisations the Sefton Coast sites
// never link to (playbook section 1a; Damian, 11 Nov 2026). The list lives in lib/blocked-domains.ts.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LIST_FILE = path.join(ROOT, "lib", "blocked-domains.ts");
const DIRS = ["app", "lib", "components", "content", "public"];
const TEXT = /\.(tsx?|jsx?|mjs|json|md|mdx|txt|xml|html|css|svg)$/i;

function domains() {
  const src = fs.readFileSync(LIST_FILE, "utf8");
  const list = [...src.matchAll(/"([a-z0-9.-]+\.[a-z]{2,})"/g)].map((m) => m[1]);
  assert.ok(list.length >= 18, "blocked domain list looks incomplete");
  return list;
}

function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (TEXT.test(e.name)) yield p;
  }
}

test("no file links to a blocked organisation's website", () => {
  const list = domains();
  const pattern = new RegExp(
    `(?:https?:)?//(?:[a-z0-9-]+\\.)*(?:${list.map((d) => d.replace(/\./g, "\\.")).join("|")})(?![a-z0-9-])`,
    "i",
  );
  const hits = [];
  for (const d of DIRS) {
    for (const file of walk(path.join(ROOT, d))) {
      if (path.resolve(file) === path.resolve(LIST_FILE)) continue;
      const lines = fs.readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        if (pattern.test(line)) hits.push(`${path.relative(ROOT, file)}:${i + 1}`);
      });
    }
  }
  assert.deepEqual(hits, [], `links to blocked domains found:\n${hits.join("\n")}`);
});

test("isBlockedUrl recognises the domains and their subdomains", async () => {
  const src = fs.readFileSync(LIST_FILE, "utf8");
  assert.match(src, /export function isBlockedUrl/);
  assert.match(src, /host === d \|\| host\.endsWith/);
});
