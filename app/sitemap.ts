import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// One page: the home page. The #mission, #sites and #contact links are parts of it.
// No lastmod: the page has no date of its own, and the build time would not be real.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
}
