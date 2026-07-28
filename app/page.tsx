import Link from "next/link";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ServicesRail from "@/components/ServicesRail";
import Manifesto from "@/components/Manifesto";
import TeamGrid from "@/components/TeamGrid";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { getLatestPosts, formatPostDate } from "@/lib/sanity/queries";
import { contactEmail, bookingUrl } from "@/lib/site";

export const revalidate = 300;

export default async function HomePage() {
  const posts = await getLatestPosts(3);

  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <ServicesRail />
      <Manifesto />
      <TeamGrid />

      {/* Journal teaser */}
      <div className="zf-teaser">
        <Reveal className="zf-section-header" style={{ marginBottom: 40 }}>
          <div className="zf-eyebrow">04 · FROM THE ANVIL</div>
          <Link href="/blog" className="zf-teaser__all">
            ALL ARTICLES →
          </Link>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {posts.map((p, i) => (
            <Reveal key={p._id}>
              <Link
                href={`/blog/${p.slug}`}
                className={`zf-row${i === posts.length - 1 ? " zf-row--last" : ""}`}
              >
                <span className="zf-row__category">
                  {p.category?.title ?? "ARTICLE"}
                </span>
                <span className="zf-row__title">{p.title}</span>
                <span className="zf-row__date">
                  {formatPostDate(p.publishedAt)}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <Newsletter variant="light" />

      {/* CTA + footer */}
      <div id="contact" className="zf-cta" data-cursor-theme="dark">
        <div className="zf-cta__center">
          <Reveal className="zf-cta__eyebrow">05 · START A PROJECT</Reveal>
          <Reveal className="zf-cta__headline">
            Let&apos;s forge <span style={{ color: "var(--zf-accent)" }}>yours.</span>
          </Reveal>
          <Reveal className="zf-cta__actions">
            <MagneticButton href={bookingUrl} className="zf-cta__btn">
              Book a call →
            </MagneticButton>
            <a href={`mailto:${contactEmail}`} className="zf-cta__email">
              {contactEmail.toUpperCase()}
            </a>
          </Reveal>
        </div>
        <Footer />
      </div>
    </>
  );
}
