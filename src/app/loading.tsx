
export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808]">
      <div className="relative h-20 w-20">
        {/* Outer Glow */}
        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl" />

        {/* Spinner */}
        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-white/10 border-t-purple-500 border-r-pink-500" />

        {/* Inner Ring */}
        <div className="absolute inset-2 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-2 border-white/5 border-b-pink-400 border-l-purple-400" />

        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50" />
        </div>
      </div>
    </main>
  );
}

