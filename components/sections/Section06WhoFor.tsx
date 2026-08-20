import { Check, X } from "lucide-react";

/**
 * 06 · Who this is for.
 *
 * Simplified: the section label is now the headline, and the two prose cards
 * became a straight two-column pros/cons so the answer is scannable instead of
 * read. The approved line from docs/copy.md survives as the subhead.
 */

const FIT = [
  "You're already shooting",
  "You have footage sitting on a drive you haven't done anything with",
  "You want to publish more without touching the edit yourself",
];

const NOT_YET = [
  "You're still figuring out what to film",
  "You don't know who it's for yet",
  "You need someone to write it and shoot it",
];

export function SectionWhoFor() {
  return (
    <section className="flex flex-col items-center px-6 py-[110px]">
      <h2 className="max-w-[900px] text-center font-[family-name:var(--font-display)] text-[clamp(38px,6.4vw,76px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
        Who this is for
      </h2>
      <p className="mt-6 max-w-[540px] text-center text-[17px] leading-[1.6] text-ink-dim">
        This works if you&apos;re already making videos.
      </p>

      <div className="mt-14 grid w-full max-w-[880px] overflow-hidden rounded-xl border border-line bg-surface md:grid-cols-2">
        <div className="border-b border-line p-7 md:border-b-0 md:border-r">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-accent">
            You&apos;re a fit
          </p>
          <ul className="mt-5 flex flex-col gap-4">
            {FIT.map((item) => (
              <li key={item} className="flex gap-3">
                <Check
                  aria-hidden
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent"
                  strokeWidth={2.5}
                />
                <span className="text-[15px] leading-[1.55] text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface-2/50 p-7">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-ink-dim">
            Not yet
          </p>
          <ul className="mt-5 flex flex-col gap-4">
            {NOT_YET.map((item) => (
              <li key={item} className="flex gap-3">
                <X
                  aria-hidden
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ink-dim"
                  strokeWidth={2.5}
                />
                <span className="text-[15px] leading-[1.55] text-ink-dim">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
