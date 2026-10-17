"use client";
import { Link2 } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import toast from "react-hot-toast";

const ShareButtons = ({ title }: { title: string }) => {
  const openShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleFacebook = () => {
    const pageUrl = window.location.href;
    openShare(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
    );
  };

  const handleWhatsapp = () => {
    const pageUrl = window.location.href;
    openShare(
      `https://wa.me/?text=${encodeURIComponent(`${title} ${pageUrl}`)}`
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("লিংক কপি হয়েছে!");
    } catch {
      toast.error("লিংক কপি করা যায়নি");
    }
  };

  const buttonClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-white";

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={handleFacebook}
        aria-label="ফেসবুকে শেয়ার করুন"
        className={`${buttonClass} hover:border-blue-600 hover:bg-blue-600`}
      >
        <FaFacebookF size={16} />
      </button>

      <button
        type="button"
        onClick={handleWhatsapp}
        aria-label="হোয়াটসঅ্যাপে শেয়ার করুন"
        className={`${buttonClass} hover:border-green-500 hover:bg-green-500`}
      >
        <FaWhatsapp size={17} />
      </button>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="লিংক কপি করুন"
        className={`${buttonClass} hover:border-red-700 hover:bg-red-700`}
      >
        <Link2 size={17} />
      </button>
    </div>
  );
};

export default ShareButtons;
