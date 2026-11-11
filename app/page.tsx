import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { DISPLAY_EMAIL } from "@/lib/contact";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// The canonical sits on the home page only, so the 404 page does not name the home
// page as its canonical.
export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

// The site's one WebSite and one Organization. Churchtown Media publishes the network
// (footer); the same @id is used as publisher on the guide sites.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-GB",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: DISPLAY_EMAIL,
      parentOrganization: {
        "@type": "Organization",
        "@id": "https://www.churchtownmedia.co.uk/#organization",
        name: "Churchtown Media",
        url: "https://www.churchtownmedia.co.uk",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePage />
    </>
  );
}
