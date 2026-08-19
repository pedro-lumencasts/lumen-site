"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * 07 + 08 · Two audiences looking at the same offer — the one place the build
 * sheet calls for real tabs. Copy: docs/copy.md § 07 and § 08.
 */

type Audience = "experts" | "agencies";

const PANELS: Record<
  Audience,
  { tab: string; header: string; body: string[]; cta: string }
> = {
  experts: {
    tab: "FOR EXPERTS",
    header: "You're publishing to get hired.",
    body: [
      "Every video is supposed to move someone closer to working with you. That only happens if they stay long enough to decide you know what you're talking about.",
      "Send us the recording. You get back the long-form cut and every piece worth pulling out of it, all edited to keep people watching.",
    ],
    cta: "See what a month looks like",
  },
  agencies: {
    tab: "FOR AGENCIES",
    header: "Capacity that scales with your month.",
    body: [
      "You own the client and the relationship. We do the post, under your brand. Token costs are published, so you know your margin before you quote.",
      "Volume moves up or down month to month without a plan change or a new conversation.",
    ],
    cta: "Talk about capacity",
  },
};

const ORDER: Audience[] = ["experts", "agencies"];

export function SectionAudiences() {
  const [audience, setAudience] = useState<Audience>("experts");
  const panel = PANELS[audience];

  return (
    <section className="flex flex-col items-center px-6 py-[90px]">
      <p className="eyebrow">Who we work with</p>

      <div className="mt-[26px] flex gap-1.5 rounded-md border border-line bg-surface p-[5px]">
        {ORDER.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setAudience(key)}
            className={cn(
              "rounded px-[18px] py-2.5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-ink-dim transition-colors",
              audience === key && "bg-surface-2 text-ink",
            )}
          >
            {PANELS[key].tab}
          </button>
        ))}
      </div>

      <div className="mt-9 w-full max-w-[720px] rounded-lg border border-line bg-surface p-8 md:p-10">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(26px,3.6vw,38px)] font-bold leading-[1.14] tracking-[-0.02em]">
          {panel.header}
        </h2>
        <div className="mt-5 flex flex-col gap-4">
          {panel.body.map((p) => (
            <p key={p} className="text-[15px] leading-[1.7] text-ink-dim">
              {p}
            </p>
          ))}
        </div>
        <a
          href="#start"
          className="mt-7 inline-block rounded border border-accent bg-accent px-[22px] py-3 text-[13px] font-medium text-white transition-colors hover:bg-accent-dark"
        >
          {panel.cta}
        </a>
      </div>
    </section>
  );
}
