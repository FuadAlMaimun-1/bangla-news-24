// Server-side helper that finds the playable YouTube embed URL for a
// Prothom Alo video article.
//
// Why this exists: the article page is ~3.7 MB (so Next's data cache refuses
// to cache it), but its JSON-LD block — which carries
// "embedUrl": "https://www.youtube.com/embed/<id>" — starts around byte 5 KB.
// We therefore stream the response and cancel as soon as the player URL is
// found, which keeps a resolution down to a few kilobytes instead of megabytes.

/** Only these hosts may be passed in (SSRF guard for the API route). */
const ALLOWED_HOSTS = new Set(["prothomalo.com", "www.prothomalo.com"]);

// The Prothom Alo page publishes its player as JSON-LD VideoObject:
// {"@type":"VideoObject", ... "embedUrl":"https://www.youtube.com/embed/<id>"}
const EMBED_URL_PATTERN = /"embedUrl"\s*:\s*"(https?:\/\/[^"]+)"/;

const EMBEDDABLE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

/** Stop scanning after this much text — the JSON-LD lives in the <head>. */
const SCAN_LIMIT_CHARS = 128 * 1024;

const POSITIVE_TTL_MS = 6 * 60 * 60 * 1000; // found: reuse for 6 hours
const NEGATIVE_TTL_MS = 15 * 60 * 1000; // not found: retry after 15 minutes
const CACHE_MAX_ENTRIES = 300;

/** Per-instance memo — keeps repeated plays off the upstream entirely. */
const memo = new Map<string, { embedUrl: string | null; expires: number }>();

/** True when `link` is an https Prothom Alo video page (safe to fetch). */
export function isAllowedVideoLink(link: string): boolean {
  try {
    const url = new URL(link);

    return (
      url.protocol === "https:" &&
      ALLOWED_HOSTS.has(url.hostname.toLowerCase()) &&
      url.pathname.startsWith("/video/")
    );
  } catch {
    return false;
  }
}

/**
 * Returns the URL when `raw` is a YouTube embed player we may iframe,
 * otherwise null (unknown players are skipped so the UI can fall back to
 * opening the original article link).
 */
function toEmbeddableUrl(raw: string): string | null {
  try {
    const url = new URL(raw);

    if (!EMBEDDABLE_HOSTS.has(url.hostname.toLowerCase())) return null;
    if (!url.pathname.startsWith("/embed/")) return null;

    const videoId = url.pathname.slice("/embed/".length);
    if (!/^[A-Za-z0-9_-]{6,}$/.test(videoId)) return null;

    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

function remember(link: string, embedUrl: string | null): void {
  if (memo.size >= CACHE_MAX_ENTRIES) {
    const now = Date.now();
    for (const [key, entry] of memo) {
      if (entry.expires <= now) memo.delete(key);
    }
    // Still full: drop the oldest entries so the map stays bounded.
    if (memo.size >= CACHE_MAX_ENTRIES) {
      const oldest = memo.keys().next().value;
      if (oldest !== undefined) memo.delete(oldest);
    }
  }

  const ttl = embedUrl ? POSITIVE_TTL_MS : NEGATIVE_TTL_MS;
  memo.set(link, { embedUrl, expires: Date.now() + ttl });
}

/**
 * Streams the article page until its `embedUrl` shows up (typically the first
 * few KB), then cancels the request. Returns null — never throws — when the
 * page is unreachable, timed out, or has no embeddable player.
 */
async function scanForEmbedUrl(link: string): Promise<string | null> {
  const res = await fetch(link, { signal: AbortSignal.timeout(8000) });

  if (!res.ok || !res.body) return null;

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffered = "";

  try {
    while (buffered.length < SCAN_LIMIT_CHARS) {
      const { done, value } = await reader.read();
      if (done) break;

      buffered += decoder.decode(value, { stream: true });

      const match = buffered.match(EMBED_URL_PATTERN);
      if (match) return toEmbeddableUrl(match[1]);
    }

    return null;
  } finally {
    // Stop the multi-megabyte download the moment we have an answer.
    await reader.cancel().catch(() => undefined);
  }
}

/**
 * Resolves (and memoizes) the playable embed URL for one Prothom Alo video
 * page. Meant to be called from the `/api/video/embed` route handler.
 */
export async function resolveVideoEmbed(link: string): Promise<string | null> {
  if (!isAllowedVideoLink(link)) return null;

  const cached = memo.get(link);
  if (cached && cached.expires > Date.now()) return cached.embedUrl;

  let embedUrl: string | null = null;

  try {
    embedUrl = await scanForEmbedUrl(link);
  } catch (error) {
    console.error("Video embed resolve error:", link, error);
  }

  remember(link, embedUrl);
  return embedUrl;
}
