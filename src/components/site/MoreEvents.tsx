// src/components/site/MoreEvents.tsx
import Link from "next/link";
import Image from "next/image";
import type { Event } from "../../../types/index";

type AnyEvent = Event & {
  slug?: string | { current?: string };
  heroImageUrl?: string;
  images?: { url?: string }[];
};

const getSlugValue = (item: AnyEvent): string => {
  const slug = item.slug as any;
  if (!slug) return "";
  if (typeof slug === "string") return slug;
  if (slug.current && typeof slug.current === "string") return slug.current;
  return "";
};

export function MoreEvents({ items }: { items: AnyEvent[] }) {
  if (items.length === 0) return null;

  return (
    <div className="pt-10">
      <h3 className="text-xl font-semibold">More events</h3>
      <p className="text-black/60 text-sm">Other things LightWave has run</p>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((e) => {
          const slug = getSlugValue(e);
          const images = e.images ?? [];
          const thumbUrl = e.heroImageUrl ?? images[0]?.url ?? null;

          return (
            <Link
              key={e._id}
              href={`/events/${slug}`}
              className="text-left rounded-xl border border-black/10 p-4 hover:bg-black/5"
              aria-label={`Open ${e.title}`}
            >
              <div className="relative aspect-video rounded-md bg-black/5 border border-black/10 mb-3 overflow-hidden">
                {thumbUrl ? (
                  <Image
                    src={thumbUrl}
                    alt={e.title ?? "Event thumbnail"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[11px] text-black/50 px-2 text-center">
                    Media coming soon
                  </div>
                )}
              </div>

              <div className="font-medium leading-snug">{e.title}</div>
              {e.note ? (
                <div className="text-xs text-black/60 mt-1">{e.note}</div>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
