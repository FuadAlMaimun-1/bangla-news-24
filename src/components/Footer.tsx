export default function Footer() {
  return (
    <footer className="mt-10 bg-red-700 px-5 py-6 text-center text-white">
      <h2 className="text-xl font-bold">
        বাংলা নিউজ
      </h2>

      <p className="mt-2 text-sm text-red-100">
        সর্বশেষ খবর, একসাথে এক জায়গায়।
      </p>

      <p className="mt-3 border-t border-red-500 pt-3 text-xs text-red-100">
        © {new Date().getFullYear()} বাংলা নিউজ. All rights reserved.
      </p>
    </footer>
  );
}

