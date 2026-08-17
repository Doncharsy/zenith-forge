"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/services";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Golden-ratio (Fibonacci) spiral watermark. */
function FibSpiral({ opacity, rotate }: { opacity: number; rotate: number }) {
  return (
    <svg
      viewBox="0 0 13 21"
      preserveAspectRatio="xMidYMid meet"
      className="zf-card__fib"
      style={{ opacity, transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path
        d="M 3,15 A 1,1 0 0,0 4,16 A 1,1 0 0,0 5,15 A 2,2 0 0,0 3,13 A 3,3 0 0,0 0,16 A 5,5 0 0,0 5,21 A 8,8 0 0,0 13,13 A 13,13 0 0,0 0,0"
        fill="none"
        stroke="var(--zf-accent)"
        strokeWidth="0.35"
      />
    </svg>
  );
}

function ServiceCard({
  index,
  flipped,
  onFlip,
}: {
  index: number;
  flipped: boolean;
  onFlip: () => void;
}) {
  const s = services[index];
  const num = String(index + 1).padStart(2, "0");
  return (
    <div
      className={`zf-card${flipped ? " is-flipped" : ""}`}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFlip();
        }
      }}
      aria-expanded={flipped}
      aria-label={`${s.title}. ${flipped ? "Hide" : "Show"} details`}
    >
      <div className="zf-card__inner">
        {/* Front face */}
        <div className="zf-card__face zf-card__face--front">
          <FibSpiral opacity={0.16} rotate={(index % 2) * 180} />
          <div className="zf-card__num">{num}</div>
          <div className="zf-card__body">
            <div className="zf-card__title">{s.title}</div>
            <div className="zf-card__desc">{s.desc}</div>
            <div className="zf-card__points">
              {s.points.map((p) => (
                <div key={p} className="zf-card__point">
                  <span className="zf-card__point-dot" />
                  {p}
                </div>
              ))}
            </div>
            <div className="zf-card__tags">{s.tags}</div>
          </div>
        </div>

        {/* Back face */}
        <div className="zf-card__face zf-card__face--back">
          <FibSpiral opacity={0.12} rotate={180 + (index % 2) * 180} />
          <div className="zf-card__num">{num}</div>
          <div className="zf-card__back-title">{s.title}</div>
          <div className="zf-card__reveal-label">WHY THIS FITS</div>
          <div className="zf-card__why">{s.why}</div>
          <div className="zf-card__sme-label">GREAT FOR SMEs</div>
          <div className="zf-card__cases">
            {s.cases.map((c) => (
              <div key={c} className="zf-card__case">
                <span className="zf-card__case-bullet">▸</span>
                <span className="zf-card__case-text">{c}</span>
              </div>
            ))}
          </div>
          <div className="zf-card__tools">{s.tools}</div>
        </div>
      </div>

      {/* Dog-ear affordance */}
      <div className="zf-card__peel" />
      <div className="zf-card__peel-hint">{flipped ? "CLOSE" : "OPEN"}</div>
    </div>
  );
}

/**
 * Sticky sideways services journey. Vertical scroll through a 350vh section
 * translates the card track horizontally. Clicking a card flips it like
 * turning a page to reveal SME-focused detail; it flips back after 6s and
 * resets when the section scrolls fully out of view. Reduced motion falls
 * back to native horizontal scrolling.
 */
export default function ServicesRail() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const railLenRef = useRef(1);
  const [reduced, setReduced] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const openIdxRef = useRef<number | null>(null);
  openIdxRef.current = openIdx;
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const flip = (i: number) => {
    clearTimeout(timerRef.current);
    if (openIdxRef.current === i) {
      setOpenIdx(null);
      return;
    }
    setOpenIdx(i);
    timerRef.current = setTimeout(() => {
      setOpenIdx((cur) => (cur === i ? null : cur));
    }, 6000);
  };

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!wrap || !track) return;

    const size = () => {
      const len = track.scrollWidth - window.innerWidth + 64;
      railLenRef.current = Math.max(len, 1);
      wrap.style.height = `${window.innerHeight + railLenRef.current}px`;
    };
    size();
    window.addEventListener("resize", size);

    const cards = Array.from(track.children) as HTMLElement[];

    let raf = 0;
    const tick = () => {
      const rect = wrap.getBoundingClientRect();
      const p = clamp01(-rect.top / railLenRef.current);
      track.style.transform = `translate3d(${-p * railLenRef.current}px,0,0)`;
      if (bar) bar.style.width = `${p * 100}%`;

      // Coverflow: cards rotate in 3D and lean forward as they pass screen center.
      const mid = window.innerWidth / 2;
      for (const card of cards) {
        const c = card.getBoundingClientRect();
        const cardMid = c.left + c.width / 2;
        // dx: -1 (a viewport-width left of center) .. 0 (centered) .. 1 (right)
        const dx = Math.max(-1.4, Math.min(1.4, (cardMid - mid) / mid));
        const d = Math.min(Math.abs(dx), 1); // 0 centered, 1 near the edge
        const rotateY = -dx * 34; // right cards turn away one way, left cards the other
        const translateZ = (1 - d) * 150 - d * 70; // center pops forward, edges recede
        const scale = 1 - d * 0.1;
        // No filter/opacity/z-index here: they force flattening and would break the
        // preserve-3d book flip. translateZ already sorts the cards front-to-back.
        card.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.setProperty("--zf-card-dim", d.toFixed(3));
      }

      if (openIdxRef.current !== null) {
        const fullyOut = rect.bottom <= 0 || rect.top >= window.innerHeight;
        if (fullyOut) {
          clearTimeout(timerRef.current);
          setOpenIdx(null);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, [reduced]);

  const jump = (dir: -1 | 1) => {
    const wrap = wrapRef.current;
    if (reduced) {
      stickyRef.current?.scrollBy({ left: dir * 520, behavior: "smooth" });
      return;
    }
    if (!wrap) return;
    const count = services.length;
    const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
    const p = clamp01((window.scrollY - wrapTop) / railLenRef.current);
    const idx = Math.round(p * (count - 1));
    const next = Math.max(0, Math.min(count - 1, idx + dir));
    window.scrollTo({
      top: wrapTop + (next / (count - 1)) * railLenRef.current,
      behavior: "auto",
    });
  };

  return (
    <div
      id="services"
      ref={wrapRef}
      data-cursor-theme="dark"
      className={`zf-rail-wrap${reduced ? " zf-rail-wrap--static" : ""}`}
    >
      <div
        ref={stickyRef}
        className={`zf-rail__sticky${reduced ? " zf-rail__sticky--static" : ""}`}
      >
        <div className="zf-rail__header">
          <div className="zf-rail__eyebrow">01 · WHAT WE FORGE</div>
          <div className="zf-rail__title">Eight disciplines. One team.</div>
        </div>

        <div ref={trackRef} className="zf-rail__track">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              index={i}
              flipped={openIdx === i}
              onFlip={() => flip(i)}
            />
          ))}
        </div>

        <div className="zf-rail__nav">
          <button
            className="zf-rail__nav-btn"
            aria-label="Previous service"
            onClick={() => jump(-1)}
          >
            ←
          </button>
          <button
            className="zf-rail__nav-btn"
            aria-label="Next service"
            onClick={() => jump(1)}
          >
            →
          </button>
        </div>

        <div className="zf-rail__progress">
          <div ref={barRef} className="zf-rail__progress-bar" />
        </div>
      </div>
    </div>
  );
}
