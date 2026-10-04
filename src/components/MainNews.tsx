import Image from "next/image";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  lastPublished: string;
  link: string;
}

const getTimeAgo = (date: string) => {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

  const toBanglaNumber = (number: number) =>
    number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[+digit]);

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

const MainNews = ({ news }: { news: News[] }) => {
  const firstNews = news[0];
  const otherNews = news.slice(1, 5);

  return (
    <section className="mx-auto max-w-7xl px-4 py-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">

        <Link
          href={`/news/${firstNews.id}`}
          className="group lg:col-span-3"
        >
          <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Image */}
            <div className="relative overflow-hidden">
              <Image
                src={firstNews.imageUrl}
                width={1000}
                height={600}
                alt={firstNews.title}
                className="h-[230px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[280px] md:h-[320px]"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badge */}
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-red-700 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                  প্রধান খবর
                </span>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h1 className="line-clamp-2 text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl">
                  {firstNews.title}
                </h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5">
              <p className="line-clamp-2 text-sm leading-6 text-gray-600">
                {firstNews.description}
              </p>

              <div className="mt-4 border-t border-gray-100 pt-3">
                <span className="text-xs font-medium text-gray-400">
                  {getTimeAgo(firstNews.lastPublished)}
                </span>
              </div>
            </div>
          </article>
        </Link>

        <div className="lg:col-span-2">

          {/* Heading */}
          <div className="mb-3 flex items-center gap-2 border-b-2 border-red-700 pb-2">
            <div className="h-6 w-1 rounded-full bg-red-700" />

            <h2 className="text-xl font-bold text-gray-900">
              সর্বশেষ খবর
            </h2>
          </div>

          {/* News List */}
          <div className="space-y-3">
            {otherNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="group block"
              >
                <article className="flex gap-3 overflow-hidden rounded-xl border border-gray-200 bg-white p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md">

                  {/* Image */}
                  <div className="shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={130}
                      height={85}
                      className="h-[85px] w-[120px] object-cover transition-transform duration-500 group-hover:scale-105 sm:w-[130px]"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex min-w-0 flex-1 flex-col justify-center">

                    {/* Category */}
                    <p className="mb-1 text-[11px] font-bold text-red-600">
                      {item.category}
                    </p>

                    {/* Title */}
                    <h3 className="line-clamp-2 text-sm font-bold leading-5 text-gray-900 transition-colors duration-300 group-hover:text-red-700">
                      {item.title}
                    </h3>

                    {/* Time */}
                    <span className="mt-1 text-[11px] text-gray-400">
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