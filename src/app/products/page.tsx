import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Shop Lovi Pure Shea Butter. 100% natural, unrefined shea butter available in 100g, 200g, and 500g. Order via WhatsApp or online checkout.",
};

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export default function ProductsPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-earth mb-3">
              Our Products
            </h1>
            <p className="text-earth/60 text-base max-w-sm mx-auto">
              One ingredient. Three sizes. Pick what works for your routine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.slug}
                name={product.name}
                slug={product.slug}
                image={product.image}
                sizes={product.sizes.map((s) => s.label)}
                price={product.sizes[0].price}
                rating={product.rating}
                reviewCount={product.reviewCount}
                whatsappUrl={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                  `Hi Lovi! I'd like to order: ${product.name}. Please assist.`
                )}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
