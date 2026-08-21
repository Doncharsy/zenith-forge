import type { PortableTextBlock } from "@portabletext/react";
import {
  siteUrl,
  siteName,
  siteDescription,
  socials,
  contactEmail,
  contactPhoneHref,
} from "./site";

/** Site-wide Organization schema — helps Google build a knowledge panel. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/icon1.png`,
    description: siteDescription,
    areaServed: {
      "@type": "City",
      name: "Abuja, Nigeria",
    },
    knowsAbout: [
      "Web development",
      "App development",
      "Tech consulting",
      "AI automation",
      "AI agents",
      "Data analysis",
    ],
    sameAs: [socials.twitter, socials.linkedin, socials.instagram],
  };
}

/**
 * LocalBusiness (ProfessionalService) schema — signals a real, locatable
 * business to Google for local-pack / "near me" style results. No street
 * address is published, so this stays at city level.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/icon1.png`,
    description: siteDescription,
    email: contactEmail,
    telephone: contactPhoneHref,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressRegion: "FCT",
      addressCountry: "NG",
    },
    areaServed: [
      { "@type": "City", name: "Abuja, Nigeria" },
      { "@type": "Country", name: "Nigeria" },
    ],
    sameAs: [socials.twitter, socials.linkedin, socials.instagram],
  };
}

/** Person schema for a team profile page — backs up an Article's named author with real credentials. */
export function personSchema(member: {
  name: string;
  profileRole: string;
  slug: string;
  bio1: string;
  photo?: string;
  linkedin?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.profileRole,
    url: `${siteUrl}/team/${member.slug}`,
    description: member.bio1,
    ...(member.photo ? { image: `${siteUrl}${member.photo}` } : {}),
    ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
    worksFor: { "@type": "Organization", name: siteName, url: siteUrl },
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
