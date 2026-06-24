"use client";

import Link from "next/link";
import { DataTable } from "@desgnpulse/ui";
import type { ColumnDef } from "@tanstack/react-table";
import type { AdminOrder } from "@/lib/admin-store";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-blue-50 text-blue-700",
  shipped: "bg-green-50 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

const columns: ColumnDef<AdminOrder>[] = [
  {
    accessorKey: "ref",
    header: "Ref",
    cell: ({ row }) => (
      <Link
        href={`/admin/orders/${row.original.ref}`}
        className="font-mono text-xs text-earth hover:underline"
      >
        {row.original.ref}
      </Link>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => (
      <span className="text-earth/60 block max-w-[180px] truncate" title={row.original.items}>
        {row.original.items}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium">KES {row.original.amount.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          row.original.type === "web" ? "bg-earth/10 text-earth" : "bg-leaf/10 text-leaf"
        }`}
      >
        {row.original.type}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[row.original.status]}`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-earth/40 text-xs">
        {new Date(row.original.createdAt).toLocaleDateString("en-GB")}
      </span>
    ),
  },
];

export function AdminOrdersTable({ orders }: { orders: AdminOrder[] }) {
  return (
    <DataTable
      data={orders}
      columns={columns}
      pageSize={20}
      exportCSV
      exportLabel="Export CSV"
    />
  );
}
