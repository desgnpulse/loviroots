"use client";

import { useCart } from "@/lib/cart";
import { cartWhatsAppUrl, singleItemWhatsAppUrl } from "@/lib/whatsapp";

export function useWhatsAppOrder() {
  const { items, totalCount, totalValue, addItem, removeItem, setQty, clearCart } = useCart();

  return {
    items,
    totalCount,
    totalValue,
    cartUrl: cartWhatsAppUrl(items),
    addItem,
    removeItem,
    setQty,
    clearCart,
    singleItemUrl: singleItemWhatsAppUrl,
  };
}
