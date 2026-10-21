import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resolveImageUrl, type NewsItem } from "@/lib/news-api";
import { formatTimeAgo } from "@/lib/format";
import SectionHeading from "./SectionHeading";

/**
 * Homepage hero: the lead story (large card) beside a "সর্বশেষ খবর" list.
 * Renders full width — the page grid places the sidebar further down.
 */
const MainNews = ({ news }: { news: NewsItem[] }) => {
  const firstNews = news?.[0];
  const otherNews = news?.slice(1, 6) ?? [];

  if (!firstNews) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
        এই মুহূর্তে কোনো খবর পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <section className="grid w-full grid-cols-1 items-start gap-5 min-w-0 lg:grid-cols-12 lg:gap-6">
      {/* Lead story */}
      <Link
        href={`/news/${firstNews.id}`}
        className="group block min-w-0 lg:col-span-7"
      >
        <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:shadow-xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
            <Image
              src={resolveImageUrl(firstNews.imageUrl)}
              alt={firstNews.imageAlt || firstNews.title}
              fill
              preload
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
            />

            <span className="absolute left-3 top-3 rounded-full bg-red-700 px-3 py-1.5 text-xs font-bold text-white shadow-md sm:left-4 sm:top-4">
              প্রধান খবর
            </span>

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <h1 className="line-clamp-3 text-xl font-bold leading-snug text-white sm:text-2xl xl:text-3xl">
                {firstNews.title}
              </h1>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            {firstNews.description && (
              <p className="line-clamp-2 break-words text-sm leading-6 text-gray-600 sm:text-[15px] sm:leading-6">
                {firstNews.description}
              </p>
            )}

            <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-gray-100 pt-3.5">
              <span className="text-xs text-gray-400 sm:text-sm">
                {formatTimeAgo(firstNews.lastPublished)}
              </span>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 sm:text-sm">
                বিস্তারিত পড়ুন
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </div>
        </article>
      </Link>

      {/* Latest list */}
      <div className="min-w-0 lg:col-span-5">
        <SectionHeading title="সর্বশেষ খবর" />

        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1">
          {otherNews.map((item, index) => (
            <Link
              key={item.id ?? `${item.title}-${index}`}
              href={`/news/${item.id}`}
              className="group flex min-w-0 gap-3 rounded-xl border border-transparent p-2 transition duration-200 hover:border-gray-100 hover:bg-gray-50 sm:gap-3.5"
            >
              <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-28">
                <Image
                  src={resolveImageUrl(item.imageUrl)}
                  alt={item.imageAlt || item.title}
                  width={300}
                  height={300}
                  sizes="(max-width: 639px) 96px, 112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h3 className="line-clamp-3 break-words text-sm font-bold leading-5 text-gray-900 transition-colors group-hover:text-red-700 sm:line-clamp-2 sm:text-[15px] sm:leading-6">
                  {item.title}
                </h3>

                <span className="mt-1.5 text-[11px] text-gray-400 sm:text-xs">
                  {formatTimeAgo(item.lastPublished)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainNews;
