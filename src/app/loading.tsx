const SectionHeader = ({ width = "w-28" }: { width?: string }) => (
  <div className="mb-3 flex items-center gap-2 border-b-2 border-red-700 pb-2 sm:mb-4">
    <div className="h-6 w-1 shrink-0 rounded-full bg-red-700" />
    <div className={`h-6 animate-pulse rounded bg-gray-200 ${width}`} />
  </div>
);

const MiniCardSkeleton = () => (
  <article className="flex min-w-0 gap-3 overflow-hidden rounded-xl border border-gray-200 bg-white p-2.5 sm:gap-3.5">
    <div className="aspect-[4/3] w-24 shrink-0 animate-pulse rounded-lg bg-gray-200 sm:w-28 lg:w-24 xl:w-28" />
    <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
      <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="h-2.5 w-16 animate-pulse rounded bg-gray-100" />
    </div>
  </article>
);

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
      className="mx-auto mt-4 w-full max-w-7xl px-3 sm:px-5 lg:px-8"
    >
      <span className="sr-only">খবর লোড হচ্ছে...</span>

      <div className="grid grid-cols-1 items-start gap-5 md:gap-6 lg:grid-cols-12">
        {/* News Content */}
        <div className="min-w-0 lg:col-span-8">
          {/* Main News + Latest News */}
          <div className="grid grid-cols-1 items-start gap-5 md:gap-6 lg:grid-cols-5">
            {/* Featured News */}
            <div className="min-w-0 lg:col-span-3">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl">
                <div className="aspect-[16/10] w-full animate-pulse bg-gray-200 sm:aspect-[16/9] lg:aspect-[4/3]" />
                <div className="space-y-3 p-3.5 sm:p-5">
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                  </div>
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            </div>

            {/* Latest News */}
            <div className="min-w-0 lg:col-span-2">
              <SectionHeader width="w-32" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <MiniCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Other News Sections */}
          {Array.from({ length: 3 }).map((_, sectionIndex) => (
            <section key={sectionIndex} className="mt-5 min-w-0 sm:mt-6">
              <SectionHeader width={sectionIndex === 0 ? "w-40" : "w-32"} />
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, cardIndex) => (
                  <NewsCardSkeleton key={cardIndex} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Most Read Sidebar */}
        <aside className="order-last min-w-0 w-full lg:sticky lg:top-4 lg:order-none lg:col-span-4">
          <div className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-5">
            <SectionHeader width="w-32" />

            <div className="divide-y divide-gray-100">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-start gap-3 py-3 sm:gap-4 sm:py-4">
                  <div className="h-6 w-6 shrink-0 animate-pulse rounded bg-red-100 sm:h-7 sm:w-7" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3.5 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-3.5 w-3/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-14 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
