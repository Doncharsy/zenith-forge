import Link from "next/link";
import { socials, contactEmail, contactPhone, contactPhoneHref } from "@/lib/site";

export default function Footer({ flat = false }: { flat?: boolean }) {
  return (
    <div className={`zf-footer${flat ? " zf-footer--flat" : ""}`}>
      <div className="zf-footer__brand">
        <span className="zf-footer__mark">ZF®</span>
        <span className="zf-footer__name">Zenith Forge</span>
      </div>
      <div className="zf-footer__links">
        <a href={`mailto:${contactEmail}`} className="zf-footer__link">
          {contactEmail.toUpperCase()}
        </a>
        <a href={`tel:${contactPhoneHref}`} className="zf-footer__link">
          {contactPhone}
        </a>
      </div>
      <div className="zf-footer__links">
        <a href={socials.twitter} className="zf-footer__link">
          TWITTER / X
        </a>
        <a href={socials.linkedin} className="zf-footer__link">
          LINKEDIN
        </a>
        <a href={socials.instagram} className="zf-footer__link">
          INSTAGRAM
        </a>
      </div>
      <div className="zf-footer__copy">© 2026 ZENITH FORGE</div>
    </div>
  );
}
