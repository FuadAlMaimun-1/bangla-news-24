import MainNews from "./MainNews";
import MostRead from "./MostRead";

interface News {
  id?: number | string;
  title: string;
  categoryId?: string;
  description: string;
  imageUrl: string;
  lastPublished?: string | number;
  link: string;
}

export default function NewsSection({
  news,
}: {
  news: News[];
}) {
  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 lg:px-8">
      {/* Mobile: সবগুলো নিচে নিচে */}
      {/* Desktop: MainNews বামে, MostRead ডানে */}
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start">
        <div className="order-1 w-full min-w-0 lg:col-span-8">
          <MainNews news={news} />
        </div>

        <div className="order-2 w-full min-w-0 lg:col-span-4">
          <MostRead />
        </div>
      </div>
    </main>
  );
}

