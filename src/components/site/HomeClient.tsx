// src/components/site/HomeClient.tsx
"use client";

import { Hero } from "@/components/site/Hero";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Team } from "@/components/site/Team";
import { Book } from "@/components/site/Book";
import { Contact } from "@/components/site/Contact";
import { Partners } from "@/components/site/Partners";
import { useActiveSection } from "@/components/hooks/useActiveSection";
import { motion } from "framer-motion";
import type { Brand, TeamMember, Project } from "../../../types/index";

export default function HomeClient({
  projects,
  brands,
  team,
}: {
  projects: Project[];
  brands: Brand[];
  team: TeamMember[];
}) {
  const ids = ["top", "work", "partners", "team", "book", "contact"];
  const active = useActiveSection(ids, true);
  const featuredProjects = projects.filter((p) => p.featured);
  console.log({ featuredProjects, projects });


  // helper for consistent animation
  const sectionAnim = (delayIndex: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.1 + delayIndex * 0.08,
    },
  });

  return (
    <div className="relative">
      {/* subtle global gradient behind homepage sections */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_55%)]" />

      {/* Hero */}
      <motion.section id="top" {...sectionAnim(0)}>
        <Hero />
      </motion.section>

      {/* Selected work */}
      <motion.section {...sectionAnim(1)}>
        <SelectedWork projects={featuredProjects} />
      </motion.section>

      {/* Partners */}
      <motion.section {...sectionAnim(2)}>
        <Partners brands={brands} />
      </motion.section>

      {/* Team */}
      <motion.section {...sectionAnim(3)}>
        <Team members={team} />
      </motion.section>

      {/* Book */}
      <motion.section {...sectionAnim(4)}>
        <Book />
      </motion.section>

      {/* Contact */}
      <motion.section {...sectionAnim(5)}>
        <Contact />
      </motion.section>
    </div>
  );
}
