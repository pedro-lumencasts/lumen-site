import { CTA_PRIMARY, CTA_SECONDARY } from "@/lib/brand";

/** 10 · Call to action. Copy: docs/copy.md § 10. */
export function SectionCTA() {
  return (
    <section
      id="start"
      className="flex flex-col items-center px-6 py-[110px] [background:radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(196,60,51,0.05),transparent_70%)]"
    >
      <p className="eyebrow">Start here</p>
      <h2 className="mt-[18px] max-w-[700px] text-center font-[family-name:var(--font-display)] text-[clamp(28px,4.4vw,46px)] font-bold leading-[1.12] tracking-[-0.02em]">
        Start with one video.
      </h2>
      <p className="mt-5 max-w-[560px] text-center text-[15px] leading-[1.7] text-ink-dim">
        Send us any video you want edited. Short form, long form, podcast, whatever you&apos;ve got
        to test us out.{" "}
        <strong className="font-medium text-ink">No subscription and no commitment</strong> — pay for
        the one video and see how it comes back.
      </p>
      <p className="mt-3 max-w-[560px] text-center text-[15px] leading-[1.7] text-ink-dim">
        If you already know what you need, build your order and we&apos;ll get started.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
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
    </section>
  );
}
