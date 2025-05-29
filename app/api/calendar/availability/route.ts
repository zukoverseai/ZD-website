import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start_time");
  const end = searchParams.get("end_time");
  if (!start || !end) {
    return NextResponse.json(
      { error: "Missing start_time or end_time" },
      { status: 400 }
    );
  }

  // Parse Base64-encoded service account key
  const encodedKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!encodedKey) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_KEY in environment");
  }
  const keyJson = Buffer.from(encodedKey, "base64").toString("utf8");
  const keyObj = JSON.parse(keyJson) as {
    client_email: string;
    private_key: string;
  };
  // Log which service account email we're using for availability queries
  console.log("Using Service Account Email:", keyObj.client_email);

  // Authenticate with Google using JWT service account
  const client = new google.auth.JWT(
    keyObj.client_email,
    undefined,
    keyObj.private_key,
    ["https://www.googleapis.com/auth/calendar"],
    "support@zukoverse.ai"
  );
  await client.authorize();
  const calendar = google.calendar({ version: "v3", auth: client });

  try {
    // Query busy times for the given window
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: start,
        timeMax: end,
        items: [{ id: process.env.CALENDAR_ID! }],
      },
    });
    const busy =
      response.data.calendars?.[process.env.CALENDAR_ID!]?.busy || [];
    return NextResponse.json({ busy });
  } catch (error: any) {
    console.error("Google Calendar freebusy error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
