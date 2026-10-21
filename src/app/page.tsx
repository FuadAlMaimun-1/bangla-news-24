import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import SectionHeading from "@/components/SectionHeading";
import VideoSection from "@/components/VideoSection";
import {
  fetchVideoNews,
  NEWS_API_BASE,
  type NewsSection,
  type VideoNewsItem,
} from "@/lib/news-api";

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

const fetchSections = async (): Promise<NewsSection[]> => {
  try {
    const res = await fetch(`${NEWS_API_BASE}/api/news/sections`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data?.data) ? data.data : [];
    }
  } catch (error) {
    console.error("News sections fetch error:", error);
  }

  return [];
};

export default async function Home() {
  // Headlines and the video band are independent — fetch them together.
  const [sections, videos]: [NewsSection[], VideoNewsItem[]] =
    await Promise.all([fetchSections(), fetchVideoNews(6)]);

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

  const mainNews = mainSection?.stories.slice(0, 6) ?? [];

  // Remaining sections for the grid: ordinary ones need ≥3 stories, while the
  // pinned sections (ক্রিকেট / জেলা / রস+আলো) are never dropped.
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
    <div className="mx-auto w-full max-w-7xl px-3 pb-12 pt-4 sm:px-5 sm:pt-6 sm:pb-16 lg:px-8">
      {/* Lead story + latest list */}
      <MainNews news={mainNews} />

      {/* Video news: thumbnails that open the inline player */}
      <VideoSection videos={videos} />

      {/* Section grids with the sticky "most read" rail */}
      <div className="mt-6 grid grid-cols-1 items-start gap-5 sm:mt-9 lg:grid-cols-12 lg:gap-6">
        <div className="min-w-0 lg:col-span-8">
          {otherNews.length > 0 ? (
            <div className="grid min-w-0 gap-6">
              {otherNews.map((section) => (
                <section key={section.slug} className="min-w-0">
                  <SectionHeading
                    title={section.section}
                    href={`/category/${section.slug}`}
                    linkLabel="সব খবর"
                  />

                  <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
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
              <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                এই মুহূর্তে কোনো খবর পাওয়া যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।
              </div>
            )
          )}
        </div>

        {/* Most Read Sidebar */}
        <aside
          aria-label="সর্বাধিক পঠিত খবর"
          className="order-last min-w-0 w-full lg:sticky lg:order-none lg:col-span-4 lg:top-36"
        >
          <MostRead />
        </aside>
      </div>
    </div>
  );
}
