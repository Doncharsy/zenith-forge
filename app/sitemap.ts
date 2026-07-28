import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/sanity/queries";
import { team } from "@/lib/team";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.9 },
    ...posts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...team.map((m) => ({
      url: `${siteUrl}/team/${m.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
