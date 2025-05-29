import { NextResponse } from "next/server";
// Import Google APIs client for interacting with Calendar
import { google } from "googleapis";
// Import SendGrid mail client for sending emails
import sgMail from "@sendgrid/mail";
// Import randomUUID for generating unique IDs for ICS events
import { randomUUID } from "crypto";

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

  // Load and validate Google service account credentials
  const encodedKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!encodedKey) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_KEY in environment");
  }
  // Decode Base64 key and parse JSON
  const keyJson = Buffer.from(encodedKey, "base64").toString("utf8");
  const keyObj = JSON.parse(keyJson) as {
    client_email: string;
    private_key: string;
  };

  // Create JWT auth client for Google API
  const client = new google.auth.JWT(
    keyObj.client_email,
    undefined,
    keyObj.private_key,
    ["https://www.googleapis.com/auth/calendar"]
  );
  // Authorize client
  await client.authorize();
  // Initialize Google Calendar API
  const calendar = google.calendar({ version: "v3", auth: client });

  // Insert event into calendar (no attendees => no invite emails)
  const insertResponse = await calendar.events.insert({
    calendarId: process.env.CALENDAR_ID!,
    requestBody: {
      summary,
      description: summary,
      start: { dateTime: startDate.toISOString() },
      end: { dateTime: endDate.toISOString() },
    },
  });
  // Extract created event
  const event = insertResponse.data;

  // Configure SendGrid client
  const { SENDGRID_API_KEY, SENDGRID_FROM } = process.env;
  if (!SENDGRID_API_KEY || !SENDGRID_FROM) {
    throw new Error("Missing SENDGRID_API_KEY or SENDGRID_FROM in environment");
  }
  sgMail.setApiKey(SENDGRID_API_KEY);

  // Helper to format dates in ICS format: YYYYMMDDTHHMMSSZ
  function toICSDate(date: Date) {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  // Generate unique UID for ICS event
  const uid = randomUUID();

  // Build ICS file content lines
  const icsLines = [
    "BEGIN:VCALENDAR",
    "METHOD:PUBLISH",
    "VERSION:2.0",
    "PRODID:-//YourCompany//YourApp//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(startDate)}`,
    `DTEND:${toICSDate(endDate)}`,
    `SUMMARY:${summary}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  // Join lines with CRLF as per RFC5545
  const icsContent = icsLines.join("\r\n");

  // Send confirmation email with ICS attachment if an attendee exists
  const recipient =
    attendees && attendees.length > 0 ? attendees[0].email : null;
  if (recipient) {
    await sgMail.send({
      from: SENDGRID_FROM,
      to: recipient,
      subject: "Your Appointment is Confirmed",
      text: `Hi ${
        attendees[0].displayName || ""
      },\n\nYour appointment "${summary}" is confirmed for ${startDate.toLocaleString()}.\n\nPlease find the attached ICS file to add it to your calendar.\n\nThank you!`,
      attachments: [
        {
          content: Buffer.from(icsContent).toString("base64"),
          filename: "event.ics",
          type: "text/calendar; method=PUBLISH",
          disposition: "attachment",
        },
      ],
    });
  }

  // Respond with JSON indicating success and event ID
  return NextResponse.json({ eventId: event.id, status: "scheduled" });
}
