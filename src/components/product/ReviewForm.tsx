"use client";

import { useState } from "react";
import { StarRating } from "./StarRating";

type Props = { productSlug: string; productName: string };

export function ReviewForm({ productSlug, productName }: Props) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (done) {
    return (
      <p className="text-sm text-earth/60 bg-leaf/10 rounded-xl px-5 py-4">
        Thank you! Your review is pending approval and will appear shortly.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, productName, reviewerName: name, rating, body }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-earth mb-1.5">Your name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          className="w-full rounded-xl border border-earth/20 px-4 py-2.5 text-sm text-earth bg-white focus:outline-none focus:ring-2 focus:ring-earth/30"
          placeholder="Jane D."
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-earth mb-2">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-xl transition-colors ${star <= rating ? "text-gold" : "text-earth/20"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-earth mb-1.5">Your review</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={1000}
          rows={3}
          className="w-full rounded-xl border border-earth/20 px-4 py-2.5 text-sm text-earth bg-white focus:outline-none focus:ring-2 focus:ring-earth/30 resize-none"
          placeholder="What did you think of this product?"
        />
      </div>

      {error && <p className="text-xs text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-2.5 bg-earth text-ivory rounded-full text-sm font-medium hover:bg-earth/90 transition-colors disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}
