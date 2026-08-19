# Lumen — Website

Marketing site for a video post-production studio. Single long-scroll homepage plus two
separate pages. This file is the context you need before touching anything.

## What this project is

Lumen edits video for people who publish: podcasts, YouTube, shorts, reels, webinars,
promos. Two client types — experts building an audience, and agencies who own the client
relationship and outsource the post.

**Positioning:** the promise is *"Editing you don't have to double-check."* The differentiator
is trained-filmmaker judgment, not throughput: we learn the brand and the video's purpose
before cutting, and someone owns coherence across the whole channel rather than editors
working video by video. This matters more now because AI editing tools produce cuts that are
technically fine but have no criterion behind them — delegating without losing coherence is
the thing being sold.

**Do not** position this as cheap, fast, or unlimited. Competitors already own that and it is
explicitly off-brand.

## Read these first

| File | What's in it |
|---|---|
| `docs/copy.md` | The approved copy, section by section. Source of truth for all text. |
| `docs/build-sheet.md` | Section map, tags, what's done, open decisions. Update as you go. |
| `docs/design-tokens.md` | Palette, type scale, spacing. Every section must use these. |
| `docs/references/` | The component references chosen per section, with original source code. |
| `mockups/` | Working HTML mockups already built and approved. Port these, don't reinvent. |

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (`@theme` in `app/globals.css`, no `tailwind.config.js`)
- shadcn/ui conventions — components live in `components/ui/`
- `framer-motion` for animation
- Fonts via `next/font/google`

## Conventions

- Section components go in `components/sections/`, one file per section, named `Section02Work.tsx` etc.
- Reusable primitives pulled from 21st.dev go in `components/ui/` unmodified where possible.
- Use the `cn()` helper in `lib/utils.ts` for class merging.
- Every color and font size comes from the tokens in `globals.css`. No ad-hoc hex values.
- Respect `prefers-reduced-motion` in every scroll or loop animation.
- Mobile down to 375px must work. Scroll-driven sections need a static fallback.

## Voice rules (from the brand doc — enforce these in any copy you write)

**Never use:** unlock, elevate, transform, seamless, effortless, world-class, cutting-edge,
next level, "in today's fast-paced digital landscape". No exclamation points. No "we're
passionate about".

**Never claim:** cheapest, unlimited, fastest in the industry, AI-powered.

**Register:** one operator talking to another. Short sentences. Concrete nouns.

## Settled

- **Hero: v1 (scroll-morph).**
- **The site is light**, not the dark timeline palette v1 shipped with. See
  `docs/design-tokens.md`. The dark version is tagged `dark-theme` in git.
- **Primary CTA: "Try one video."** Secondary is "Build your order".

### One trap the light switch exposed

Text that sits **on photography** — the format-grid captions, the RAW/OURS tags, the timecode
readout, the AI clip notes — is hard-coded white on a dark scrim. It must never use
`--color-ink`, because it sits on images rather than on the page and so does not follow the
theme. Inverting the tokens the first time turned all of it black-on-black.

## Open decisions — ask before assuming

1. **Section order.** The source doc contains two different orderings. `docs/build-sheet.md`
   uses the fuller one. Not yet confirmed.
2. **Does the AI section ship?** It only exists in one of the two orderings. It is built and
   wired; removing it is one line in `app/page.tsx`.
3. **Real data missing.** Token prices, volume thresholds, turnaround times, retention numbers.
   Marked `[PLACEHOLDER]` throughout. **Do not invent figures.** The pricing calculator is built
   and renders every unknown as `—`; load real numbers into `VIDEO_TYPES`/`TIERS` in
   `components/sections/Section09Pricing.tsx`.
4. **Company name unresolved.** The doc still says Lumencasts; a rename is under discussion.
   The wordmark and tagline live in `lib/brand.ts` — the swap is one line.

## Status

**The whole homepage is built in React** — nav, hero, sections 02–12, footer, all wired in
`app/page.tsx`. Copy is verbatim from `docs/copy.md`.

Still missing:
- The two sub-pages: **See the work**, **Build your order**. Every CTA currently points at
  `#start` as a placeholder.
- **Real assets** — all imagery is Unsplash stock standing in for client footage.
- The `[PLACEHOLDER]` data listed under open decision #3.

`lib/brand.ts` holds the name, tagline, nav links and CTAs — change them there, not inline.

Keep `docs/build-sheet.md` current as things land.
