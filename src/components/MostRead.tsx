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

const toBanglaNumber = (number: number) =>
  number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

const MostRead = async () => {
  let news: News[] = [];

  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news/most-read",
      { next: { revalidate: 300 } }
    );

    if (res.ok) {
      const data = await res.json();
      news = Array.isArray(data?.data) ? data.data : [];
    }
  } catch (error) {
    console.error("Most read news fetch error:", error);
  }

  return (
    <aside className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-5">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2 border-b-2 border-red-700 pb-3 sm:mb-4 sm:gap-3">
        <div className="h-6 w-1 shrink-0 rounded-full bg-red-700 sm:h-7" />

        <h2 className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
          সর্বাধিক পঠিত
        </h2>
      </div>

      {/* News List */}
      {news.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {news.map((item, index) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="group flex min-w-0 items-start gap-3 py-3 sm:gap-4 sm:py-4"
            >
              <span className="w-7 shrink-0 pt-0.5 text-xl font-extrabold leading-7 text-red-700 sm:w-8 sm:text-2xl">
                {toBanglaNumber(index + 1)}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-3 break-words text-sm font-semibold leading-6 text-gray-800 transition-colors duration-200 group-hover:text-red-700 sm:text-[15px]">
                  {item.title}
                </h3>

                {item.category && (
                  <span className="mt-1.5 inline-block max-w-full truncate rounded-md bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-500 sm:text-xs">
                    {item.category}
                  </span>
                )}
              </div>

              <span className="shrink-0 pt-1 text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-gray-500">
          এই মুহূর্তে কোনো খবর পাওয়া যায়নি।
        </p>
      )}
    </aside>
  );
};

export default MostRead;

