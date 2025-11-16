import { Project } from "../../types/project";

export const projects: Project[] = [
  {
    slug: "street-portraits",
    title: "English National Ballet",
    note: ":60 social cut",
    problem: "Launch needed authentic city energy without big unit permits.",
    result: "+38% view-through on IG Reels; CPM down 24% vs benchmark.",
    description:
      "Observational portraits across local boroughs. Minimal kit, natural light, real community casting. Modular deliverables for social-first rollout.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    slug: "minimal-studio-launch",
    title: "Product Launch — Minimal Studio",
    note: "UGC + OOH",
    problem:
      "New product needed social-first assets that felt native, not ads.",
    result: "Saved 3 shoot days by hybrid UGC approach; 2.1x higher saves.",
    description:
      "Blended controlled studio setups with creator capture to deliver a modular asset pack: 9 cutdowns, 6 stories, 1 key visual.",
    images: ["/p1.jpg", "/p2.jpg", "/p3.jpg"],
  },
  {
    slug: "everyday-magic-docu",
    title: "Docu Short — Everyday Magic",
    note: "Festival selection",
    problem: "Tight timeline to find story beats in uncontrolled locations.",
    result: "Delivered festival cut in 10 days; won ‘Audience Favourite’.",
    description:
      "Run-and-gun documentary about quiet rituals. Handheld, natural sound beds, minimal interviews, quick-turn edit.",
    videoUrl: "https://player.vimeo.com/video/76979871",
  },
];

export const topThree = projects.slice(0, 3);
