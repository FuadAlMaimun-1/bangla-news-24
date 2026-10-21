const SectionHeaderSkeleton = ({ width = "w-28" }: { width?: string }) => (
  <div className="flex items-center gap-2.5 border-b border-gray-200 pb-2.5">
    <div className="h-6 w-1.5 shrink-0 rounded-full bg-red-200" />
    <div className={`h-6 animate-pulse rounded bg-gray-200 ${width}`} />
  </div>
);

const MiniCardSkeleton = () => (
  <div className="flex min-w-0 gap-3 rounded-xl border border-transparent p-2 sm:gap-3.5">
    <div className="aspect-[4/3] w-24 shrink-0 animate-pulse rounded-lg bg-gray-200 sm:w-28" />
    <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
      <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="h-2.5 w-16 animate-pulse rounded bg-gray-100" />
    </div>
  </div>
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

const VideoCardSkeleton = () => (
  <div className="w-[78%] shrink-0 sm:w-auto">
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="relative aspect-video w-full bg-gray-100">
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-white/80" />
      </div>
      <div className="space-y-2 p-3 sm:p-4">
        <div className="h-3.5 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  </div>
);

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto w-full max-w-7xl px-3 pb-12 pt-4 sm:px-5 sm:pt-6 sm:pb-16 lg:px-8"
    >
      <span className="sr-only">খবর লোড হচ্ছে...</span>

      {/* Hero: lead story + latest list */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
        <div className="min-w-0 lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="aspect-[16/9] w-full animate-pulse bg-gray-200" />
            <div className="space-y-3 p-4 sm:p-5">
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <SectionHeaderSkeleton width="w-32" />
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <MiniCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Video tab block */}
      <div className="mt-6 sm:mt-9">
        {/* Tab bar skeleton */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-1 border-b border-gray-200">
            <div className="-mb-px flex items-center gap-2 border-b-[3px] border-red-700 px-3 py-2.5">
              <div className="h-4 w-4 animate-pulse rounded-full bg-red-200" />
              <div className="h-4 w-14 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-4 w-16 shrink-0 animate-pulse rounded bg-gray-100" />
        </div>

        <div className="no-scrollbar -mx-3 mt-3.5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-3 sm:mx-0 sm:mt-5 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        </div>
      </div>

      {/* Sections + sidebar */}
      <div className="mt-6 grid grid-cols-1 items-start gap-5 sm:mt-9 lg:grid-cols-12 lg:gap-6">
        <div className="min-w-0 lg:col-span-8">
          {Array.from({ length: 3 }).map((_, sectionIndex) => (
            <section key={sectionIndex} className="min-w-0 [&+section]:mt-6">
              <SectionHeaderSkeleton width={sectionIndex === 0 ? "w-40" : "w-32"} />
              <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, cardIndex) => (
                  <NewsCardSkeleton key={cardIndex} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="order-last min-w-0 w-full lg:order-none lg:col-span-4 lg:top-36 lg:sticky">
          <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-5">
            <SectionHeaderSkeleton width="w-32" />

            <div className="divide-y divide-gray-100">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 py-3 sm:gap-3.5 sm:py-3.5"
                >
                  <div className="h-7 w-7 shrink-0 animate-pulse rounded-lg bg-red-100 sm:h-8 sm:w-8" />
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
