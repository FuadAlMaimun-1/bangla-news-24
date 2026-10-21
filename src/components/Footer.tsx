import Link from "next/link";

// Quick links point at the API's category routes (all verified to resolve).
const QUICK_LINKS: { href: string; label: string }[] = [
  { href: "/category/bangladesh", label: "বাংলাদেশ" },
  { href: "/category/politics", label: "রাজনীতি" },
  { href: "/category/world", label: "বিশ্ব" },
  { href: "/category/sports", label: "খেলা" },
  { href: "/category/entertainment", label: "বিনোদন" },
  { href: "/category/technology", label: "প্রযুক্তি" },
  { href: "/category/opinion", label: "মতামত" },
  { href: "/category/video", label: "ভিডিও" },
];

const SOCIAL_LINKS: { href: string; label: string }[] = [
  { href: "https://www.facebook.com/DailyProthomAlo", label: "ফেসবুক" },
  { href: "https://www.youtube.com/c/ProthomAlo", label: "ইউটিউব" },
  { href: "https://x.com/ProthomAlo", label: "এক্স" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-900 text-gray-300">
      {/* Red accent stripe */}
      <div className="h-1 w-full bg-red-700" />

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-3 py-8 sm:px-5 md:grid-cols-3 lg:px-8 lg:py-10">
        {/* Brand */}
        <div className="min-w-0">
          <p className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            বাংলা নিউজ <span className="text-red-500">২৪</span>
          </p>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            সর্বশেষ খবর, ভিডিও ও বিভিন্ন বিভাগের সংবাদ — এক জায়গায়,
            মোবাইল ও ডেস্কটপ—দুটোতেই সহজে পড়ুন।
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-gray-300 transition-colors hover:border-red-600 hover:bg-red-700 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="ফুটার লিংক" className="min-w-0">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            দ্রুত লিংক
          </h2>

          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {QUICK_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-0.5 text-gray-400 transition-colors hover:text-red-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Source credit */}
        <div className="min-w-0">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            খবরের সোর্স
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            এই সাইটের সমস্ত খবর ও ছবি{" "}
            <a
              href="https://www.prothomalo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red-400 underline-offset-2 hover:underline"
            >
              প্রথম আলো
            </a>{" "}
            থেকে সংগৃহীত; প্রতিটি খবরের মূল পাতায় ফিরে যাওয়া যায়।
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <p className="mx-auto w-full max-w-7xl px-3 text-center text-xs text-gray-500 sm:px-5 lg:px-8">
          © {new Date().getFullYear()} বাংলা নিউজ ২৪। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
}
