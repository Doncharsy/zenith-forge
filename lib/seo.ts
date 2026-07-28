import type { PortableTextBlock } from "@portabletext/react";
import { siteUrl, siteName, siteDescription, socials } from "./site";

/** Site-wide Organization schema — helps Google build a knowledge panel. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description: siteDescription,
    sameAs: [socials.twitter, socials.linkedin, socials.instagram],
  };
}

/** Site-wide WebSite schema. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

/** Plain text length of a Portable Text body, for word count / reading time. */
export function bodyToPlainText(body: PortableTextBlock[] | undefined): string {
  if (!body) return "";
  return body
    .filter((b) => b._type === "block")
    .map((b) =>
      ((b as { children?: { text?: string }[] }).children || [])
        .map((c) => c.text || "")
        .join("")
    )
    .join(" ");
}

export function readingTime(body: PortableTextBlock[] | undefined): {
  minutes: number;
  words: number;
} {
  const words = bodyToPlainText(body).trim().split(/\s+/).filter(Boolean).length;
  return { minutes: Math.max(1, Math.round(words / 220)), words };
}
