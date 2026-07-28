import { groq } from "next-sanity";
import { client, sanityConfigured } from "./client";
import { articles, articleSummaries, categoryTitle } from "../articles";
import type { PortableTextBlock } from "@portabletext/react";

const fallbackPosts = articleSummaries();

/** Run a Sanity fetch, falling back to built-in content if it errors (network, CORS, outage). */
async function safe<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch (err) {
    console.error("[sanity] fetch failed, using fallback content:", err instanceof Error ? err.message : err);
    return fallback;
  }
}

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  featured?: boolean;
  category: { title: string; slug: string } | null;
  featuredImage: unknown | null;
  featuredImageAlt?: string;
};

export type Post = PostSummary & {
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  body: PortableTextBlock[];
};

const summaryFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  "category": categories[0]->{ title, "slug": slug.current },
  featuredImage,
  "featuredImageAlt": featuredImage.alt
`;

export async function getAllPosts(): Promise<PostSummary[]> {
  if (!sanityConfigured) return fallbackPosts;
  return safe(
    () =>
      client!.fetch(
        groq`*[_type == "post" && defined(slug.current) && publishedAt <= now()]
          | order(publishedAt desc) { ${summaryFields} }`,
        {},
        { next: { revalidate: 300, tags: ["post"] } }
      ),
    fallbackPosts
  );
}

export async function getLatestPosts(limit: number): Promise<PostSummary[]> {
  if (!sanityConfigured) return fallbackPosts.slice(0, limit);
  return safe(
    () =>
      client!.fetch(
        groq`*[_type == "post" && defined(slug.current) && publishedAt <= now()]
          | order(publishedAt desc) [0...$limit] { ${summaryFields} }`,
        { limit },
        { next: { revalidate: 300, tags: ["post"] } }
      ),
    fallbackPosts.slice(0, limit)
  );
}

function fallbackPost(slug: string): Post | null {
  const a = articles.find((f) => f.slug === slug);
  if (!a) return null;
  return {
    _id: a._id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    publishedAt: a.publishedAt,
    featured: a.featured,
    category: { title: categoryTitle(a.category), slug: a.category },
    featuredImage: a.featuredImage ?? null,
    featuredImageAlt: a.featuredImageAlt,
    metaTitle: a.metaTitle,
    metaDescription: a.metaDescription,
    tags: a.tags,
    body: a.body,
  };
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!sanityConfigured) return fallbackPost(slug);
  return safe(
    () =>
      client!.fetch(
        groq`*[_type == "post" && slug.current == $slug][0] {
          ${summaryFields},
          metaTitle,
          metaDescription,
          tags,
          body
        }`,
        { slug },
        { next: { revalidate: 300, tags: ["post", `post:${slug}`] } }
      ),
    fallbackPost(slug)
  );
}

export async function getPostSlugs(): Promise<string[]> {
  if (!sanityConfigured) return fallbackPosts.map((p) => p.slug);
  return safe(
    () =>
      client!.fetch(
        groq`*[_type == "post" && defined(slug.current)].slug.current`,
        {},
        { next: { revalidate: 300, tags: ["post"] } }
      ),
    fallbackPosts.map((p) => p.slug)
  );
}

/** Adjacent posts for prev/next pagination on the article page. */
export async function getAdjacentPosts(publishedAt: string): Promise<{
  prev: PostSummary | null;
  next: PostSummary | null;
}> {
  const fromFallback = () => {
    const sorted = fallbackPosts;
    const i = sorted.findIndex((s) => s.publishedAt === publishedAt);
    return {
      prev: i >= 0 && i < sorted.length - 1 ? sorted[i + 1] : null,
      next: i > 0 ? sorted[i - 1] : null,
    };
  };
  if (!sanityConfigured) return fromFallback();
  return safe(
    () =>
      client!.fetch(
        groq`{
          "prev": *[_type == "post" && defined(slug.current) && publishedAt < $publishedAt]
            | order(publishedAt desc) [0] { ${summaryFields} },
          "next": *[_type == "post" && defined(slug.current) && publishedAt > $publishedAt]
            | order(publishedAt asc) [0] { ${summaryFields} }
        }`,
        { publishedAt },
        { next: { revalidate: 300, tags: ["post"] } }
      ),
    fromFallback()
  );
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${mm}.${d.getUTCFullYear()}`;
}
