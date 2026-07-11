import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Use",
  description:
    "Learn how to use Lovi Pure Shea Butter on your skin, hair, lips, and nails for best results.",
};

const steps = [
  {
    number: "01",
    title: "Start with clean, damp skin",
    body: "Apply shea butter right after your shower, while your skin is still slightly damp. The moisture is already there - shea helps lock it in.",
  },
  {
    number: "02",
    title: "Take a small amount",
    body: "A little goes a long way. Start with a pea-sized amount for your face, a teaspoon for arms or legs. Shea melts on contact with body heat.",
  },
  {
    number: "03",
    title: "Warm it between your palms",
    body: "Rub the butter between your palms for 5 to 10 seconds. It will soften and absorb faster.",
  },
  {
    number: "04",
    title: "Massage in circular motions",
    body: "Work it into your skin using upward, circular strokes. It absorbs within a few minutes and leaves a non-greasy finish.",
  },
];

const useCases = [
  {
    title: "Face",
    tip: "Use as a night moisturiser. Apply a very thin layer before bed. It works while you sleep.",
  },
  {
    title: "Body",
    tip: "Apply post-shower on elbows, knees, and dry patches. Best used while skin is still warm.",
  },
  {
    title: "Hair",
    tip: "Use as a sealant in the LOC method. Apply after oil to lock moisture into natural hair.",
  },
  {
    title: "Lips",
    tip: "Dab a small amount onto lips at night. Wake up soft.",
  },
  {
    title: "Nails",
    tip: "Massage into cuticles 2 to 3 times a week. Softens and strengthens over time.",
  },
  {
    title: "Stretch marks",
    tip: "Apply twice daily on affected areas. Consistent use over 4 to 8 weeks shows visible improvement.",
  },
];

const faqs = [
  {
    q: "Will it break me out?",
    a: "Shea butter is rated 0 to 2 on the comedogenic scale - most people with oily or acne-prone skin use it without breakouts, especially in small amounts. If you are new to it, do a patch test on your inner arm first.",
  },
  {
    q: "How long does one jar last?",
    a: "The 100g jar lasts about a month for face use only. The 200g jar works well for face and body. The 500g jar is best for families or full-body daily use.",
  },
  {
    q: "Does it have a smell?",
    a: "Unrefined shea butter has a natural, nutty scent that fades within a few minutes of applying. We do not add fragrance. If you are sensitive to scents, apply at night so it is absorbed by morning.",
  },
];

export default function HowToUsePage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero */}
      <section className="px-4 py-16 sm:py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
          Application guide
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-earth mb-4">
          How to use Lovi Shea Butter
        </h1>
        <p className="text-earth/60 text-base max-w-lg mx-auto">
          Shea butter is simple. These tips help you get the most out of every jar.
        </p>
      </section>

      {/* Steps */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-2xl space-y-5">
          {steps.map(({ number, title, body }) => (
            <div
              key={number}
              className="flex gap-5 bg-white rounded-2xl p-6 border border-earth/5 shadow-sm"
            >
              <span className="font-display text-3xl font-bold text-gold/30 leading-none mt-0.5 shrink-0 w-10">
                {number}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-earth mb-2">{title}</h3>
                <p className="text-earth/70 text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-white py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-earth text-center mb-10">
            Where to use it
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map(({ title, tip }) => (
              <div key={title} className="p-5 rounded-2xl bg-ivory border border-earth/5">
                <h3 className="font-semibold text-earth mb-2">{title}</h3>
                <p className="text-earth/70 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-earth text-center mb-10">
            Common questions
          </h2>
          <div className="space-y-8">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-semibold text-earth mb-2">{q}</h3>
                <p className="text-earth/70 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="py-12 px-4 text-center bg-earth/5 border-t border-earth/10">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-leaf text-earth font-semibold px-8 py-4 rounded-full hover:bg-[#7aad65] transition-colors text-sm"
        >
          Get your jar
        </Link>
      </div>
    </div>
  );
}
