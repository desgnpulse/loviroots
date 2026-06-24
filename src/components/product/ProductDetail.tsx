"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./StarRating";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { useWhatsAppOrder } from "@/hooks/useWhatsAppOrder";
import type { Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const { addItem, singleItemUrl } = useWhatsAppOrder();

  const selectedSize = product.sizes[selectedIndex];
  const waUrl = singleItemUrl(product.name, selectedSize.label);

  function handleAddToCart() {
    addItem({
      slug: product.slug,
      name: product.name,
      size: selectedSize.label,
      price: selectedSize.price,
      priceValue: selectedSize.priceValue,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Product section */}
      <section className="px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <div className="aspect-square relative rounded-3xl overflow-hidden bg-white shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-5">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-earth mb-2">
                  {product.name}
                </h1>
                <p className="text-earth/60 text-base mb-4 italic">{product.tagline}</p>
                <div className="flex items-center gap-2">
                  <StarRating rating={product.rating} />
                  <span className="text-sm text-earth/50">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-2xl font-bold text-earth mb-5">{selectedSize.price}</p>

              {/* Size selector */}
              <div className="mb-6">
                <p className="text-sm font-medium text-earth mb-3">Size</p>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size, i) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedIndex(i)}
                      className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-colors ${
                        i === selectedIndex
                          ? "bg-earth text-ivory border-earth"
                          : "bg-white text-earth border-earth/20 hover:border-earth/50"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 mb-8">
                <WhatsAppCTA url={waUrl} label="Order via WhatsApp" fullWidth size="lg" />

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-full border text-sm font-medium transition-colors ${
                    addedFeedback
                      ? "border-leaf bg-leaf/10 text-earth"
                      : "border-earth/20 bg-white text-earth hover:border-earth/50"
                  }`}
                >
                  {addedFeedback ? "Added to cart ✓" : "Add to cart"}
                </button>

                <Link
                  href="/checkout"
                  className="flex items-center justify-center w-full text-earth/50 text-sm hover:text-earth transition-colors py-1"
                >
                  or checkout online →
                </Link>
              </div>

              {/* Description */}
              <p className="text-earth/70 text-sm leading-relaxed border-t border-earth/10 pt-6">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-earth mb-6">What it does</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-earth/80">
                <span className="w-5 h-5 rounded-full bg-leaf/20 text-leaf flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ingredients */}
      <section className="px-4 py-12 bg-ivory">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-earth mb-4">Ingredients</h2>
          <p className="text-earth/70 text-sm">{product.ingredients.join(", ")}</p>
          <p className="text-earth/40 text-xs mt-2">That is the full list.</p>
        </div>
      </section>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <section className="bg-white px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-2xl font-bold text-earth">Reviews</h2>
              <div className="flex items-center gap-2 text-sm text-earth/60">
                <StarRating rating={product.rating} size="sm" />
                <span>
                  {product.rating} · {product.reviewCount} reviews
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.reviews.map((review) => (
                <ReviewCard
                  key={review.name}
                  name={review.name}
                  rating={review.rating}
                  body={review.body}
                  date={review.date}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leave a review */}
      <section className="bg-ivory px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-earth mb-6">Leave a review</h2>
          <div className="max-w-md">
            <ReviewForm productSlug={product.slug} productName={product.name} />
          </div>
        </div>
      </section>
    </div>
  );
}
