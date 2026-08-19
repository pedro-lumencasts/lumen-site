/**
 * 06 · Who this is for — short, almost a divider. Carries the anti-pitch.
 * Copy: docs/copy.md § 06.
 */
export function SectionWhoFor() {
  return (
    <section className="flex flex-col items-center px-6 py-[110px]">
      <p className="eyebrow">Who this is for</p>
      <h2 className="mt-[18px] max-w-[700px] text-center font-[family-name:var(--font-display)] text-[clamp(28px,4.4vw,46px)] font-bold leading-[1.12] tracking-[-0.02em]">
        This works if you&apos;re already making videos.
      </h2>

      <div className="mt-11 grid w-full max-w-[840px] gap-4 md:grid-cols-2">
        <div className="rounded-md border border-line border-l-2 border-l-accent bg-surface p-6">
          <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] text-accent">
            YOU&apos;RE A FIT
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-ink-dim">
            You&apos;re already shooting, or you have footage sitting on a drive you haven&apos;t
            done anything with.{" "}
            <strong className="font-medium text-ink">We take over from there.</strong>
          </p>
        </div>

        <div className="rounded-md border border-line bg-surface p-6">
          <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] text-ink-dim">
            NOT YET
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-ink-dim">
            If you&apos;re still figuring out what to film and who it&apos;s for, we&apos;re not the
            right fit yet.
          </p>
        </div>
      </div>
    </section>
  );
}
