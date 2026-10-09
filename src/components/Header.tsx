
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import UserInfo from "./UserInfo";

const Header = () => {
  const data = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      {/* Top Header */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-5 sm:py-4 lg:px-8">
        {/* Logo + Brand */}
        <Link
          href="/"
          aria-label="Bangla News 24 homepage"
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          <div className="relative h-10 w-10 shrink-0 sm:h-12 sm:w-12">
            <Image
              src="/logo.webp"
              alt="Bangla News 24 logo"
              fill
              priority
              sizes="48px"
              className="object-contain"
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-extrabold leading-tight tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
              Bangla News <span className="text-red-700">24</span>
            </h1>

            <p className="mt-1 hidden text-xs font-medium text-gray-500 sm:block sm:text-sm">
              {data}
            </p>
          </div>
        </Link>

        {/* User Account */}
        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>

      {/* Mobile Date */}
      <div className="border-t border-gray-100 px-3 py-2 sm:hidden">
        <p className="text-[11px] font-medium text-gray-500">
          {data}
        </p>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Main navigation"
        className="border-t border-gray-100 bg-gray-50/80"
      >
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8">
          <NavLink />
        </div>
      </nav>
    </header>
  );
};

export default Header;
