import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Lovi order via secure web checkout.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <CheckoutForm />
    </div>
  );
}
