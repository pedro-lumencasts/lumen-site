"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 07 + 08 · Two audiences, two cards. Copy: docs/copy.md § 07 and § 08.
 *
 * Was a tab switcher, which buried one audience behind the other and read as
 * chrome. Now each audience is a card you turn over: the front asks who you are,
 * the back gives that audience its pitch and its own CTA. Nothing is hidden
 * behind a control that looks like a setting.
 *
 * The flip is a real rotateY; under prefers-reduced-motion it cross-fades instead.
 */

type Audience = {
  id: string;
  tag: string;
  front: string;
  header: string;
  body: string[];
  cta: string;
};

const AUDIENCES: Audience[] = [
  {
    id: "experts",
    tag: "For experts",
    front: "You're building an audience.",
    header: "You're publishing to get hired.",
    body: [
      "Every video is supposed to move someone closer to working with you. That only happens if they stay long enough to decide you know what you're talking about.",
      "Send us the recording. You get back the long-form cut and every piece worth pulling out of it, all edited to keep people watching.",
    ],
    cta: "See what a month looks like",
  },
  {
    id: "agencies",
    tag: "For agencies",
    front: "You own the client.",
    header: "Capacity that scales with your month.",
    body: [
      "You own the client and the relationship. We do the post, under your brand. Token costs are published, so you know your margin before you quote.",
      "Volume moves up or down month to month without a plan change or a new conversation.",
    ],
    cta: "Talk about capacity",
  },
];

const GRID_TEXTURE =
  "bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:44px_44px]";

function AudienceCard({ audience }: { audience: Audience }) {
  const [flipped, setFlipped] = useState(false);
  const reducedMotion = useReducedMotion();

  const faceBase =
    "absolute inset-0 flex flex-col rounded-xl border border-line bg-surface p-8 [backface-visibility:hidden]";

  return (
    <div className="[perspective:1600px]">
      <div
        className={cn(
          "relative min-h-[440px] w-full",
          !reducedMotion &&
            "transition-transform duration-[600ms] ease-[cubic-bezier(.4,0,.2,1)] [transform-style:preserve-3d]",
          !reducedMotion && flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front */}
        <button
          type="button"
          onClick={() => setFlipped(true)}
          aria-hidden={flipped}
          tabIndex={flipped ? -1 : 0}
          className={cn(
            faceBase,
            GRID_TEXTURE,
            "group items-start justify-between text-left transition-colors hover:border-accent",
            reducedMotion && flipped && "invisible",
          )}
        >
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-accent">
            {audience.tag}
          </span>

          <span className="mt-auto">
            <span className="block font-[family-name:var(--font-display)] text-[clamp(26px,3vw,38px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
              {audience.front}
            </span>
            <span className="mt-5 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.12em] text-ink-dim transition-colors group-hover:text-accent">
              READ THIS ONE
              <ArrowRight aria-hidden className="h-3.5 w-3.5" />
            </span>
          </span>
        </button>

        {/* Back */}
        <div
          className={cn(
            faceBase,
            "justify-between",
            !reducedMotion && "[transform:rotateY(180deg)]",
            reducedMotion && !flipped && "invisible",
          )}
          aria-hidden={!flipped}
        >
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.14] tracking-[-0.02em]">
              {audience.header}
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {audience.body.map((p) => (
                <p key={p} className="text-[14px] leading-[1.65] text-ink-dim">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#start"
              tabIndex={flipped ? 0 : -1}
              className="rounded border border-accent bg-accent px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-accent-dark"
            >
              {audience.cta}
            </a>
            <button
              type="button"
              onClick={() => setFlipped(false)}
              tabIndex={flipped ? 0 : -1}
              className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.12em] text-ink-dim transition-colors hover:text-ink"
            >
              <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
              BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SectionAudiences() {
  return (
    <section className="flex flex-col items-center px-6 py-[110px]">
      <h2 className="max-w-[900px] text-center font-[family-name:var(--font-display)] text-[clamp(38px,6.4vw,76px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
        Who we work with
      </h2>
      <p className="mt-6 max-w-[520px] text-center text-[17px] leading-[1.6] text-ink-dim">
        Two ways of using us. Pick the one that sounds like you.
      </p>

      <div className="mt-14 grid w-full max-w-[980px] gap-5 md:grid-cols-2">
        {AUDIENCES.map((a) => (
          <AudienceCard key={a.id} audience={a} />
        ))}
      </div>
    </section>
  );
}
