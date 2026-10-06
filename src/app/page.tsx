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
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await res.json();
  const sections = data.data;
  const mainNews: News[] = sections[0].articles;
  const otherNews = [1, 3, 5, 6, 7, 8, 9].map((index) => sections[index]);
  console.log(otherNews);
  console.log(sections);
  return (
    <div>
      <div className="grid grid-cols-3 gap-5 mt-4 max-w-7xl mx-auto">
        {/* news section */}
        <div className=" col-span-2">
          <MainNews news={mainNews} />

          <div className="grid gap-5 mt-5">
            {otherNews.map((on) => (
              <div key={on.curationId}>
                <h1 className="font-bold  border-b-2 border-red-800 pb-2">
                  {on.title}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                  {on.articles.map((news: News) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* most read section */}
        <div className="col-span-1">
          <MostRead />
        </div>
      </div>
    </div>
  );
}
