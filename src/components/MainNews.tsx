import Image from "next/image";
import Link from "next/link";

interface News {
  id?: number | string;
  title: string;
  categoryId?: string;
  description: string;
  imageUrl: string;
  lastPublished?: string | number;
  link: string;
}

const toBanglaNumber = (number?: number) =>
  (number ?? 0)
    .toString()
    .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

const getTimeAgo = (date?: string | number) => {
  if (!date) return "সময় পাওয়া যায়নি";

  const time = new Date(date).getTime();

  if (Number.isNaN(time)) return "সময় পাওয়া যায়নি";

  const seconds = Math.floor((Date.now() - time) / 1000);

  if (seconds < 60) return "এইমাত্র";

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

const MainNews = ({ news }: { news: News[] }) => {
  const firstNews = news?.[0];
  const otherNews = news?.slice(1, 5) ?? [];

  if (!firstNews) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
        এই মুহূর্তে কোনো খবর পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <section className="w-full min-w-0">
      <div className="grid grid-cols-1 items-start gap-5 md:gap-6 lg:grid-cols-5">
        {/* Main Featured News */}
        <Link
          href={`/news/${firstNews.id}`}
          className="group block min-w-0 lg:col-span-3"
        >
          <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg sm:rounded-2xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 sm:aspect-[16/9] lg:aspect-[4/3]">
              <Image
                src={firstNews.imageUrl}
                alt={firstNews.title}
                fill
                priority
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                <span className="rounded-full bg-red-700 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                  প্রধান খবর
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                <h1 className="line-clamp-3 text-lg font-bold leading-snug text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  {firstNews.title}
                </h1>
              </div>
            </div>

            <div className="p-3.5 sm:p-5">
              <p className="line-clamp-3 break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                {firstNews.description}
              </p>

              <div className="mt-3 border-t border-gray-100 pt-3">
                <span className="text-xs font-medium text-gray-400 sm:text-sm">
                  {getTimeAgo(firstNews.lastPublished)}
                </span>
              </div>
            </div>
          </article>
        </Link>

        {/* Latest News */}
        <div className="min-w-0 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2 border-b-2 border-red-700 pb-2 sm:mb-4">
            <div className="h-6 w-1 shrink-0 rounded-full bg-red-700" />
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              সর্বশেষ খবর
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {otherNews.map((item, index) => (
              <Link
                key={item.id ?? `${item.title}-${index}`}
                href={`/news/${item.id}`}
                className="group block min-w-0"
              >
                <article className="flex min-w-0 gap-3 overflow-hidden rounded-xl border border-gray-200 bg-white p-2.5 transition-all duration-300 hover:border-red-200 hover:shadow-md sm:gap-3.5">
                  <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-28 lg:w-24 xl:w-28">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 639px) 96px, 112px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <h3 className="line-clamp-3 break-words text-sm font-bold leading-5 text-gray-900 transition-colors group-hover:text-red-700 sm:line-clamp-2">
                      {item.title}
                    </h3>

                    <span className="mt-1.5 text-[11px] text-gray-400 sm:text-xs">
                      {getTimeAgo(item.lastPublished)}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainNews;

