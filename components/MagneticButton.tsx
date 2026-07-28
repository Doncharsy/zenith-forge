"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

/** CTA that leans toward the cursor and springs back on leave. */
export default function MagneticButton({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.3}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "translate(0,0)";
    setTimeout(() => {
      el.style.transition = "";
    }, 500);
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
}
