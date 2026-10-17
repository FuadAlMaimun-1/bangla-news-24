export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen bg-gray-50 py-8 sm:py-12"
    >
      <span className="sr-only">খবর লোড হচ্ছে...</span>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6 h-5 w-40 animate-pulse rounded bg-gray-200" />

        {/* Article */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          {/* Image */}
          <div className="h-[250px] w-full animate-pulse bg-gray-200 sm:h-[400px] lg:h-[500px]" />

          {/* Content */}
          <div className="p-5 sm:p-8 lg:p-10">
            {/* Meta Information */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="h-8 w-24 animate-pulse rounded-full bg-red-100" />
              <div className="h-8 w-20 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-28 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
            </div>

            {/* Title */}
            <div className="space-y-3">
              <div className="h-9 w-full animate-pulse rounded bg-gray-200 sm:h-10" />
              <div className="h-9 w-4/5 animate-pulse rounded bg-gray-200 sm:h-10" />
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-gray-200" />

            {/* Article Text */}
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-4 animate-pulse rounded bg-gray-200 ${
                    index === 7 ? "w-1/2" : "w-full"
                  }`}
                />
              ))}
            </div>

            {/* Tags */}
            <div className="mt-10">
              <div className="mb-3 h-4 w-16 animate-pulse rounded bg-gray-200" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-20 animate-pulse rounded-lg bg-gray-100"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
