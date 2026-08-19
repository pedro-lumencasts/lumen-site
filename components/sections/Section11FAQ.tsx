"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** 11 · Questions. Verbatim from docs/copy.md § 11. */
const QUESTIONS = [
  {
    q: "What if I need more than I bought?",
    a: "Buy more tokens at your rate. Every video type has a published cost, so you always know what it runs before you send it.",
  },
  {
    q: "What if I don't use them all?",
    a: "They carry forward. Tokens are good for 90 days from the day you get them.",
  },
  {
    q: "How fast?",
    a: "[PLACEHOLDER] Turnaround by video type. Rush available as an add-on.",
  },
  {
    q: "Can you work with my existing editor?",
    a: "Yes. We allow creators and their content teams to scale up output to multiple platforms.",
  },
  {
    q: "Do you film or write scripts?",
    a: "No, we are post-production specialists. We'll get your footage upload ready.",
  },
  {
    q: "How many videos can you edit at once?",
    a: "We are always adding editing capacity. If you are increasing your output, we'll build a team around your needs.",
  },
  {
    q: "Can I have a dedicated editor?",
    a: "Mostly yes. We do team based editing to be able to consistently meet our clients' publishing schedules. You'll have a lead editor you'll work with on your videos.",
  },
  {
    q: "Can you match the look I already have?",
    a: "Yes. That's the first thing we learn.",
  },
];

export function SectionFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();

  return (
    <section id="questions" className="flex flex-col items-center px-6 py-[90px]">
      <p className="eyebrow">Questions</p>
      <h2 className="mt-[18px] max-w-[700px] text-center font-[family-name:var(--font-display)] text-[clamp(28px,4.4vw,46px)] font-bold leading-[1.12] tracking-[-0.02em]">
        The things people ask before sending footage.
      </h2>

      <ul className="mt-10 w-full max-w-[720px] border-t border-line">
        {QUESTIONS.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className="border-b border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    "text-[15px] font-medium transition-colors",
                    isOpen ? "text-ink" : "text-ink-dim",
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "shrink-0 font-[family-name:var(--font-mono)] text-lg leading-none transition-transform duration-300",
                    isOpen ? "rotate-45 text-accent" : "text-ink-dim",
                  )}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-10 text-[15px] leading-[1.7] text-ink-dim">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
