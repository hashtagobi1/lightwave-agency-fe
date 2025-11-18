// src/components/site/ProjectsGrid.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "../../../types";

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

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((p) => {
        const slug =
          typeof p.slug === "string" ? p.slug : (p as any).slug?.current;

        const videoFiles = (p as any).videoFileUrls ?? [];
        const audioFiles = p.audioFiles ?? [];
        const images = p.images ?? [];

        const heroVideoEmbed = p.videoUrl ?? null;
        const heroVideoFile =
          !heroVideoEmbed && videoFiles[0] ? videoFiles[0] : null;
        const heroImage =
          !heroVideoEmbed && !heroVideoFile && images[0] ? images[0] : null;
        const heroAudio =
          !heroVideoEmbed && !heroVideoFile && !heroImage && audioFiles[0]
            ? audioFiles[0]
            : null;

        return (
          <motion.div
            key={p._id}
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="h-full"
          >
            <Link
              href={`/projects/${slug}`}
              className="group block h-full border border-black/10 rounded-xl p-4 hover:bg-black/[0.02] transition-colors"
            >
              <div className="relative aspect-video rounded-lg bg-black/5 border border-black/10 mb-3 overflow-hidden">
                {heroVideoEmbed ? (
                  <iframe
                    aria-label={`Video embed for ${p.title}`}
                    className="w-full h-full"
                    src={heroVideoEmbed}
                  />
                ) : heroVideoFile ? (
                  <video
                    aria-label={`Video file for ${p.title}`}
                    className="w-full h-full"
                    src={heroVideoFile}
                    controls
                    playsInline
                  />
                ) : heroImage ? (
                  <div className="w-full h-full bg-black/10" />
                ) : heroAudio ? (
                  <div className="flex flex-col items-center justify-center h-full p-3">
                    <span className="px-2 py-0.5 mb-2 text-[10px] font-semibold bg-blue-600 text-white rounded">
                      AUDIO
                    </span>
                    <audio controls src={heroAudio.url} />
                    <p className="text-[10px] mt-1">{heroAudio.label}</p>
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[11px] text-black/50 px-2 text-center">
                    Media coming soon
                  </div>
                )}
              </div>

              <h2 className="font-semibold leading-snug group-hover:underline">
                {p.title}
              </h2>

              {p.note && <p className="text-xs text-black/60 mt-1">{p.note}</p>}

              {(p.client || p.year) && (
                <p className="text-xs text-black/60 mt-1">
                  {p.client}
                  {p.client && p.year ? " • " : ""}
                  {p.year}
                </p>
              )}
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
