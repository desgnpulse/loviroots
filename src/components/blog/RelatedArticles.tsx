import Image from "next/image";
import Link from "next/link";

type RelatedPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
};

export function RelatedArticles({ posts }: { posts: RelatedPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="mt-16 pt-10 border-t border-earth/10">
      <h2 className="font-display text-xl font-semibold text-earth mb-6">
        Read next
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.slice(0, 4).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-4 rounded-xl border border-earth/8 bg-white p-4 hover:border-earth/20 hover:shadow-sm transition-all"
          >
            <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-ivory">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="80px"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-semibold text-leaf uppercase tracking-wide">
                {post.category}
              </span>
              <p className="font-display text-sm font-semibold text-earth leading-snug mt-0.5 line-clamp-2 group-hover:text-earth/80 transition-colors">
                {post.title}
              </p>
              <p className="text-xs text-earth/50 mt-1 line-clamp-1">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
