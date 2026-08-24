/**
 * 05 · Testimonials (v2 structure).
 *
 * Deliberately empty. These are TEMPLATES, not invented quotes with invented
 * names — a fabricated testimonial reads as real the moment it ships, and this
 * page is going to be shown to people. Drop real quotes into TESTIMONIALS and
 * the placeholder styling disappears on its own.
 *
 * Birdhouse uses video testimonials titled with the outcome ("$10K to $100K/mo").
 * That is the shape worth copying: lead with what changed, not with praise.
 */

type Testimonial = {
  /** The outcome, in the client's words or numbers. This is the headline of the card. */
  outcome: string;
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [];

const SLOTS = 3;

export function SectionTestimonials() {
  const filled = TESTIMONIALS.length > 0;

  return (
    <section className="flex flex-col items-center px-6 py-[110px]">
      <h2 className="max-w-[900px] text-center font-[family-name:var(--font-display)] text-[clamp(34px,5.4vw,62px)] font-extrabold leading-[1.04] tracking-[-0.03em]">
        Words from the people we edit for
      </h2>
      <p className="mt-5 max-w-[520px] text-center text-[17px] leading-[1.6] text-ink-dim">
        What changed once they stopped touching the edit.
      </p>

      <div className="mt-14 grid w-full max-w-[1100px] gap-5 md:grid-cols-3">
        {filled
          ? TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-xl border border-line bg-surface p-7"
              >
                <p className="font-[family-name:var(--font-display)] text-xl font-bold leading-[1.2] tracking-[-0.02em]">
                  {t.outcome}
                </p>
                <blockquote className="mt-4 flex-1 text-[15px] leading-[1.65] text-ink-dim">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <span className="block text-sm font-medium text-ink">{t.name}</span>
                  <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] text-ink-dim">
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            ))
          : Array.from({ length: SLOTS }, (_, i) => (
              <div
                key={i}
                className="flex min-h-[280px] flex-col rounded-xl border border-dashed border-line bg-surface-2/40 p-7"
              >
                <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-accent">
                  Testimonial {i + 1}
                </span>
                <p className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold leading-[1.2] tracking-[-0.02em] text-ink-dim">
                  The outcome goes here
                </p>
                <p className="mt-4 flex-1 text-[15px] leading-[1.65] text-ink-dim">
                  What changed for them, in their own words. Lead with the result, not with praise.
                </p>
                <span className="mt-6 border-t border-line pt-4 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] text-ink-dim">
                  Name · Role, company
                </span>
              </div>
            ))}
      </div>

      {!filled && (
        <p className="mt-8 max-w-[560px] text-center text-xs leading-[1.6] text-ink-dim">
          <strong className="font-medium text-ink">[PLACEHOLDER]</strong> Left empty on purpose — no
          invented quotes or names. Paste real ones into{" "}
          <code className="text-accent">TESTIMONIALS</code> and the cards fill themselves in.
        </p>
      )}
    </section>
  );
}
