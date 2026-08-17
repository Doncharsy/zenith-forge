"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import type { PostSummary } from "@/lib/sanity/queries";

function formatPostDate(iso: string): string {
  const d = new Date(iso);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${mm}.${d.getUTCFullYear()}`;
}

/** Category filter pills + article rows. Filtering happens client side over the already-fetched list. */
export default function ArticleList({ posts }: { posts: PostSummary[] }) {
  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const p of posts) {
      if (p.category) seen.set(p.category.slug, p.category.title);
    }
    return Array.from(seen, ([slug, title]) => ({ slug, title }));
  }, [posts]);

  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? posts.filter((p) => p.category?.slug === active) : posts;
  const activeLabel = active
    ? (categories.find((c) => c.slug === active)?.title ?? "ARTICLES")
    : "ALL ARTICLES";

  return (
    <>
      {categories.length > 1 && (
        <div className="zf-filter" role="group" aria-label="Filter articles by category">
          <button
            type="button"
            className={`zf-filter__pill${active === null ? " is-active" : ""}`}
            onClick={() => setActive(null)}
          >
            ALL
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              className={`zf-filter__pill${active === c.slug ? " is-active" : ""}`}
              onClick={() => setActive(c.slug)}
            >
              {c.title.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <Reveal className="zf-articles__count">
        {activeLabel.toUpperCase()} · {filtered.length}
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {filtered.map((p, i) => (
          <Reveal key={p._id} delay={(i % 4) * 0.06}>
            <Link
              href={`/blog/${p.slug}`}
              className={`zf-article-row${i === filtered.length - 1 ? " zf-article-row--last" : ""}`}
            >
              <span className="zf-article-row__num hide-mobile">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="zf-row__category">{p.category?.title ?? "ARTICLE"}</span>
              <span className="zf-article-row__title">{p.title}</span>
              <span className="zf-row__date">{formatPostDate(p.publishedAt)}</span>
            </Link>
          </Reveal>
        ))}
        {filtered.length === 0 && (
          <p className="zf-articles__empty">No articles in this category yet.</p>
        )}
      </div>
    </>
  );
}
