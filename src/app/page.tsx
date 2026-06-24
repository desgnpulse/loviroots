import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { EmailCapture } from "@/components/marketing/EmailCapture";
import { PRODUCTS } from "@/lib/products";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Natural Shea Butter Skincare | Loviroots",
  description:
    "100% natural, unrefined shea butter sourced from West Africa. Pure skincare rooted in African heritage, delivered across Kenya.",
};

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const WA_ICON = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function HomePage() {
  const heroWaUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hi Lovi! I'd like to learn more about your shea butter. Please assist."
  )}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-ivory pt-16 pb-20 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
            100% pure. No fillers.
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-earth leading-tight mb-5">
            Skin that feels like
            <br className="hidden sm:block" /> itself again.
          </h1>
          <p className="text-earth/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            Pure, unrefined shea butter from West Africa. Nothing added. Nothing removed. Just what
            your skin actually needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={heroWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-leaf text-earth font-semibold px-8 py-4 rounded-full hover:bg-[#7aad65] transition-colors text-sm"
            >
              {WA_ICON}
              Order via WhatsApp
            </a>
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-medium text-earth/70 hover:text-earth transition-colors px-4 py-4"
            >
              View all products →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-earth/5 border-y border-earth/10 py-4 px-4">
        <div className="mx-auto max-w-4xl flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-earth/60 font-medium uppercase tracking-wider">
          <span>100% Unrefined</span>
          <span aria-hidden>·</span>
          <span>No Additives</span>
          <span aria-hidden>·</span>
          <span>Sourced from West Africa</span>
          <span aria-hidden>·</span>
          <span>Delivered in Kenya</span>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth mb-2">
              Our Products
            </h2>
            <p className="text-earth/60 text-sm">One product. Three sizes. No compromises.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.slug}
                name={product.name}
                slug={product.slug}
                image={product.image}
                sizes={product.sizes.map((s) => s.label)}
                price={product.sizes[0].price}
                rating={product.rating}
                reviewCount={product.reviewCount}
                whatsappUrl={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                  `Hi Lovi! I'd like to order: ${product.name}. Please assist.`
                )}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Email capture */}
      <EmailCapture />

      {/* Blog teaser */}
      <section className="py-16 px-4 bg-ivory">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth">
              From the Blog
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-earth/60 hover:text-earth transition-colors hidden sm:block"
            >
              All posts →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/blog"
              className="text-sm font-medium text-earth/60 hover:text-earth transition-colors"
            >
              All posts →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
