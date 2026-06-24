import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order via secure web checkout.",
};

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hi Lovi! I'd like to place an order. Please assist."
)}`;

export default function CheckoutPage() {
  return (
    <div className="bg-ivory min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-sm">
        <h1 className="font-display text-3xl font-bold text-earth mb-3">Checkout</h1>
        <p className="text-earth/60 text-sm leading-relaxed mb-8">
          Web checkout with Pesapal (M-Pesa and card) is coming soon. Order via WhatsApp now for
          instant service.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-leaf text-earth font-semibold px-8 py-4 rounded-full hover:bg-[#7aad65] transition-colors text-sm"
        >
          Order via WhatsApp
        </a>
        <div className="mt-4">
          <Link
            href="/products"
            className="text-sm text-earth/50 hover:text-earth transition-colors"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    </div>
  );
}
