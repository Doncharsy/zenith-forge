import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import TeamPhoto from "@/components/TeamPhoto";
import { team, getMember } from "@/lib/team";
import { socials, contactEmail, bookingUrl } from "@/lib/site";
import { personSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) return {};
  return {
    title: `${m.name} · ${m.profileRole}`,
    description: m.bio1,
    alternates: { canonical: `/team/${slug}` },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) notFound();

  const jsonLd = personSchema(m);

  return (
    <>
      <Cursor />
      <Nav solid />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="zf-profile">
        <Link href="/#team" className="zf-profile__back">
          ← BACK TO TEAM
        </Link>

        <div className="zf-profile__grid">
          <div className="zf-profile__photo-col">
            <div className="zf-profile__photo">
              <TeamPhoto src={m.photo} alt={m.name} placeholder="Headshot" />
            </div>
            <div className="zf-profile__socials">
              {m.linkedin ? (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zf-profile__social"
                >
                  LINKEDIN
                </a>
              ) : (
                <a href={socials.linkedin} className="zf-profile__social">
                  LINKEDIN
                </a>
              )}
            </div>
          </div>

          <div className="zf-profile__info">
            <div className="zf-profile__badge">{m.role}</div>
            <h1 className="zf-profile__name">{m.name}</h1>
            <div className="zf-profile__role">{m.profileRole}</div>
            <blockquote className="zf-profile__quote">
              &ldquo;{m.quote}&rdquo;
              <span className="zf-profile__quote-author">{m.quoteAuthor}</span>
            </blockquote>
            <p className="zf-profile__bio">{m.bio1}</p>
            <p className="zf-profile__bio">{m.bio2}</p>
            <div>
              <div className="zf-profile__focus-label">FOCUS AREAS</div>
              <div className="zf-profile__skills">
                {m.skills.map((s) => (
                  <span key={s} className="zf-profile__skill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="zf-profile__ctas">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="zf-profile__cta"
              >
                Book a call →
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="zf-profile__cta zf-profile__cta--ghost"
              >
                Email us
              </a>
            </div>
          </div>
        </div>

        <div className="zf-profile__footer">
          <div className="zf-profile__footer-copy">© 2026 ZENITH FORGE</div>
          <Link href="/#team" className="zf-profile__footer-link">
            MEET THE REST OF THE TEAM →
          </Link>
        </div>
      </div>
    </>
  );
}
