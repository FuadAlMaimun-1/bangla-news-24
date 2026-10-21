import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import { NEWS_API_BASE, type NewsSection } from "@/lib/news-api";

export default async function Home() {
  let sections: NewsSection[] = [];

  try {
    const res = await fetch(`${NEWS_API_BASE}/api/news/sections`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      sections = Array.isArray(data?.data) ? data.data : [];
    }
  } catch (error) {
    console.error("News sections fetch error:", error);
  }

  // The richest section (most stories) becomes the main news block.
  const mainSection = sections.reduce<NewsSection | null>(
    (best, section) =>
      !best || section.stories.length > best.stories.length ? section : best,
    null,
  );

  const mainNews = mainSection?.stories.slice(0, 5) ?? [];

  // Remaining sections with enough stories for the 3-column grid.
  const otherNews = sections
    .filter((section) => section !== mainSection && section.stories.length >= 3)
    .slice(0, 6);

  return (
    <main className="mx-auto mt-4 w-full max-w-7xl px-3 sm:px-5 lg:px-8">
      {/* Responsive Main Layout */}
      <div className="grid grid-cols-1 items-start gap-5 md:gap-6 lg:grid-cols-12">

        {/* News Content */}
        <div className="min-w-0 lg:col-span-8">
          {/* Main News + Latest News */}
          <MainNews news={mainNews} />

          {/* Other News Sections */}
          {otherNews.length > 0 ? (
            <div className="mt-5 grid min-w-0 gap-6 sm:mt-6">
              {otherNews.map((section) => (
                <section
                  key={section.slug}
                  className="min-w-0"
                >
                  <h2 className="border-b-2 border-red-800 pb-2 text-lg font-bold text-gray-900 sm:text-xl">
                    {section.section}
                  </h2>

                  <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
                    {section.stories.slice(0, 6).map((news) => (
                      <NewsCard
                        key={news.id}
                        news={news}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            !mainNews.length && (
              <div className="mt-5 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 sm:mt-6">
                এই মুহূর্তে কোনো খবর পাওয়া যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।
              </div>
            )
          )}
        </div>

        {/* Most Read Sidebar */}
        <aside className="order-last min-w-0 w-full lg:sticky lg:top-4 lg:col-span-4 lg:order-none">
          <MostRead />
        </aside>

      </div>
    </main>
  );
}
