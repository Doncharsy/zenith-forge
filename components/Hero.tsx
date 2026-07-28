"use client";

import { useEffect, useRef } from "react";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * 320vh scroll-zoom hero. Depth layers scale up (deeper layers faster) and
 * fade out as you scroll "forward through" them; the statement fades in on
 * the far side. With reduced motion the section collapses to one viewport
 * showing only the wordmark.
 */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hero.style.height = "100vh";
      const st = hero.querySelector<HTMLElement>("[data-statement]");
      if (st) st.style.display = "none";
      return;
    }

    const layers = Array.from(
      hero.querySelectorAll<HTMLElement>("[data-depth]")
    );
    const statement = hero.querySelector<HTMLElement>("[data-statement]");
    const hint = hero.querySelector<HTMLElement>("[data-hint]");

    let raf = 0;
    const tick = () => {
      const rect = hero.getBoundingClientRect();
      const total = hero.offsetHeight - window.innerHeight;
      const p = clamp01(-rect.top / total);
      const phase = clamp01(p / 0.58);
      const e = phase * phase;
      layers.forEach((el) => {
        const d = parseFloat(el.dataset.depth!);
        const s = 1 + e * d * 5;
        el.style.transform = `translate(-50%,-50%) scale(${s})`;
        const fadeStart = d < 1 ? 0.55 : 0.3;
        el.style.opacity = String(1 - clamp01((phase - fadeStart) / 0.35));
      });
      if (hint) hint.style.opacity = String(1 - clamp01(p * 5));
      if (statement) {
        const q = clamp01((p - 0.6) / 0.28);
        statement.style.opacity = String(q);
        statement.style.transform = `translate(-50%,-50%) scale(${0.92 + 0.08 * q})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div id="top" ref={heroRef} className="zf-hero">
      <div className="zf-hero__sticky">
        <div data-depth="0.45" className="zf-hero__layer zf-hero__zf-outline">
          ZF
        </div>

        <div data-depth="1" className="zf-hero__layer zf-hero__center">
          <div className="zf-hero__kicker">DIGITAL STUDIO · WEB · AI · DATA</div>
          <div className="zf-hero__word">ZENITH</div>
          <div className="zf-hero__word zf-hero__word--accent">FORGE</div>
          <div className="zf-hero__tagline">
            We forge websites, agents and pipelines for startups that move fast.
          </div>
        </div>

        <div
          data-depth="1.7"
          className="zf-hero__layer zf-hero__chip hide-tablet"
          style={{ left: "12%", top: "22%" }}
        >
          WEB DEVELOPMENT
        </div>
        <div
          data-depth="2.1"
          className="zf-hero__layer zf-hero__chip hide-tablet"
          style={{ left: "87%", top: "26%" }}
        >
          AI AGENTS
        </div>
        <div
          data-depth="1.9"
          className="zf-hero__layer zf-hero__chip hide-tablet"
          style={{ left: "16%", top: "78%" }}
        >
          DATA ANALYSIS
        </div>
        <div
          data-depth="2.3"
          className="zf-hero__layer zf-hero__chip hide-tablet"
          style={{ left: "84%", top: "74%" }}
        >
          MOBILE APPS
        </div>

        <div data-statement className="zf-hero__statement">
          <div className="zf-hero__statement-text">
            The web is still the most powerful product your company can own.
          </div>
          <div className="zf-hero__keep-scrolling">
            <div className="zf-hero__keep-scrolling-label">KEEP SCROLLING</div>
            <div className="zf-hero__arrow">↓</div>
          </div>
        </div>

        <div data-hint className="zf-hero__hint">
          <span className="zf-hero__hint-dot" />
          SCROLL TO ENTER
        </div>
      </div>
    </div>
  );
}
