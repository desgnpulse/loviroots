export type ProductSize = {
  label: string;
  price: string;
  priceValue: number;
};

export type Review = {
  name: string;
  rating: number;
  body: string;
  date: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  sizes: ProductSize[];
  rating: number;
  reviewCount: number;
  benefits: string[];
  ingredients: string[];
  reviews: Review[];
};

// Static data - replaced by WPGraphQL queries in Step 4
export const PRODUCTS: Product[] = [
  {
    slug: "lovi-pure-shea-butter",
    name: "Lovi Pure Shea Butter",
    tagline: "Raw. Unrefined. Deeply nourishing.",
    description:
      "100% pure, unrefined shea butter sourced directly from West Africa. No additives, no preservatives. Just shea in its most effective form. Works on skin, hair, lips, and nails.",
    image: "/images/products/shea-butter.jpg",
    sizes: [
      { label: "100g", price: "KES 350", priceValue: 350 },
      { label: "200g", price: "KES 600", priceValue: 600 },
      { label: "500g", price: "KES 1,200", priceValue: 1200 },
    ],
    rating: 4.8,
    reviewCount: 42,
    benefits: [
      "Deep moisturising - locks in hydration for 12+ hours",
      "Soothes dry, cracked, and irritated skin",
      "Fades stretch marks and uneven tone over time",
      "Seals moisture into natural and relaxed hair",
      "Softens cuticles and strengthens nails",
    ],
    ingredients: ["Butyrospermum Parkii (Shea) Butter"],
    reviews: [
      {
        name: "Amina W.",
        rating: 5,
        body: "My skin has never felt this soft. I use it morning and night and the jar lasts me all month.",
        date: "May 2026",
      },
      {
        name: "Brenda K.",
        rating: 5,
        body: "I was sceptical at first because I have oily skin. After a week of use, it did not break me out and my dark spots started fading.",
        date: "April 2026",
      },
      {
        name: "John M.",
        rating: 4,
        body: "Bought the 500g for my whole family. The kids love it. Great value.",
        date: "March 2026",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
