import Link from "next/link";
import { CartBadge } from "./CartBadge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ivory border-b border-earth/10">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8 h-14 flex items-center justify-between">
        {/* Left anchor */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-earth/35 hidden sm:block">
          Est. 2024 · Nairobi
        </p>

        {/* Center wordmark — absolutely centered so it doesn't shift with nav width */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-display text-xl font-bold text-ink"
        >
          Lovi
        </Link>

        {/* Right nav */}
        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-earth/40 hover:text-earth transition-colors hidden sm:block"
          >
            Shop
          </Link>
          <Link
            href="/blog"
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-earth/40 hover:text-earth transition-colors hidden sm:block"
          >
            Journal
          </Link>
          <CartBadge />
        </nav>
      </div>
    </header>
  );
}
