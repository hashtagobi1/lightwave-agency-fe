// src/components/site/EventsPageClient.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Event } from "../../../types/index";
import { EventsGrid } from "@/components/site/EventsGrid";

export function EventsPageClient({ events }: { events: Event[] }) {
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
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-sm text-black/60 mt-1">
            LightWave-run events — tournaments, launches and brand
            activations — and how they went.
          </p>
        </div>
        <Link href="/" className="text-sm underline">
          ← Back home
        </Link>
      </motion.div>

      {/* Gradient "stage" for the grid */}
      <section className="mt-8 rounded-2xl border border-black/5 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_55%)]">
        <div className="p-3 sm:p-4">
          <EventsGrid events={events} />
        </div>
      </section>
    </main>
  );
}
