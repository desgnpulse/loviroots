import Image from "next/image";

export function StorySection() {
  return (
    <section id="story" className="lv-story" aria-labelledby="lv-story-quote">
      <Image
        className="lv-bg"
        src="/images/blog/dark-skin-care.jpg"
        alt="A woman in a linen robe resting with a cup of tea, morning light on her arm"
        fill
        sizes="100vw"
      />
      <div className="lv-scrim" aria-hidden="true" />
      <div className="lv-shell">
        <blockquote id="lv-story-quote">
          Shea has softened African skin for generations. We didn&rsquo;t improve it.{" "}
          <em>We jarred it.</em>
        </blockquote>
        <a className="lv-link-sub" href="/about">
          Read the Loviroots story &rarr;
        </a>
      </div>
    </section>
  );
}
