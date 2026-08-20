"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { placeholder } from "@/lib/placeholder";

const OUTPUTS = ["SHORTS", "CLIPS", "LONG-FORM", "REELS", "PROMOS"];

// Bright red, not the light-theme red: this section runs inside the inverted
// passage, where the paths finally get to glow against dark.
const PATHS = [
  { d: "M500,120 C500,340 180,480 90,700", color: "var(--color-invert-accent)" },
  { d: "M500,120 C500,340 330,500 290,700", color: "#B93A30" },
  { d: "M500,120 C500,400 500,520 500,700", color: "var(--color-invert-dim)" },
  { d: "M500,120 C500,340 670,500 710,700", color: "#B93A30" },
  { d: "M500,120 C500,340 820,480 910,700", color: "var(--color-invert-accent)" },
];

const FORMATS = [
  { name: "VIDEO PODCASTS", ratio: "16:9", img: placeholder(5, "16:9") },
  { name: "YOUTUBE LONG-FORM", ratio: "16:9", img: placeholder(6, "16:9") },
  { name: "REELS / TIKTOKS / SHORTS", ratio: "9:16", img: placeholder(7, "9:16") },
  { name: "CLIP SETS", ratio: "1:1", img: placeholder(8, "1:1") },
  { name: "TALKING-HEAD", ratio: "16:9", img: placeholder(9, "16:9") },
  { name: "WEBINARS", ratio: "16:9", img: placeholder(10, "16:9") },
  { name: "PRESENTATIONS", ratio: "16:9", img: placeholder(11, "16:9") },
  { name: "PROMOS", ratio: "16:9", img: placeholder(12, "16:9") },
  { name: "STORIES", ratio: "9:16", img: placeholder(13, "9:16") },
];

const BASE_TRACK = "1fr 1fr 1fr";
const EXPAND_TRACK = ["1.9fr .8fr .8fr", ".8fr 1.9fr .8fr", ".8fr .8fr 1.9fr"];

function FanPath({
  d,
  color,
  index,
  scrollYProgress,
  reducedMotion,
}: {
  d: string;
  color: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const stagger = index * 0.07;
  const local = useTransform(scrollYProgress, [stagger, stagger + 0.5], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      style={{ pathLength: reducedMotion ? 1 : local }}
    />
  );
}

function FanLabel({
  text,
  index,
  scrollYProgress,
  reducedMotion,
}: {
  text: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const stagger = index * 0.07;
  const opacity = useTransform(scrollYProgress, [stagger + 0.4, stagger + 0.48], [0, 1]);
  return (
    <motion.span
      style={{ opacity: reducedMotion ? 1 : opacity }}
      className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] text-[var(--color-invert-ink)]"
    >
      {text}
    </motion.span>
  );
}

export function SectionFormats() {
  const wrapRef = useRef<HTMLElement>(null);
  const reducedMotion = !!useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const [hovered, setHovered] = useState<{ col: number; row: number } | null>(null);

  const gridColumns = hovered ? EXPAND_TRACK[hovered.col] : BASE_TRACK;
  const gridRows = hovered ? EXPAND_TRACK[hovered.row] : BASE_TRACK;

  return (
    <>
      {/* Second half of the inverted passage — carries the dark down from the
          producer block and lands it on ONE RECORDING, the root everything forks from. */}
      <section ref={wrapRef} className="relative h-[300vh] bg-[var(--color-invert-bg)]">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
          <svg
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
            viewBox="0 0 1000 800"
            preserveAspectRatio="none"
          >
            {PATHS.map((p, i) => (
              <FanPath key={p.d} {...p} index={i} scrollYProgress={scrollYProgress} reducedMotion={reducedMotion} />
            ))}
          </svg>

          {/* The root. No longer a chip — it is the thing the whole section is about. */}
          <div className="absolute left-1/2 top-[9%] flex -translate-x-1/2 flex-col items-center">
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] text-[var(--color-invert-dim)]">
              IT ALL STARTS WITH
            </p>
            <p className="mt-3 whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(26px,4.2vw,52px)] font-extrabold uppercase leading-none tracking-[-0.02em] text-[var(--color-invert-ink)]">
              One recording
            </p>
            <span className="mt-5 h-2.5 w-2.5 rounded-full bg-[var(--color-invert-accent)] shadow-[0_0_16px_var(--color-invert-accent)]" />
          </div>

          <h2 className="max-w-[760px] text-center font-[family-name:var(--font-display)] text-[clamp(26px,3.8vw,40px)] font-bold leading-[1.12] tracking-[-0.02em] text-[var(--color-invert-ink)]">
            Every format you publish to.
          </h2>
          <p className="mt-4 max-w-[540px] text-center text-[15px] leading-[1.65] text-[var(--color-invert-dim)]">
            Send us whatever you recorded — a three-hour podcast, a webinar, a phone video shot in your kitchen. We
            take it from there.
          </p>

          <div className="absolute inset-x-0 bottom-[9%] flex flex-wrap justify-around gap-2 px-[4vw]">
            {OUTPUTS.map((label, i) => (
              <FanLabel key={label} text={label} index={i} scrollYProgress={scrollYProgress} reducedMotion={reducedMotion} />
            ))}
          </div>
        </div>
      </section>

      {/* Back to light */}
      <div className="h-24 bg-[linear-gradient(to_bottom,var(--color-invert-bg),var(--color-bg))]" />

      <section className="flex min-h-screen flex-col items-center px-6 pb-[90px] pt-6">
        <p className="mb-[26px] font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-ink-dim">
          Nine formats, one workflow
        </p>
        <div
          className="grid w-full max-w-[1000px] gap-1.5 transition-[grid-template-columns,grid-template-rows] duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
          style={{ aspectRatio: "1.35", gridTemplateColumns: gridColumns, gridTemplateRows: gridRows }}
          onMouseLeave={() => setHovered(null)}
        >
          {FORMATS.map((f, i) => (
            <div
              key={f.name}
              className="group relative cursor-pointer overflow-hidden rounded-[5px] border border-line bg-surface hover:border-accent"
              onMouseEnter={() => setHovered({ col: i % 3, row: Math.floor(i / 3) })}
            >
              <img
                src={f.img}
                alt={f.name}
                className="h-full w-full object-cover saturate-[.7] brightness-[.82] transition-[filter,transform] duration-[450ms,600ms] group-hover:scale-[1.04] group-hover:saturate-100 group-hover:brightness-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent to-55" />
              <div className="absolute right-3 top-[11px] z-[2] rounded-sm bg-black/60 px-1.5 py-[3px] font-[family-name:var(--font-mono)] text-[9px] tracking-[0.08em] text-white/75">
                {f.ratio}
              </div>
              <div className="absolute bottom-[11px] left-3 z-[2] font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]">
                {f.name}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-9 max-w-[620px] text-center text-[15px] leading-[1.7] text-ink-dim">
          One recording usually becomes several pieces, and{" "}
          <strong className="font-medium text-ink">
            every one of them gets edited to hold attention on the platform it&apos;s going to.
          </strong>
        </p>
      </section>
    </>
  );
}
