# Component references

Each section's chosen visual direction, with its 21st.dev source where available.

⚠️ **Important:** for several of these, only the *demo usage* was captured — not the component
implementation itself. Those are marked below. Pull the actual component from 21st.dev (or via
the shadcn CLI / Magic MCP) before porting, or reimplement from the working HTML mockup, which
is complete and self-contained.

| Section | Direction | Reference | Have full source? |
|---|---|---|---|
| Hero v1 | Scroll-morph footage | `hero-v1-scroll-morph.md` | ✅ full component |
| Hero v3 | Animated marquee | `hero-v3-marquee.md` | ✅ full component |
| Hero v2 | Drag compare (original) | — | n/a, built from scratch |
| 03 | Wavy stacked type | `03-wavy-text-block.md` | ❌ demo usage only |
| 05a | Gemini-style path fan-out | `05a-gemini-effect.md` | ❌ demo usage only |
| 05b | Dynamic frame layout | `05b-dynamic-frame-layout.md` | ❌ demo usage only |

The HTML mockups in `public/mockups/` are vanilla JS reimplementations of these ideas, adapted to
Lumen's copy and tokens. Where a reference is missing its source, the mockup **is** the spec.
