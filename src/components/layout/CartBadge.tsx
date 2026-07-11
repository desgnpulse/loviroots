"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function CartBadge() {
  const { totalCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart - ${totalCount} item${totalCount !== 1 ? "s" : ""}`}
      className="lv-cart-badge"
    >
      Cart ({totalCount})
    </Link>
  );
}
