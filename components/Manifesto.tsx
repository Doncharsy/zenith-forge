"use client";

import { useEffect, useRef } from "react";

const phrases = [
  "We are website specialists.",
  "A small senior team,",
  "no account managers, no handoffs:",
  "the people you meet",
  "are the people who build.",
];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Phrases light from 14% ink to full as the section scrolls through view. */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-phrase]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("zf-manifesto__phrase--lit"));
      return;
    }

    let raf = 0;
    const tick = () => {
      const rect = root.getBoundingClientRect();
      const p = clamp01(
        (window.innerHeight * 0.82 - rect.top) / (rect.height * 1.1)
      );
      const active = Math.round(p * els.length);
      els.forEach((el, i) =>
        el.classList.toggle("zf-manifesto__phrase--lit", i < active)
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} className="zf-manifesto">
      <div className="zf-eyebrow" style={{ marginBottom: 48 }}>
        02 · WHY US
      </div>
      <div className="zf-manifesto__text">
        {phrases.map((phrase) => (
          <span key={phrase} data-phrase className="zf-manifesto__phrase">
            {phrase}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
