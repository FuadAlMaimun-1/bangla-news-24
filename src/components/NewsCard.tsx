import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl, type NewsItem } from "@/lib/news-api";

const toBanglaNumber = (number: number) =>
  number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[+digit]);

const getTimeAgo = (date: string) => {
  if (!date) return "সময় পাওয়া যায়নি";

  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (Number.isNaN(seconds) || seconds < 0) return "সময় পাওয়া যায়নি";

  if (seconds < 60) {
    return `${toBanglaNumber(seconds)} সেকেন্ড আগে`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${toBanglaNumber(minutes)} মিনিট আগে`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${toBanglaNumber(hours)} ঘণ্টা আগে`;
  }

  const days = Math.floor(hours / 24);

  return `${toBanglaNumber(days)} দিন আগে`;
};

const NewsCard = ({ news }: { news: NewsItem }) => {
  return (
    <Link href={`/news/${news.id}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-red-200 group-hover:shadow-lg">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
            {news.description}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-xs text-gray-400">
              {getTimeAgo(news.lastPublished)}
            </span>

            <span className="flex items-center gap-1 text-xs font-semibold text-red-700">
              বিস্তারিত পড়ুন
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
