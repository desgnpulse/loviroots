import fs from "fs";
import path from "path";
import crypto from "crypto";

// Server-only module — uses fs. Never import in client components.

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");

export type OrderStatus = "pending" | "confirmed" | "shipped" | "cancelled";
export type ReviewStatus = "pending" | "approved" | "rejected";

export type AdminOrder = {
  ref: string;
  type: "web" | "whatsapp";
  customerName: string;
  email?: string;
  phone: string;
  items: string;
  amount: number;
  status: OrderStatus;
  notes: string;
  pesapalConfirmationCode?: string;
  createdAt: number;
  updatedAt: number;
};

export type PendingReview = {
  id: string;
  productSlug: string;
  productName: string;
  reviewerName: string;
  rating: number;
  body: string;
  status: ReviewStatus;
  createdAt: number;
};

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readOrders(): AdminOrder[] {
  try {
    ensureDir();
    if (!fs.existsSync(ORDERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8")) as AdminOrder[];
  } catch {
    return [];
  }
}

function writeOrders(orders: AdminOrder[]) {
  ensureDir();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function readReviews(): PendingReview[] {
  try {
    ensureDir();
    if (!fs.existsSync(REVIEWS_FILE)) return [];
    return JSON.parse(fs.readFileSync(REVIEWS_FILE, "utf-8")) as PendingReview[];
  } catch {
    return [];
  }
}

function writeReviews(reviews: PendingReview[]) {
  ensureDir();
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
}

export function getAllOrders(): AdminOrder[] {
  return readOrders().sort((a, b) => b.createdAt - a.createdAt);
}

export function getOrder(ref: string): AdminOrder | undefined {
  return readOrders().find((o) => o.ref === ref);
}

export function saveWebOrder(params: {
  ref: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  items: { name: string; size: string; qty: number }[];
  amount: number;
  pesapalConfirmationCode?: string;
}) {
  const orders = readOrders();
  const itemsStr = params.items.map((i) => `${i.name} ${i.size} ×${i.qty}`).join(", ");
  orders.push({
    ref: params.ref,
    type: "web",
    customerName: `${params.firstName} ${params.lastName}`,
    email: params.email,
    phone: params.phone,
    items: itemsStr,
    amount: params.amount,
    status: "confirmed",
    notes: "",
    pesapalConfirmationCode: params.pesapalConfirmationCode,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  writeOrders(orders);
}

export function saveWhatsAppOrder(params: {
  customerName: string;
  phone: string;
  items: string;
  amount: number;
}): AdminOrder {
  const orders = readOrders();
  const ref = `WA-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  const order: AdminOrder = {
    ref,
    type: "whatsapp",
    customerName: params.customerName,
    phone: params.phone,
    items: params.items,
    amount: params.amount,
    status: "pending",
    notes: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  orders.push(order);
  writeOrders(orders);
  return order;
}

export function updateOrder(
  ref: string,
  patch: { status?: OrderStatus; notes?: string }
): AdminOrder | null {
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.ref === ref);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], ...patch, updatedAt: Date.now() };
  writeOrders(orders);
  return orders[idx];
}

export function submitReview(params: {
  productSlug: string;
  productName: string;
  reviewerName: string;
  rating: number;
  body: string;
}) {
  const reviews = readReviews();
  reviews.push({ id: crypto.randomUUID(), ...params, status: "pending", createdAt: Date.now() });
  writeReviews(reviews);
}

export function getAllReviews(): PendingReview[] {
  return readReviews().sort((a, b) => b.createdAt - a.createdAt);
}

export function getPendingReviews(): PendingReview[] {
  return readReviews()
    .filter((r) => r.status === "pending")
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function getApprovedReviews(productSlug: string): PendingReview[] {
  return readReviews().filter(
    (r) => r.productSlug === productSlug && r.status === "approved"
  );
}

export function updateReview(
  id: string,
  status: "approved" | "rejected"
): PendingReview | null {
  const reviews = readReviews();
  const idx = reviews.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  reviews[idx] = { ...reviews[idx], status };
  writeReviews(reviews);
  return reviews[idx];
}
