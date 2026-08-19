# Lumen — Website

Marketing site for a video post-production studio.
Next.js (App Router) · TypeScript · Tailwind v4 · shadcn conventions · framer-motion.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Working with Claude Code

```bash
cd lumen-site
claude
```

`CLAUDE.md` is picked up automatically and carries the brand positioning, the stack, the
conventions, the voice rules, and the list of open decisions. Start there.

A good first prompt:

> Read CLAUDE.md and docs/build-sheet.md. Port the section 03 mockup
> (mockups/section-03-the-difference.html) into components/sections/Section03Difference.tsx
> using framer-motion and the tokens in globals.css. Then wire it into app/page.tsx.

## Layout

```
CLAUDE.md                  Context for Claude Code — read first
docs/
  copy.md                  Approved copy, section by section. Text source of truth.
  build-sheet.md           Section map, tags, status, open decisions.
  design-tokens.md         Palette, type, spacing, motion rules.
  references/              Chosen component direction per section + source where captured.
  source-*.docx            Original brand/messaging doc.
mockups/                   Standalone HTML mockups, already approved. Port these.
app/
  globals.css              Tailwind v4 @theme — all design tokens live here.
  layout.tsx               Fonts + shell.
  page.tsx                 Homepage. Sections commented out until ported.
components/
  ui/                      Primitives (shadcn / 21st.dev).
  sections/                One file per page section.
lib/utils.ts               cn() helper.
```

## How to port a section

1. Open the matching file in `mockups/` — it's self-contained and runs in a browser.
2. Check `docs/references/` for the original component if one exists.
3. Build it in `components/sections/`, using tokens from `globals.css` — no hardcoded hex.
4. Uncomment it in `app/page.tsx`.
5. Mark it done in `docs/build-sheet.md`.

## Before shipping

- Resolve the six open decisions in `CLAUDE.md` — the hero direction gates the palette.
- Replace every `[PLACEHOLDER]` (token prices, turnaround times, retention data).
- Swap stock imagery for real client footage.
- Check mobile at 375px and `prefers-reduced-motion`.
