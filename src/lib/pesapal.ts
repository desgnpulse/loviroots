const BASE_URL =
  process.env.PESAPAL_ENV === "production"
    ? "https://pay.pesapal.com/v3"
    : "https://cybqa.pesapal.com/pesapalv3";

const CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY ?? "";
const CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET ?? "";

export const pesapalConfigured = Boolean(CONSUMER_KEY && CONSUMER_SECRET);

// ── HTTP helper ──────────────────────────────────────────────────────────────

async function call<T>(path: string, init?: RequestInit, token?: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Pesapal ${path} ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// ── Auth token (cached per process — works for single PM2 instance on Hetzner) ──

let tokenCache: { token: string; expiresAt: number } | null = null;

export async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) return tokenCache.token;
  const data = await call<{ token: string }>("/api/Auth/RequestToken", {
    method: "POST",
    body: JSON.stringify({ consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET }),
  });
  tokenCache = { token: data.token, expiresAt: Date.now() + 4.5 * 60 * 1000 };
  return data.token;
}

// ── IPN registration (cached per process; override with PESAPAL_IPN_ID env) ──

let cachedIpnId: string | null = process.env.PESAPAL_IPN_ID ?? null;

export async function getIpnId(): Promise<string> {
  if (cachedIpnId) return cachedIpnId;
  const token = await getToken();
  const ipnUrl = `${process.env.NEXTAUTH_URL}/api/checkout/callback`;
  const data = await call<{ ipn_id: string }>(
    "/api/URLSetup/RegisterIPN",
    { method: "POST", body: JSON.stringify({ url: ipnUrl, ipn_notification_type: "GET" }) },
    token
  );
  cachedIpnId = data.ipn_id;
  return data.ipn_id;
}

// ── Submit order ─────────────────────────────────────────────────────────────

export type SubmitOrderParams = {
  merchantRef: string;
  amount: number;
  description: string;
  callbackUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export async function submitOrder(
  params: SubmitOrderParams
): Promise<{ orderTrackingId: string; redirectUrl: string }> {
  const [token, ipnId] = await Promise.all([getToken(), getIpnId()]);
  const data = await call<{ order_tracking_id: string; redirect_url: string }>(
    "/api/Transactions/SubmitOrderRequest",
    {
      method: "POST",
      body: JSON.stringify({
        id: params.merchantRef,
        currency: "KES",
        amount: params.amount,
        description: params.description,
        callback_url: params.callbackUrl,
        notification_id: ipnId,
        billing_address: {
          email_address: params.email,
          phone_number: params.phone,
          first_name: params.firstName,
          last_name: params.lastName,
          country_code: "KE",
        },
      }),
    },
    token
  );
  return { orderTrackingId: data.order_tracking_id, redirectUrl: data.redirect_url };
}

// ── Transaction status ───────────────────────────────────────────────────────

export type TransactionStatus = {
  statusCode: number; // 1=COMPLETED, 2=FAILED, 3=REVERSED, 0=PENDING
  statusDescription: string;
  amount: number;
  confirmationCode: string;
  merchantReference: string;
};

export async function getTransactionStatus(
  orderTrackingId: string
): Promise<TransactionStatus> {
  const token = await getToken();
  const data = await call<{
    status_code: number;
    payment_status_description: string;
    amount: number;
    confirmation_code: string;
    merchant_reference: string;
  }>(`/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`, {}, token);
  return {
    statusCode: data.status_code,
    statusDescription: data.payment_status_description,
    amount: data.amount,
    confirmationCode: data.confirmation_code,
    merchantReference: data.merchant_reference,
  };
}
