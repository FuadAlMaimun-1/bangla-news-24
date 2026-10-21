import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import { NEWS_API_BASE, type NewsSection } from "@/lib/news-api";

// Homepage section order (the menu in NavLink mirrors it): ক্রিকেট first;
// জেলা then রস+আলো pinned to the very bottom; every other section keeps the
// relative order the API returns them in.
const FIRST_SECTIONS = ["cricket"];
const LAST_SECTIONS = ["district", "fun"]; // জেলা, রস+আলো

const sectionRank = (slug: string): number => {
  const firstIndex = FIRST_SECTIONS.indexOf(slug);
  if (firstIndex !== -1) return -1000 + firstIndex; // pinned to the top
  const lastIndex = LAST_SECTIONS.indexOf(slug);
  if (lastIndex !== -1) return 1000 + lastIndex; // pinned to the bottom, in list order
  return 0; // ordinary sections keep their API order (stable sort)
};

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

  // Apply the pinned order above (ক্রিকেট → others → জেলা → রস+আলো).
  const orderedSections = [...sections].sort(
    (a, b) => sectionRank(a.slug) - sectionRank(b.slug),
  );

  // The richest ordinary section becomes the main news block. Pinned sections
  // never win it, so the pinned order stays deterministic on any day's data.
  const mainSection = orderedSections
    .filter((section) => sectionRank(section.slug) === 0)
    .reduce<NewsSection | null>(
      (best, section) =>
        !best || section.stories.length > best.stories.length ? section : best,
      null,
    );

  const mainNews = mainSection?.stories.slice(0, 5) ?? [];

  // Remaining sections for the 3-column grid: ordinary ones need ≥3 stories,
  // while the pinned sections (ক্রিকেট / জেলা / রস+আলো) are never dropped.
  const candidates = orderedSections.filter(
    (section) =>
      section !== mainSection &&
      (section.stories.length >= 3 || sectionRank(section.slug) !== 0),
  );

  // The bottom pins reserve their slots up front so the 6-section cap can
  // never cut জেলা or রস+আলো off the page.
  const bottomPinned = candidates.filter((section) =>
    LAST_SECTIONS.includes(section.slug),
  );
  const middle = candidates.filter(
    (section) => !LAST_SECTIONS.includes(section.slug),
  );

  const otherNews = [
    ...middle.slice(0, Math.max(0, 6 - bottomPinned.length)),
    ...bottomPinned,
  ];

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
