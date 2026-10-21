"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";

export interface PlayableVideo {
  title: string;
  /** YouTube embed URL; the modal only ever opens for items that have one. */
  embedUrl: string;
  /** Original Prothom Alo page, offered as a fallback/credit link. */
  link: string;
}

/** Adds autoplay to an embed URL without breaking an existing query string. */
const withAutoplay = (embedUrl: string): string => {
  const separator = embedUrl.includes("?") ? "&" : "?";
  return `${embedUrl}${separator}autoplay=1&rel=0`;
};

/**
 * Full-screen video player dialog. Closes on Escape, on a backdrop click
 * or via the close button; body scrolling is locked while it is open.
 */
const VideoPlayerModal = ({
  video,
  onClose,
}: {
  video: PlayableVideo;
  onClose: () => void;
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        // Only a click that starts on the backdrop closes the player.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={video.title}
        className="w-full max-w-4xl overflow-hidden rounded-xl bg-neutral-900 shadow-2xl ring-1 ring-white/10"
      >
        {/* Title bar */}
        <div className="flex items-start justify-between gap-3 px-4 py-3">
          <h2 className="line-clamp-2 min-w-0 text-sm font-semibold leading-6 text-white sm:text-base">
            {video.title}
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="ভিডিও বন্ধ করুন"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={withAutoplay(video.embedUrl)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <span className="text-xs text-neutral-400">সোর্স: প্রথম আলো</span>

          <a
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-red-700 px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            মূল পাতায় দেখুন
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
