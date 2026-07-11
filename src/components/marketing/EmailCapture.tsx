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
    <section id="list" className="lv-section lv-list" aria-labelledby="lv-list-title">
      <div className="lv-shell">
        <p className="lv-eyebrow">Small batches sell out</p>
        <h2 className="lv-h2" id="lv-list-title" style={{ margin: "0.9rem 0 1rem" }}>
          Be first to know.
        </h2>
        <p className="lv-sub">
          New batches, new sizes, and the occasional honest essay on skin. No noise - 
          we&rsquo;re too small for that.
        </p>

        {status === "success" ? (
          <p className="lv-cap-ok" role="status">
            Karibu - you&rsquo;re on the list. Watch your inbox.
          </p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="lv-cap-form" noValidate>
              <label
                htmlFor="lv-cap-email"
                className="lv-eyebrow"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                  clip: "rect(0 0 0 0)",
                }}
              >
                Email address
              </label>
              <input
                type="email"
                id="lv-cap-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={status === "loading"}
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Joining…" : "Join the Lovi list"}
              </button>
            </form>

            {status === "error" && (
              <p className="lv-cap-fine" style={{ color: "#b3543a" }}>
                Something went wrong. Please try again.
              </p>
            )}
          </>
        )}

        <p className="lv-cap-fine">One email when it matters. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
