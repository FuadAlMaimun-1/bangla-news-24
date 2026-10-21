import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resolveImageUrl, type NewsItem } from "@/lib/news-api";
import { formatTimeAgo } from "@/lib/format";

/** Story card used by the homepage grids and the category pages. */
const NewsCard = ({ news }: { news: NewsItem }) => {
  return (
    <Link href={`/news/${news.id}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-red-200 group-hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
          <Image
            src={resolveImageUrl(news.imageUrl)}
            alt={news.imageAlt || news.title}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient for depth */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          {/* Category Badge */}
          {news.category && (
            <span className="absolute left-3 top-3 rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white shadow-md">
              {news.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h2 className="line-clamp-2 text-base font-bold leading-7 text-gray-900 transition-colors duration-300 group-hover:text-red-700 sm:text-lg">
            {news.title}
          </h2>

          {news.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
              {news.description}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
            <span className="text-xs text-gray-400">
              {formatTimeAgo(news.lastPublished)}
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700">
              বিস্তারিত পড়ুন
              <ArrowRight
                size={13}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
