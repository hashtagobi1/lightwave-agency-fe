// src/components/site/RecentEvents.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";
import type { Event } from "../../../types";
import { getVideoEmbed } from "@/lib/embeds";

const formatDate = (date?: string) => {
  if (!date) return null;
  try {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return null;
  }
};

export function RecentEvents({ events }: { events: Event[] }) {
  // Only featured events should be shown, most recent first
  const featured = events.filter((e) => (e as any).featured).slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section id="events" className="border-y border-black/10">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold">Recent Events</h2>
          <Link
            className="text-sm text-black/60 hover:text-black"
            href="/events"
          >
            All events →
          </Link>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((e) => {
            const heroImageUrl = (e as any).heroImageUrl ?? null;
            const images = (e as any).images ?? [];
            const heroVideoEmbed = getVideoEmbed((e as any).heroVideo);
            const thumbUrl = heroImageUrl ?? images[0]?.url ?? null;

            const slug =
              typeof e.slug === "string" ? e.slug : (e as any).slug?.current;

            return (
              <Card
                key={slug ?? e._id}
                className="bg-transparent border-black/10"
              >
                <CardHeader>
                  <CardTitle>{e.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  {/* HERO MEDIA */}
                  <div className="relative aspect-video rounded-xl bg-black/5 border border-black/10 mb-3 overflow-hidden">
                    {thumbUrl ? (
                      <Image
                        src={thumbUrl}
                        alt={e.title ?? "Event cover image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : heroVideoEmbed ? (
                      <iframe
                        aria-label={`Recap video for ${e.title}`}
                        title={e.title}
                        className="w-full h-full"
                        src={heroVideoEmbed.src}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[11px] text-black/50 px-2 text-center">
                        Media coming soon
                      </div>
                    )}
                  </div>

                  {/* NOTE + VENUE/DATE */}
                  {e.note && (
                    <p className="mt-2 text-sm text-black/60">{e.note}</p>
                  )}
                  {(e.venue || e.date) && (
                    <p className="text-xs text-black/60 mt-1">
                      {e.venue}
                      {e.venue && e.date ? " • " : ""}
                      {formatDate(e.date)}
                    </p>
                  )}

                  {/* IMPACT */}
                  {e.impact && (
                    <div className="mt-4 space-y-2 text-sm">
                      <p className="line-clamp-3">
                        <span className="font-semibold">Result:</span>{" "}
                        {e.impact}
                      </p>
                    </div>
                  )}

                  <div className="mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/events/${slug}`}>View recap</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
