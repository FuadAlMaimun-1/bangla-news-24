
import Image from "next/image";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  category?: string;
  imageUrl: string;
  lastPublished: string;
  firstPublished: string;
  link: string;
  source: string;
  sourceUrl: string;
  text: string;
  tags: string[];
  wordCount: number;
}

const toBanglaNumber = (number: number) =>
  number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[+digit]);

const getTimeAgo = (date: string) => {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

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

  const years = Math.floor(months / 12);

  return `${toBanglaNumber(years)} বছর আগে`;
};

const DetailsPage = async ({
  params,
}: {
  params: { newsId: string };
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await res.json();

  const news: News = data.data;

  const publishedDate = new Date(news.lastPublished);

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          <span className="text-lg">←</span>
          মূল পেজে ফিরে যান
        </Link>

        {/* Article */}
        <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

          {/* Image */}
          <div className="relative h-[250px] w-full sm:h-[400px] lg:h-[500px]">
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8 lg:p-10">

            {/* Meta Information */}
            <div className="mb-6 flex flex-wrap items-center gap-3">

              {/* Category */}
              {news.category && (
                <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
                  {news.category}
                </span>
              )}

              {/* Source */}
              <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
                {news.source}
              </span>

              <span className="text-gray-300">•</span>

                 <span className="text-gray-500">
                📖 {toBanglaNumber(news.wordCount)} শব্দ
              </span>
              <span className="text-gray-300">•</span>
              {/* Date */}
              <span className="text-sm text-gray-500">
                {publishedDate.toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <span className="text-gray-300">•</span>

              {/* Time Ago */}
              <span className="text-sm text-gray-500">
                {getTimeAgo(news.lastPublished)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {news.title}
            </h1>

            {/* Article Info */}
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-500">


           
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-gray-200" />

            {/* Article Text */}
            <div className="max-w-none">
              <p className="whitespace-pre-line text-lg leading-9 text-gray-700 sm:text-xl">
                {news.text}
              </p>
            </div>

            {/* Tags */}
            {news.tags && news.tags.length > 0 && (
              <div className="mt-10">

                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Tags
                </h2>

                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-blue-100 hover:text-blue-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>
            )}

            {/* Bottom Section */}
            <div className="mt-10 flex flex-col gap-5 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">

            </div>

          </div>
        </article>

      </div>
    </main>
  );
};

export default DetailsPage;
