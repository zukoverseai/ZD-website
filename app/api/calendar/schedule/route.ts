export const runtime = "edge";
import { NextResponse } from "next/server";
import { SignJWT, importPKCS8, exportJWK } from "jose";

// If `globalThis.atob` exists (Edge/browser), use it.
// Otherwise (Node), define it via Buffer.
const atob =
  globalThis.atob ??
  ((b64: string) => Buffer.from(b64, "base64").toString("utf8"));

// helper to exchange service-account JWT for Google OAuth2 access token
async function getAccessToken(): Promise<string> {
  // ── 1) Parse service-account JSON (raw or Base64-encoded)
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY!;
  const sa = JSON.parse(raw.startsWith("{") ? raw : atob(raw));
  const alg = "RS256";
  const now = Math.floor(Date.now() / 1000);

  // ── 2) Import private key (PEM) → CryptoKey
  const pem = sa.private_key.replace(/\\n/g, "\n");
  const cryptoKey = await importPKCS8(pem, alg);
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
    .sign(jwk);

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

/**
 * POST /api/calendar/schedule
 * Schedules an event on the server-side calendar (no attendees/invites)
 * and emails the user a custom confirmation with an ICS file (METHOD:PUBLISH)
 */
export async function POST(req: Request) {
  // Parse JSON body from request
  const { start_time, summary, attendees } = await req.json();

  // Validate required fields
  if (!start_time || !summary) {
    return NextResponse.json(
      { error: "Missing start_time or summary" },
      { status: 400 }
    );
  }

  // Compute event start and end dates
  const startDate = new Date(start_time);
  // Default duration: 30 minutes
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

  // Call Calendar API directly using service-account JWT
  try {
    const token = await getAccessToken();
    const evRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        process.env.CALENDAR_ID!
      )}/events?sendUpdates=none`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary,
          description: `${summary}\n\nBooked by: ${
            attendees?.[0]?.displayName || ""
          } <${attendees?.[0]?.email || ""}>`,
          start: { dateTime: startDate.toISOString() },
          end: { dateTime: endDate.toISOString() },
        }),
      }
    );
    if (!evRes.ok) {
      const err = await evRes.json();
      return NextResponse.json({ error: err }, { status: evRes.status });
    }
    const event = await evRes.json();
    return NextResponse.json({ status: "scheduled", event });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
