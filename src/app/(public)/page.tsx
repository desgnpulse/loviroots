import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EmailCapture } from "@/components/marketing/EmailCapture";
import { getAllProducts } from "@/lib/wp/products";
import { getAllPosts } from "@/lib/wp/blog";

export const metadata: Metadata = {
  title: "Natural Shea Butter Skincare | Loviroots",
  description:
    "100% natural, unrefined shea butter sourced from West Africa. Pure skincare rooted in African heritage, delivered across Kenya.",
};

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const WA_ICON = (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const INGREDIENTS = [
  {
    n: "01",
    label: "Butyrospermum Parkii",
    sub: "Shea butter — the only ingredient.",
  },
  {
    n: "02",
    label: "No preservatives",
    sub: "Naturally shelf-stable. No chemicals needed.",
  },
  {
    n: "03",
    label: "No added fragrance",
    sub: "The scent is the shea. Real and unmasked.",
  },
];

const RITUAL_STEPS = [
  {
    step: "01",
    title: "Scoop a little",
    body: "A pea-sized amount covers the face. A little more for elbows, knees, or hair ends.",
  },
  {
    step: "02",
    title: "Warm in your palms",
    body: "The butter melts at body temperature. Press between your hands for a few seconds.",
  },
  {
    step: "03",
    title: "Press in, don't rub",
    body: "Apply with gentle pressure. Let it absorb rather than working it in aggressively.",
  },
];

export default async function HomePage() {
  const [products, posts] = await Promise.all([getAllProducts(), getAllPosts()]);
  const product = products[0];

  const heroWaUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hi Lovi! I'd like to learn more about your shea butter. Please assist."
  )}`;

  const orderWaUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi Lovi! I'd like to order: ${product.name}. Please assist.`
  )}`;

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] min-h-[calc(100vh-3.5rem)]">
        {/* Left — text pushed to bottom */}
        <div className="order-2 lg:order-1 flex flex-col justify-end px-8 sm:px-12 lg:px-16 pb-16 sm:pb-20 pt-16 lg:pt-0">
          <h1 className="font-display text-[5rem] sm:text-[7rem] lg:text-[8rem] font-bold text-ink leading-[0.92] mb-8">
            <span className="block">Quiet</span>
            <span className="block italic">Restoration.</span>
          </h1>
          <p className="text-ink/55 text-base leading-relaxed mb-10 max-w-sm">
            Our shea is harvested at peak maturity in West Africa, then cold-pressed to
            preserve the dense lipid profile your skin demands.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href={heroWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-earth text-ivory px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-earth/90 transition-colors"
            >
              {WA_ICON}
              Order via WhatsApp
            </a>
            <Link
              href="/products"
              className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.15em] text-earth/35 hover:text-earth transition-colors py-4"
            >
              Shop the collection →
            </Link>
          </div>
          <p className="text-[10px] text-earth/25 mt-6 uppercase tracking-[0.15em]">
            From KES 350 · Delivered across Kenya
          </p>
        </div>

        {/* Right — hero image */}
        <div className="order-1 lg:order-2 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
          <Image
            src="/images/products/shea-butter.jpg"
            alt="Lovi Shea Butter — unrefined, in a glass jar on natural linen"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority
          />
        </div>
      </section>

      {/* ── Origin ──────────────────────────────────────────────── */}
      <section className="bg-white px-6 sm:px-8 py-28 border-y border-earth/8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-earth/35 mb-5">
                The origin
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-[1.05]">
                From tree
                <br />
                to jar.
              </h2>
            </div>
            <div className="space-y-5 text-ink/60 text-[15px] sm:text-base leading-relaxed lg:pt-2">
              <p>
                Shea butter has nourished skin across the African continent for thousands of
                years. It is pressed from the nuts of the shea tree — a process unchanged by
                time because it needs no improvement.
              </p>
              <p>
                We source ours from West Africa and do nothing to it. No bleaching, no
                deodorising, no fillers. The ivory colour, the faint nutty scent, the
                dense texture — these are signs of purity, not flaws to be corrected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ingredient truth ────────────────────────────────────── */}
      <section className="bg-ivory px-6 sm:px-8 py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-earth/35 mb-16 text-center">
            What&rsquo;s inside
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16">
            {INGREDIENTS.map(({ n, label, sub }) => (
              <div key={n}>
                <p className="font-mono text-xs text-earth/20 mb-5">{n}</p>
                <p className="font-display text-xl font-semibold text-ink mb-3">{label}</p>
                <p className="text-sm text-ink/50 leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The product ─────────────────────────────────────────── */}
      <section className="bg-white px-6 sm:px-8 py-28 border-y border-earth/8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-16 lg:gap-24 items-center">
            {/* Image LEFT */}
            <div>
              <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
                <Image
                  src="/images/products/shea-butter.jpg"
                  alt="Lovi Shea Butter — 100% unrefined"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>

            {/* Text RIGHT */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-earth/35 mb-6">
                Signature formulation
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight mb-5">
                {product.name}
              </h2>
              <p className="text-ink/55 text-[15px] leading-relaxed mb-10">
                {product.tagline}
              </p>

              <div className="mb-10">
                {product.sizes.map((size, i) => (
                  <div
                    key={size.label}
                    className={`flex items-center justify-between py-4 ${
                      i < product.sizes.length - 1 ? "border-b border-earth/8" : ""
                    }`}
                  >
                    <span className="text-sm font-medium text-ink">{size.label}</span>
                    <span className="text-sm text-ink/55">{size.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-5">
                <a
                  href={orderWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-earth text-earth px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-earth hover:text-ivory transition-colors"
                >
                  {WA_ICON}
                  Order via WhatsApp
                </a>
                <Link
                  href="/checkout"
                  className="inline-flex items-center text-[11px] font-medium text-earth/35 hover:text-earth transition-colors py-4"
                >
                  Pay online instead →
                </Link>
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="block mt-6 text-[10px] uppercase tracking-[0.15em] text-earth/25 hover:text-ink/50 transition-colors"
              >
                Full product details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── The ritual ──────────────────────────────────────────── */}
      <section className="bg-ivory px-6 sm:px-8 py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-earth/35 mb-4">
              The ritual
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink">
              Simple by design.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 mb-12">
            {RITUAL_STEPS.map(({ step, title, body }) => (
              <div key={step}>
                <p className="font-mono text-xs text-earth/20 mb-5">{step}</p>
                <p className="font-display text-xl font-semibold text-ink mb-3">{title}</p>
                <p className="text-sm text-ink/50 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/how-to-use"
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-earth/30 hover:text-ink/60 transition-colors"
            >
              Full usage guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ── From the journal ────────────────────────────────────── */}
      <section className="bg-white px-6 sm:px-8 py-28 border-t border-earth/8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-earth/35 mb-3">
                Skincare reading
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink">
                From the journal.
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-earth/30 hover:text-ink/60 transition-colors hidden sm:block pb-1"
            >
              All entries →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-earth/10">
            {posts.slice(0, 2).map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group block py-10 sm:py-0 ${i === 0 ? "sm:pr-16" : "sm:pl-16"}`}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-earth/25 mb-6">
                  {post.category}
                </p>
                <h3 className="font-display italic text-2xl sm:text-3xl font-bold text-ink leading-snug mb-5 group-hover:text-ink/50 transition-colors">
                  {post.title}.
                </h3>
                <p className="text-sm text-ink/45 leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Link
              href="/blog"
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-earth/30 hover:text-ink/60 transition-colors"
            >
              All entries →
            </Link>
          </div>
        </div>
      </section>

      <EmailCapture />
    </>
  );
}
