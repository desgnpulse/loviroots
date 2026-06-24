"use client";

import { createContext, useContext, useReducer } from "react";

export type CartItem = {
  slug: string;
  name: string;
  size: string;
  price: string;
  priceValue: number;
  qty: number;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD"; item: Omit<CartItem, "qty"> }
  | { type: "REMOVE"; slug: string; size: string }
  | { type: "SET_QTY"; slug: string; size: string; qty: number }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const idx = state.items.findIndex(
        (i) => i.slug === action.item.slug && i.size === action.item.size
      );
      if (idx >= 0) {
        return {
          items: state.items.map((item, i) =>
            i === idx ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }
      return { items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (i) => !(i.slug === action.slug && i.size === action.size)
        ),
      };
    case "SET_QTY":
      if (action.qty <= 0) {
        return {
          items: state.items.filter(
            (i) => !(i.slug === action.slug && i.size === action.size)
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          i.slug === action.slug && i.size === action.size
            ? { ...i, qty: action.qty }
            : i
        ),
      };
    case "CLEAR":
      return { items: [] };
  }
}

type CartCtx = {
  items: CartItem[];
  totalCount: number;
  totalValue: number;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const totalCount = state.items.reduce((sum, i) => sum + i.qty, 0);
  const totalValue = state.items.reduce((sum, i) => sum + i.priceValue * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalCount,
        totalValue,
        addItem: (item) => dispatch({ type: "ADD", item }),
        removeItem: (slug, size) => dispatch({ type: "REMOVE", slug, size }),
        setQty: (slug, size, qty) => dispatch({ type: "SET_QTY", slug, size, qty }),
        clearCart: () => dispatch({ type: "CLEAR" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartCtx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
