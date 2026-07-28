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

export const contactEmail = "zenithforgehq@gmail.com";
export const contactPhone = "+2347050410235";
/** For tel: links. */
export const contactPhoneHref = "+2347050410235";
/** "Book a call" destination. WhatsApp for now; swap for a Calendly/Cal.com URL when ready. */
export const bookingUrl = "https://wa.me/2347050410235";

export const siteName = "Zenith Forge";
export const siteTagline = "Digital studio for the web, AI and data";
export const siteDescription =
  "We forge websites, agents and pipelines for startups that move fast. Web development, web design, AI automation, AI agents, data analysis, mobile, WordPress and SEO.";

/** Search-console verification tokens (set in env when you claim the property). */
export const verification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
};
