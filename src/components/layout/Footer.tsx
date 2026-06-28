import Link from "next/link";

const NAV = [
  { label: "Shop", href: "/products" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-ivory border-t border-earth/10 px-4 py-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="font-display text-lg font-bold text-ink">Lovi</p>

        <nav className="flex items-center gap-7">
          {NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-earth/40 hover:text-earth transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-earth/25">
          © {new Date().getFullYear()} Loviroots. Nairobi, KE.
        </p>
      </div>
    </footer>
  );
}
