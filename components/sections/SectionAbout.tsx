/**
 * 07 · About us (v2 structure).
 *
 * New copy. The argument is drawn from the positioning in CLAUDE.md — trained
 * filmmakers, judgment over throughput, someone owning coherence — because that
 * is the only part of "about us" we can actually support today.
 *
 * Anything that would need a fact we don't have (founding year, team size, where
 * people came from) is marked and left out rather than guessed at.
 */
export function SectionAbout() {
  return (
    <section className="border-y border-line bg-surface px-6 py-[110px]">
      <div className="mx-auto grid max-w-[1000px] gap-12 md:grid-cols-[0.8fr_1fr] md:gap-16">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-accent">
            About us
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(30px,4.4vw,50px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            We came up as filmmakers, not as a content factory.
          </h2>
        </div>

        <div className="flex flex-col gap-5 text-[16px] leading-[1.7] text-ink-dim">
          <p>
            Most editing shops sell throughput: more videos, faster, cheaper. That was always a race
            to the bottom, and now the tools have finished the job — anyone can generate a cut that
            is technically fine and means nothing.
          </p>
          <p>
            <strong className="font-medium text-ink">
              What is left is judgment: knowing what a video is for before you cut it.
            </strong>{" "}
            We learn the brand and the purpose first, and the same person stays with a channel long
            enough to keep it coherent.
          </p>
          <p>
            That is the whole company. We are not trying to be the biggest. We are trying to be the
            edit you stop double-checking.
          </p>
          <p className="rounded border border-dashed border-line px-4 py-3 text-sm text-ink-dim">
            <strong className="font-medium text-ink">[PLACEHOLDER]</strong> Founding year, team size,
            where the editors came from, credits worth naming.
          </p>
        </div>
      </div>
    </section>
  );
}
