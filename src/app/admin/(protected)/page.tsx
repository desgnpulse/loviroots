import type { Metadata } from "next";
import Link from "next/link";
import { getAllOrders, getPendingReviews } from "@/lib/admin-store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dashboard | Lovi Admin" };

export default function AdminDashboard() {
  const orders = getAllOrders();
  const pendingReviews = getPendingReviews();
  const pendingOrders = orders.filter((o) => o.status === "pending");
  const shippedOrders = orders.filter((o) => o.status === "shipped");

  const stats = [
    { label: "Total orders", value: orders.length },
    { label: "Pending", value: pendingOrders.length },
    { label: "Shipped", value: shippedOrders.length },
    { label: "Reviews to approve", value: pendingReviews.length },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold text-earth">Dashboard</h1>
        <Link
          href="/admin/orders/new"
          className="bg-earth text-ivory text-sm font-medium px-5 py-2 rounded-full hover:bg-earth/90 transition-colors"
        >
          + New WhatsApp order
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-earth/10 p-5">
            <p className="text-2xl font-bold text-earth">{s.value}</p>
            <p className="text-xs text-earth/50 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/orders"
          className="bg-white rounded-2xl border border-earth/10 p-6 hover:border-earth/30 transition-colors group"
        >
          <p className="font-semibold text-earth mb-1 group-hover:underline">All orders →</p>
          <p className="text-sm text-earth/50">View and manage WhatsApp + web orders</p>
        </Link>
        <Link
          href="/admin/reviews"
          className="bg-white rounded-2xl border border-earth/10 p-6 hover:border-earth/30 transition-colors group"
        >
          <p className="font-semibold text-earth mb-1 group-hover:underline">
            Review queue ({pendingReviews.length}) →
          </p>
          <p className="text-sm text-earth/50">Approve or reject customer reviews</p>
        </Link>
      </div>
    </div>
  );
}
