import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";

export const metadata: Metadata = { title: "Admin Login | Loviroots" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session) redirect("/admin");

  const { error } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/admin",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect("/admin/login?error=1");
      }
      throw err;
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-2xl font-bold text-earth">Loviroots Admin</p>
          <p className="text-sm text-earth/50 mt-1">Sign in to manage orders and reviews</p>
        </div>

        <form action={login} className="bg-white rounded-2xl border border-earth/10 p-8 space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
              Invalid email or password.
            </p>
          )}

          <div>
            <label className="block text-xs font-medium text-earth mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth bg-white focus:outline-none focus:ring-2 focus:ring-earth/30"
              placeholder="admin@loviroots.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-earth mb-1.5">Password</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth bg-white focus:outline-none focus:ring-2 focus:ring-earth/30"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-earth text-ivory rounded-full font-semibold text-sm hover:bg-earth/90 transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
