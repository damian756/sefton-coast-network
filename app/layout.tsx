import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteTracker } from "@/components/SiteTracker";

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <SiteTracker />
      </body>
    </html>
  );
}
