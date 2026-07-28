import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { projectId, dataset, sanityConfigured } from "./client";

const builder = sanityConfigured
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource | undefined | null) {
  if (!builder || !source) return null;
  return builder.image(source).auto("format");
}

/**
 * Resolve a featured image to a URL. Built-in fallback articles store a plain
 * local path (e.g. "/blog/foo.png"); Sanity stores an image object. This
 * handles both so pages do not need to branch.
 */
export function resolveImage(
  source: unknown,
  width: number,
  height: number
): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;
  return urlFor(source as SanityImageSource)?.width(width).height(height).url() ?? null;
}
