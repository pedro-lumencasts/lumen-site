import { BRAND_TAGLINE, CTA_PRIMARY } from "@/lib/brand";

/**
 * 12 · Close. Copy: docs/copy.md § 12.
 * The header depends on open decision #6 (naming) — it lives in lib/brand.ts.
 */
export function SectionClose() {
  return (
    <section className="flex flex-col items-center border-t border-line px-6 py-[120px]">
      <h2 className="max-w-[900px] text-center font-[family-name:var(--font-display)] text-[clamp(38px,7vw,84px)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
        {BRAND_TAGLINE}
      </h2>
      <p className="mt-6 max-w-[460px] text-center text-[17px] leading-[1.6] text-ink-dim">
        Send us one video.{" "}
        <strong className="font-medium text-ink">You&apos;ll see it in the edit.</strong>
      </p>
      <a
        href={CTA_PRIMARY.href}
        className="mt-8 rounded border border-accent bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
      >
        {CTA_PRIMARY.label}
      </a>
    </section>
  );
}
