import { wpClient } from "./client";
import {
  BLOG_POSTS,
  getPostBySlug as staticGetPostBySlug,
  type BlogPost,
} from "@/lib/blog";
import {
  getAllMdxPosts,
  getMdxPost,
  getMdxPostSlugs,
} from "@/lib/mdx-blog";

// ── WP response types ────────────────────────────────────────────────────────

type WPFeaturedImage = { node: { sourceUrl: string } } | null;
type WPCategory = { name: string };

type WPPostNode = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  categories: { nodes: WPCategory[] };
  featuredImage: WPFeaturedImage;
};

type WPPostsData = { posts: { nodes: WPPostNode[] } };
type WPPostData = { post: WPPostNode | null };

// ── GraphQL queries ──────────────────────────────────────────────────────────

const POST_FIELDS = `
  slug
  title
  excerpt(format: RAW)
  content
  date
  categories { nodes { name } }
  featuredImage { node { sourceUrl(size: LARGE) } }
`;

const GET_POSTS = `
  query GetPosts {
    posts(first: 20, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes { ${POST_FIELDS} }
    }
  }
`;

const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) { ${POST_FIELDS} }
  }
`;

// ── Mapping ──────────────────────────────────────────────────────────────────

function wordCount(html: string): number {
  return html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
}

function mapPost(node: WPPostNode): BlogPost {
  return {
    slug: node.slug,
    title: node.title,
    excerpt: node.excerpt.replace(/<[^>]+>/g, "").trim(),
    coverImage:
      node.featuredImage?.node.sourceUrl ?? "/images/blog/placeholder.jpg",
    date: node.date.split("T")[0],
    readTime: `${Math.max(1, Math.ceil(wordCount(node.content) / 200))} min read`,
    category: node.categories.nodes[0]?.name ?? "Blog",
    content: node.content,
  };
}

// ── Public API — resolution order: MDX files → WP → static stubs ────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  const mdxPosts = await getAllMdxPosts();

  if (!wpClient) return mdxPosts.length ? mdxPosts : BLOG_POSTS;

  try {
    const data = await wpClient.request<WPPostsData>(GET_POSTS);
    const wpPosts = data.posts.nodes.map(mapPost);
    const mdxSlugs = new Set(mdxPosts.map((p) => p.slug));
    const merged = [
      ...mdxPosts,
      ...wpPosts.filter((p) => !mdxSlugs.has(p.slug)),
    ];
    return merged.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return mdxPosts.length ? mdxPosts : BLOG_POSTS;
  }
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const mdx = await getMdxPost(slug);
  if (mdx) return mdx;

  if (!wpClient) return staticGetPostBySlug(slug);
  try {
    const data = await wpClient.request<WPPostData>(GET_POST_BY_SLUG, { slug });
    return data.post ? mapPost(data.post) : undefined;
  } catch {
    return staticGetPostBySlug(slug);
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const mdxSlugs = getMdxPostSlugs();
  const wpSlugs: string[] = [];

  if (wpClient) {
    try {
      const data = await wpClient.request<WPPostsData>(GET_POSTS);
      wpSlugs.push(...data.posts.nodes.map((n) => n.slug));
    } catch {
      // fall through
    }
  }

  const all = [...new Set([...mdxSlugs, ...wpSlugs])];
  return all.length ? all : BLOG_POSTS.map((p) => p.slug);
}
