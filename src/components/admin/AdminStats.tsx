"use client";

import { StatsCard } from "@desgnpulse/ui";
import { ShoppingCart, Clock, Truck, MessageSquare } from "lucide-react";

type Props = {
  total: number;
  pending: number;
  shipped: number;
  pendingReviews: number;
};

export function AdminStats({ total, pending, shipped, pendingReviews }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      <StatsCard
        metric={total}
        label="Total orders"
        icon={ShoppingCart}
        iconColor="#EDEAE4"
        iconTextColor="#4A2E1F"
      />
      <StatsCard
        metric={pending}
        label="Pending"
        icon={Clock}
        iconColor="#FEF3C7"
        iconTextColor="#92400E"
      />
      <StatsCard
        metric={shipped}
        label="Shipped"
        icon={Truck}
        iconColor="#DCFCE7"
        iconTextColor="#166534"
      />
      <StatsCard
        metric={pendingReviews}
        label="Reviews to approve"
        icon={MessageSquare}
        iconColor="#EDE9FE"
        iconTextColor="#4C1D95"
      />
    </div>
  );
}
