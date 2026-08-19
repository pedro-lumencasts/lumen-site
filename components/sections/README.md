# Sections

One file per homepage section. Suggested names, matching `docs/build-sheet.md`:

| File | Section | Mockup |
|---|---|---|
| `SiteNav.tsx` | Nav | — not designed yet |
| `Hero.tsx` | 01 Hero | `hero-v1` / `v2` / `v3` — direction not chosen |
| `Section02Work.tsx` | 02 The work | `section-02-the-work.html` |
| `Section03Difference.tsx` | 03 The difference | `section-03-the-difference.html` |
| `Section04AI.tsx` | 04 AI | `section-04-ai.html` |
| `Section05Formats.tsx` | 05 What we edit | `section-05-what-we-edit.html` |
| `Section06WhoFor.tsx` | 06 Who this is for | — not designed yet |
| `Section0708Audiences.tsx` | 07/08 Experts + agencies (tabs) | — not designed yet |
| `Section09Pricing.tsx` | 09 Pricing (calculator) | — not designed yet |
| `Section10CTA.tsx` | 10 Call to action | — not designed yet |
| `Section11FAQ.tsx` | 11 Questions (accordion) | — not designed yet |
| `Section12Close.tsx` | 12 Close | — not designed yet |
| `SiteFooter.tsx` | Footer | — not designed yet |

Scroll-driven sections (03, 05a, hero v1) own their own tall wrapper with a sticky child.
Keep that inside the section component so `page.tsx` stays a flat list.
