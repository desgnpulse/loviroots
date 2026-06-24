import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { saveWhatsAppOrder } from "@/lib/admin-store";

export const metadata: Metadata = { title: "New Order | Lovi Admin" };

async function createOrder(formData: FormData) {
  "use server";
  const customerName = String(formData.get("customerName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const items = String(formData.get("items") ?? "").trim();
  const amount = Number(formData.get("amount"));
  if (!customerName || !phone || !items || !amount) return;
  saveWhatsAppOrder({ customerName, phone, items, amount });
  redirect("/admin/orders");
}

export default function NewOrderPage() {
  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/orders" className="text-earth/40 hover:text-earth text-sm transition-colors">
          ← Orders
        </Link>
        <h1 className="font-display text-2xl font-bold text-earth">New WhatsApp order</h1>
      </div>

      <form action={createOrder} className="bg-white rounded-2xl border border-earth/10 p-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-earth mb-1.5">Customer name</label>
          <input
            name="customerName"
            required
            className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth focus:outline-none focus:ring-2 focus:ring-earth/30"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-earth mb-1.5">Phone</label>
          <input
            name="phone"
            required
            className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth focus:outline-none focus:ring-2 focus:ring-earth/30"
            placeholder="2547XXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-earth mb-1.5">Items</label>
          <textarea
            name="items"
            required
            rows={2}
            className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth focus:outline-none focus:ring-2 focus:ring-earth/30 resize-none"
            placeholder="Lovi Shea Butter 250g ×2"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-earth mb-1.5">Amount (KES)</label>
          <input
            name="amount"
            type="number"
            min="1"
            required
            className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth focus:outline-none focus:ring-2 focus:ring-earth/30"
            placeholder="1200"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-earth text-ivory px-6 py-2.5 rounded-full text-sm font-medium hover:bg-earth/90 transition-colors"
          >
            Save order
          </button>
          <Link
            href="/admin/orders"
            className="text-earth/50 hover:text-earth text-sm px-4 py-2.5 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
