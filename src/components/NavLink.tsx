import Link from "next/link";
import { headers } from "next/headers";
import { NEWS_API_BASE } from "@/lib/news-api";
import { House } from "lucide-react";

const FALLBACK_TITLES: Record<string, string> = {
  economy: "অর্থনীতি",
  health: "সুস্থতা",
  environment: "পরিবেশ",
  cricket: "ক্রিকেট",
  district: "জেলা",
  fun: "রস+আলো",
};

const NAV_FIRST = ["cricket"];
const NAV_LAST = ["district", "fun"];

interface CategoryItem {
  slug: string;
  title: string;
}

const NavLink = async () => {
  let items: CategoryItem[] = [];

  try {
    const res = await fetch(`${NEWS_API_BASE}/api/categories`, {
      next: { revalidate: 3000 },
    });

    if (res.ok) {
      const data = await res.json();

      const categories: CategoryItem[] = Array.isArray(data?.data)
        ? data.data
        : [];

      const titles = new Map<string, string>(
        categories.map((item) => [item.slug, item.title]),
      );

      const aliases: string[] = Array.isArray(data?.aliases)
        ? data.aliases
        : [];

      const pinned = new Set<string>([
        ...NAV_FIRST,
        ...NAV_LAST,
      ]);

      const slugs = [
        ...NAV_FIRST,
        ...aliases.filter((slug) => !pinned.has(slug)),
        ...NAV_LAST,
      ];

      items = [...new Set(slugs)].map((slug) => ({
        slug,
        title: titles.get(slug) ?? FALLBACK_TITLES[slug] ?? slug,
      }));
    }
  } catch (error) {
    console.error("Categories fetch error:", error);
  }

  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";

  const linkClass = (active: boolean) =>
    `group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
      active
        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/25 ring-2 ring-red-600/20"
        : "text-slate-600 hover:bg-slate-100/80 hover:text-red-600 active:scale-95"
    }`;

  return (
    <div className="relative w-full border-y border-slate-200/60 bg-white/80 backdrop-blur-xl">
      {/* Inner Container to align perfectly with the main site grid/header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="প্রধান নেভিগেশন"
          className="flex w-full items-center gap-1.5 overflow-x-auto scroll-smooth py-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Home Link */}
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={linkClass(pathname === "/")}
          >
            <House
              size={16}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
            />
            <span>হোম</span>
          </Link>

          {/* Divider */}
          <span
            aria-hidden="true"
            className="mx-1 h-4 w-px shrink-0 bg-slate-200/80"
          />

          {/* Category Items */}
          {items.map((item) => {
            const href = `/category/${item.slug}`;
            const active =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={item.slug}
                href={href}
                aria-current={active ? "page" : undefined}
                className={linkClass(active)}
              >
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  {item.title}
                </span>

                {/* Active Dot Indicator */}
                {active && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default NavLink;