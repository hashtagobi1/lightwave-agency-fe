"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

type MediaItem =
  | { type: "image"; url: string; alt: string }
  | { type: "video"; url: string; alt: string };

export function MediaLightbox({ items }: { items: MediaItem[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const prev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIndex((i) => (i - 1 + items.length) % items.length);
  };

  const next = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIndex((i) => (i + 1) % items.length);
  };

  const active = items[index];

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openAt(i)}
            className="relative aspect-video cursor-pointer rounded-xl bg-black/5 border border-black/10 overflow-hidden focus:outline-none focus:ring-2 focus:ring-black/40"
          >
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <>
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                  muted
                  preload="metadata"
                  playsInline
                  aria-label={item.alt}
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="rounded-full bg-white/90 p-2">
                    <Play className="h-4 w-4 text-black" fill="currentColor" />
                  </span>
                </span>
              </>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center px-4"
          onClick={close}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Close
            </button>

            {/* Media */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/20 bg-black">
              {active.type === "image" ? (
                <Image
                  src={active.url}
                  alt={active.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              ) : (
                <video
                  key={active.url}
                  src={active.url}
                  className="w-full h-full"
                  controls
                  autoPlay
                  playsInline
                  aria-label={active.alt}
                />
              )}
            </div>

            {/* Prev / Next */}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-white/90 text-black p-2 shadow hover:bg-white"
                  aria-label="Previous media"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-white/90 text-black p-2 shadow hover:bg-white"
                  aria-label="Next media"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Counter */}
            {items.length > 1 && (
              <div className="mt-2 text-center text-xs text-white/70">
                {index + 1} / {items.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
