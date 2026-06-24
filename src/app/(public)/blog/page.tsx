import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/wp/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Skincare tips, ingredient guides, and natural beauty stories from Loviroots.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="bg-ivory min-h-screen">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-earth mb-3">
              Skincare Stories
            </h1>
            <p className="text-earth/60 text-base max-w-sm mx-auto">
              Ingredient guides, routines, and real stories from the Lovi community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
