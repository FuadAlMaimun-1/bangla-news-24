"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, Play } from "lucide-react";
import { toast } from "react-hot-toast";
import { resolveImageUrl, type VideoNewsItem } from "@/lib/news-api";
import { formatTimeAgo } from "@/lib/format";
import VideoPlayerModal from "./VideoPlayerModal";

/**
 * Homepage video block: a "ভিডিও" tab whose panel holds the video news.
 * Clicking the tab reveals (or hides) the video grid — it starts open so the
 * content is never hidden from readers who don't click. Pressing play asks
 * `/api/video/embed` for the article's player URL (the article pages are
 * multi-megabyte, so they're never fetched at render time); if nothing
 * embeddable comes back, the original Prothom Alo page opens instead.
 */
const VideoSection = ({ videos }: { videos: VideoNewsItem[] }) => {
  const [videosOpen, setVideosOpen] = useState(true);
  const [activeVideo, setActiveVideo] = useState<VideoNewsItem | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (videos.length === 0) return null;

  const handlePlay = async (video: VideoNewsItem) => {
    if (loadingId === video.id) return;

    setLoadingId(video.id);

    try {
      const res = await fetch(
        `/api/video/embed?link=${encodeURIComponent(video.link)}`,
      );

      if (!res.ok) throw new Error(`Embed route responded with ${res.status}`);

      const data: { embedUrl?: string | null } = await res.json();

      if (!data.embedUrl) throw new Error("No embeddable player");

      setActiveVideo({ ...video, embedUrl: data.embedUrl });
    } catch {
      toast.error("প্লেয়ার চালু করা গেল না — মূল পাতায় খুলছি");
      window.open(video.link, "_blank", "noopener,noreferrer");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section aria-label="ভিডিও সংবাদ" className="mt-6 min-w-0 sm:mt-9">
      {/* Tab bar */}
      <div className="flex items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="ভিডিও সংবাদ ট্যাব"
          className="flex min-w-0 flex-1 items-center gap-1 border-b border-gray-200"
        >
          <button
            type="button"
            role="tab"
            id="video-news-tab"
            aria-selected={videosOpen}
            aria-controls="video-news-panel"
            onClick={() => setVideosOpen((open) => !open)}
            className={`-mb-px inline-flex items-center gap-2 border-b-[3px] px-3 py-2.5 text-sm font-extrabold transition-colors sm:text-base ${
              videosOpen
                ? "border-red-700 text-gray-900"
                : "border-transparent text-gray-500 hover:text-red-700"
            }`}
          >
            <Play
              size={15}
              fill="currentColor"
              aria-hidden="true"
              className="text-red-700"
            />
            ভিডিও
            <ChevronDown
              size={15}
              aria-hidden="true"
              className={`transition-transform duration-200 ${
                videosOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <Link
          href="/category/video"
          className="group/link inline-flex shrink-0 items-center text-xs font-bold text-red-700 transition-colors hover:text-red-800 sm:text-sm"
        >
          সব ভিডিও
          <ChevronRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/link:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Tab panel: the video news */}
      {videosOpen && (
        <div
          id="video-news-panel"
          role="tabpanel"
          aria-labelledby="video-news-tab"
          className="min-w-0"
        >
          <div className="no-scrollbar -mx-3 mt-3.5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-3 sm:mx-0 sm:mt-5 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => {
              const isLoading = loadingId === video.id;

              return (
                <div
                  key={video.id}
                  className="w-[78%] shrink-0 snap-start sm:w-auto"
                >
                  <button
                    type="button"
                    onClick={() => handlePlay(video)}
                    disabled={isLoading}
                    aria-busy={isLoading}
                    aria-label={`ভিডিও দেখুন: ${video.title}`}
                    className="group/v block w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-wait disabled:translate-y-0 disabled:shadow-sm"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                      <Image
                        src={resolveImageUrl(video.imageUrl)}
                        alt={video.imageAlt || video.title}
                        fill
                        sizes="(max-width: 639px) 78vw, (max-width: 1023px) 50vw, 24vw"
                        className="object-cover transition-transform duration-500 group-hover/v:scale-105"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                      />

                      {/* Type chip */}
                      <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-red-700 px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
                        <Play
                          size={11}
                          fill="currentColor"
                          aria-hidden="true"
                        />
                        ভিডিও
                      </span>

                      {/* Play button */}

                      {/* Always visible Play button */}
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-700 text-white shadow-xl ring-4 ring-white/30 transition duration-300 group-hover/v:scale-110 group-hover/v:bg-red-600"
                      >
                        {isLoading ? (
                          <span className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          <Play
                            size={24}
                            fill="currentColor"
                            className="ml-0.5"
                          />
                        )}
                      </span>
                    </div>

                    {/* Caption */}
                    <div className="p-3 sm:p-4">
                      <h3 className="line-clamp-2 text-sm font-bold leading-6 text-gray-900 transition-colors group-hover/v:text-red-700 sm:text-[15px]">
                        {video.title}
                      </h3>

                      <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-gray-400 sm:text-xs">
                        {formatTimeAgo(video.lastPublished)}
                        {video.author && (
                          <>
                            <span aria-hidden="true">•</span>
                            <span className="truncate">{video.author}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeVideo?.embedUrl && (
        <VideoPlayerModal
          video={{
            title: activeVideo.title,
            embedUrl: activeVideo.embedUrl,
            link: activeVideo.link,
          }}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
};

export default VideoSection;
