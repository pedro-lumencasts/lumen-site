import { CTA_PRIMARY, CTA_SECONDARY } from "@/lib/brand";

/**
 * Mid-page CTA. The v2 structure puts one after the argument ("why us") and one
 * after the process, so a visitor who is convinced early never has to scroll to
 * the bottom to act.
 */
export function CTABand({
  eyebrow,
  headline,
  sub,
  id,
}: {
  eyebrow: string;
  headline: string;
  sub?: string;
  /** Set on one band per page so the #start links every CTA points at resolve. */
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-16 px-6 py-20">
      <div className="mx-auto flex max-w-[980px] flex-col items-start gap-6 rounded-xl border border-line bg-surface p-9 md:flex-row md:items-center md:justify-between md:p-11">
        <div className="max-w-[520px]">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(24px,3vw,34px)] font-bold leading-[1.14] tracking-[-0.02em]">
            {headline}
          </h2>
          {sub && <p className="mt-3 text-[15px] leading-[1.6] text-ink-dim">{sub}</p>}
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <a
            href={CTA_PRIMARY.href}
            className="rounded border border-accent bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            {CTA_PRIMARY.label}
          </a>
          <a
            href={CTA_SECONDARY.href}
            className="rounded border border-line px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink-dim"
          >
            {CTA_SECONDARY.label}
          </a>
        </div>
      </div>
    </section>
  );
}
