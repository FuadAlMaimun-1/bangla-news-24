// Shared Bangla formatting helpers used by the news components.

const BANGLA_DIGITS = "০১২৩৪৫৬৭৮৯";

/** Converts every Latin digit in `value` to its Bangla counterpart (০-৯). */
export const toBanglaNumber = (value: number | string): string =>
  value.toString().replace(/\d/g, (digit) => BANGLA_DIGITS[Number(digit)]);

/**
 * Relative Bangla time label ("এইমাত্র", "৫ মিনিট আগে", "২ দিন আগে", ...).
 * Returns "সময় পাওয়া যায়নি" for missing or unparseable values.
 */
export function formatTimeAgo(date?: string | number | null): string {
  if (date === null || date === undefined || date === "") {
    return "সময় পাওয়া যায়নি";
  }

  const time = new Date(date).getTime();

  if (Number.isNaN(time)) return "সময় পাওয়া যায়নি";

  const seconds = Math.floor((Date.now() - time) / 1000);

  if (seconds < 60) return "এইমাত্র";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${toBanglaNumber(minutes)} মিনিট আগে`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${toBanglaNumber(hours)} ঘণ্টা আগে`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${toBanglaNumber(days)} দিন আগে`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${toBanglaNumber(months)} মাস আগে`;
  }

  return `${toBanglaNumber(Math.floor(months / 12))} বছর আগে`;
}
