// src/components/site/ProjectsPageClient.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "../../../types/index";
import { ProjectsGrid } from "@/components/site/ProjectsGrid";

export function ProjectsPageClient({ projects }: { projects: Project[] }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <motion.div
        className="flex items-center justify-between gap-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1], // cubic-bezier, TS-safe
        }}
      >
        <div>
          <h1 className="text-3xl font-bold">All projects</h1>
          <p className="text-sm text-black/60 mt-1">
            A selection of LightWave work across music, brands and live
            performance.
          </p>
        </div>
        <Link href="/" className="text-sm underline">
          ← Back home
        </Link>
      </motion.div>

      {/* Gradient “stage” for the grid */}
      <section className="mt-8 rounded-2xl border border-black/5 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_55%)]">
        <div className="p-3 sm:p-4">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
    </main>
  );
}
