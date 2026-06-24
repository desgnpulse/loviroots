"use client";

import { useState } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-earth text-ivory py-16 px-4">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">
          Free skincare tips
        </p>
        <h2 className="font-display text-3xl font-bold mb-3">
          Your skin deserves better than guesswork.
        </h2>
        <p className="text-ivory/70 mb-8 text-sm leading-relaxed">
          Join 1,200+ women getting weekly skincare tips, honest ingredient breakdowns, and early
          access to Lovi restocks.
        </p>

        {status === "success" ? (
          <p className="text-leaf font-medium">
            You are in. Check your inbox for a welcome note.
          </p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === "loading"}
                className="flex-1 rounded-full px-5 py-3 bg-ivory/10 border border-ivory/20 text-ivory placeholder:text-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold text-sm disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full px-6 py-3 bg-gold text-earth font-semibold text-sm hover:bg-[#c49b4e] transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                {status === "loading" ? "Joining..." : "Get free tips"}
              </button>
            </form>

            {status === "error" && (
              <p className="text-xs text-red-300 mt-3">
                Something went wrong. Please try again.
              </p>
            )}
          </>
        )}

        <p className="text-xs text-ivory/30 mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
