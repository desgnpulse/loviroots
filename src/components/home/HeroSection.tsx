"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const WA_ICON = (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

type Props = {
  heroWaUrl: string;
  fromPrice: string;
};

export function HeroSection({ heroWaUrl, fromPrice }: Props) {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !h1Ref.current) return;
    const id = setTimeout(() => h1Ref.current?.classList.add("lv-warmed"), 900);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="lv-hero" aria-labelledby="lv-hero-title">
      <div className="lv-hero-copy">
        <p className="lv-eyebrow">24.1&deg;C &mdash; Ambient &middot; Single-ingredient skincare &middot; Kenya</p>
        <h1 id="lv-hero-title" ref={h1Ref}>
          Solid at <span className="lv-num">24&deg;</span>.<br />
          <span className="lv-melt">Silk</span>{" "}at{" "}<span className="lv-num">37&deg;</span>.
        </h1>
        <p className="lv-lede">
          Lovi is unrefined shea butter and nothing else &mdash; cold-pressed and sourced directly
          from West Africa, then delivered across Kenya. It stays firm in the jar and melts the
          moment it meets your skin.{" "}
          <strong>That&rsquo;s not a feature we added. It&rsquo;s the proof we didn&rsquo;t add
          anything.</strong>
        </p>
        <div className="lv-cta-row">
          <a
            id="lv-hero-cta"
            className="lv-btn-wa"
            href={heroWaUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {WA_ICON}
            Order via WhatsApp
          </a>
          <a className="lv-link-sub" href="/products">
            Browse the shop &rarr;
          </a>
        </div>
        <p className="lv-hero-price">
          From {fromPrice} &middot; Delivered across Kenya
        </p>
      </div>

      <div className="lv-hero-media">
        <Image
          src="/images/products/shea-hero.jpg"
          alt="A jar of Lovi shea butter, whipped and ivory-gold, held in warm sunlight in a woman's hands"
          fill
          className="object-cover"
          sizes="(max-width: 64rem) 100vw, 46vw"
          priority
        />
        <svg
          className="lv-badge"
          viewBox="0 0 120 120"
          role="img"
          aria-label="Melts at skin temperature — one ingredient"
        >
          <circle className="lv-disc" cx="60" cy="60" r="58" />
          <g className="lv-spin">
            <defs>
              <path
                id="lv-circ"
                d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
              />
            </defs>
            <text>
              <textPath href="#lv-circ">
                MELTS AT SKIN TEMPERATURE&#160;&#160;&bull;&#160;&#160;ONE
                INGREDIENT&#160;&#160;&bull;&#160;&#160;
              </textPath>
            </text>
          </g>
          <circle className="lv-core" cx="60" cy="60" r="26" />
          <text className="lv-core-t" x="60" y="65" textAnchor="middle">
            37&deg;
          </text>
        </svg>
      </div>
    </section>
  );
}
