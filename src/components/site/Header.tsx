"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui";
import { CalendarDays } from "lucide-react";

export function Header({
  onHomeScroll,
}: {
  onHomeScroll?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const links = ["work", "team", "book", "contact"] as const;

  const click = (id: string) => (e: React.MouseEvent) => {
    if (onHomeScroll) {
      e.preventDefault();
      onHomeScroll(id);
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          LIGHT WAVE
        </Link>

        <nav
          className="hidden sm:flex items-center gap-6 text-sm"
          aria-label="Primary"
        >
          {links.map((id) => (
            <Link
              key={id}
              href={`/#${id}`}
              onClick={click(id)}
              className="opacity-80 hover:opacity-100"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </Link>
          ))}
          <Link href="/projects" className="hover:opacity-100">
            All projects
          </Link>
        </nav>

        <div className="sm:hidden flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link
              href="/#book"
              onClick={click("book")}
              className="flex items-center gap-2"
            >
              <CalendarDays className="h-4 w-4" /> Book
            </Link>
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-lg border border-black/10 px-3 py-2 text-sm hover:bg-black/5"
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="sm:hidden border-t border-black/10 bg-white"
        >
          <div className="mx-auto max-w-7xl px-4 py-3 grid gap-2">
            {links.map((id) => (
              <Link
                key={id}
                href={`/#${id}`}
                onClick={click(id)}
                className="rounded-lg px-3 py-2 text-sm hover:bg-black/5"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            ))}
            <Link
              href="/projects"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm hover:bg-black/5"
            >
              All projects
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
