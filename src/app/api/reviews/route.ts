import { NextRequest, NextResponse } from "next/server";
import { submitReview } from "@/lib/admin-store";

const RATING_RE = /^[1-5]$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const productSlug = String(body.productSlug ?? "").trim();
  const productName = String(body.productName ?? "").trim();
  const reviewerName = String(body.reviewerName ?? "").trim();
  const rating = Number(body.rating);
  const reviewBody = String(body.body ?? "").trim();

  if (!productSlug || !productName) {
    return NextResponse.json({ error: "Product is required" }, { status: 400 });
  }
  if (!reviewerName || reviewerName.length > 80) {
    return NextResponse.json({ error: "Name is required (max 80 chars)" }, { status: 400 });
  }
  if (!RATING_RE.test(String(body.rating)) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be 1–5" }, { status: 400 });
  }
  if (!reviewBody || reviewBody.length > 1000) {
    return NextResponse.json({ error: "Review body required (max 1000 chars)" }, { status: 400 });
  }

  submitReview({ productSlug, productName, reviewerName, rating, body: reviewBody });
  return NextResponse.json({ ok: true }, { status: 201 });
}
