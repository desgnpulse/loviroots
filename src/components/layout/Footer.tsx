import Link from "next/link";

const links = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "How to Use", href: "/how-to-use" },
  ],
  company: [
    { label: "About Loviroots", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-earth text-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <p className="font-display text-2xl font-bold mb-3">Loviroots</p>
            <p className="text-ivory/70 text-sm leading-relaxed max-w-xs">
              100% natural skincare rooted in African heritage. No fillers. No fluff. Same love, every batch.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ivory/50 mb-4">
              Shop
            </p>
            <ul className="space-y-2">
              {links.shop.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-ivory/80 hover:text-ivory transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ivory/50 mb-4">
              Company
            </p>
            <ul className="space-y-2">
              {links.company.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-ivory/80 hover:text-ivory transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} Loviroots. All rights reserved.</p>
          <p>Made with care in Kenya.</p>
        </div>
      </div>
    </footer>
  );
}
