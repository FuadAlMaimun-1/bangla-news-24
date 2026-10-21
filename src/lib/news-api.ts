// Central place for the external news API base URL and shared response types.
// API docs: https://prothomalo-news-api.vercel.app/
export const NEWS_API_BASE = "https://prothomalo-news-api.vercel.app";

// Local PNG shown whenever the API has no usable image (see resolveImageUrl).
// Must stay a raster file — next/image rejects SVGs from the optimizer.
export const IMAGE_PLACEHOLDER = "/image-placeholder.png";

/**
 * Normalizes an API image value into a string that is always safe to pass to
 * next/image's `src`. The API's `imageUrl` is typed `string` but in practice
 * arrives as null (verified across sections, listings, and article details).
 *
 * Returns the value when it is a usable URL/path (trimmed), otherwise the
 * local placeholder — for null, undefined, empty/whitespace-only strings,
 * numbers, objects, or any other unexpected shape.
 */
export function resolveImageUrl(value: unknown): string {
  if (typeof value !== "string") {
    return IMAGE_PLACEHOLDER;
  }

  const src = value.trim();

  // Root-relative local asset, or an absolute http(s) URL. Protocol-relative
  // ("//host/...") and other schemes are rejected — next/image won't serve them.
  if (src.startsWith("/") && !src.startsWith("//")) {
    return src;
  }

  if (/^https?:\/\//i.test(src)) {
    return src;
  }

  return IMAGE_PLACEHOLDER;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  link: string;
  /** API docs say string; arrives as null for image-less stories — run through resolveImageUrl(). */
  imageUrl: string | null;
  imageAlt?: string | null;
  category?: string | null;
  categorySlug?: string | null;
  author?: string | null;
  firstPublished: string;
  lastPublished: string;
  source?: string | null;
}

export interface NewsSection {
  section: string;
  slug: string;
  count: number;
  stories: NewsItem[];
}

export interface Category {
  id: number;
  slug: string;
  title: string;
  parentId: string | null;
}
