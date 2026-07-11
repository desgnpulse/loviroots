"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { StarRating } from "@/components/product/StarRating";
import { singleItemWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/lib/products";

const WA_ICON = (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

type Props = {
  product: Product;
};

export function OrderSection({ product }: Props) {
  const [sizeIdx, setSizeIdx] = useState(0);
  const size = product.sizes[sizeIdx];
  // Real ordering mechanism — the same wa.me URL builder used by
  // useWhatsAppOrder / the cart flow, not a bespoke deep link.
  const orderUrl = useMemo(
    () => singleItemWhatsAppUrl(product.name, size.label),
    [product.name, size.label]
  );

  const orderCtaRef = useRef<HTMLAnchorElement>(null);
  const [mobBarVisible, setMobBarVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("lv-hero-cta");
    const orderCta = orderCtaRef.current;
    if (!heroCta || !orderCta || !("IntersectionObserver" in window)) return;

    let pastHero = false;
    let orderVisible = false;
    const sync = () => setMobBarVisible(pastHero && !orderVisible);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        sync();
      },
      { threshold: 0 }
    );
    const orderObserver = new IntersectionObserver(
      ([entry]) => {
        orderVisible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 }
    );
    heroObserver.observe(heroCta);
    orderObserver.observe(orderCta);
    return () => {
      heroObserver.disconnect();
      orderObserver.disconnect();
    };
  }, []);

  return (
    <>
      <section id="order" className="lv-section lv-order" aria-labelledby="lv-order-title">
        <div className="lv-shell">
          <div className="lv-order-media">
            <Image
              src="/images/blog/shea-benefits.jpg"
              alt="A glass jar of raw shea butter surrounded by whole and cracked shea nuts on natural linen"
              width={1024}
              height={1024}
              className="w-full"
              style={{ aspectRatio: "1 / 1.08", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
          <div className="lv-order-copy">
            <p className="lv-eyebrow">37.5&deg;C &mdash; Body temperature &middot; You&rsquo;re here</p>
            <h2 className="lv-h2" id="lv-order-title">
              {product.name}.
            </h2>
            <p className="lv-tagline">
              {product.tagline}{" "}
              Pick a size and we&rsquo;ll take it from there, in the chat you already use every
              day.
            </p>

            <fieldset className="lv-sizes">
              <legend>Choose a size</legend>
              <div className="lv-size-row">
                {product.sizes.map((s, i) => (
                  <span key={s.label}>
                    <input
                      type="radio"
                      name="lv-size"
                      id={`lv-size-${s.label}`}
                      checked={sizeIdx === i}
                      onChange={() => setSizeIdx(i)}
                    />
                    <label htmlFor={`lv-size-${s.label}`}>{s.label}</label>
                  </span>
                ))}
              </div>
            </fieldset>

            <p className="lv-price-line">
              <span className="lv-kes">{size.price}</span>
              <span className="lv-per">/ {size.label} jar</span>
            </p>

            <div className="lv-order-ctas">
              <a
                id="lv-order-cta"
                ref={orderCtaRef}
                className="lv-btn-wa"
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {WA_ICON}
                Order via WhatsApp
              </a>
              <a className="lv-link-sub" href="/checkout">
                or checkout online &rarr;
              </a>
            </div>

            <div className="lv-order-fine">
              <p>
                We reply on WhatsApp with M-Pesa payment details, then pack and ship your jar.
                Prefer card or a paper trail? <a href="/checkout">Online checkout</a>{" "}takes
                M-Pesa and cards.
              </p>
              <div className="lv-review-slot">
                <span className="lv-stars" aria-hidden="true">
                  <StarRating rating={product.rating} size="sm" />
                </span>
                {product.rating.toFixed(1)} &middot; {product.reviewCount} reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`lv-mob-bar${mobBarVisible ? " lv-show" : ""}`}>
        <a className="lv-btn-wa" href={orderUrl} target="_blank" rel="noopener noreferrer">
          {WA_ICON}
          Order via WhatsApp &middot; {size.price}
        </a>
      </div>
    </>
  );
}
