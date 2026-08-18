// src/components/site/EventsGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Event } from "../../../types/index";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

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

export function EventsGrid({ events }: { events: Event[] }) {
  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {events.map((e) => {
        const slug =
          typeof e.slug === "string" ? e.slug : (e as any).slug?.current;

        const videoFiles: string[] = (e as any).videoFileUrls ?? [];
        const images: { url?: string }[] = ((e as any).images ?? []) as any[];

        const hasEmbed = Boolean(e.videoUrl);
        const hasVideoFile = videoFiles.length > 0;
        const hasImage = images.length > 0;

        const heroVideoEmbed = hasEmbed ? e.videoUrl : null;
        const heroVideoFile =
          !heroVideoEmbed && hasVideoFile ? videoFiles[0] : null;
        const heroImage =
          !heroVideoEmbed && !heroVideoFile && hasImage ? images[0] : null;

        const isUpcoming = e.date ? new Date(e.date).getTime() > Date.now() : false;

        return (
          <motion.div
            key={e._id}
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="h-full"
          >
            <Link
              href={`/events/${slug}`}
              className="group block h-full border border-black/10 rounded-xl p-4 hover:bg-black/[0.02] transition-colors"
            >
              {/* Media thumb */}
              <div className="aspect-video rounded-lg bg-black/5 border border-black/10 mb-3 overflow-hidden relative">
                {heroVideoEmbed ? (
                  <iframe
                    title={e.title}
                    className="w-full h-full"
                    src={heroVideoEmbed}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : heroVideoFile ? (
                  <video
                    className="w-full h-full"
                    src={heroVideoFile}
                    controls
                    autoPlay
                    muted
                    loop
                    preload="metadata"
                    playsInline
                    aria-label={`Video for ${e.title}`}
                  />
                ) : heroImage?.url ? (
                  <Image
                    src={heroImage.url}
                    alt={e.title ?? "Event photo"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[11px] text-black/50 px-2 text-center">
                    Media coming soon
                  </div>
                )}

                {isUpcoming && (
                  <span className="absolute top-2 left-2 rounded-full bg-black text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-1">
                    Upcoming
                  </span>
                )}
              </div>

              <h2 className="font-semibold leading-snug group-hover:underline">
                {e.title}
              </h2>

              {e.note && <p className="text-xs text-black/60 mt-1">{e.note}</p>}

              {(e.venue || e.date) && (
                <p className="text-xs text-black/60 mt-1">
                  {e.venue}
                  {e.venue && e.date ? " • " : ""}
                  {formatDate(e.date)}
                </p>
              )}

              {e.impact && (
                <p className="text-xs text-black/80 mt-2 line-clamp-2">
                  <span className="font-semibold">Result:</span> {e.impact}
                </p>
              )}

              <span className="text-xs underline mt-3 inline-block">
                View recap →
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
