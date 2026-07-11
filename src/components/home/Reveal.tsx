"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  as?: "div" | "article" | "a";
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      el.classList.add("lv-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs) {
              setTimeout(() => el.classList.add("lv-in"), delayMs);
            } else {
              el.classList.add("lv-in");
            }
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delayMs]);

  const Component = Tag as "div";

  return (
    <Component ref={ref as React.Ref<HTMLDivElement>} className={`lv-reveal ${className}`}>
      {children}
    </Component>
  );
}
