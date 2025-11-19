"use client";

import { useRef } from "react";

type VideoPreviewProps = {
  src: string;
  className?: string;
};

export function VideoPreview({ src, className = "" }: VideoPreviewProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      muted
      playsInline
      preload="metadata"
      controls
      onMouseEnter={() => {
        if (!ref.current) return;
        ref.current.play().catch(() => {
          // ignore autoplay failures
        });
      }}
      onMouseLeave={() => {
        if (!ref.current) return;
        ref.current.pause();
        ref.current.currentTime = 0;
      }}
    />
  );
}
