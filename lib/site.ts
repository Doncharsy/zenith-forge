export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
).replace(/\/$/, "");

export const videoMode: "embed" | "link" =
  process.env.NEXT_PUBLIC_VIDEO_MODE === "link" ? "link" : "embed";

export const socials = {
  twitter: "https://twitter.com/zenithforgestudio",
  linkedin: "https://linkedin.com/company/zenithforgestudio",
  instagram: "https://instagram.com/zenithforgestudio",
};

/** Twitter/X handle (without @) for Twitter card metadata. */
export const twitterHandle = "@zenithforgestudio";

export const contactEmail = "info@zenithforgestudio.com";
export const contactPhone = "+234 916 542 3612";
/** For tel: links. */
export const contactPhoneHref = "+2349165423612";
/** "Book a call" destination. WhatsApp for now; swap for a Calendly/Cal.com URL when ready. */
export const bookingUrl = "https://wa.me/2349165423612";

export const siteName = "Zenith Forge";
export const siteTagline = "Tech company and consultants for web and app development";
export const siteDescription =
  "Zenith Forge is a tech company and consultancy of web developers and app developers based in Abuja, Nigeria. We build websites, mobile apps, AI agents and data pipelines, and we help founders figure out how to build an app or website the right way.";

/** Target search terms for metadata; intentionally steers away from "studio" toward tech company / consultant / local-service intent. */
export const siteKeywords = [
  "tech company",
  "tech consultant",
  "software consultant",
  "how to build an app",
  "how to build a website",
  "web development",
  "app development",
  "web developers in Abuja",
  "app developers in Abuja",
  "website design Abuja",
  "AI automation",
  "AI agents",
  "data analysis",
];

/** Search-console verification tokens (set in env when you claim the property). */
export const verification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
};
