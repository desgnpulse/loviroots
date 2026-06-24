import { NextRequest, NextResponse } from "next/server";
import { submitOrder, pesapalConfigured } from "@/lib/pesapal";
import { savePendingOrder } from "@/lib/orders";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^254\d{9}$/; // 2547XXXXXXXX or 254XXXXXXXXX

function merchantRef(): string {
  return `LOVI-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  if (!pesapalConfigured) {
    return NextResponse.json({ error: "Web checkout is not available yet" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const amount = Number(body.amount);
  const items = Array.isArray(body.items) ? body.items : [];

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "Phone must be in format 2547XXXXXXXX" }, { status: 400 });
  }
  if (!amount || amount < 1 || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const ref = merchantRef();
  const description =
    items.length === 1
      ? `${(items[0] as { name: string }).name} ${(items[0] as { size: string }).size}`
      : `Lovi order (${items.length} items)`;

  try {
    const { redirectUrl } = await submitOrder({
      merchantRef: ref,
      amount,
      description,
      callbackUrl: `${process.env.NEXTAUTH_URL}/order-confirmation`,
      firstName,
      lastName,
      email,
      phone,
    });

    savePendingOrder({
      ref,
      firstName,
      lastName,
      email,
      phone,
      amount,
      items: items as { name: string; size: string; qty: number }[],
      createdAt: Date.now(),
    });

    return NextResponse.json({ redirectUrl });
  } catch (err) {
    console.error("Pesapal initiate error:", err);
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 502 });
  }
}
