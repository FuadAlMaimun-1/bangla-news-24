import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NEWS_API_BASE } from "@/lib/news-api";
import SectionHeading from "./SectionHeading";

interface News {
  id: string;
  title: string;
  category?: string | null;
  description?: string | null;
  imageUrl: string;
  lastPublished: string;
  link: string;
}

const toBanglaNumber = (number: number) =>
  number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

const MostRead = async () => {
  let news: News[] = [];

  try {
    // most-read is documented but its upstream is intermittently down (404);
    // fall back to the latest headlines so the sidebar is never empty.
    let res = await fetch(
      `${NEWS_API_BASE}/api/news/most-read`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      res = await fetch(
        `${NEWS_API_BASE}/api/news?limit=10`,
        { next: { revalidate: 300 } }
      );
    }

    if (res.ok) {
      const data = await res.json();
      news = Array.isArray(data?.data) ? data.data : [];
    }
  } catch (error) {
    console.error("Most read news fetch error:", error);
  }

  return (
    <section
      aria-label="সর্বাধিক পঠিত"
      className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-5"
    >
      <SectionHeading title="সর্বাধিক পঠিত" />

      {/* News List */}
      {news.length > 0 ? (
        <ol className="mt-1 divide-y divide-gray-100">
          {news.map((item, index) => (
            <li key={item.id}>
              <Link
                href={`/news/${item.id}`}
                className="group flex min-w-0 items-start gap-3 py-3 sm:gap-3.5 sm:py-3.5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-50 text-sm font-extrabold text-red-700 transition-colors group-hover:bg-red-700 group-hover:text-white sm:h-8 sm:w-8 sm:text-base">
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

                <span className="shrink-0 pt-1 text-gray-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-red-700">
                  <ChevronRight size={18} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="py-8 text-center text-sm text-gray-500">
          এই মুহূর্তে কোনো খবর পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default MostRead;
