
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock3,
  ExternalLink,
  Tag,
} from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import { NEWS_API_BASE, resolveImageUrl } from "@/lib/news-api";

interface News {
  id: string;
  title: string;
  category?: string;
  imageUrl: string | null;
  imageAlt?: string | null;
  lastPublished: string;
  firstPublished: string;
  link: string;
  source: string;
  text: string;
  tags: string[];
  wordCount: number;
}

const toBanglaNumber = (number: number) =>
  number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[+digit]);

const getTimeAgo = (date: string) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) {
    return "এইমাত্র";
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

  if (days < 30) {
    return `${toBanglaNumber(days)} দিন আগে`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${toBanglaNumber(months)} মাস আগে`;
  }

  return `${toBanglaNumber(Math.floor(months / 12))} বছর আগে`;
};

const DetailsPage = async ({
  params,
}: {
  params: { newsId: string };
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `${NEWS_API_BASE}/api/article/${newsId}`,
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  const news: News = data.data;
  if (!news) {
    notFound();
  }

  const publishedDate = new Date(news.lastPublished);

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-colors duration-200 hover:border-red-200 hover:text-red-700"
        >
          <ArrowLeft size={16} />
          মূল পেজে ফিরে যান
        </Link>

        {/* Article */}
        <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">

          {/* Image */}
          <div className="relative h-[250px] w-full bg-gray-100 sm:h-[400px] lg:h-[500px]">
            <Image
              src={resolveImageUrl(news.imageUrl)}
              alt={news.imageAlt || news.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            {/* Category Badge */}
            {news.category && (
              <span className="absolute left-4 top-4 rounded-full bg-red-700 px-4 py-1.5 text-sm font-bold text-white shadow-md sm:left-6 sm:top-6">
                {news.category}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8 lg:p-10">

            {/* Title */}
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl xl:text-5xl">
              {news.title}
            </h1>

            {/* Red Flourish */}
            <div className="mt-4 h-1 w-20 rounded-full bg-red-700" />

            {/* Meta Information */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={16} className="text-red-700" />
                {publishedDate.toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <span className="text-gray-300">•</span>

              <span className="flex items-center gap-1.5">
                <Clock3 size={16} className="text-red-700" />
                {getTimeAgo(news.lastPublished)}
              </span>

              {news.wordCount > 0 && (
                <>
                  <span className="text-gray-300">•</span>

                  <span className="flex items-center gap-1.5">
                    <BookOpen size={16} className="text-red-700" />
                    {toBanglaNumber(news.wordCount)} শব্দ
                  </span>
                </>
              )}

              {news.source && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  সোর্স: {news.source}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-gray-200" />

            {/* Article Text */}
            <div className="max-w-none">
              <p className="whitespace-pre-line text-lg leading-9 text-gray-700 sm:leading-10">
                {news.text}
              </p>
            </div>

            {/* Tags */}
            {news.tags && news.tags.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  <Tag size={15} className="text-red-700" />
                  ট্যাগ
                </h2>

                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="cursor-pointer rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-600 transition-all duration-200 hover:border-red-700 hover:bg-red-700 hover:text-white"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Section */}
            <div className="mt-10 flex flex-col gap-5 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">
                  শেয়ার করুন
                </span>
                <ShareButtons title={news.title} />
              </div>

              {/* Original Source */}
              {news.link && (
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-red-700"
                >
                  মূল সোর্সে পড়ুন
                  <ExternalLink size={15} />
                </a>
              )}
            </div>

          </div>
        </article>
      </div>
    </div>
  );
};

export default DetailsPage;
