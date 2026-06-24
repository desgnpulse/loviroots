"use client";

import Link from "next/link";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { useWhatsAppOrder } from "@/hooks/useWhatsAppOrder";

export function CartContents() {
  const { items, totalValue, cartUrl, removeItem, setQty } = useWhatsAppOrder();

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

  return (
    <div>
      {/* Items */}
      <ul className="divide-y divide-earth/10 mb-8">
        {items.map((item) => (
          <li key={`${item.slug}-${item.size}`} className="py-5 flex gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-earth text-sm truncate">{item.name}</p>
              <p className="text-earth/50 text-xs mt-0.5">{item.size}</p>
            </div>

            {/* Qty controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setQty(item.slug, item.size, item.qty - 1)}
                aria-label="Decrease quantity"
                className="w-7 h-7 rounded-full border border-earth/20 text-earth flex items-center justify-center hover:border-earth/50 transition-colors text-sm font-medium"
              >
                −
              </button>
              <span className="w-5 text-center text-sm font-medium text-earth">
                {item.qty}
              </span>
              <button
                onClick={() => setQty(item.slug, item.size, item.qty + 1)}
                aria-label="Increase quantity"
                className="w-7 h-7 rounded-full border border-earth/20 text-earth flex items-center justify-center hover:border-earth/50 transition-colors text-sm font-medium"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm font-semibold text-earth w-20 text-right">
                KES {(item.priceValue * item.qty).toLocaleString()}
              </span>
              <button
                onClick={() => removeItem(item.slug, item.size)}
                aria-label={`Remove ${item.name} ${item.size}`}
                className="text-earth/30 hover:text-earth/70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="flex items-center justify-between py-4 border-t border-earth/10 mb-8">
        <span className="font-semibold text-earth">Total</span>
        <span className="font-bold text-earth text-lg">
          KES {totalValue.toLocaleString()}
        </span>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <WhatsAppCTA url={cartUrl} label="Order via WhatsApp" fullWidth size="lg" />
        <Link
          href="/checkout"
          className="flex items-center justify-center w-full text-earth/50 text-sm hover:text-earth transition-colors py-2"
        >
          or checkout online →
        </Link>
      </div>

      <p className="text-xs text-earth/40 text-center mt-4">
        Your cart is not saved if you close this tab.
      </p>
    </div>
  );
}
