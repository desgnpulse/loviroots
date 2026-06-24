import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/wp/blog";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero image */}
      <div className="relative w-full aspect-video sm:aspect-[3/1] overflow-hidden bg-earth/10">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/60 via-earth/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-8 sm:px-8 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block bg-leaf text-earth text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {post.category}
            </span>
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-ivory leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="px-4 pt-6 pb-2">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs text-earth/40">
            {post.date} · {post.readTime}
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="px-4 pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl">
          {post.content ? (
            <div
              className="prose-lovi mt-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <p className="mt-6 text-earth/70 text-base leading-relaxed italic">
              {post.excerpt}
            </p>
          )}

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-earth/10">
            <Link
              href="/blog"
              className="text-sm font-medium text-leaf hover:text-earth transition-colors"
            >
              ← Back to blog
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
