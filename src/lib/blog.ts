export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: string;
  category: string;
  content?: string; // HTML from WP; absent on static stub posts
  author?: string;  // author slug, matches key in src/data/authors.json
};

// Static data — replaced by WPGraphQL queries in Step 4
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "5-reasons-to-switch-to-natural-shea-butter",
    title: "5 Reasons to Switch to Natural Shea Butter",
    excerpt:
      "Most moisturisers have more ingredients you cannot pronounce than ones your skin actually needs. Here is what pure shea butter does instead.",
    coverImage: "/images/blog/shea-benefits.jpg",
    date: "2026-06-10",
    readTime: "4 min read",
    category: "Skin Care",
  },
  {
    slug: "how-to-use-shea-butter-on-natural-hair",
    title: "How to Use Shea Butter on Natural Hair",
    excerpt:
      "Shea butter is one of the best sealants for 4C hair. This guide walks you through the LOC method and where shea fits in.",
    coverImage: "/images/blog/shea-hair.jpg",
    date: "2026-05-28",
    readTime: "5 min read",
    category: "Hair Care",
  },
  {
    slug: "skincare-basics-for-dark-skin",
    title: "Skincare Basics for Dark Skin",
    excerpt:
      "Hyperpigmentation, uneven tone, and dryness are the top concerns for most women with dark skin in East Africa. Start with these three habits.",
    coverImage: "/images/blog/dark-skin-care.jpg",
    date: "2026-05-15",
    readTime: "6 min read",
    category: "Skin Care",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
