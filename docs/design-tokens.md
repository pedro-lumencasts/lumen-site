# Design tokens

Defined in `app/globals.css` under `@theme`. Nothing should hardcode a hex value —
if a color is missing here, add it here first.

**Status: provisional.** These are the hero v1 (dark timeline) values. The hero direction
is not yet chosen. If v2 or v3 wins, change the values in `globals.css` and every section
recolors. Structure and spacing do not change.

## Palette

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#15151A` | Page background. Timeline charcoal. |
| `--color-surface` | `#1F1F26` | Panels, cards, inset blocks. |
| `--color-surface-2` | `#26262E` | Raised state inside a panel — active tab, clip body. |
| `--color-line` | `#2E2E37` | Hairlines, borders, dividers. |
| `--color-ink` | `#ECEAE4` | Primary text. Cool cream, not pure white. |
| `--color-ink-dim` | `#8B8B93` | Body copy, labels, inactive states. |
| `--color-accent` | `#E8483C` | Record-light red. CTAs, the "ours" side, active markers. |
| `--color-accent-dark` | `#C43C33` | Secondary paths, hover-down state. |
| `--color-machine` | `#5C6BC0` | **Only** in the AI section, for the machine-assembly state. |

Accent discipline: red carries meaning — it marks *our* edit, the live state, the primary
action. Do not use it decoratively or the distinction stops reading.

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
