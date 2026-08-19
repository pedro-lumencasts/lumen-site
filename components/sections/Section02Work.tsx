"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Format = "long" | "clip" | "short";

const SETS: Record<Format, { raw: string; vertical: boolean }> = {
  long: { raw: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1000&q=75", vertical: false },
  clip: { raw: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1000&q=75", vertical: false },
  short: { raw: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=75", vertical: true },
};

const TABS: { key: Format; label: string }[] = [
  { key: "long", label: "LONG-FORM" },
  { key: "clip", label: "CLIP" },
  { key: "short", label: "SHORT-FORM" },
];

export function SectionWork() {
  const [format, setFormat] = useState<Format>("long");
  const monitorRef = useRef<HTMLDivElement>(null);
  const editLayerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const autoSweepRef = useRef(true);
  const reducedMotion = useReducedMotion();

  const setSplit = (pct: number) => {
    const clamped = Math.min(96, Math.max(4, pct));
    if (editLayerRef.current) editLayerRef.current.style.clipPath = `inset(0 0 0 ${clamped}%)`;
    if (handleRef.current) handleRef.current.style.left = `${clamped}%`;
  };

  const setSplitFromClientX = (clientX: number) => {
    const rect = monitorRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSplit(((clientX - rect.left) / rect.width) * 100);
  };

  useEffect(() => {
    autoSweepRef.current = !reducedMotion;
    if (reducedMotion) setSplit(50);
    let raf = 0;
    let t = 0;
    function sweep() {
      if (autoSweepRef.current) {
        t += 0.006;
        setSplit(50 + Math.sin(t) * 18);
      }
      raf = requestAnimationFrame(sweep);
    }
    raf = requestAnimationFrame(sweep);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame = (frame + 1) % 24;
      if (readoutRef.current) {
        const sec = 4 + Math.floor(frame / 24);
        readoutRef.current.textContent = `TC 00:00:${String(sec).padStart(2, "0")}:${String(frame).padStart(2, "0")}`;
      }
    }, 1000 / 24);
    return () => clearInterval(id);
  }, []);

  const set = SETS[format];

  return (
    <section className="flex min-h-screen flex-col items-center px-6 py-[90px]">
      <p className="eyebrow">The work</p>
      <h2 className="mt-[18px] max-w-[760px] text-center font-[family-name:var(--font-display)] text-[clamp(28px,4.5vw,48px)] font-bold leading-[1.1] tracking-[-0.02em]">
        Watch the difference before you read about it.
      </h2>

      <div className="mt-[34px] flex gap-1.5 rounded-md border border-line bg-surface p-[5px]">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFormat(tab.key)}
            className={cn(
              "rounded px-4 py-[9px] font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-ink-dim transition-colors",
              format === tab.key && "bg-surface-2 text-ink",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-[30px] w-full max-w-[900px]">
        <div
          ref={monitorRef}
          className={cn(
            "relative aspect-video w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-md border border-line bg-black",
            set.vertical && "mx-auto aspect-[9/16] max-w-[340px]",
          )}
          onPointerDown={(e) => {
            draggingRef.current = true;
            autoSweepRef.current = false;
            monitorRef.current?.setPointerCapture(e.pointerId);
            setSplitFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (draggingRef.current) setSplitFromClientX(e.clientX);
          }}
          onPointerUp={() => {
            draggingRef.current = false;
          }}
          onPointerLeave={() => {
            draggingRef.current = false;
          }}
        >
          <div className="absolute inset-0">
            <img
              src={set.raw}
              alt="raw footage"
              className="block h-full w-full object-cover [filter:grayscale(.85)_contrast(.82)_brightness(.82)_saturate(.5)]"
            />
          </div>
          <div ref={editLayerRef} className="absolute inset-0 [clip-path:inset(0_0_0_50%)]">
            <img
              src={set.raw}
              alt="edited footage"
              className="block h-full w-full object-cover [filter:saturate(1.18)_contrast(1.12)_brightness(1.04)]"
            />
          </div>
          <div className="absolute left-[14px] top-[14px] rounded-[3px] border border-line bg-black/70 px-2.5 py-[5px] font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em] text-ink-dim">
            ORDINARY EDIT
          </div>
          <div className="absolute right-[14px] top-[14px] rounded-[3px] bg-accent px-2.5 py-[5px] font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em] text-white">
            OURS
          </div>
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-accent shadow-[0_0_14px_rgba(232,72,60,0.6)]" ref={handleRef}>
            <div className="absolute left-1/2 top-1/2 flex h-[42px] w-[42px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-[14px] text-white">
              ↔
            </div>
          </div>
          <div
            ref={readoutRef}
            className="absolute bottom-3 left-[14px] rounded-[3px] bg-black/50 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] text-ink/60"
          >
            TC 00:00:04:12
          </div>
        </div>
        <p className="mt-4 text-center font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] text-ink-dim">
          DRAG TO COMPARE — SAME SOURCE FOOTAGE
        </p>
      </div>

      <div className="mt-14 w-full max-w-[900px] rounded-md border border-line bg-surface p-6">
        <h3 className="mb-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-ink-dim">
          Retention — same episode, both cuts
        </h3>
        <svg viewBox="0 0 800 200" width="100%" height="200" preserveAspectRatio="none">
          <line x1="0" y1="199" x2="800" y2="199" stroke="var(--color-line)" strokeWidth="1" />
          <line x1="0" y1="100" x2="800" y2="100" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="4 6" />
          <path
            d="M0,15 C120,40 180,150 260,168 C400,182 600,188 800,192"
            fill="none"
            stroke="var(--color-ink-dim)"
            strokeWidth="2"
          />
          <path
            d="M0,15 C150,32 300,58 460,74 C600,90 700,104 800,118"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
          />
          <circle cx="260" cy="168" r="4" fill="var(--color-ink-dim)" />
          <text x="272" y="164" fill="var(--color-ink-dim)" fontFamily="var(--font-mono)" fontSize="11">
            drop-off
          </text>
        </svg>
        <div className="mt-3.5 flex gap-5 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.08em] text-ink-dim">
          <span className="flex items-center gap-[7px]">
            <i className="inline-block h-0.5 w-3.5 bg-ink-dim" />
            ORDINARY EDIT
          </span>
          <span className="flex items-center gap-[7px]">
            <i className="inline-block h-0.5 w-3.5 bg-accent" />
            OURS
          </span>
        </div>
        <p className="mt-3.5 text-xs text-ink-dim">[PLACEHOLDER] Real retention data, shown where clients allow it.</p>
      </div>
    </section>
  );
}
