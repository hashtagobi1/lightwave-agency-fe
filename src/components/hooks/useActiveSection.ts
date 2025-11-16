"use client";
import { useEffect, useState } from "react";

export function useActiveSection(ids: string[], enabled = true) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    if (!enabled) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target?.id) setActive((vis.target as HTMLElement).id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0.25, 0.5, 0.75] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join("|"), enabled]);
  return active;
}
