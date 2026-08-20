"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { placeholder } from "@/lib/placeholder";

type Mode = "machine" | "human";

const IMAGES = Array.from({ length: 12 }, (_, i) => placeholder(i + 2));

const DECISIONS: { keep: boolean; note?: string }[] = [
  { keep: true, note: "open on the answer" },
  { keep: false },
  { keep: true, note: "hold the reaction" },
  { keep: false },
  { keep: true, note: "cut before the ums" },
  { keep: true, note: "let the pause breathe" },
  { keep: false },
  { keep: true, note: "this is the idea" },
  { keep: false },
  { keep: true, note: "callback to the hook" },
  { keep: false },
  { keep: true, note: "end on the point" },
];

const MODE_COPY: Record<Mode, { status: string; count: string; caption: string }> = {
  machine: {
    status: "AUTO-ASSEMBLING — EVEN INTERVALS",
    count: "12 CLIPS · EQUAL LENGTH",
    caption: "Every cut lands on the same beat. Nothing was decided — it was measured.",
  },
  human: {
    status: "CUT BY AN EDITOR WHO WATCHED IT",
    count: "6 KEPT · 6 CUT",
    caption: "Uneven on purpose. Each clip earned its place, or it was cut.",
  },
};

export function SectionAI() {
  const [mode, setMode] = useState<Mode>("machine");
  const reducedMotion = useReducedMotion();
  const copy = MODE_COPY[mode];

  return (
    <section className="flex min-h-screen flex-col items-center px-6 py-[90px]">
      <p className="eyebrow">AI</p>
      <h2 className="mt-[18px] max-w-[820px] text-center font-[family-name:var(--font-display)] text-[clamp(28px,4.4vw,46px)] font-bold leading-[1.12] tracking-[-0.02em]">
        Yes, we use AI. Just not for the parts that matter.
      </h2>
      <p className="mt-5 max-w-[620px] text-center text-[15px] leading-[1.65] text-ink-dim">
        Watch the same footage get assembled two ways.
      </p>

      <div className="mt-[38px] flex gap-1.5 rounded-md border border-line bg-surface p-[5px]">
        <button
          type="button"
          onClick={() => setMode("machine")}
          className={cn(
            "rounded px-[18px] py-2.5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-ink-dim transition-colors",
            mode === "machine" && "bg-machine/18 text-machine",
          )}
        >
          MACHINE ASSEMBLY
        </button>
        <button
          type="button"
          onClick={() => setMode("human")}
          className={cn(
            "rounded px-[18px] py-2.5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-ink-dim transition-colors",
            mode === "human" && "bg-accent/16 text-accent",
          )}
        >
          EDITOR&apos;S CUT
        </button>
      </div>

      <div className="mt-[26px] w-full max-w-[940px] rounded-lg border border-line bg-surface p-[22px]">
        <div className="mb-4 flex items-center justify-between font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] text-ink-dim">
          <div className="flex items-center gap-2">
            <span className={cn("h-[7px] w-[7px] rounded-full", mode === "machine" ? "bg-machine" : "bg-accent")} />
            <span>{copy.status}</span>
          </div>
          <div>{copy.count}</div>
        </div>
        <div className="mb-1.5 flex justify-between font-[family-name:var(--font-mono)] text-[9px] text-[#4E4E58]">
          <span>00:00</span>
          <span>00:12</span>
          <span>00:24</span>
          <span>00:36</span>
          <span>00:48</span>
        </div>
        <div className="relative">
          <div className="flex h-[76px] gap-[3px]">
            {IMAGES.map((src, i) => {
              const d = DECISIONS[i];
              const isDrop = mode === "human" && !d.keep;
              return (
                <div
                  key={src}
                  className={cn(
                    "relative flex-1 overflow-hidden rounded-[3px] border transition-[flex] duration-500 ease-[cubic-bezier(.4,0,.2,1)]",
                    mode === "machine" && "border-machine/40 bg-surface-2",
                    mode === "human" && (d.keep ? "border-accent bg-surface-2" : "border-line bg-surface-2"),
                    isDrop && "flex-[.16] opacity-30",
                  )}
                >
                  <img
                    src={src}
                    alt={`clip ${i + 1}`}
                    className={cn(
                      "h-full w-full object-cover transition-[opacity,filter] duration-300",
                      mode === "machine" ? "opacity-55 saturate-[.35] contrast-[.9]" : "opacity-85 saturate-[1.05]",
                    )}
                  />
                  {mode === "human" && d.note && (
                    <div className="absolute bottom-[5px] left-1.5 max-w-[92%] rounded-sm bg-black/70 px-[5px] py-0.5 font-[family-name:var(--font-mono)] text-[8px] leading-[1.3] tracking-[0.05em] text-white">
                      {d.note}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {mode === "machine" && !reducedMotion && (
            <motion.div
              className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-machine"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3.3, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
        <p
          className={cn(
            "mt-3.5 min-h-[18px] font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] transition-colors",
            mode === "human" ? "text-accent" : "text-ink-dim",
          )}
        >
          {copy.caption}
        </p>
      </div>

      <div className="mt-14 flex max-w-[640px] flex-col gap-[18px]">
        <p className="text-[15px] leading-[1.7] text-ink-dim">
          We use AI where it works well, like motion graphics. Until it gets a lot better at edits,{" "}
          <strong className="font-medium text-ink">
            every decision about what stays, what goes, and what order it goes in is made by an experienced editor
            who watched your footage and understands your brand.
          </strong>
        </p>
        <p className="text-[15px] leading-[1.7] text-ink-dim">
          That matters more now than it used to. Feeds are filling up with video that was obviously assembled by a
          machine. People recognize it within seconds and scroll away.{" "}
          <strong className="font-medium text-ink">
            If your videos look and feel like AI came up with them, so does your expertise.
          </strong>
        </p>
      </div>

    </section>
  );
}

/**
 * The producer block — the start of the inverted passage.
 *
 * Runs dark on a light site on purpose: this is the claim the whole positioning
 * rests on, so it gets a chapter break rather than a bordered box. It fades in
 * from the page colour at the top and stays solid dark at the bottom, because
 * section 05's fan-out picks the darkness up and carries it to ONE RECORDING.
 */
export function SectionProducer() {
  return (
    <section className="relative bg-[var(--color-invert-bg)] px-6 pt-32 pb-40 text-[var(--color-invert-ink)]">
      {/* Entry fade from the light section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,var(--color-bg),transparent)]" />
      {/* Faint grid, so the dark reads as a surface rather than a hole */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_50%,transparent_100%)]" />
      {/* Red bloom under the statement */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_45%,rgba(232,72,60,0.16),transparent_70%)]" />

      <div className="relative mx-auto max-w-[820px] text-center">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--color-invert-accent)]">
          How we hold it
        </p>

        <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(32px,5.4vw,60px)] font-bold leading-[1.05] tracking-[-0.025em]">
          You get a producer, not a queue.
        </h2>

        <p className="mx-auto mt-7 max-w-[560px] text-[17px] leading-[1.65] text-[var(--color-invert-dim)]">
          Someone who learns your channel, watches every frame you send, and pulls out every piece
          worth publishing.{" "}
          <strong className="font-medium text-[var(--color-invert-ink)]">
            Not editors picking up whatever lands next.
          </strong>
        </p>
      </div>

      {/* Pulls the eye down into the fan-out */}
      <div className="relative mt-24 flex flex-col items-center gap-3">
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--color-invert-dim)]">
          IT STARTS WITH
        </span>
        <span className="h-16 w-px bg-[linear-gradient(to_bottom,var(--color-invert-line),var(--color-invert-accent))]" />
      </div>
    </section>
  );
}
