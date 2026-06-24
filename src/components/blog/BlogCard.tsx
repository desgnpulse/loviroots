import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group rounded-2xl overflow-hidden bg-white border border-earth/5 shadow-sm hover:shadow-md transition-shadow">
      <Link
        href={`/blog/${post.slug}`}
        className="block aspect-video relative overflow-hidden bg-ivory"
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-3 left-3 bg-earth/80 text-ivory text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          {post.category}
        </span>
      </Link>

      <div className="p-5">
        <p className="text-xs text-earth/40 mb-2">
          {post.date} · {post.readTime}
        </p>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-display text-lg text-earth font-semibold leading-snug mb-2 group-hover:text-earth/80 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-earth/70 leading-relaxed line-clamp-2">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block mt-3 text-sm font-medium text-leaf hover:text-earth transition-colors"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
