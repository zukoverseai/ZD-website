export const runtime = "edge";

import { NextResponse } from "next/server";
import { SignJWT, importPKCS8, exportJWK } from "jose";

// If `globalThis.atob` exists (Edge/browser), use it.
// Otherwise (Node), define it via Buffer.
const atob =
  globalThis.atob ??
  ((b64: string) => Buffer.from(b64, "base64").toString("utf8"));

async function getAccessToken(): Promise<string> {
  // ── 1) Parse service-account JSON (raw or Base64-encoded)
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY!;
  const sa = JSON.parse(raw.startsWith("{") ? raw : atob(raw));
  const alg = "RS256";
  const now = Math.floor(Date.now() / 1000);

  // ── 2) Import private key (PEM) → CryptoKey
  const pem = sa.private_key.replace(/\\n/g, "\n");
  const cryptoKey = await importPKCS8(pem, alg, { extractable: true });
  // ── 3) Export CryptoKey → JWK
  const jwk = await exportJWK(cryptoKey);
  // ── 4) Build and sign the JWT using the JWK
  const jwt = await new SignJWT({
    scope: "https://www.googleapis.com/auth/calendar",
  })
    .setProtectedHeader({ alg, typ: "JWT" })
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .setIssuer(sa.client_email)
    .setSubject(process.env.CALENDAR_ID!)
    .setAudience("https://oauth2.googleapis.com/token")
    .sign(cryptoKey);

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.json();
    throw new Error(`OAuth error: ${err.error_description || err.error}`);
  }

  const { access_token } = await tokenRes.json();
  return access_token;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const start = url.searchParams.get("start_time");
  const end = url.searchParams.get("end_time");
  if (!start || !end) {
    return NextResponse.json(
      { error: "Missing start_time or end_time" },
      { status: 400 }
    );
  }

  try {
    const token = await getAccessToken();
    const fbRes = await fetch(
      "https://www.googleapis.com/calendar/v3/freeBusy",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeMin: start,
          timeMax: end,
          items: [{ id: process.env.CALENDAR_ID }],
        }),
      }
    );

    if (!fbRes.ok) {
      const err = await fbRes.json();
      return NextResponse.json({ error: err }, { status: fbRes.status });
    }

    const fbJson = await fbRes.json();
    const busy = fbJson.calendars?.[process.env.CALENDAR_ID!]?.busy || [];
    return NextResponse.json({ busy });
  } catch (e: any) {
    console.error("Availability error:", e);
    return NextResponse.json(
      { error: e.message, stack: e.stack },
      { status: 500 }
    );
  }
}
