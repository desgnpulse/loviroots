"use client";

import Link from "next/link";

// Cart state wired in Step 3 (useWhatsAppOrder + cart context).
export function CartContents() {
  const items: unknown[] = [];

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-display text-xl text-earth/60 mb-6">Your cart is empty.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-leaf text-earth font-semibold px-8 py-4 rounded-full hover:bg-[#7aad65] transition-colors text-sm"
        >
          Shop our products
        </Link>
      </div>
    );
  }

  return null;
}
