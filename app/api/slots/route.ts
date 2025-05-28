import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start_time = searchParams.get("start_time");
  const end_time = searchParams.get("end_time");
  const event_type =
    searchParams.get("event_type") || process.env.CALENDLY_EVENT_TYPE; // set your event type URI or ID in env

  if (!start_time || !end_time || !event_type) {
    return NextResponse.json(
      {
        error:
          "Missing required query parameters: start_time, end_time, and event_type",
      },
      { status: 400 }
    );
  }

  const token = process.env.CALENDLY_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Missing CALENDLY_TOKEN in environment" },
      { status: 500 }
    );
  }

  // Fetch time slots from Calendly
  const url = `https://api.calendly.com/event_types/${event_type}/time_slots?start_time=${encodeURIComponent(
    start_time
  )}&end_time=${encodeURIComponent(end_time)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();
  // data.collection contains an array of time_slot objects
  return NextResponse.json({
    collection: data.collection,
    next_page: data.page_token,
  });
}
