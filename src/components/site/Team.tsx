// src/components/site/Team.tsx
"use client";

import Image from "next/image";
import type { TeamMember } from "../../../types/index";

export function Team({ members }: { members: TeamMember[] }) {
  if (!members || members.length === 0) return null;
  console.log({ members });

  return (
    <section
      id="team"
      className="border-y border-black/10 bg-white"
      aria-label="Team"
    >
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Team</h2>
            <p className="text-sm text-black/60 mt-1">
              The people behind LightWave direction, production and strategy.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <article
              key={m._id}
              className="rounded-xl border border-black/10 bg-white/80 p-4 flex gap-4"
            >
              {m.photoUrl ? (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-black/10 bg-black/5">
                  <Image
                    src={m.photoUrl}
                    alt={m.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-16 w-16 shrink-0 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-xs text-black/50">
                  {m.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}

              <div>
                <h3 className="font-semibold leading-tight">{m.name}</h3>
                {m.title && (
                  <p className="text-xs text-black/60 mt-0.5">{m.title}</p>
                )}
                {m.description && (
                  <p className="text-xs text-black/70 mt-2 text-justify ">
                    {m.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
