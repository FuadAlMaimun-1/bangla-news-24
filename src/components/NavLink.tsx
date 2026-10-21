import Link from "next/link";
import { headers } from "next/headers";
import { NEWS_API_BASE } from "@/lib/news-api";

// Aliases are the site's curated main sections. A few of them don't appear in
// /api/categories data, so their Bangla titles are listed here as fallback.
const FALLBACK_TITLES: Record<string, string> = {
  economy: "অর্থনীতি",
  health: "সুস্থতা",
  environment: "পরিবেশ",
  // Pinned into the menu below. fun exists in /api/categories data ("রস+আলো"),
  // cricket and district don't, so their fallback titles actually get used.
  cricket: "ক্রিকেট",
  district: "জেলা",
  fun: "রস+আলো",
};

// Menu order mirrors the homepage section order: ক্রিকেট first; জেলা then
// রস+আলো at the end; the curated aliases keep their relative order between.
const NAV_FIRST = ["cricket"];
const NAV_LAST = ["district", "fun"];

const NavLink = async () => {
  let items: { slug: string; title: string }[] = [];

  try {
    const res = await fetch(`${NEWS_API_BASE}/api/categories`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();

      const titles = new Map<string, string>(
        (Array.isArray(data?.data) ? data.data : []).map(
          (item: { slug: string; title: string }) => [item.slug, item.title],
        ),
      );

      const aliases: string[] = Array.isArray(data?.aliases)
        ? data.aliases
        : [];

      // Pinned slugs first/last (see NAV_FIRST / NAV_LAST above); duplicates
      // are dropped so an alias can never appear twice.
      const pinned = new Set<string>([...NAV_FIRST, ...NAV_LAST]);

      items = [...NAV_FIRST, ...aliases.filter((slug) => !pinned.has(slug)), ...NAV_LAST].map(
        (slug) => ({
          slug,
          title: titles.get(slug) ?? FALLBACK_TITLES[slug] ?? slug,
        }),
      );
    }
  } catch (error) {
    console.error("Categories fetch error:", error);
  }

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
        <Link href="/" className={linkClass(pathname === "/")}>
          হোম
        </Link>

        {items.map((item) => {
          const href = `/category/${item.slug}`;
          const active = pathname === href;

          return (
            <Link key={item.slug} href={href} className={linkClass(active)}>
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default NavLink;
