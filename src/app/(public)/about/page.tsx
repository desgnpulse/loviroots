import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Loviroots is a natural skincare brand rooted in African heritage. We make 100% pure, unrefined shea butter for women who want effective, honest skincare.",
};

const values = [
  {
    title: "Pure ingredients",
    body: "We use one ingredient: shea butter. No preservatives, no artificial fragrance, no fillers. What is in the jar is what goes on your skin.",
  },
  {
    title: "Direct sourcing",
    body: "Our shea is sourced directly from West Africa. A short supply chain means fresher product and better margins for the people who harvest it.",
  },
  {
    title: "Honest results",
    body: "We do not promise miracles. We promise consistent, effective moisturising that builds over time. Your skin knows the difference.",
  },
  {
    title: "Made for African skin",
    body: "Formulated with the humidity, sun, and skincare concerns of East African women in mind. This is skincare that understands your context.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
            Our story
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-earth leading-tight mb-6">
            Skincare rooted in
            <br className="hidden sm:block" /> African heritage.
          </h1>
          <p className="text-earth/70 text-base sm:text-lg leading-relaxed">
            Loviroots started with a simple question: why is most skincare sold in Kenya full of
            ingredients that have nothing to do with healthy skin?
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-2xl space-y-5">
          <p className="text-earth/80 leading-relaxed text-base">
            African women have used shea butter for centuries. It works. It is affordable. It needs
            nothing added to it. Yet most skincare brands bury it beneath a long list of fillers and
            label it as a minor ingredient.
          </p>
          <p className="text-earth/80 leading-relaxed text-base">
            Loviroots was built to change that. We source pure, unrefined shea butter directly from
            West Africa, package it as-is, and deliver it to customers across Kenya. Nothing
            extracted. Nothing added.
          </p>
          <p className="text-earth/80 leading-relaxed text-base">
            We are a small brand. We know our customers by name. And we are serious about what goes
            into every jar.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-earth text-center mb-12">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map(({ title, body }) => (
              <div key={title} className="p-6 rounded-2xl border border-earth/5 bg-ivory">
                <h3 className="font-display text-lg font-semibold text-earth mb-2">{title}</h3>
                <p className="text-earth/70 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="font-display text-2xl font-bold text-earth mb-3">Ready to try it?</h2>
        <p className="text-earth/60 text-sm mb-6">
          Order via WhatsApp and get it delivered to your door.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-leaf text-earth font-semibold px-8 py-4 rounded-full hover:bg-[#7aad65] transition-colors text-sm"
        >
          Shop our products
        </Link>
      </section>
    </div>
  );
}
