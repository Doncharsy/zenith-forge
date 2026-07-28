"use client";

import { useState } from "react";

/**
 * Renders an article image from a public/remote URL, hiding itself if the
 * file is missing so an unshipped diagram never shows as a broken image.
 * Drop the file into /public/blog and it appears.
 */
export default function ProseImage({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <figure className="zf-figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={caption || ""} loading="lazy" onError={() => setFailed(true)} />
      {caption && <figcaption className="zf-figure__caption">{caption}</figcaption>}
    </figure>
  );
}
