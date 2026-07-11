import Image from "next/image";
import { Reveal } from "./Reveal";

const STATES = [
  {
    temp: "~24°",
    label: "In the jar",
    title: "Solid",
    body: "Dense, ivory, faintly nutty. Unrefined shea is firm at room temperature - proof nothing was added to soften it artificially.",
    image: "/images/products/shea-butter.jpg",
    alt: "Raw unrefined shea butter, firm and crumbly, heaped in a clear glass jar on linen",
  },
  {
    temp: "~32°",
    label: "In your palm",
    title: "Melting",
    body: "Warm a pea-sized amount between your palms for a few seconds - it softens and absorbs faster once it meets body heat.",
    image: "/images/products/shea-product.jpg",
    alt: "An open jar of whipped shea butter on warm terracotta stone, surrounded by shea nuts and dried botanicals",
  },
  {
    temp: "~37°",
    label: "On your skin",
    title: "Sealed",
    body: "Massage in with upward, circular strokes. It absorbs within minutes and seals moisture where your skin needs it most.",
    image: "/images/products/skin.jpg",
    alt: "Close-up of deep brown skin across a collarbone, smooth and softly lit",
  },
];

export function StatesSection() {
  return (
    <section id="states" className="lv-section lv-states" aria-labelledby="lv-states-title">
      <div className="lv-shell">
        <div className="lv-sec-head">
          <div>
            <p className="lv-eyebrow" style={{ marginBottom: "0.9rem" }}>
              The state change
            </p>
            <h2 className="lv-h2" id="lv-states-title">
              One butter.
              <br />
              <em>Three states.</em>
            </h2>
          </div>
          <p className="lv-sec-temp">28.4&deg;C &rarr; RISING</p>
        </div>

        <div className="lv-states-grid">
          {STATES.map((s, i) => (
            <Reveal as="article" className="lv-state" key={s.title} delayMs={i * 80}>
              <figure>
                <Image src={s.image} alt={s.alt} fill className="object-cover" sizes="(max-width: 52rem) 100vw, 33vw" />
              </figure>
              <div className="lv-body">
                <p className="lv-meta">
                  <b>{s.temp}</b>
                  <span>{s.label}</span>
                </p>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="lv-states-note">
          <a className="lv-link-sub" href="/how-to-use">
            Full usage guide &rarr;
          </a>
        </p>
      </div>
    </section>
  );
}
