// app/events/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { allEventsQuery, eventBySlugQuery } from "@/lib/sanity.queries";
import { LightboxGallery } from "@/components/site/LightboxGallery";
import { MoreEvents } from "@/components/site/MoreEvents";
import { VideoPreview } from "@/components/site/VideoPreview";

export const runtime = "nodejs";

// helper to safely get slug string from different shapes
const getSlugValue = (item: any): string => {
  if (!item) return "";
  const slug = item.slug;
  if (typeof slug === "string") return slug;
  if (slug && typeof slug.current === "string") return slug.current;
  return "";
};

const formatDate = (date?: string) => {
  if (!date) return null;
  try {
    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
};

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [event, all] = await Promise.all([
    sanityClient.fetch(eventBySlugQuery, { slug }),
    sanityClient.fetch(allEventsQuery),
  ]);

  if (!event) return notFound();

  const currentSlug = getSlugValue(event);

  let index = all.findIndex((e: any) => getSlugValue(e) === currentSlug);
  if (index === -1) index = 0;

  const prevIndex = (index - 1 + all.length) % all.length;
  const nextIndex = (index + 1) % all.length;
  const prevSlug = getSlugValue(all[prevIndex]);
  const nextSlug = getSlugValue(all[nextIndex]);

  const others = all.filter((e: any) => getSlugValue(e) !== currentSlug);
  const rotated =
    others.length > 0
      ? others
          .slice(index % others.length)
          .concat(others.slice(0, index % others.length))
      : [];
  const recommendations = rotated.slice(0, 3);

  // ---- MEDIA ARRAYS FROM GROQ PROJECTIONS ----
  const videoFileUrls: string[] = event.videoFileUrls ?? [];
  const images: any[] = event.images ?? [];
  const stats: { label?: string; value?: string }[] = event.stats ?? [];
  const partners: { _id: string; name?: string; url?: string; logoUrl?: string }[] =
    event.partners ?? [];

  const hasEmbed = Boolean(event.videoUrl);
  const hasUploadedVideos = videoFileUrls.length > 0;
  const hasImages = images.length > 0;

  // hero priority: embed > first uploaded video > first image
  const heroVideoEmbed = hasEmbed ? event.videoUrl : null;
  const heroVideoFile =
    !heroVideoEmbed && hasUploadedVideos ? videoFileUrls[0] : null;
  const heroImage =
    !heroVideoEmbed && !heroVideoFile && hasImages ? images[0] : null;

  // extras (non-hero)
  const extraVideoFiles =
    heroVideoFile && videoFileUrls.length > 1
      ? videoFileUrls.slice(1)
      : heroVideoFile
        ? []
        : videoFileUrls;

  const galleryImages = images
    .filter((img) => img && img.url)
    .map((img, i) => ({
      url: img.url as string,
      alt: `${event.title ?? "Event"} photo ${i + 1}`,
    }));

  const isUpcoming = event.date
    ? new Date(event.date).getTime() > Date.now()
    : false;

  return (
    <section>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link href="/events" className="text-sm underline">
          ← All events
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            {event.title}
          </h1>
          {isUpcoming && (
            <span className="rounded-full bg-black text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-1">
              Upcoming
            </span>
          )}
        </div>

        {event.note ? (
          <p className="text-black/70 mt-1">{event.note}</p>
        ) : null}

        <p className="text-sm text-black/60 mt-2">
          {[event.venue, formatDate(event.date)].filter(Boolean).join(" • ")}
        </p>

        {event.ticketUrl && (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 rounded-lg bg-black text-white text-sm font-medium px-4 py-2 hover:bg-black/80"
          >
            {isUpcoming ? "Get tickets →" : "View ticket page →"}
          </a>
        )}

        {/* Main layout: hero media + summary */}
        <div className="mt-6 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* HERO MEDIA */}
            <div className="relative">
              {heroVideoEmbed ? (
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10">
                  <iframe
                    title={event.title}
                    className="w-full h-full"
                    src={heroVideoEmbed}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : heroVideoFile ? (
                <div className="aspect-video w-full overflow-hidden rounded-xl border object-cover border-black/10 bg-black">
                  <video
                    className="w-full h-full"
                    src={heroVideoFile}
                    controls
                    autoPlay
                    muted
                    loop
                    preload="metadata"
                    playsInline
                  />
                </div>
              ) : heroImage && heroImage.url ? (
                <div className="cursor-pointer aspect-video w-full overflow-hidden rounded-xl border border-black/10 bg-black/5 relative">
                  <Image
                    src={heroImage.url}
                    alt={event.title ?? "Event photo"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-black/5 border border-black/10 grid place-items-center text-black/40 text-xs">
                  Media placeholder
                </div>
              )}

              {/* Prev/Next arrows */}
              {prevSlug && (
                <Link
                  href={`/events/${prevSlug}`}
                  aria-label="Previous event"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
                >
                  ←
                </Link>
              )}
              {nextSlug && (
                <Link
                  href={`/events/${nextSlug}`}
                  aria-label="Next event"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
                >
                  →
                </Link>
              )}
            </div>

            {/* EXTRA MEDIA: more videos + images */}
            {(extraVideoFiles.length > 0 || galleryImages.length > 1) && (
              <div className="mt-6 space-y-4">
                {extraVideoFiles.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-black/70">
                      Additional videos
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {extraVideoFiles.map((url: string, i: number) => (
                        <div
                          key={i}
                          className="aspect-video rounded-xl border border-black/10 bg-black overflow-hidden"
                        >
                          <VideoPreview src={url} className="w-full h-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {galleryImages.length > 1 && (
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-black/70">
                      Gallery
                    </h2>
                    <LightboxGallery images={galleryImages} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Recap summary card */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-black/10 p-4">
              <div className="uppercase tracking-widest text-xs text-black/60">
                Event recap
              </div>

              <div className="mt-3 space-y-1 text-xs text-black/70">
                {event.format && (
                  <p>
                    <span className="font-semibold">Format:</span>{" "}
                    {event.format}
                  </p>
                )}
                {event.venue && (
                  <p>
                    <span className="font-semibold">Venue:</span>{" "}
                    {event.venue}
                  </p>
                )}
                {event.date && (
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {formatDate(event.date)}
                  </p>
                )}
              </div>

              {stats.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {stats.map((s, i) => (
                    <div key={i}>
                      <div className="text-lg font-bold leading-none">
                        {s.value}
                      </div>
                      <div className="text-[11px] text-black/60 mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 space-y-2 text-sm">
                {event.about && (
                  <p>
                    <span className="font-semibold">About:</span>{" "}
                    {event.about}
                  </p>
                )}
                {event.impact && (
                  <p>
                    <span className="font-semibold">Result:</span>{" "}
                    {event.impact}
                  </p>
                )}
              </div>

              {partners.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-black/70 mb-2">
                    Partners
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {partners.map((p) =>
                      p.url ? (
                        <a
                          key={p._id}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-black/10 px-3 py-1 text-xs hover:bg-black/5"
                        >
                          {p.name}
                        </a>
                      ) : (
                        <span
                          key={p._id}
                          className="rounded-full border border-black/10 px-3 py-1 text-xs"
                        >
                          {p.name}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width "Recap" */}
        {event.recap && (
          <div className="mt-10 rounded-xl border border-black/10 p-6">
            <h2 className="text-lg font-semibold">How it went</h2>
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-line">
              {event.recap}
            </p>
          </div>
        )}

        {/* Recommendations */}
        <MoreEvents items={recommendations} />
      </div>
    </section>
  );
}
