"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const UserInfo = () => {
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const user = session?.user;

  const handleSignOut = async () => {
    try {
      setSigningOut(true);

      await signOut();

      setMenuOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে");
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div
        className="h-10 w-20 animate-pulse rounded-xl bg-gray-100 sm:w-28"
        aria-label="Loading account"
      />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/sign-in"
          className="rounded-lg px-2.5 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-red-700 sm:px-4 sm:text-sm"
        >
          সাইন ইন
        </Link>

        <Link
          href="/sign-up"
          className="rounded-lg bg-red-700 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-red-800 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const userName = user.name || "ব্যবহারকারী";
  const userImage = user.image;

  const initials = userName
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        aria-label="Open profile menu"
        className="flex max-w-[190px] items-center gap-2 rounded-xl border border-gray-200 bg-white p-1.5 transition hover:border-gray-300 hover:bg-gray-50 sm:max-w-[240px] sm:gap-3 sm:p-2"
      >
        {/* Avatar */}
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-red-100 ring-1 ring-gray-200 sm:h-10 sm:w-10">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-base font-bold text-red-700">
              {initials}
            </span>
          )}

          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
        </div>

        {/* User Name */}
        <div className="hidden min-w-0 text-left sm:block">
          <p className="text-[10px] leading-4 text-gray-500">
            স্বাগতম
          </p>

          <p className="max-w-28 truncate text-sm font-bold text-gray-800">
            {userName}
          </p>
        </div>

        {/* Dropdown Icon */}
        <svg
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${
            menuOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <>
          {/* Outside Click Layer */}
          <button
            type="button"
            aria-label="Close profile menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setMenuOpen(false)}
          />

          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-24px)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
          >
            {/* User Details */}
            <div className="border-b border-gray-100 bg-gray-50 p-4">
              <p className="truncate text-sm font-bold text-gray-900">
                {userName}
              </p>

              {user.email && (
                <p className="mt-1 truncate text-xs text-gray-500">
                  {user.email}
                </p>
              )}
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link
                href="/profile"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-red-700"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                </svg>

                আমার প্রোফাইল
              </Link>

              <button
                type="button"
                role="menuitem"
                disabled={signingOut}
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                  <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                </svg>

                {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;

