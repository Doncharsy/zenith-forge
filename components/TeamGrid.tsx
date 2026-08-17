import Link from "next/link";
import { team } from "@/lib/team";
import Reveal from "./Reveal";
import TeamPhoto from "./TeamPhoto";

export default function TeamGrid() {
  return (
    <div id="team" className="zf-team">
      <Reveal className="zf-section-header" style={{ marginBottom: 56 }}>
        <div className="zf-eyebrow">03 · THE FORGEMASTERS</div>
        <div className="zf-team__title">The Specialists.</div>
      </Reveal>
      <div className="zf-team__grid">
        {team.map((m) => (
          <Reveal key={m.slug} className="zf-team__member">
            <Link href={`/team/${m.slug}`} className="zf-team__photo">
              <TeamPhoto src={m.photo} alt={m.name} placeholder={m.photoPlaceholder} />
            </Link>
            <div className="zf-team__role">{m.role}</div>
            <Link href={`/team/${m.slug}`} className="zf-team__name">
              {m.name}
            </Link>
            <blockquote className="zf-team__quote">
              &ldquo;{m.quote}&rdquo;
              <span className="zf-team__quote-author">{m.quoteAuthor}</span>
            </blockquote>
            <Link href={`/team/${m.slug}`} className="zf-team__profile-link">
              PROFILE →
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
