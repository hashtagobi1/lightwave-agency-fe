// src/components/site/Hero.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroCanvas } from "@/components/site/HeroCanvas";

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax only really matters on larger screens visually
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" ref={ref} className="relative">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 md:py-20 grid lg:grid-cols-12 gap-8 md:gap-10 items-center">
        {/* Text block */}
        <div className="lg:col-span-7">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Creative agency creating culture and conversation.
          </h1>
          <p className="mt-4 text-black/70 max-w-xl text-sm sm:text-base">
            Light Wave partners with brands to capture life as it’s lived —
            clean, social-first, and culture-tuned.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/#book" className="flex items-center gap-2">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            {/* Flirty “View work” button */}
            <motion.div
              initial={{ y: 0, rotate: 0, scale: 1 }}
              animate={{
                y: [0, -3, 0, -2, 0],
                rotate: [0, -1.5, 0, 1.5, 0],
                scale: [1, 1.03, 1, 1.02, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            >
              <Button variant="outline" asChild>
                <Link href="/projects">View work</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* 3D block */}
        <div className="lg:col-span-5 mt-8 lg:mt-0">
          {/* Mobile / tablet: no parallax, just a clean card */}
          <div className="block lg:hidden">
            <div className="h-56 sm:h-64 rounded-2xl border border-black/10 bg-white overflow-hidden">
              <HeroCanvas />
            </div>
          </div>

          {/* Desktop: parallax version */}
          <motion.div style={{ y: y1 }} className="hidden lg:block">
            <div className="h-72 xl:h-80 rounded-2xl border border-black/10 bg-white overflow-hidden">
              <HeroCanvas />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
