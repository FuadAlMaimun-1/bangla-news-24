
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface NewsHeadline {
  title: string;
  id: string;
}

const Marquee = async () => {
  let headlines: NewsHeadline[] = [];

  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news?limit=10",
      { next: { revalidate: 60 } }
    );

    if (res.ok) {
      const data = await res.json();
      headlines = Array.isArray(data?.data) ? data.data : [];
    }
  } catch (error) {
    console.error("Headlines fetch error:", error);
  }

  return (
    <section
      aria-label="সর্বশেষ সংবাদ"
      className="w-full overflow-hidden bg-red-700 text-white"
    >
      <div className="mx-auto flex min-h-10 w-full max-w-7xl items-stretch sm:min-h-11 lg:px-8">
        {/* Breaking News Label */}
        <div className="relative z-10 flex shrink-0 items-center gap-1.5 bg-red-900 px-3 text-xs font-bold sm:gap-2 sm:px-5 sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>

          <span>সর্বশেষ</span>
        </div>

        {/* Scrolling Headlines */}
        <div className="flex min-w-0 flex-1 items-center overflow-hidden px-3 sm:px-4">
          {headlines.length > 0 ? (
            <MarqueeText direction="right" duration={15}>
              {headlines.map((headline, index) => (
                <span
                  key={headline.id}
                  className="inline-flex items-center whitespace-nowrap text-xs font-medium sm:text-sm"
                >
                  <Link
                    href={`/news/${headline.id}`}
                    className="transition-colors hover:text-red-100 hover:underline"
                  >
                    {headline.title}
                  </Link>

                  {index < headlines.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mx-4 text-red-200 sm:mx-6"
                    >
                      ◆
                    </span>
                  )}
                </span>
              ))}
            </MarqueeText>
          ) : (
            <p className="text-xs text-white/90 sm:text-sm">
              এই মুহূর্তে নতুন কোনো খবর পাওয়া যায়নি।
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Marquee;

