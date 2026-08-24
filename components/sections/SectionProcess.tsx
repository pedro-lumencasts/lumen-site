/**
 * 06 · Our process (v2 structure).
 *
 * New copy, but nothing invented: every step is grounded in something the
 * approved doc already claims — "send us whatever you recorded", the producer
 * who owns coherence, human decisions on every cut, and delivery ready to
 * upload. Turnaround is the one unknown and stays [PLACEHOLDER].
 */

const STEPS = [
  {
    title: "You send the recording",
    body: "A three-hour podcast, a webinar, a phone video shot in your kitchen. Any length, any format, however it came off the camera.",
  },
  {
    title: "A producer watches it before anything is cut",
    body: "They learn what you're building and decide what the footage can become — the long-form cut and every piece worth pulling out of it.",
  },
  {
    title: "An editor cuts it for retention",
    body: "Every decision about what stays, what goes and what order it goes in is made by someone who watched your footage. Not measured out at even intervals.",
  },
  {
    title: "You get it back ready to upload",
    body: "Cut for whatever platform each piece is going to. [PLACEHOLDER] turnaround by video type.",
  },
];

export function SectionProcess() {
  return (
    <section className="flex flex-col items-center px-6 py-[110px]">
      <h2 className="max-w-[900px] text-center font-[family-name:var(--font-display)] text-[clamp(34px,5.4vw,62px)] font-extrabold leading-[1.04] tracking-[-0.03em]">
        Our process
      </h2>
      <p className="mt-5 max-w-[520px] text-center text-[17px] leading-[1.6] text-ink-dim">
        Four steps. You are only involved in the first one.
      </p>

      <ol className="mt-14 w-full max-w-[820px]">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-6 border-t border-line py-8 last:border-b sm:gap-10"
          >
            <span className="shrink-0 font-[family-name:var(--font-mono)] text-[13px] tabular-nums text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-[clamp(19px,2.2vw,25px)] font-bold leading-[1.2] tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[560px] text-[15px] leading-[1.65] text-ink-dim">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
