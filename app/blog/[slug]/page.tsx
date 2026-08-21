import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import PostBody from "@/components/PostBody";
import ShareButtons from "@/components/ShareButtons";
import {
  getPost,
  getPostSlugs,
  getAdjacentPosts,
  formatPostDate,
} from "@/lib/sanity/queries";
import { resolveImage } from "@/lib/sanity/image";
import { siteUrl, siteName } from "@/lib/site";
import { breadcrumbSchema, readingTime } from "@/lib/seo";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const ogImage = resolveImage(post.featuredImage, 1200, 630);
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${siteUrl}/blog/${post.slug}`,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { prev, next } = await getAdjacentPosts(post.publishedAt);
  const heroImg = resolveImage(post.featuredImage, 1680, 945);

  const { minutes, words } = readingTime(post.body);
  const canonical = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    ...(heroImg ? { image: [heroImg] } : {}),
    ...(post.category ? { articleSection: post.category.title } : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    ...(words ? { wordCount: words } : {}),
    author: {
      "@type": "Person",
      name: "Ochasi Darlington",
      url: `${siteUrl}/team/ochasi-darlington`,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon1.png` },
    },
  };

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Journal", url: `${siteUrl}/blog` },
    { name: post.title, url: canonical },
  ]);

  return (
    <>
      <Cursor />
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <article className="zf-article">
        <Link href="/blog" className="zf-article__back">
          ← ALL ARTICLES
        </Link>

        <div className="zf-article__meta">
          <span className="zf-row__category">
            {post.category?.title ?? "ARTICLE"}
          </span>
          <span className="zf-row__date">{formatPostDate(post.publishedAt)}</span>
          {post.body?.length > 0 && (
            <span className="zf-row__date">{minutes} MIN READ</span>
          )}
        </div>

        <h1 className="zf-article__title">{post.title}</h1>
        <p className="zf-article__excerpt">{post.excerpt}</p>

        <ShareButtons url={canonical} title={post.title} />

        {heroImg && (
          <div className="zf-article__hero-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImg} alt={post.featuredImageAlt || post.title} />
          </div>
        )}

        {post.body?.length > 0 && <PostBody body={post.body} />}

        {post.body?.length > 0 && (
          <ShareButtons url={canonical} title={post.title} />
        )}

        {(post.tags?.length ?? 0) > 0 && (
          <div className="zf-article__tags">
            {post.tags!.map((t) => (
              <span key={t} className="zf-tag">
                {t.toUpperCase()}
              </span>
            ))}
          </div>
        )}

        {(prev || next) && (
          <div className="zf-article__pagination">
            {prev && (
              <Link href={`/blog/${prev.slug}`} className="zf-article__pag-link">
                <span className="zf-article__pag-dir">← OLDER</span>
                <span className="zf-article__pag-title">{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="zf-article__pag-link zf-article__pag-link--next"
              >
                <span className="zf-article__pag-dir">NEWER →</span>
                <span className="zf-article__pag-title">{next.title}</span>
              </Link>
            )}
          </div>
        )}
      </article>

      <div style={{ background: "var(--zf-ink)", color: "var(--zf-paper)", padding: "0 clamp(16px, 4vw, 32px)" }}>
        <Footer flat />
      </div>
    </>
  );
}
