import { NextRequest, NextResponse } from "next/server";
import { getTransactionStatus } from "@/lib/pesapal";
import { consumePendingOrder } from "@/lib/orders";
import { sendOrderConfirmation, sendAdminOrderNotification } from "@/lib/email";

// Pesapal IPN — called by Pesapal server when payment status changes.
// Must return HTTP 200 with the specific JSON body below; Pesapal retries on failure.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderTrackingId = searchParams.get("OrderTrackingId") ?? "";
  const merchantRef = searchParams.get("OrderMerchantReference") ?? "";

  // Required IPN acknowledgement — return this regardless of processing outcome
  const ack = NextResponse.json({
    orderNotificationType: "IPNCHANGE",
    orderTrackingId,
    orderMerchantReference: merchantRef,
    status: "200",
  });

  if (!orderTrackingId || !merchantRef) return ack;

  try {
    const status = await getTransactionStatus(orderTrackingId);

    if (status.statusCode === 1) {
      // COMPLETED — look up the pending order and send emails
      const order = consumePendingOrder(merchantRef);
      if (order) {
        await Promise.allSettled([
          sendOrderConfirmation(order),
          sendAdminOrderNotification(order, status.confirmationCode),
        ]);
      }
    }
  } catch (err) {
    console.error("IPN processing error:", err);
    // Still return ack so Pesapal does not keep retrying
  }

  return ack;
}
