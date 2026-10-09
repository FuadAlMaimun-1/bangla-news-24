
import Link from "next/link";
import { headers } from "next/headers";

interface NewsCategory {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLink = async () => {
  let nav: NewsCategory[] = [];

  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/categories",
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const data = await res.json();
      nav = Array.isArray(data?.data) ? data.data : [];
    }
  } catch (error) {
    console.error("Categories fetch error:", error);
  }

  const filterNav = nav.filter((item) => item.scrapable);

  // Current pathname, if supplied by middleware.
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";

  const linkClass = (active: boolean) =>
    `relative shrink-0 whitespace-nowrap px-3 py-3 text-sm font-semibold transition-colors duration-200 sm:px-4 ${
      active
        ? "text-red-700 after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-t-full after:bg-red-700 sm:after:inset-x-4"
        : "text-gray-600 hover:text-red-700"
    }`;

  return (
    <div className="-mx-3 overflow-x-auto overscroll-x-contain px-3 sm:mx-0 sm:px-0">
      <nav
        aria-label="প্রধান নেভিগেশন"
        className="flex min-w-max items-center gap-1"
      >
        <Link
          href="/"
          className={linkClass(pathname === "/")}
        >
          হোম
        </Link>

        {filterNav.map((item) => {
          const href = `/category/${item.slug}`;
          const active = pathname === href;

          return (
            <Link
              key={item.slug}
              href={href}
              className={linkClass(active)}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default NavLink;
