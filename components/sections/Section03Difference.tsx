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
  const x = useTransform(local, [0, 1], ["-14vw", "0vw"]);
  const y = useTransform(local, [0, 1], ["3.2vw", "0vw"]);
  const skewY = useTransform(local, [0, 1], ["6deg", "0deg"]);
  const opacity = useTransform(local, [0, 1], [0.06, 1]);

  return (
    <motion.div
      style={reducedMotion ? { opacity: 1 } : { x, y, skewY, opacity }}
      className={cn(
        "whitespace-nowrap font-[family-name:var(--font-display)] text-[8.6vw] font-extrabold uppercase leading-[0.92] tracking-[-0.035em] will-change-transform",
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
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-[5vw]">
        <p className="eyebrow mb-7">The difference</p>

        <div className="flex flex-col items-start gap-[0.4vw]">
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

        <p className="mt-[5vh] max-w-[520px] text-[15px] leading-[1.65] text-ink-dim">
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
