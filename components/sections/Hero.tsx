"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useScroll } from "framer-motion";
import { CTA_PRIMARY, CTA_WORK } from "@/lib/brand";

/**
 * 01 · Hero — scroll-morph footage (mockups/hero-v1-scroll-morph.html).
 *
 * Adapted from the mockup in one meaningful way: the mockup hijacks the wheel
 * (preventDefault + a virtual scroll counter), which traps the visitor on a
 * long-scroll page. Here the same choreography is driven by REAL page scroll
 * through a tall wrapper with a sticky viewport — the pattern sections 03 and
 * 05 already use.
 */

const IMAGES = [
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=200&q=70",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&q=70",
  "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=200&q=70",
  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&q=70",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&q=70",
  "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=200&q=70",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=70",
  "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=200&q=70",
  "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&q=70",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=200&q=70",
  "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=200&q=70",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=200&q=70",
  "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?w=200&q=70",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&q=70",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=200&q=70",
  "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=200&q=70",
];

const TIMECODES = [
  "00:04:12", "00:11:08", "00:22:47", "00:03:55",
  "00:47:01", "00:15:33", "00:08:19", "00:31:02",
];

const TOTAL = IMAGES.length;
/** Fraction of the scroll range spent morphing circle → arc. Matches the mockup's 700/2200. */
const MORPH_END = 0.32;

/** Deterministic pseudo-random so the server and client render the same scatter. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const SCATTER = Array.from({ length: TOTAL }, (_, i) => ({
  x: (seeded(i, 1) - 0.5) * 1400,
  y: (seeded(i, 2) - 0.5) * 900,
  rot: (seeded(i, 3) - 0.5) * 160,
  scale: 0.6,
  opacity: 0,
}));

type Pose = { x: number; y: number; rot: number; scale: number; opacity: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phaseRef = useRef<"scatter" | "line" | "arc">("scatter");
  const reducedMotion = useReducedMotion();
  const [ctaLive, setCtaLive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (reducedMotion) {
      phaseRef.current = "arc";
      setCtaLive(true);
      return;
    }
    const a = setTimeout(() => (phaseRef.current = "line"), 500);
    const b = setTimeout(() => (phaseRef.current = "arc"), 2200);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const current: Pose[] = Array.from({ length: TOTAL }, () => ({
      x: 0, y: 0, rot: 0, scale: 1, opacity: 0,
    }));
    let raf = 0;

    function targetFor(i: number, morph: number, rotateProgress: number): Pose {
      const phase = phaseRef.current;
      if (phase === "scatter") return SCATTER[i];

      if (phase === "line") {
        const spacing = 68;
        return { x: i * spacing - (TOTAL * spacing) / 2, y: 0, rot: 0, scale: 1, opacity: 1 };
      }

      const rect = stageRef.current?.getBoundingClientRect();
      const w = rect?.width ?? 1280;
      const h = rect?.height ?? 720;
      const isMobile = w < 768;

      const circleRadius = Math.min(Math.min(w, h) * 0.32, 320);
      const circleAngle = (i / TOTAL) * 360;
      const circleRad = (circleAngle * Math.PI) / 180;
      const circle = {
        x: Math.cos(circleRad) * circleRadius,
        y: Math.sin(circleRad) * circleRadius,
        rot: circleAngle + 90,
      };

      const arcRadius = Math.min(w, h * 1.5) * (isMobile ? 1.5 : 1.15);
      const arcCenterY = h * (isMobile ? 0.42 : 0.3) + arcRadius;
      const spread = isMobile ? 95 : 125;
      const angle =
        -90 - spread / 2 + (i * spread) / (TOTAL - 1) - rotateProgress * spread * 0.75;
      const arcRad = (angle * Math.PI) / 180;
      const arc = {
        x: Math.cos(arcRad) * arcRadius,
        y: Math.sin(arcRad) * arcRadius + arcCenterY,
        rot: angle + 90,
        scale: isMobile ? 1.3 : 1.6,
      };

      return {
        x: lerp(circle.x, arc.x, morph),
        y: lerp(circle.y, arc.y, morph),
        rot: lerp(circle.rot, arc.rot, morph),
        scale: lerp(1, arc.scale, morph),
        opacity: 1,
      };
    }

    function tick() {
      const p = scrollYProgress.get();
      const morph = reducedMotion ? 1 : clamp01(p / MORPH_END);
      const rotateProgress = reducedMotion ? 0 : clamp01((p - MORPH_END) / (1 - MORPH_END));
      // Snap instantly under reduced motion; ease toward the target otherwise.
      const ease = reducedMotion ? 1 : 0.12;

      for (let i = 0; i < TOTAL; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const c = current[i];
        const t = targetFor(i, morph, rotateProgress);
        c.x = lerp(c.x, t.x, ease);
        c.y = lerp(c.y, t.y, ease);
        c.rot = lerp(c.rot, t.rot, ease);
        c.scale = lerp(c.scale, t.scale, ease);
        c.opacity = lerp(c.opacity, t.opacity, reducedMotion ? 1 : 0.15);
        el.style.transform = `translate(${c.x}px, ${c.y}px) rotate(${c.rot}deg) scale(${c.scale})`;
        el.style.opacity = String(c.opacity);
      }

      const reveal = clamp01((morph - 0.7) / 0.3);
      if (introRef.current) introRef.current.style.opacity = String(Math.max(0, 1 - morph * 2));
      if (arcRef.current) {
        arcRef.current.style.opacity = String(reveal);
        arcRef.current.style.transform = `translate(-50%, ${lerp(20, 0, reveal)}px)`;
      }
      if (fillRef.current) fillRef.current.style.width = `${p * 100}%`;
      setCtaLive((live) => (live === morph > 0.75 ? live : morph > 0.75));

      raf = requestAnimationFrame(tick);
    }

    // Only animate while the hero is on screen — the loop would otherwise keep
    // repainting for the entire length of the page.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(tick);
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    if (wrapRef.current) observer.observe(wrapRef.current);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion, scrollYProgress]);

  return (
    <section ref={wrapRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(232,72,60,0.10),transparent_70%)]">
        <p className="eyebrow absolute left-1/2 top-24 z-20 flex -translate-x-1/2 items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
          Video post-production
        </p>

        {/* Pre-scroll state */}
        <div
          ref={introRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-[5] w-[90%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <p className="font-[family-name:var(--font-display)] text-[clamp(24px,4vw,38px)] font-semibold tracking-[-0.01em] text-ink-dim">
            Raw footage. Waiting to be edited.
          </p>
          <p className="mt-[18px] font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-ink-dim opacity-60">
            SCROLL TO SEE THE CUT
          </p>
        </div>

        {/* The headline, revealed as the cards settle into the arc */}
        <div
          ref={arcRef}
          style={{ opacity: 0 }}
          className={`absolute left-1/2 top-[8%] z-10 w-[90%] max-w-[640px] -translate-x-1/2 text-center ${
            ctaLive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(30px,5vw,52px)] font-bold leading-[1.08] tracking-[-0.02em]">
            If it goes on the internet, we edit it.
          </h1>
          <p className="mx-auto mt-5 max-w-[460px] text-[15px] leading-[1.6] text-ink-dim">
            Podcasts, YouTube, reels, shorts, webinars, promos. Every one of them edited around your
            brand story, so everything you publish looks unmistakably yours.
          </p>
          <p className="mt-3.5 font-[family-name:var(--font-mono)] text-xs tracking-[0.06em] text-accent">
            Editing you don&apos;t have to double-check.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={CTA_PRIMARY.href}
              className="rounded border border-accent bg-accent px-[22px] py-3 text-[13px] font-medium text-white transition-colors hover:bg-accent-dark"
            >
              {CTA_PRIMARY.label}
            </a>
            <a
              href={CTA_WORK.href}
              className="rounded border border-line px-[22px] py-3 text-[13px] font-medium text-ink transition-colors hover:border-ink-dim"
            >
              {CTA_WORK.label}
            </a>
          </div>
        </div>

        <div ref={stageRef} className="relative h-full w-full">
          {IMAGES.map((src, i) => (
            <div
              key={`${src}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
              className="group absolute left-1/2 top-1/2 -ml-[31px] -mt-11 h-[88px] w-[62px] cursor-pointer [perspective:600px] will-change-transform"
            >
              <div className="relative h-full w-full transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.4)] [backface-visibility:hidden]">
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover saturate-90 contrast-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent to-50%" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg border border-line bg-surface-2 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <span className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.05em] text-accent">
                    {TIMECODES[i % TIMECODES.length]}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[7px] tracking-[0.1em] text-ink-dim">
                    SELECT
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-ink-dim">
          <span>SCROLL</span>
          <span className="relative block h-0.5 w-[90px] overflow-hidden rounded-sm bg-line">
            <span ref={fillRef} className="absolute inset-y-0 left-0 block w-0 bg-accent" />
          </span>
        </div>
      </div>
    </section>
  );
}
