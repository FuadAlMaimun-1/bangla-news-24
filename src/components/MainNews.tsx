import Image from "next/image";

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

  const otherNews = news.slice(1);
  console.log(otherNews);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        <div className="lg:col-span-3 group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
          {/* Image Section */}
          <div className="relative overflow-hidden">
            <Image
              src={firstNews.imageUrl}
              height={600}
              width={1000}
              alt={firstNews.title}
              className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[360px]"
            />

            {/* Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Featured Badge */}
            <div className="absolute left-5 top-5">
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                প্রধান খবর
              </span>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
             

              <h2 className="max-w-3xl text-2xl font-bold leading-tight md:text-3xl">
                {firstNews.title}
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className="p-5 md:p-6">
            <p className="text-sm leading-7 text-gray-600 md:text-base">
              {firstNews.description}
            </p>

            {/* Bottom Line */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-xs font-medium text-gray-400">
                {getTimeAgo(firstNews.lastPublished)}
              </span>
            </div>
          </div>
        </div>

        {/* সর্বশেষ খবর */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h2 className="text-xl font-bold text-gray-900">সর্বশেষ খবর</h2>
          </div>

          {otherNews.slice(0, 4).map((allNews) => (
            <div
              key={allNews.id}
              className="group flex gap-4 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-lg"
            >
              <div className="shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={allNews.imageUrl}
                  alt={allNews.title}
                  width={140}
                  height={100}
                  className="h-[100px] w-[140px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-red-600">
                  {allNews.category}
                </p>

                <h3 className="line-clamp-3 text-sm md:text-base font-bold leading-6 text-gray-900 transition-colors duration-300 group-hover:text-red-700">
                  {allNews.title}
                </h3>
                
                 <span className="text-xs font-medium text-gray-400">
                {getTimeAgo(allNews.lastPublished)}
              </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainNews;
