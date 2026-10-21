import { isAllowedVideoLink, resolveVideoEmbed } from "@/lib/video-embed";

/**
 * GET /api/video/embed?link=<prothomalo video url>
 *
 * Resolves the playable YouTube embed URL for a video card on demand, so the
 * homepage never has to download the multi-megabyte article pages. Responses
 * are cacheable by the browser and the CDN; results are also memoized in
 * memory on the server instance.
 */
export async function GET(request: Request) {
  const link = new URL(request.url).searchParams.get("link") ?? "";

  if (!isAllowedVideoLink(link)) {
    return Response.json(
      { embedUrl: null, error: "invalid_link" },
      { status: 400, headers: { "Cache-Control": "public, max-age=60" } },
    );
  }

  const embedUrl = await resolveVideoEmbed(link);

  return Response.json(
    { embedUrl },
    { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } },
  );
}
