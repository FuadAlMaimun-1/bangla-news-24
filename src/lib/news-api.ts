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
  /** Story type from the API: "text", "photo", "video", "shorts", "live", ... */
  type?: string | null;
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

/** Slug of the API's video category (`/api/category/video`). */
export const VIDEO_CATEGORY_SLUG = "video";

/**
 * A video story from `/api/category/video`.
 *
 * `embedUrl` is *not* filled in by this fetch — the original article page is
 * multi-megabyte, so the playable URL is resolved on demand instead: the
 * card calls `GET /api/video/embed?link=...` when the reader presses play
 * (see `src/lib/video-embed.ts`).
 */
export interface VideoNewsItem extends NewsItem {
  embedUrl?: string | null;
}

/**
 * Latest `limit` videos from `/api/category/video` (thumbnails + links only).
 * Never throws: an upstream failure resolves to an empty list.
 */
export async function fetchVideoNews(limit = 6): Promise<VideoNewsItem[]> {
  try {
    const res = await fetch(`${NEWS_API_BASE}/api/category/${VIDEO_CATEGORY_SLUG}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Video list responded with ${res.status}`);
    }

    const data = await res.json();
    const items: VideoNewsItem[] = Array.isArray(data?.data) ? data.data : [];

    return items.filter((item) => item?.id && item?.link).slice(0, limit);
  } catch (error) {
    console.error("Video news fetch error:", error);
    return [];
  }
}
