"use client";

import { useState } from "react";
import Link from "next/link";
import { useWhatsAppOrder } from "@/hooks/useWhatsAppOrder";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

const PHONE_RE = /^254\d{9}$/;

export function CheckoutForm() {
  const { items, totalValue, cartUrl, clearCart } = useWhatsAppOrder();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!PHONE_RE.test(phone)) {
      setError("Phone must be in format 2547XXXXXXXX (12 digits, starting with 254).");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          amount: totalValue,
          items: items.map((i) => ({ name: i.name, size: i.size, qty: i.qty })),
        }),
      });

      const data = (await res.json()) as { redirectUrl?: string; error?: string };

      if (res.ok && data.redirectUrl) {
        clearCart();
        window.location.href = data.redirectUrl;
      } else {
        setError(data.error ?? "Payment initiation failed. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-bold text-earth mb-8">Checkout</h1>

      {/* Order summary */}
      <div className="bg-white rounded-2xl border border-earth/10 p-6 mb-8">
        <h2 className="font-semibold text-earth text-sm mb-4">Order summary</h2>
        <ul className="divide-y divide-earth/10">
          {items.map((item) => (
            <li key={`${item.slug}-${item.size}`} className="flex justify-between py-3 text-sm">
              <span className="text-earth">
                {item.name} <span className="text-earth/50">{item.size}</span>
              </span>
              <span className="font-medium text-earth">
                KES {(item.priceValue * item.qty).toLocaleString()} × {item.qty}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between pt-4 mt-2 border-t border-earth/10">
          <span className="font-semibold text-earth">Total</span>
          <span className="font-bold text-earth">KES {totalValue.toLocaleString()}</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-earth mb-1.5">First name</label>
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth bg-white focus:outline-none focus:ring-2 focus:ring-earth/30"
              placeholder="Jane"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-earth mb-1.5">Last name</label>
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth bg-white focus:outline-none focus:ring-2 focus:ring-earth/30"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-earth mb-1.5">Email address</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth bg-white focus:outline-none focus:ring-2 focus:ring-earth/30"
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-earth mb-1.5">
            Phone number
            <span className="text-earth/40 font-normal ml-1">(M-Pesa — format: 2547XXXXXXXX)</span>
          </label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth bg-white focus:outline-none focus:ring-2 focus:ring-earth/30"
            placeholder="2547XXXXXXXX"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-earth text-ivory rounded-full font-semibold text-sm hover:bg-earth/90 transition-colors disabled:opacity-60"
        >
          {submitting ? "Redirecting to payment..." : `Pay KES ${totalValue.toLocaleString()} →`}
        </button>

        <p className="text-xs text-earth/40 text-center">
          M-Pesa STK push or card via Pesapal. You will be redirected to complete payment.
        </p>
      </form>

      {/* WhatsApp fallback */}
      <div className="mt-8 pt-8 border-t border-earth/10 text-center">
        <p className="text-xs text-earth/50 mb-3">Prefer WhatsApp?</p>
        <WhatsAppCTA url={cartUrl} label="Order via WhatsApp instead" size="sm" />
      </div>
    </div>
  );
}
