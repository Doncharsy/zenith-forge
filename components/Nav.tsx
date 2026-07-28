"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { bookingUrl } from "@/lib/site";

/**
 * Fixed nav. On the home/blog pages it blends (mix-blend-mode: difference)
 * until 70px of scroll, then gets a solid dark background. Pages with
 * `solid` skip the blend phase entirely (profile page behaviour).
 *
 * On mobile (<=680px) the inline links collapse into a hamburger button
 * that toggles a dropdown drawer.
 */
export default function Nav({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  // Close the drawer on Escape or when resizing up to desktop.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 680) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Open drawer forces the solid treatment so the menu is always legible.
  const isSolid = solid || scrolled || open;
  const cls = solid
    ? "zf-nav zf-nav--solid"
    : isSolid
      ? "zf-nav zf-nav--scrolled"
      : "zf-nav";

  const close = () => setOpen(false);

  return (
    <nav className={cls}>
      <Link href="/" className="zf-nav__brand" onClick={close}>
        <span className="zf-nav__brand-mark">ZF®</span>
        <span className="zf-nav__brand-name">Zenith Forge</span>
      </Link>

      <div className="zf-nav__links">
        <Link href="/#services" className="zf-nav__link hide-mobile">
          SERVICES
        </Link>
        <Link href="/#team" className="zf-nav__link hide-mobile">
          TEAM
        </Link>
        <Link href="/blog" className="zf-nav__link hide-mobile">
          BLOG
        </Link>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="zf-nav__cta hide-mobile"
        >
          Book a call
        </a>

        <button
          type="button"
          className="zf-nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="zf-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`zf-nav__burger-box${open ? " is-open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="zf-mobile-menu"
        className={`zf-nav__drawer${open ? " is-open" : ""}`}
      >
        <Link href="/#services" className="zf-nav__drawer-link" onClick={close}>
          SERVICES
        </Link>
        <Link href="/#team" className="zf-nav__drawer-link" onClick={close}>
          TEAM
        </Link>
        <Link href="/blog" className="zf-nav__drawer-link" onClick={close}>
          BLOG
        </Link>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="zf-nav__drawer-cta"
          onClick={close}
        >
          Book a call →
        </a>
      </div>
    </nav>
  );
}
