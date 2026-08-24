/**
 * 02 · Credibility (v2 structure).
 *
 * Birdhouse earns the right to keep talking with a logo wall and hard numbers
 * ("100+ companies", "10 billion impressions"). We have neither yet, and
 * CLAUDE.md forbids inventing figures — so this renders the SHAPE of the proof
 * with the values left empty. Every `—` is a thing to go collect.
 *
 * Fill LOGOS with client names and STATS with real numbers, then delete the
 * placeholder note at the bottom.
 */

/** Client names for the trust strip. Empty until we have permission to name them. */
const LOGOS: string[] = [];

const STATS: { value: string | null; label: string }[] = [
  { value: null, label: "Videos delivered" },
  { value: null, label: "Average watch-time lift" },
  { value: null, label: "Clients publishing weekly" },
];

const LOGO_SLOTS = 6;

export function SectionCredibility() {
  return (
    <section className="border-y border-line bg-surface px-6 py-16">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-ink-dim">
          {LOGOS.length > 0 ? "The people we edit for" : "[PLACEHOLDER] The people we edit for"}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {LOGOS.length > 0
            ? LOGOS.map((name) => (
                <span
                  key={name}
                  className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.01em] text-ink-dim"
                >
                  {name}
                </span>
              ))
            : Array.from({ length: LOGO_SLOTS }, (_, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="h-7 w-28 rounded border border-dashed border-line bg-surface-2/60"
                />
              ))}
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface px-6 py-8 text-center">
              <dt className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,44px)] font-extrabold leading-none tracking-[-0.02em] text-ink">
                {s.value ?? "—"}
              </dt>
              <dd className="mt-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-ink-dim">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-center text-xs text-ink-dim">
          <strong className="font-medium text-ink">[PLACEHOLDER]</strong> Client names and real
          numbers. Nothing here is invented — fill <code className="text-accent">LOGOS</code> and{" "}
          <code className="text-accent">STATS</code> in this file.
        </p>
      </div>
    </section>
  );
}
