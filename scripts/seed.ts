/**
 * Seeds categories and the 10 draft articles into Sanity.
 * Re-runnable: uses createIfNotExists keyed on deterministic IDs, so existing
 * (possibly edited) documents are never overwritten.
 *
 * Usage:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx SANITY_API_WRITE_TOKEN=yyy npm run seed
 * (or put both in .env.local)
 */
import { createClient } from "@sanity/client";
import { categories, articles as posts } from "../lib/articles";
import fs from "node:fs";
import path from "node:path";

// minimal .env.local loader so the script works without extra deps
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.\n" +
      "Set them in .env.local or the environment, then re-run: npm run seed"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

async function main() {
  console.log(`Seeding into ${projectId}/${dataset} …`);

  for (const c of categories) {
    const _id = `category-${c.slug}`;
    await client.createIfNotExists({
      _id,
      _type: "category",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
      description: c.description,
    });
    console.log(`  category: ${c.title}`);
  }

  for (const post of posts) {
    const _id = `post-${post.slug}`;
    await client.createIfNotExists({
      _id,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      categories: [
        {
          _type: "reference",
          _ref: `category-${post.category}`,
          _key: `catref-${post.category}`,
        },
      ],
      tags: post.tags,
      publishedAt: post.publishedAt,
      featured: post.featured ?? false,
      body: post.body,
    });
    console.log(`  post: ${post.title}`);
  }

  console.log("Done. Existing documents were left untouched.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
