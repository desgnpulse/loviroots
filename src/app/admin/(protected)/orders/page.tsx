import type { Metadata } from "next";
import Link from "next/link";
import { getAllOrders } from "@/lib/admin-store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Orders | Lovi Admin" };

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-blue-50 text-blue-700",
  shipped: "bg-green-50 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

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
        <div className="bg-white rounded-2xl border border-earth/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-earth/10">
              <tr>
                {["Ref", "Customer", "Items", "Amount", "Type", "Status", "Date"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-medium text-earth/50 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-earth/5">
              {orders.map((order) => (
                <tr key={order.ref} className="hover:bg-earth/2 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-earth/60">
                    <Link href={`/admin/orders/${order.ref}`} className="hover:underline text-earth">
                      {order.ref}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-earth">{order.customerName}</td>
                  <td className="px-4 py-3 text-earth/60 max-w-[200px] truncate">{order.items}</td>
                  <td className="px-4 py-3 font-medium text-earth">
                    KES {order.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${order.type === "web" ? "bg-earth/10 text-earth" : "bg-leaf/10 text-leaf"}`}
                    >
                      {order.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-earth/40 text-xs">
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
