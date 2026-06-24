import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID ?? "0");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = (body as Record<string, unknown>)?.email;
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // When BREVO_API_KEY is not configured (local dev without Brevo), succeed silently
  if (!BREVO_API_KEY) {
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        listIds: BREVO_LIST_ID ? [BREVO_LIST_ID] : [],
        updateEnabled: true,
      }),
    });

    // 201 = created, 204 = updated existing — both are success
    if (res.status === 201 || res.status === 204) {
      return NextResponse.json({ ok: true });
    }

    // Brevo returns 400 with code "duplicate_parameter" when contact already exists
    // without updateEnabled. With updateEnabled:true this shouldn't happen, but handle it.
    if (res.status === 400) {
      const data = await res.json().catch(() => ({}));
      if ((data as { code?: string })?.code === "duplicate_parameter") {
        return NextResponse.json({ ok: true });
      }
    }

    return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
  }
}
