"use client";
import { useRef } from "react";

type VideoPreviewProps = {
  src: string; // <-- typed properly
  className?: string;
};

export function VideoPreview({ src, className = "" }: VideoPreviewProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  return (
    <video
      ref={ref}
      className={`video-preview ${className}`}
      src={src}
      muted
      playsInline
      autoPlay
      loop
      preload="metadata"
      controls
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (!ref.current) return;
        ref.current.pause();
        ref.current.currentTime = 0;
      }}
    />
  );
}
