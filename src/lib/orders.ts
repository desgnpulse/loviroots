// In-memory pending order store.
// Works for Hetzner + single PM2 process. Orders expire after 2 hours.

export type OrderItem = { name: string; size: string; qty: number };

export type PendingOrder = {
  ref: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  amount: number;
  items: OrderItem[];
  createdAt: number;
};

const TTL_MS = 2 * 60 * 60 * 1000;
const store = new Map<string, PendingOrder>();

export function savePendingOrder(order: PendingOrder): void {
  store.set(order.ref, order);
  // Purge expired entries on every write
  const cutoff = Date.now() - TTL_MS;
  for (const [key, val] of store) {
    if (val.createdAt < cutoff) store.delete(key);
  }
}

export function consumePendingOrder(ref: string): PendingOrder | undefined {
  const order = store.get(ref);
  if (order) store.delete(ref);
  return order;
}
