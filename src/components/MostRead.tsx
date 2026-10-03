import React from "react";

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  const data = await res.json();
  const news = data.data;
  console.log(news);
  return (

<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
  {/* Header */}
  <div className="mb-5 flex items-center gap-3 border-b-2 border-red-700 pb-3">
    <div className="h-7 w-1 rounded-full bg-red-700"></div>

    <h1 className="text-2xl font-bold text-gray-900">
      সর্বাধিক পঠিত
    </h1>
  </div>

  <div>
    {news.map((item, index) => (
      <div
        key={item.id}
        className="group flex gap-4 border-b border-gray-100 py-4 last:border-0"
      >
       
        <span className="min-w-8 text-2xl font-bold text-red-700">
          {String(index + 1).padStart(2, "0")}
        </span>

      
        <div>
          <h2 className="text-sm font-semibold leading-6 text-gray-800 transition-colors duration-200 group-hover:text-red-700">
            {item.title}
          </h2>
        </div>
      </div>
    ))}
  </div>
</div>


  );
};

export default MostRead;
