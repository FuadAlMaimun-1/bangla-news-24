import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="text-center">
        {/* 404 */}
        <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-white">
          404
        </h1>

        {/* Accent */}
        <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />

        <h2 className="text-2xl md:text-4xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-gray-400">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or may have been
          moved to another location.
        </p>

        {/* Back Home */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}