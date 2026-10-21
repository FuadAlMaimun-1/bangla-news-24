import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-10 sm:px-5 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-12">
        {/* ৪০৪ */}
        <p className="text-7xl font-black leading-none tracking-tight text-gray-900 sm:text-8xl lg:text-9xl">
          ৪০৪
        </p>

        {/* Red Flourish — matches article page */}
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-red-700" />

        <h1 className="mt-5 text-xl font-bold text-gray-900 sm:text-2xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
          আপনি যে পেজটি খুঁজছেন তা নেই অথবা সরিয়ে ফেলা হয়েছে। চাইলে মূল পেজে
          ফিরে যান।
        </p>

        <div className="mt-6 flex items-center justify-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700">
            <Search size={22} aria-hidden="true" />
          </span>
        </div>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-800 sm:text-base"
          >
            <ArrowLeft size={17} />
            মূল পেজে ফিরে যান
          </Link>

          <Link
            href="/category/bangladesh"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition-colors duration-200 hover:border-red-200 hover:text-red-700 sm:text-base"
          >
            সর্বশেষ খবর দেখুন
          </Link>
        </div>
      </div>
    </main>
  );
}
