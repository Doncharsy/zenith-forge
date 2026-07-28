"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Newsletter signup. Posts the email to /api/subscribe, which forwards it to
 * the configured webhook (n8n to a Google Sheet). Sending the newsletter is
 * handled separately; this just captures the address.
 */
export default function Newsletter({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  // Honeypot: real users leave this empty. Bots fill every field.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source: "website" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage("You are on the list. Watch your inbox.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section
      className={`zf-news zf-news--${variant}`}
      data-cursor-theme={variant === "dark" ? "dark" : undefined}
    >
      <div className="zf-news__inner">
        <div className="zf-news__text">
          <div className="zf-news__eyebrow">THE FORGE DISPATCH</div>
          <h2 className="zf-news__title">
            Notes from the forge, straight to your inbox.
          </h2>
          <p className="zf-news__sub">
            Occasional emails on what we are building, the tools we trust, and
            lessons worth passing on. No noise, unsubscribe anytime.
          </p>
        </div>

        <form className="zf-news__form" onSubmit={onSubmit} noValidate>
          {/* Honeypot: hidden from users and assistive tech, catches bots. */}
          <div className="zf-news__hp" aria-hidden>
            <label htmlFor="zf-news-website">Do not fill this in</label>
            <input
              id="zf-news-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="zf-news__row">
            <input
              type="email"
              className="zf-news__input"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              autoComplete="email"
            />
            <button
              type="submit"
              className="zf-news__btn"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Joining…" : "Subscribe →"}
            </button>
          </div>
          {message && (
            <p
              className={`zf-news__msg zf-news__msg--${
                status === "success" ? "ok" : "err"
              }`}
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
