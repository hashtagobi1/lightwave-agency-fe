"use client";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Roster } from "@/components/site/Roster";
import { Book } from "@/components/site/Book";
import { Contact } from "@/components/site/Contact";
import { useActiveSection } from "@/components/hooks/useActiveSection";
import { useCallback } from "react";
import { Project } from "../../../types/project";

export default function HomeClient({ projects }: { projects: Project[] }) {
  const ids = ["top", "work", "roster", "book", "contact"];
  const active = useActiveSection(ids, true);

  const onHomeScroll = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }, []);

  return (
    <>
      <Header onHomeScroll={onHomeScroll} />
      <Hero />
      <SelectedWork projects={projects} />
      <Roster
        items={[
          {
            name: "Director A",
            style: "Observational • Human • Documentary",
            link: "#",
          },
          {
            name: "Director B",
            style: "Stylised • Social-first • Fashion",
            link: "#",
          },
          {
            name: "Director C",
            style: "Narrative • Gen-Z • Real world",
            link: "#",
          },
        ]}
      />
      <Book />
      <Contact />
    </>
  );
}
