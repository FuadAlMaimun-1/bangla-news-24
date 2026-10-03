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
    
<div className="mx-auto max-w-7xl px-4 py-5">
  <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
    {/* Main News */}
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg lg:col-span-3">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={firstNews.imageUrl}
          width={1000}
          height={600}
          alt={firstNews.title}
          className="h-[230px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[270px] md:h-[300px]"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Badge */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
            প্রধান খবর
          </span>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          <h2 className="line-clamp-2 text-xl font-bold leading-tight text-white md:text-2xl">
            {firstNews.title}
          </h2>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 md:p-5">
        <p className="line-clamp-2 text-sm leading-6 text-gray-600">
          {firstNews.description}
        </p>

        <div className="mt-3 border-t border-gray-100 pt-3">
          <span className="text-xs font-medium text-gray-400">
            {getTimeAgo(firstNews.lastPublished)}
          </span>
        </div>
      </div>
    </div>

    {/* Latest News */}
    <div className="space-y-3 lg:col-span-2">
      <div className="border-b border-gray-200 pb-2">
        <h2 className="text-xl font-bold text-gray-900">
          সর্বশেষ খবর
        </h2>
      </div>

      {otherNews.slice(0, 4).map((allNews) => (
        <div
          key={allNews.id}
          className="group flex gap-3 rounded-lg border border-gray-200 bg-white p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
        >
          {/* Image */}
          <div className="shrink-0 overflow-hidden rounded-md">
            <Image
              src={allNews.imageUrl}
              alt={allNews.title}
              width={120}
              height={80}
              className="h-[80px] w-[120px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <p className="mb-0.5 text-[11px] font-bold text-red-600">
              {allNews.category}
            </p>

            <h3 className="line-clamp-2 text-sm font-bold leading-5 text-gray-900 transition-colors duration-300 group-hover:text-red-700">
              {allNews.title}
            </h3>

            <span className="mt-1 text-[11px] font-medium text-gray-400">
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
