"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative scroll-progress gauge — 23.6°C (top) → 37.5°C (bottom of page).
 * Purely presentational (aria-hidden), homepage-only. Desktop only (hidden
 * under 64rem via .lv-temp-rail media query in globals.css).
 */
export function TempRail() {
  const readRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const t = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        const deg = (23.6 + t * (37.5 - 23.6)).toFixed(1);
        if (readRef.current) readRef.current.textContent = `${deg}°C`;
        if (fillRef.current) fillRef.current.style.height = `${2 + t * 98}%`;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="lv-temp-rail" aria-hidden="true">
      <span className="lv-read" ref={readRef}>
        23.6&deg;C
      </span>
      <div className="lv-track">
        <div className="lv-fill" ref={fillRef} />
      </div>
      <span className="lv-cap">skin&nbsp;temp&nbsp;37&deg;</span>
    </div>
  );
}
