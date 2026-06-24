"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function CartBadge() {
  const { totalCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart — ${totalCount} item${totalCount !== 1 ? "s" : ""}`}
      className="relative p-1.5 text-earth/70 hover:text-earth transition-colors"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      {totalCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] bg-leaf text-earth text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
          {totalCount > 9 ? "9+" : totalCount}
        </span>
      )}
    </Link>
  );
}
