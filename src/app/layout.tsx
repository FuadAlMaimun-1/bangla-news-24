import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: {
    default: "বাংলা নিউজ ২৪ — সর্বশেষ খবর ও ভিডিও",
    template: "%s | বাংলা নিউজ ২৪",
  },
  description:
    "বাংলাদেশ ও বিশ্বের সর্বশেষ খবর, ভিডিও, ক্রিকেট, রাজনীতি, বিনোদন ও প্রযুক্তির খবর — এক জায়গায়।",
  applicationName: "বাংলা নিউজ ২৪",
  keywords: ["বাংলা নিউজ", "সংবাদ", "খবর", "ভিডিও খবর", "প্রথম আলো"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} bg-gray-100 text-gray-900`}
    >
      <link rel="icon" href="/logo.webp" />
      <body className="min-h-full flex flex-col">
        <Header />
        <Marquee />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
