
import Image from "next/image";
import Link from "next/link";

const getTimeAgo = (date: string) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

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

interface News {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  lastPublished: string;
  link: string;
}

const NewsCard = ({ news }: { news: News }) => {
  return (
    <Link href={`/news/${news.id}`}>
      <div className="border border-gray-300">
      <div>
        {/* Image */}
        <div className="relative overflow-hidden">
          <Image
            src={news.imageUrl}
            alt={news.title}
            width={500}
            height={300}
          />
        </div>

        <div className="p-5">
          <p className="mb-2 text-sm font-semibold text-red-700">
            {news.category}
          </p>
          <h2 className="line-clamp-2 text-lg font-bold leading-7 text-gray-900 transition-colors duration-300 group-hover:text-red-600">
            {news.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
            {news.description}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-xs text-gray-400">
              {" "}
              {getTimeAgo(news.lastPublished)}
            </span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default NewsCard;
