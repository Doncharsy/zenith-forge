"use client";

import { useEffect, useState } from "react";

/** Share links + copy-link button for an article. Native share sheet on devices that support it. */
export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  // Deferred to an effect so server and first client render agree (navigator is undefined on the server).
  const [canNativeShare, setCanNativeShare] = useState(false);
  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "LINKEDIN",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "WHATSAPP",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — link stays selectable manually.
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // User cancelled or share unsupported — no-op.
    }
  }

  return (
    <div className="zf-share">
      <span className="zf-share__label">SHARE</span>
      {canNativeShare && (
        <button type="button" className="zf-share__btn" onClick={nativeShare}>
          SHARE →
        </button>
      )}
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="zf-share__btn"
        >
          {l.label}
        </a>
      ))}
      <button type="button" className="zf-share__btn" onClick={copyLink}>
        {copied ? "COPIED" : "COPY LINK"}
      </button>
    </div>
  );
}
