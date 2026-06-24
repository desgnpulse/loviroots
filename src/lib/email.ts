import { Resend } from "resend";
import type { PendingOrder } from "./orders";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = "Lovi Orders <orders@loviroots.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";

function orderRows(items: PendingOrder["items"]): string {
  return items
    .map(
      (i) =>
        `<tr>
          <td style="padding:6px 0;border-bottom:1px solid #f0ece4;">${i.name} ${i.size}</td>
          <td style="padding:6px 0;border-bottom:1px solid #f0ece4;text-align:right;">×${i.qty}</td>
        </tr>`
    )
    .join("");
}

function baseHtml(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#F8F4EC;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#4A2E1F;padding:24px 32px;">
          <span style="color:#F8F4EC;font-size:20px;font-weight:bold;letter-spacing:1px;">LOVIROOTS</span>
        </td></tr>
        <tr><td style="padding:32px;">${body}</td></tr>
        <tr><td style="background:#f9f6f0;padding:16px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9c8070;">loviroots.com · hello@loviroots.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendOrderConfirmation(order: PendingOrder): Promise<void> {
  if (!resend || !order.email) return;
  const html = baseHtml(
    "Your Lovi order is confirmed",
    `<h2 style="margin:0 0 8px;color:#4A2E1F;font-size:22px;">Order confirmed</h2>
    <p style="margin:0 0 24px;color:#6b4e3d;font-size:15px;">
      Hi ${order.firstName}, thank you for your order.
      Our team will be in touch on WhatsApp to confirm delivery details.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${orderRows(order.items)}
    </table>
    <p style="font-size:16px;font-weight:bold;color:#4A2E1F;margin:0 0 24px;">
      Total paid: KES ${order.amount.toLocaleString()}
    </p>
    <p style="margin:0;font-size:13px;color:#9c8070;">Ref: ${order.ref}</p>`
  );
  await resend.emails.send({
    from: FROM,
    to: order.email,
    subject: `Your Lovi order is confirmed — ${order.ref}`,
    html,
  });
}

export async function sendAdminOrderNotification(
  order: PendingOrder,
  confirmationCode: string
): Promise<void> {
  if (!resend || !ADMIN_EMAIL) return;
  const html = baseHtml(
    `New order — ${order.ref}`,
    `<h2 style="margin:0 0 16px;color:#4A2E1F;">New web checkout order</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;font-size:14px;color:#4A2E1F;">
      <tr><td style="padding:4px 0;"><strong>Ref:</strong></td><td>${order.ref}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Pesapal code:</strong></td><td>${confirmationCode}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Name:</strong></td><td>${order.firstName} ${order.lastName}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Email:</strong></td><td>${order.email}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Phone:</strong></td><td>${order.phone}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Amount:</strong></td><td>KES ${order.amount.toLocaleString()}</td></tr>
    </table>
    <h3 style="margin:0 0 8px;color:#4A2E1F;font-size:15px;">Items</h3>
    <table width="100%" cellpadding="0" cellspacing="0">${orderRows(order.items)}</table>`
  );
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Lovi order — ${order.ref} — KES ${order.amount.toLocaleString()}`,
    html,
  });
}
