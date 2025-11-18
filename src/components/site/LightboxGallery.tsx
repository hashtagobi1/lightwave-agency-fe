"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type LightboxImage = {
  url: string;
  alt: string;
};

export function LightboxGallery({ images }: { images: LightboxImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const prev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid sm:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openAt(i)}
            className="relative aspect-video cursor-pointer rounded-xl bg-black/5 border border-black/10 overflow-hidden focus:outline-none focus:ring-2 focus:ring-black/40"
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
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

            {/* Image */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/20 bg-black">
              <Image
                src={images[index].url}
                alt={images[index].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Prev / Next */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-white/90 text-black p-2 shadow hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-white/90 text-black p-2 shadow hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Counter */}
            {images.length > 1 && (
              <div className="mt-2 text-center text-xs text-white/70">
                {index + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
