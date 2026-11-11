// SEO checks (11 Nov 2026): the site's own URLs and network links use the www hosts
// that the sites serve from (the bare domains answer with a redirect), and robots.txt
// names the sitemap there. Static: reads source files.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

test("site URL is the www host", () => {
  assert.match(read("lib/site.ts"), /SITE_URL = "https:\/\/www\.seftoncoast\.network"/);
});

test("robots.txt names the sitemap on the site URL", () => {
  const src = read("app/robots.ts");
  assert.match(src, /sitemap: `\$\{SITE_URL\}\/sitemap\.xml`/);
});

test("no link to a bare domain that redirects to www", () => {
  const bare = /https:\/\/(seftoncoast\.network|seftoncoastwildlife\.co\.uk|churchtownmedia\.co\.uk|southportguide\.co\.uk|formbyguide\.co\.uk|seftonlinks\.com)\b/;
  for (const f of ["app/layout.tsx", "app/page.tsx", "components/HomePage.tsx", "lib/site.ts"]) {
    assert.doesNotMatch(read(f), bare, f);
  }
});
