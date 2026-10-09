import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface News {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  lastPublished: string;
  link: string;
}

export default async function Home() {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await res.json();
  const sections = data.data;

  const mainNews: News[] = sections?.[0]?.articles ?? [];

  const otherNews = [1, 3, 5, 6, 7, 8, 9]
    .map((index) => sections?.[index])
    .filter(Boolean);

  return (
    <main className="mx-auto mt-4 w-full max-w-7xl px-3 sm:px-5 lg:px-8">
      {/* Responsive Main Layout */}
      <div className="grid grid-cols-1 items-start gap-5 md:gap-6 lg:grid-cols-12">

        {/* News Content */}
        <div className="min-w-0 lg:col-span-8">
          {/* Main News + Latest News */}
          <MainNews news={mainNews} />

          {/* Other News Sections */}
          <div className="mt-5 grid min-w-0 gap-6 sm:mt-6">
            {otherNews.map((section) => (
              <section
                key={section.curationId}
                className="min-w-0"
              >
                <h2 className="border-b-2 border-red-800 pb-2 text-lg font-bold text-gray-900 sm:text-xl">
                  {section.title}
                </h2>

                <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
                  {section.articles?.map((news: News) => (
                    <NewsCard
                      key={news.id}
                      news={news}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Most Read Sidebar */}
        <aside className="order-last min-w-0 w-full lg:sticky lg:top-4 lg:col-span-4 lg:order-none">
          <MostRead />
        </aside>

      </div>
    </main>
  );
}
