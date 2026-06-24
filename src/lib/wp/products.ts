import { wpClient } from "./client";
import {
  PRODUCTS,
  getProductBySlug as staticGetProductBySlug,
  type Product,
  type ProductSize,
  type Review,
} from "@/lib/products";

// ── WP response types ────────────────────────────────────────────────────────
//
// WordPress CPT "product" registered with show_in_graphql.
// ACF field group "product_fields" attached to the CPT.
// Required ACF fields:
//   tagline (text), sizes (repeater → label/price/price_value),
//   benefits (textarea, one per line), ingredients (textarea, comma-separated),
//   rating (number), review_count (number),
//   reviews (repeater → name/rating/body/date)

type WPFeaturedImage = { node: { sourceUrl: string } } | null;

type WPProductFields = {
  tagline: string;
  sizes: { label: string; price: string; priceValue: number }[];
  benefits: string;
  ingredients: string;
  rating: number;
  reviewCount: number;
  reviews: { name: string; rating: number; body: string; date: string }[] | null;
};

type WPProductNode = {
  slug: string;
  title: string;
  content: string;
  featuredImage: WPFeaturedImage;
  productFields: WPProductFields;
};

type WPProductsData = { products: { nodes: WPProductNode[] } };
type WPProductData = { product: WPProductNode | null };

// ── GraphQL queries ──────────────────────────────────────────────────────────

const PRODUCT_FIELDS = `
  slug
  title
  content
  featuredImage { node { sourceUrl(size: LARGE) } }
  productFields {
    tagline
    sizes { label price priceValue }
    benefits
    ingredients
    rating
    reviewCount
    reviews { name rating body date }
  }
`;

const GET_PRODUCTS = `
  query GetProducts {
    products(first: 50) {
      nodes { ${PRODUCT_FIELDS} }
    }
  }
`;

const GET_PRODUCT_BY_SLUG = `
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) { ${PRODUCT_FIELDS} }
  }
`;

// ── Mapping ──────────────────────────────────────────────────────────────────

function mapProduct(node: WPProductNode): Product {
  const f = node.productFields;
  return {
    slug: node.slug,
    name: node.title,
    tagline: f.tagline,
    description: node.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    image:
      node.featuredImage?.node.sourceUrl ??
      "/images/products/placeholder.jpg",
    sizes: f.sizes as ProductSize[],
    rating: f.rating,
    reviewCount: f.reviewCount,
    benefits: f.benefits.split("\n").map((b) => b.trim()).filter(Boolean),
    ingredients: f.ingredients.split(",").map((i) => i.trim()).filter(Boolean),
    reviews: (f.reviews ?? []) as Review[],
  };
}

// ── Public API (falls back to static data if WP_GRAPHQL_URL is not set) ─────

export async function getAllProducts(): Promise<Product[]> {
  if (!wpClient) return PRODUCTS;
  try {
    const data = await wpClient.request<WPProductsData>(GET_PRODUCTS);
    return data.products.nodes.map(mapProduct);
  } catch {
    return PRODUCTS;
  }
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  if (!wpClient) return staticGetProductBySlug(slug);
  try {
    const data = await wpClient.request<WPProductData>(GET_PRODUCT_BY_SLUG, {
      slug,
    });
    return data.product ? mapProduct(data.product) : undefined;
  } catch {
    return staticGetProductBySlug(slug);
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getAllProducts();
  return products.map((p) => p.slug);
}
