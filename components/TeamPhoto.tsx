"use client";

import { useState } from "react";

/**
 * Renders a team photo, falling back to the placeholder caption if the file
 * is missing (so unshipped headshots degrade gracefully instead of showing a
 * broken image). Drop files into /public/team and the photos appear.
 */
export default function TeamPhoto({
  src,
  alt,
  placeholder,
}: {
  src: string;
  alt: string;
  placeholder: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <>{placeholder}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onError={() => setFailed(true)} />
  );
}
