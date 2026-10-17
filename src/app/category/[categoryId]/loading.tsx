const NewsCardSkeleton = () => (
  <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div className="relative aspect-[16/10] w-full bg-gray-100">
      <div className="absolute inset-0 animate-pulse bg-gray-200" />
      <div className="absolute left-3 top-3 h-6 w-20 animate-pulse rounded-full bg-red-200" />
    </div>
    <div className="space-y-3 p-4 sm:p-5">
      <div className="space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-16 animate-pulse rounded bg-red-100" />
      </div>
    </div>
  </article>
);

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-7xl px-4 py-5"
    >
      <span className="sr-only">খবর লোড হচ্ছে...</span>

      {/* Category Title */}
      <div className="mb-2 border-b-2 border-red-800 pb-2">
        <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
