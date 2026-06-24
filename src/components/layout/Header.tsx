import Link from "next/link";
import { CartBadge } from "./CartBadge";

const nav = [
  { label: "Products", href: "/products" },
  { label: "How to Use", href: "/how-to-use" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ivory border-b border-earth/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-bold text-earth tracking-tight"
        >
          Loviroots
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-sans text-sm text-earth/80 hover:text-earth transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartBadge />
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-2 bg-leaf text-earth text-sm font-medium px-5 py-2 rounded-full hover:bg-[#7aad65] transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </header>
  );
}
