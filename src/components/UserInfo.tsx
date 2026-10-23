"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import {
  UserRound,
  ChevronDown,
  LogOut,
  LoaderCircle,
  Newspaper,
  ShieldCheck,
} from "lucide-react";

interface MenuPosition {
  top: number;
  right: number;
}

const MENU_WIDTH = 288;
const MENU_GAP = 12;
const SCREEN_PADDING = 12;

const UserInfo = () => {
  const { data: session, isPending } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [menuPosition, setMenuPosition] =
    useState<MenuPosition>({ top: 72, right: 12 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = session?.user;
  const userName = user?.name || "ব্যবহারকারী";
  const userImage = user?.image;
  const initials = userName.trim().charAt(0).toUpperCase() || "U";

  // Calculate dropdown position relative to the viewport.
  const updateMenuPosition = useCallback(() => {
    const rect = buttonRef.current?.getBoundingClientRect();

    if (!rect) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const menuWidth = Math.min(
      MENU_WIDTH,
      viewportWidth - SCREEN_PADDING * 2
    );

    const right = Math.max(
      SCREEN_PADDING,
      Math.min(
        viewportWidth - rect.right,
        viewportWidth - menuWidth - SCREEN_PADDING
      )
    );

    const estimatedMenuHeight = 340;

    // Keep the menu inside the viewport.
    const spaceBelow = viewportHeight - rect.bottom - MENU_GAP;
    const openAbove = spaceBelow < estimatedMenuHeight &&
      rect.top > spaceBelow;

    const top = openAbove
      ? Math.max(
          SCREEN_PADDING,
          rect.top - estimatedMenuHeight - MENU_GAP
        )
      : rect.bottom + MENU_GAP;

    setMenuPosition({ top, right });
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    updateMenuPosition();

    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [menuOpen, updateMenuPosition]);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      if (
        buttonRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }

      setMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleSignOut = async () => {
    if (signingOut) return;

    try {
      setSigningOut(true);

      const result = await signOut();

      if (result?.error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      setMenuOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে");
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div
        className="h-12 w-28 animate-pulse rounded-2xl bg-gray-100"
        aria-label="Loading account"
      />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/sign-in"
          className="rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-red-700 sm:px-4"
        >
          সাইন ইন
        </Link>

        <Link
          href="/sign-up"
          className="rounded-xl bg-red-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-red-700/20 transition hover:bg-red-800 active:scale-95 sm:px-5"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const menu =
    mounted && menuOpen
      ? createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-label="প্রোফাইল মেনু"
            className="fixed z-[99999] w-72 max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
            style={{
              top: menuPosition.top,
              right: menuPosition.right,
              maxHeight: "calc(100dvh - 24px)",
              overflowY: "auto",
            }}
          >
            {/* Profile card header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-700 to-rose-600 px-4 pb-5 pt-5 text-white">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border-[20px] border-white/10"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 right-16 h-24 w-24 rounded-full bg-white/10 blur-xl"
              />

              <div className="relative flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-white/40 bg-white/15 shadow-inner">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt={`${userName} profile picture`}
                      fill
                      sizes="48px"
                      quality={100}
                      className="object-cover object-center"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-lg font-bold">
                      {initials}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">
                    {userName}
                  </p>

                  <p className="mt-1 truncate text-xs text-red-100">
                    {user.email || "স্বাগতম"}
                  </p>

                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-1 text-[10px] font-medium text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
                    সক্রিয়
                  </span>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-2.5">
              <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Account
              </p>

              <Link
                href="/profile"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-red-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition group-hover:bg-red-100 group-hover:text-red-700">
                  <UserRound size={18} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-gray-800">
                    আমার প্রোফাইল
                  </span>

                  <span className="mt-0.5 block text-xs text-gray-500">
                    ব্যক্তিগত তথ্য দেখুন
                  </span>
                </span>
              </Link>

              <Link
                href="/"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-red-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition group-hover:bg-red-100 group-hover:text-red-700">
                  <Newspaper size={18} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-gray-800">
                    নিউজ হোম
                  </span>

                  <span className="mt-0.5 block text-xs text-gray-500">
                    সর্বশেষ খবর পড়ুন
                  </span>
                </span>
              </Link>

              <div className="my-2 border-t border-gray-100" />

              <button
                type="button"
                role="menuitem"
                disabled={signingOut}
                onClick={handleSignOut}
                className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700 transition group-hover:bg-red-100">
                  {signingOut ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <LogOut size={18} />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-red-700">
                    {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                  </span>

                  <span className="mt-0.5 block text-xs text-gray-500">
                    {signingOut
                      ? "একটু অপেক্ষা করুন"
                      : "অ্যাকাউন্ট থেকে বেরিয়ে যান"}
                  </span>
                </span>
              </button>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-gray-50/80 px-4 py-3">
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                <ShieldCheck size={13} />
                <span>আপনার অ্যাকাউন্ট সুরক্ষিত রাখুন</span>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => {
            if (!menuOpen) {
              updateMenuPosition();
            }

            setMenuOpen((open) => !open);
          }}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          aria-label="প্রোফাইল মেনু খুলুন"
          className={`group flex max-w-[190px] items-center gap-2 rounded-2xl border p-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:max-w-[240px] sm:gap-3 sm:p-2 ${
            menuOpen
              ? "border-red-200 bg-red-50 shadow-md shadow-red-700/5"
              : "border-gray-200 bg-white hover:border-red-200 hover:bg-gray-50"
          }`}
        >
          {/* Profile picture */}
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-red-100 to-rose-200 text-sm font-bold text-red-700 ring-1 ring-gray-200 sm:h-11 sm:w-11">
            {userImage ? (
              <Image
                src={userImage}
                alt={`${userName} profile picture`}
                fill
                sizes="44px"
                quality={100}
                className="object-cover object-center"
              />
            ) : (
              initials
            )}

            <span className="absolute bottom-0 right-0 z-10 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
          </span>

          {/* User name */}
          <span className="hidden min-w-0 text-left sm:block">
            <span className="block text-[10px] leading-4 text-gray-500">
              স্বাগতম,
            </span>

            <span className="block max-w-28 truncate text-sm font-bold text-gray-800">
              {userName}
            </span>
          </span>

          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`mr-1 shrink-0 text-gray-400 transition-transform duration-200 group-hover:text-red-700 ${
              menuOpen ? "rotate-180 text-red-700" : ""
            }`}
          />
        </button>
      </div>

      {menu}
    </>
  );
};

export default UserInfo;
