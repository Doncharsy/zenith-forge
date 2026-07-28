import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import Reveal from "@/components/Reveal";
import { getAllPosts, formatPostDate } from "@/lib/sanity/queries";
import { resolveImage } from "@/lib/sanity/image";
import { siteUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Journal",
  description:
    "What we've built, how we built it, and the tools we'd bet on. Case studies and hands on guides from the forge.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": `${siteUrl}/blog/rss.xml` },
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const featuredImg = resolveImage(featured?.featuredImage, 1200, 760);

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Journal", url: `${siteUrl}/blog` },
  ]);

  return (
    <>
      <Cursor />
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="zf-journal-hero">
        <Reveal className="zf-eyebrow" style={{ marginBottom: 20 }}>
          FROM THE ANVIL
        </Reveal>
        <Reveal className="zf-journal-hero__title">
          Journal<span className="zf-journal-hero__dot">.</span>
        </Reveal>
        <Reveal className="zf-journal-hero__sub">
          What we&apos;ve built, how we built it, and the tools we&apos;d bet on.
          Case studies and hands on guides from the forge.
        </Reveal>
      </div>

      {featured && (
        <div className="zf-featured-wrap">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="zf-featured">
              <div className="zf-featured__content">
                <div className="zf-featured__meta">
                  <span className="zf-featured__pill">FEATURED</span>
                  <span className="zf-featured__kicker">
                    {featured.category?.title ?? "ARTICLE"} ·{" "}
                    {formatPostDate(featured.publishedAt)}
                  </span>
                </div>
                <div className="zf-featured__body">
                  <span className="zf-featured__title">{featured.title}</span>
                  <span className="zf-featured__excerpt">{featured.excerpt}</span>
                  <span className="zf-featured__read">READ ARTICLE →</span>
                </div>
              </div>
              <div className="zf-featured__image">
                {featuredImg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featuredImg} alt={featured.featuredImageAlt || featured.title} />
                ) : (
                  "Featured article image"
                )}
              </div>
            </Link>
          </Reveal>
        </div>
      )}

      <div className="zf-articles">
        <Reveal className="zf-articles__count">
          ALL ARTICLES · {rest.length}
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {rest.map((p, i) => (
            <Reveal key={p._id} delay={(i % 4) * 0.06}>
              <Link
                href={`/blog/${p.slug}`}
                className={`zf-article-row${i === rest.length - 1 ? " zf-article-row--last" : ""}`}
              >
                <span className="zf-article-row__num hide-mobile">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="zf-row__category">
                  {p.category?.title ?? "ARTICLE"}
                </span>
                <span className="zf-article-row__title">{p.title}</span>
                <span className="zf-row__date">{formatPostDate(p.publishedAt)}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <Newsletter variant="light" />

      <div style={{ background: "var(--zf-ink)", color: "var(--zf-paper)", padding: "0 clamp(16px, 4vw, 32px)" }}>
        <Footer flat />
      </div>
    </>
  );
}
