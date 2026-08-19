"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * 09 · Pricing — the calculator the copy describes: count what you publish in a
 * month, watch the rate drop as you cross a threshold.
 *
 * ⚠️ Open decision #5: token costs, volume thresholds and rates are NOT known.
 * The mechanism is built; every figure renders as `—` until real data lands.
 * Do not invent numbers here — fill VIDEO_TYPES[].tokens and TIERS[] instead.
 */

const VIDEO_TYPES = [
  { id: "podcast", label: "Video podcast", tokens: null as number | null },
  { id: "longform", label: "YouTube long-form", tokens: null as number | null },
  { id: "short", label: "Reel / TikTok / Short", tokens: null as number | null },
  { id: "clipset", label: "Clip set from long-form", tokens: null as number | null },
  { id: "talking", label: "Talking-head video", tokens: null as number | null },
  { id: "webinar", label: "Webinar", tokens: null as number | null },
  { id: "promo", label: "Promo", tokens: null as number | null },
];

const TIERS = [
  { label: "Starter", from: 0, rate: null as number | null },
  { label: "Volume", from: null as number | null, rate: null as number | null },
  { label: "Scale", from: null as number | null, rate: null as number | null },
];

export function SectionPricing() {
  const [counts, setCounts] = useState<Record<string, number>>(
    Object.fromEntries(VIDEO_TYPES.map((v) => [v.id, 0])),
  );

  const totalVideos = Object.values(counts).reduce((a, b) => a + b, 0);
  const bump = (id: string, delta: number) =>
    setCounts((c) => ({ ...c, [id]: Math.max(0, c[id] + delta) }));

  return (
    <section id="pricing" className="flex flex-col items-center px-6 py-[90px]">
      <p className="eyebrow">Pricing</p>
      <h2 className="mt-[18px] max-w-[760px] text-center font-[family-name:var(--font-display)] text-[clamp(28px,4.4vw,46px)] font-bold leading-[1.12] tracking-[-0.02em]">
        One price list. No plans to pick.
      </h2>
      <p className="mt-5 max-w-[620px] text-center text-[15px] leading-[1.65] text-ink-dim">
        Every video type has a published token cost. Add up what you publish in a month, buy that
        many tokens, and spend them on whatever you actually make.{" "}
        <strong className="font-medium text-ink">
          The more tokens you buy, the less each one costs — your rate drops automatically the moment
          you cross a threshold.
        </strong>
      </p>

      <div className="mt-10 grid w-full max-w-[940px] gap-4 md:grid-cols-[1.4fr_1fr]">
        {/* Counter */}
        <div className="rounded-lg border border-line bg-surface p-6">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-ink-dim">
            What you publish in a month
          </p>
          <ul className="mt-4 flex flex-col divide-y divide-line">
            {VIDEO_TYPES.map((v) => (
              <li key={v.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm text-ink">{v.label}</p>
                  <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.08em] text-ink-dim">
                    {v.tokens === null ? "— tokens" : `${v.tokens} tokens`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Fewer ${v.label}`}
                    onClick={() => bump(v.id, -1)}
                    className="h-7 w-7 rounded border border-line text-ink-dim transition-colors hover:border-ink-dim hover:text-ink"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-[family-name:var(--font-mono)] text-sm text-ink">
                    {counts[v.id]}
                  </span>
                  <button
                    type="button"
                    aria-label={`More ${v.label}`}
                    onClick={() => bump(v.id, 1)}
                    className="h-7 w-7 rounded border border-line text-ink-dim transition-colors hover:border-accent hover:text-accent"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Result + tiers */}
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-line border-l-2 border-l-accent bg-surface p-6">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-ink-dim">
              Your month
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-[40px] font-bold leading-none tracking-[-0.02em] text-ink">
              {totalVideos}
              <span className="ml-2 text-sm font-medium text-ink-dim">
                {totalVideos === 1 ? "video" : "videos"}
              </span>
            </p>
            <dl className="mt-5 flex flex-col gap-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em]">
              <div className="flex justify-between">
                <dt className="text-ink-dim">TOKENS</dt>
                <dd className="text-ink">—</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-dim">YOUR RATE</dt>
                <dd className="text-ink">—</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-dim">MONTH TOTAL</dt>
                <dd className="text-accent">—</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-line bg-surface p-6">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-ink-dim">
              Volume thresholds
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {TIERS.map((t) => (
                <li
                  key={t.label}
                  className={cn(
                    "flex items-center justify-between rounded border border-line px-3 py-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em]",
                  )}
                >
                  <span className="text-ink">{t.label}</span>
                  <span className="text-ink-dim">
                    {t.from === null ? "—" : `${t.from}+`} tokens · {t.rate === null ? "—" : t.rate}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-6 w-full max-w-[940px] rounded border border-dashed border-line px-4 py-3 text-center text-xs text-ink-dim">
        <strong className="font-medium text-ink">[PLACEHOLDER]</strong> Token cost per video type,
        volume thresholds and rates. The calculator is wired — drop the real figures into{" "}
        <code className="text-accent">Section09Pricing.tsx</code> and it fills in.
      </p>

      <p className="mt-5 max-w-[620px] text-center text-sm leading-[1.7] text-ink-dim">
        Tokens are good for 90 days. Add-ons for rush delivery and extra revisions.
      </p>
    </section>
  );
}
