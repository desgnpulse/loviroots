"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function CartBadge() {
  const { totalCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart — ${totalCount} item${totalCount !== 1 ? "s" : ""}`}
      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-earth/40 hover:text-earth transition-colors"
    >
      Cart ({totalCount})
    </Link>
  );
}
