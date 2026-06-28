import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { BlogPost } from "@/lib/blog";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

export function getMdxPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export async function getMdxPost(slug: string): Promise<BlogPost | undefined> {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;

  if (!filePath) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkHtml).process(content);
  const html = processed.toString();

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? data.summary ?? "",
    coverImage: data.coverImage ?? data.image ?? "/images/blog/placeholder.jpg",
    date: data.date ? String(data.date).split("T")[0] : "",
    readTime: `${Math.max(1, Math.ceil(wordCount(content) / 200))} min read`,
    category: data.category ?? "Blog",
    content: html,
  };
}

export async function getAllMdxPosts(): Promise<BlogPost[]> {
  const slugs = getMdxPostSlugs();
  const posts = await Promise.all(slugs.map(getMdxPost));
  return (posts.filter(Boolean) as BlogPost[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
