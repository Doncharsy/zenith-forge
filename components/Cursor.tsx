"use client";

import { useEffect, useRef } from "react";

/** Brand cursor colors. Red/ember on light sections, warm grey on dark ones. */
const CURSOR_LIGHT = "#ee4700"; // ember red — pops on the off-white sections
const CURSOR_DARK = "#c7c0b4"; // warm grey — pops on the ink / accent sections

/**
 * Trailing ring cursor — desktop fine-pointer only, disabled for reduced motion.
 * The ring recolors itself based on the section it is hovering so the contrast
 * stays sharp: ember red on light backgrounds, warm grey on dark ones.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.style.display = "none";
      return;
    }

    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let visible = false;
    let curTheme = "";

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let frame = 0;
    const loop = () => {
      pos.x += (mouse.x - pos.x) * 0.16;
      pos.y += (mouse.y - pos.y) * 0.16;

      const hovered = document.querySelectorAll(":hover");
      const last = hovered[hovered.length - 1];
      const onLink = !!last?.closest?.("a, button, [role='button']");
      const s = onLink ? 1.85 : 1;
      el.style.transform = `translate(${pos.x - 18}px, ${pos.y - 18}px) scale(${s})`;

      // Recolor by section a few times a second (cheap; no need every frame).
      if (frame % 6 === 0) {
        const under = last?.closest?.("[data-cursor-theme]") as HTMLElement | null;
        const theme = under?.dataset.cursorTheme === "dark" ? "dark" : "light";
        if (theme !== curTheme) {
          curTheme = theme;
          el.style.setProperty(
            "--zf-cursor-c",
            theme === "dark" ? CURSOR_DARK : CURSOR_LIGHT
          );
        }
      }
      frame++;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={ref} className="zf-cursor hide-tablet" aria-hidden />;
}
