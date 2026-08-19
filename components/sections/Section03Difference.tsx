"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

const LINES = [
  "Nobody watches",
  "one reel",
  "and buys.",
  "They watch.",
  "They come back.",
  "They watch more.",
  "Then they trust you.",
];

function WavyLine({
  text,
  index,
  accent,
  scrollYProgress,
  reducedMotion,
}: {
  text: string;
  index: number;
  accent: boolean;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const stagger = index * 0.055;
  const local = useTransform(scrollYProgress, [stagger, stagger + 1 / 4.2], [0, 1]);
  // Travel is in px, not vw, on purpose: as a vw it scaled with the screen, so on
  // desktop the lines swung ~165px off the left edge and got clipped mid-sweep.
  // Fixed px gives every width the same restrained motion the phone already had.
  const x = useTransform(local, [0, 1], ["-56px", "0px"]);
  const y = useTransform(local, [0, 1], ["12px", "0px"]);
  const skewY = useTransform(local, [0, 1], ["6deg", "0deg"]);
  const opacity = useTransform(local, [0, 1], [0.06, 1]);

  return (
    <motion.div
      style={reducedMotion ? { opacity: 1 } : { x, y, skewY, opacity }}
      className={cn(
        // Sized against BOTH axes, because the block was breaking out of both.
        // 7.6vw (was 8.6): at 8.6 the longest line, "Then they trust you.", measured
        // ~98vw and ran past the right margin at every desktop width.
        // 10vh: seven lines this size plus the eyebrow, kicker and chip are taller than
        // a laptop viewport once the fixed nav takes its 64px — the eyebrow was clipped
        // off the top and the chip off the bottom. min() lets whichever axis is tighter
        // decide; on phones the width still wins, so mobile is untouched.
        "whitespace-nowrap font-[family-name:var(--font-display)] text-[min(7.6vw,10.5vh)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em] will-change-transform",
        accent ? "text-accent" : "text-ink",
      )}
    >
      {text}
    </motion.div>
  );
}

export function SectionDifference() {
  const wrapRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={wrapRef} className="relative h-[340vh] pt-[12vh]">
      {/* pt-16 clears the fixed nav — without it the eyebrow rendered underneath it. */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-[5vw] pt-16">
        <p className="eyebrow mb-4">The difference</p>

        <div className="flex flex-col items-start">
          {LINES.map((text, i) => (
            <WavyLine
              key={text}
              text={text}
              index={i}
              accent={i === LINES.length - 1}
              scrollYProgress={scrollYProgress}
              reducedMotion={!!reducedMotion}
            />
          ))}
        </div>

        <p className="mt-8 max-w-[520px] text-[15px] leading-[1.65] text-ink-dim">
          Cutting the ums and ahs and tossing in b-roll doesn&apos;t keep them watching.
          So we edit for retention —{" "}
          <strong className="font-medium text-ink">
            and when people watch longer, the platforms show your videos to more people.
          </strong>
        </p>

        <span className="mt-4 inline-block w-fit rounded-[3px] border border-accent/35 px-[11px] py-[5px] font-[family-name:var(--font-mono)] text-[12px] tracking-[0.08em] text-accent">
          WE CALL IT TIME ON BRAND
        </span>

        <motion.div
          className="absolute inset-x-0 bottom-0 h-[2px] bg-accent"
          style={{ width: progressWidth }}
        />
      </div>
    </section>
  );
}
