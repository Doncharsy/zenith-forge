import type { Metadata } from "next";
import { Bricolage_Grotesque, Fragment_Mono } from "next/font/google";
import {
  siteUrl,
  siteName,
  siteTagline,
  siteDescription,
  siteKeywords,
  twitterHandle,
  verification,
} from "@/lib/site";
import { organizationSchema, webSiteSchema } from "@/lib/seo";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz"],
  display: "swap",
});

const fragment = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} · ${siteTagline}`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  applicationName: siteName,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${siteUrl}/blog/rss.xml` },
  },
  openGraph: {
    siteName,
    type: "website",
    locale: "en_US",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    site: twitterHandle,
    creator: twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  ...(verification.google || verification.bing
    ? {
        verification: {
          ...(verification.google ? { google: verification.google } : {}),
          ...(verification.bing ? { other: { "msvalidate.01": verification.bing } } : {}),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }}
        />
      </head>
      <body className={`${bricolage.variable} ${fragment.variable}`}>
        {children}
      </body>
    </html>
  );
}
