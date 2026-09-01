import { BRAND_NAME } from "@/lib/brand";

/**
 * /mockups — the index of everything that exists, in one place.
 *
 * Git keeps the iterations as history, which is fine for code and useless for
 * showing someone. This page makes them clickable: the two live structures, and
 * the original HTML mockups that predate the React build.
 *
 * The mockups are served straight out of /public — they are self-contained pages
 * with their own fonts, CSS and scripts, so wrapping them in React would only
 * break them. They are frozen artifacts; nothing here should be "kept current".
 */

type Entry = {
  href: string;
  name: string;
  note: string;
  status?: "live" | "chosen" | "not built";
};

const LIVE: Entry[] = [
  {
    href: "/",
    name: "Homepage",
    note: "The offer walked through in order, the way the source doc is written.",
    status: "live",
  },
  {
    href: "/v2",
    name: "Structure test",
    note: "The same content reordered credibility-first, after thebirdhouse.co. Two CTAs before the bottom.",
    status: "live",
  },
];

const HEROES: Entry[] = [
  {
    href: "/mockups/hero-v1-scroll-morph.html",
    name: "Hero v1 — scroll morph",
    note: "Footage cards scatter, gather into a circle, then open into an arc. Dark timeline palette.",
    status: "chosen",
  },
  {
    href: "/mockups/hero-v2-drag-compare.html",
    name: "Hero v2 — drag compare",
    note: "A monitor you drag to reveal the edit. Light background, different type and colour system entirely.",
    status: "not built",
  },
  {
    href: "/mockups/hero-v3-marquee.html",
    name: "Hero v3 — marquee",
    note: "Cinema bulbs and a polaroid filmstrip on an endless loop. Violet and gold.",
    status: "not built",
  },
];

const SECTIONS: Entry[] = [
  {
    href: "/mockups/section-02-the-work.html",
    name: "02 — The work",
    note: "Drag before/after, tabs per format, retention graph with the drop-off marked.",
  },
  {
    href: "/mockups/section-03-the-difference.html",
    name: "03 — The difference",
    note: "Oversized stacked type that sweeps in on scroll.",
  },
  {
    href: "/mockups/section-04-ai.html",
    name: "04 — AI",
    note: "Machine assembly against an editor's cut, on the same timeline.",
  },
  {
    href: "/mockups/section-05-what-we-edit.html",
    name: "05 — What we edit",
    note: "One recording fanning out into formats, then the nine-format grid.",
  },
];

const BADGE: Record<NonNullable<Entry["status"]>, string> = {
  live: "border-accent/40 text-accent",
  chosen: "border-accent/40 text-accent",
  "not built": "border-line text-ink-dim",
};

function Row({ entry, external }: { entry: Entry; external?: boolean }) {
  return (
    <li>
      <a
        href={entry.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="group flex flex-col gap-2 border-t border-line py-6 transition-colors hover:border-accent sm:flex-row sm:items-baseline sm:gap-8"
      >
        <span className="flex min-w-[240px] items-center gap-3">
          <span className="font-[family-name:var(--font-display)] text-[19px] font-bold tracking-[-0.02em] transition-colors group-hover:text-accent">
            {entry.name}
          </span>
          {entry.status && (
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em] ${BADGE[entry.status]}`}
            >
              {entry.status}
            </span>
          )}
        </span>
        <span className="text-[14px] leading-[1.6] text-ink-dim">{entry.note}</span>
      </a>
    </li>
  );
}

export const metadata = {
  title: "Lumen — Versions",
};

export default function Mockups() {
  return (
    <main className="mx-auto max-w-[880px] px-6 py-24">
      <p className="eyebrow">{BRAND_NAME} · internal</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(34px,5.4vw,56px)] font-extrabold leading-[1.04] tracking-[-0.03em]">
        Every version, in one place
      </h1>
      <p className="mt-5 max-w-[560px] text-[16px] leading-[1.65] text-ink-dim">
        The two live structures, and the original HTML mockups the React build came from. The
        mockups are frozen — they are what was designed before any of it was built, kept so the
        directions we did not take are still visible.
      </p>

      <section className="mt-16">
        <h2 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-ink-dim">
          Live structures
        </h2>
        <ul className="mt-4 border-b border-line">
          {LIVE.map((e) => (
            <Row key={e.href} entry={e} />
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-ink-dim">
          Hero directions — three were designed, one was chosen
        </h2>
        <ul className="mt-4 border-b border-line">
          {HEROES.map((e) => (
            <Row key={e.href} entry={e} external />
          ))}
        </ul>
        <p className="mt-4 text-[13px] leading-[1.6] text-ink-dim">
          v2 and v3 were never built in React, so this HTML is the only place they exist. Both carry
          their own colour and type systems, not the one the site ended up with.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-ink-dim">
          Section mockups
        </h2>
        <ul className="mt-4 border-b border-line">
          {SECTIONS.map((e) => (
            <Row key={e.href} entry={e} external />
          ))}
        </ul>
        <p className="mt-4 text-[13px] leading-[1.6] text-ink-dim">
          These predate the light theme — they are all on the original dark palette, which is what
          the site looked like before it was turned white.
        </p>
      </section>
    </main>
  );
}
