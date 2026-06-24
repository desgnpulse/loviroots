import Link from "next/link";
import { signOut } from "@/auth";

export function AdminHeader() {
  return (
    <header className="bg-earth text-ivory border-b border-earth/20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-display font-bold text-sm tracking-wide">Lovi Admin</span>
          <nav className="flex gap-5">
            <Link
              href="/admin"
              className="text-ivory/70 hover:text-ivory text-sm transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/orders"
              className="text-ivory/70 hover:text-ivory text-sm transition-colors"
            >
              Orders
            </Link>
            <Link
              href="/admin/reviews"
              className="text-ivory/70 hover:text-ivory text-sm transition-colors"
            >
              Reviews
            </Link>
          </nav>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button
            type="submit"
            className="text-ivory/50 hover:text-ivory text-xs transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
