import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seftoncoast.network"),
  title: "Sefton Coast Network — Independent Guides to the Sefton Coast",
  description:
    "Four independent editorial guides to Southport, Formby, links golf, and the wildlife of the Sefton Coast. Built for visitors who want to make the most of one of England's most underrated stretches of coastline.",
  openGraph: {
    title: "Sefton Coast Network",
    description: "Four guides. One coastline. Properly covered.",
    url: "https://seftoncoast.network",
    siteName: "Sefton Coast Network",
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
