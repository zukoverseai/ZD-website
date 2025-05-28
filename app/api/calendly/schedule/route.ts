import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { start_time, event_type, invitee } = await req.json();
  const token = process.env.CALENDLY_TOKEN; // set in Vercel/env.local
  const url = "https://api.calendly.com/scheduled_events";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_type: event_type, // e.g. "https://api.calendly.com/event_types/12345"
      start_time: start_time, // ISO string
      invitee: {
        name: invitee.name,
        email: invitee.email,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err }, { status: 400 });
  }

  const data = await res.json();
  // Calendly returns a "scheduling_url" you can redirect your user to
  return NextResponse.json({ scheduling_url: data.resource.scheduling_url });
}
