import type { Metadata } from "next";
import Link from "next/link";
import { getAllOrders } from "@/lib/admin-store";
import { AdminOrdersTable } from "@/components/admin/AdminOrdersTable";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Orders | Lovi Admin" };

export default function OrdersPage() {
  const orders = getAllOrders();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-earth">Orders</h1>
        <Link
          href="/admin/orders/new"
          className="bg-earth text-ivory text-sm font-medium px-5 py-2 rounded-full hover:bg-earth/90 transition-colors"
        >
          + New WhatsApp order
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-earth/10 p-12 text-center">
          <p className="text-earth/40 text-sm">No orders yet.</p>
        </div>
      ) : (
        <AdminOrdersTable orders={orders} />
      )}
    </div>
  );
}
