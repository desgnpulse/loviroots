import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defense-in-depth: middleware already redirects, but verify server-side too
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
