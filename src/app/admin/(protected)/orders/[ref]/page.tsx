import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getOrder, updateOrder, type OrderStatus } from "@/lib/admin-store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Order | Lovi Admin" };

type Props = { params: Promise<{ ref: string }> };

const STATUSES: OrderStatus[] = ["pending", "confirmed", "shipped", "cancelled"];

async function saveOrder(ref: string, formData: FormData) {
  "use server";
  const status = formData.get("status") as OrderStatus;
  const notes = String(formData.get("notes") ?? "").trim();
  if (!STATUSES.includes(status)) return;
  updateOrder(ref, { status, notes });
  redirect(`/admin/orders/${ref}?saved=1`);
}

export default async function OrderDetailPage({ params }: Props) {
  const { ref } = await params;
  const order = getOrder(ref);
  if (!order) notFound();

  const boundSave = saveOrder.bind(null, ref);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/orders" className="text-earth/40 hover:text-earth text-sm transition-colors">
          ← Orders
        </Link>
        <h1 className="font-display text-xl font-bold text-earth font-mono">{order.ref}</h1>
      </div>

      <div className="bg-white rounded-2xl border border-earth/10 p-6 mb-6 space-y-3">
        <Row label="Customer" value={order.customerName} />
        {order.email && <Row label="Email" value={order.email} />}
        <Row label="Phone" value={order.phone} />
        <Row label="Items" value={order.items} />
        <Row label="Amount" value={`KES ${order.amount.toLocaleString()}`} />
        <Row label="Type" value={order.type} />
        {order.pesapalConfirmationCode && (
          <Row label="Pesapal ref" value={order.pesapalConfirmationCode} />
        )}
        <Row label="Placed" value={new Date(order.createdAt).toLocaleString("en-GB")} />
      </div>

      <form action={boundSave} className="bg-white rounded-2xl border border-earth/10 p-6 space-y-4">
        <h2 className="font-semibold text-earth text-sm">Update order</h2>

        <div>
          <label className="block text-xs font-medium text-earth mb-1.5">Status</label>
          <select
            name="status"
            defaultValue={order.status}
            className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth focus:outline-none focus:ring-2 focus:ring-earth/30 bg-white"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-earth mb-1.5">Notes</label>
          <textarea
            name="notes"
            defaultValue={order.notes}
            rows={3}
            className="w-full rounded-xl border border-earth/20 px-4 py-3 text-sm text-earth focus:outline-none focus:ring-2 focus:ring-earth/30 resize-none"
            placeholder="Internal notes…"
          />
        </div>

        <button
          type="submit"
          className="bg-earth text-ivory px-6 py-2.5 rounded-full text-sm font-medium hover:bg-earth/90 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 text-sm">
      <span className="text-earth/40 w-28 shrink-0">{label}</span>
      <span className="text-earth">{value}</span>
    </div>
  );
}
