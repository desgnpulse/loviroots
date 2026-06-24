import type { Metadata } from "next";
import { CartContents } from "@/components/cart/CartContents";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your order and choose how to complete it.",
};

export default function CartPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-earth mb-8">
            Your Cart
          </h1>
          <CartContents />
        </div>
      </section>
    </div>
  );
}
