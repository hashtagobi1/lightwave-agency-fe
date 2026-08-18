// app/events/page.tsx
import { sanityClient } from "@/lib/sanity.client";
import { allEventsQuery } from "@/lib/sanity.queries";
import type { Event } from "../../../types/index";
import { EventsPageClient } from "@/components/site/EventsPageClient";

export const revalidate = 60; // ISR

export default async function EventsIndex() {
  const events = await sanityClient.fetch<Event[]>(allEventsQuery);

  return <EventsPageClient events={events} />;
}
