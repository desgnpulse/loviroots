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
    <section className="bg-forest text-ivory py-24 px-4">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ivory mb-5">
            Stay Informed.
          </h2>
          <p className="text-ivory/40 text-sm leading-relaxed">
            Occasional dispatches about new batches, ingredient sourcing,
            <br className="hidden sm:block" />
            and what we are learning. No spam.
          </p>
        </div>

        {status === "success" ? (
          <p className="text-center text-ivory/60 text-sm tracking-wide">
            You are in. Check your inbox for a welcome note.
          </p>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-6 border-b border-ivory/20 pb-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                disabled={status === "loading"}
                className="flex-1 bg-transparent text-ivory text-sm placeholder:text-ivory/25 placeholder:text-xs placeholder:tracking-[0.18em] focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/50 hover:text-ivory transition-colors disabled:opacity-40 whitespace-nowrap"
              >
                {status === "loading" ? "···" : "Subscribe"}
              </button>
            </form>

            {status === "error" && (
              <p className="text-xs text-red-300/60 mt-4 text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
