# Design tokens

Defined in `app/globals.css` under `@theme`. Nothing should hardcode a hex value —
if a color is missing here, add it here first.

**Status: settled.** The site is light. The dark timeline palette that came with hero v1
is kept in git history on the `dark-theme` tag if it is ever wanted back.

## Palette

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#FAF9F7` | Page background. Near-white, a touch warm. |
| `--color-surface` | `#FFFFFF` | Panels, cards, inset blocks. Pure white so they lift off the page. |
| `--color-surface-2` | `#F0EEE9` | Raised state inside a panel — active tab, clip body. |
| `--color-line` | `#E1DED7` | Hairlines, borders, dividers. |
| `--color-ink` | `#17171C` | Primary text. |
| `--color-ink-dim` | `#6B6B73` | Body copy, labels, inactive states. |
| `--color-accent` | `#C43C33` | Record-light red. CTAs, the "ours" side, active markers. |
| `--color-accent-dark` | `#A63229` | Hover-down state, and text small enough to need more contrast. |
| `--color-machine` | `#4553A8` | **Only** in the AI section, for the machine-assembly state. |

The red is `#C43C33`, not the `#E8483C` of the dark system. On a light ground the brighter
red only reaches 3.7:1, which fails AA for the small mono labels it gets used on; `#C43C33`
reaches 4.9:1 as text and 5.2:1 with white on top as a button fill. `--color-machine` was
darkened from `#5C6BC0` for the same reason. Every piece of text on the page was checked
against its computed background — all of it passes AA.

Accent discipline: red carries meaning — it marks *our* edit, the live state, the primary
action. Do not use it decoratively or the distinction stops reading.

### Text that sits on photography

Chips and labels over footage — the format-grid captions, the RAW/OURS tags, the timecode
readout, the AI clip notes — are hard-coded white on a dark scrim. They must **not** use
`--color-ink`: they sit on images, not on the page, so they do not follow the theme. This is
exactly what broke when the palette was first inverted.

## Type

| Role | Face | Where |
|---|---|---|
| Display | Sora, 600–800 | Section headlines, hero H1. Tight tracking (-0.02em). |
| Body | Inter, 400–500 | Paragraphs, sub-copy, buttons. |
| Mono | IBM Plex Mono, 400–500 | Timecodes, eyebrows, tags, data labels, ratios. |

The mono face is doing real work — it belongs to the world of editing software. Use it for
anything that reads as a machine readout. Do not use it for prose.

## Scale

- Section headline: `clamp(28px, 4.4vw, 48px)`
- Oversized display (section 03 only): `min(7.6vw, 10.5vh)`

  Both axes, on purpose. At the original `8.6vw` the longest line — "Then they trust you.",
  the payoff of the section — measured ~98vw and ran past the right margin at every desktop
  width. And seven lines that size, plus the eyebrow, kicker and chip, are taller than a
  laptop viewport once the fixed nav takes its 64px, so the eyebrow was clipped off the top
  and the chip off the bottom. `min()` lets whichever axis is tighter decide. On phones the
  width still wins, so mobile renders exactly as before.

  If you ever add or lengthen a line in that block, re-check both bounds.
- Body: 15px / 1.65
- Mono labels: 10–11px, letter-spacing 0.1–0.2em, uppercase

## Spacing

Sections use `padding: 90px 24px` at desktop. Scroll-driven sections are taller by design
(300–340vh) with a sticky viewport inside.

## Motion

- Easing: `cubic-bezier(.4, 0, .2, 1)` for state changes; springs for physical movement.
- Scroll-driven sections must degrade to a static, fully-legible state under
  `prefers-reduced-motion` — the global rule in `globals.css` handles duration, but any
  JS-driven transform needs its own check.
