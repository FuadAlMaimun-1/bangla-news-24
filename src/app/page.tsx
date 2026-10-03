import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import NewsCard from "@/components/NewsCard";

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles;
  const otherNews = [1, 3, 5, 6, 7, 8, 9,].map(
  (index) => sections[index]
);
  console.log(otherNews);
  console.log(sections);
  return (
    <div>
      <Marquee />

      <div className="grid grid-cols-3 gap-5 mt-4 max-w-7xl mx-auto">
        {/* news section */}
        <div className=" col-span-2">
          <MainNews news={mainNews} />

          <div className="grid gap-5 mt-5">
            
            {otherNews.map((on) => (
            <div key={on.curationId} >
              <h1 className="font-bold  border-b-2 border-red-800 pb-2">{on.title}</h1>
                
              <div className="grid grid-cols-3 gap-5 mt-4">
                {
                on.articles.map(news => <NewsCard key={news.id} news={news} />)
              }
              </div>
              </div>
          ))}
          </div>
        </div>

        {/* most read section */}
        <div className="bg-green-500 height-10 col-span-1"></div>
      </div>
    </div>
  );
}
