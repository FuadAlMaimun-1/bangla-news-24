import Link from "next/link";

interface NewsCategory {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLink = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories");
  const data = await res.json();
  const nav: NewsCategory[] = data.data;
  const filterNav = nav.filter((n) => n.scrapable);

  return (
    <div className="flex gap-7 ">
      <Link href="/">হোম</Link>

      {filterNav.map((n, i) => (
        <Link key={i} href={`/category/${n.slug}`}>
          {n.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLink;
