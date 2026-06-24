"use client";

import { useState } from "react";

type FormState = { name: string; email: string; message: string };

export function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // API route wired in a later step
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
  }

  if (status === "success") {
    return (
      <div className="bg-leaf/10 text-earth rounded-2xl p-8 text-center">
        <p className="font-semibold mb-1">Message sent.</p>
        <p className="text-sm text-earth/70">We will get back to you within 24 hours.</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth bg-white focus:outline-none focus:ring-2 focus:ring-leaf placeholder:text-earth/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-earth mb-1.5">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={update("name")}
          placeholder="Your name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-earth mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          placeholder="your@email.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-earth mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="How can we help?"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-earth text-ivory font-semibold py-3 rounded-full hover:bg-earth/90 transition-colors text-sm disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
