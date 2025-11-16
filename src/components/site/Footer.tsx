export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-white/60 flex items-center justify-between">
        <div>© {new Date().getFullYear()} LIGHT WAVE — Creative Agency</div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">
            Creative Direction • Production • Post
          </span>
        </div>
      </div>
    </footer>
  );
}
