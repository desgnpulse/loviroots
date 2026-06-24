import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Lovi order has been placed successfully.",
};

export default function OrderConfirmationPage() {
  return (
    <div className="bg-ivory min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-leaf/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-leaf"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-bold text-earth mb-3">Order Confirmed</h1>
        <p className="text-earth/70 text-sm leading-relaxed mb-8">
          Thank you for your order. You will receive a confirmation email shortly. Our team will
          reach out on WhatsApp to confirm delivery details.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-earth text-ivory font-semibold px-8 py-4 rounded-full hover:bg-earth/90 transition-colors text-sm"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
