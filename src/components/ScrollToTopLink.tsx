
"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export default function ScrollToTopLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Bangla News 24 homepage"
      className={className}
      onClick={(e) => {
        if (window.location.pathname === "/") {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }}
    >
      {children}
    </Link>
  );
}
