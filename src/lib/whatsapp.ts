import type { CartItem } from "@/lib/cart";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

function buildCartMessage(items: CartItem[]): string {
  if (items.length === 0) return "Hi Lovi! I'd like to place an order. Please assist.";
  if (items.length === 1 && items[0].qty === 1) {
    return `Hi Lovi! I'd like to order: ${items[0].name} – ${items[0].size}. Please assist.`;
  }
  const lines = items.map((i) => `- ${i.name} ${i.size} x${i.qty}`).join("\n");
  return `Hi Lovi! I'd like to order:\n${lines}\nPlease assist.`;
}

function buildSingleMessage(name: string, size: string): string {
  return `Hi Lovi! I'd like to order: ${name} – ${size}. Please assist.`;
}

function toWaUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function cartWhatsAppUrl(items: CartItem[]): string {
  return toWaUrl(buildCartMessage(items));
}

export function singleItemWhatsAppUrl(name: string, size: string): string {
  return toWaUrl(buildSingleMessage(name, size));
}
