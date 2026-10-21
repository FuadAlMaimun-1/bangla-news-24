import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Shared section heading: red accent bar + title, with an optional
 * "see all" link on the right. Used by the hero, video band, section
 * grids and the sidebar widgets so every heading looks the same.
 */
const SectionHeading = ({
  title,
  href,
  linkLabel = "সব খবর",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) => (
  <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-2.5">
    <div className="flex min-w-0 items-center gap-2.5">
      <span
        aria-hidden="true"
        className="h-6 w-1.5 shrink-0 rounded-full bg-red-700"
      />

      <h2 className="truncate text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl">
        {title}
      </h2>
    </div>

    {href && (
      <Link
        href={href}
        className="group/link inline-flex shrink-0 items-center text-xs font-bold text-red-700 transition-colors hover:text-red-800 sm:text-sm"
      >
        {linkLabel}
        <ChevronRight
          size={15}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
        />
      </Link>
    )}
  </div>
);

export default SectionHeading;
