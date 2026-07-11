import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import type { BlogPost } from "@/lib/blog";

type Props = { posts: BlogPost[] };

export function JournalSection({ posts }: Props) {
  const featured = posts.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section id="journal" className="lv-section" aria-labelledby="lv-journal-title">
      <div className="lv-shell">
        <div className="lv-sec-head">
          <div>
            <p className="lv-eyebrow" style={{ marginBottom: "0.9rem" }}>
              Skincare, read slowly
            </p>
            <h2 className="lv-h2" id="lv-journal-title">
              The Journal.
            </h2>
          </div>
          <Link href="/blog" className="lv-link-sub">
            All entries &rarr;
          </Link>
        </div>

        <div className="lv-journal-grid">
          {featured.map((post, i) => (
            <Reveal key={post.slug} delayMs={i * 80}>
              <Link href={`/blog/${post.slug}`} className="lv-j-card">
                <figure>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 52rem) 100vw, 33vw"
                  />
                </figure>
                <p className="lv-cat">{post.category}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <p className="lv-rt">{post.readTime}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
