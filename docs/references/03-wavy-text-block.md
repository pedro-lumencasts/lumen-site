# Section 03 — Wavy text block

Source: 21st.dev · `@/components/ui/wavy-text-block`
**Only the demo usage was captured. Component source not included — pull from 21st.dev.**

```tsx
import { WavyBlock, WavyBlockItem } from "@/components/ui/wavy-text-block";
const titles = [
  'Flexible','Animated','Customizable','Optimized','Lightweight','Responsive','UI Blocks',
];
export default function DemoOne() {
  return (
     <main className="h-[300vh] pt-60 overflow-hidden">
       <div className="max-w-6xl">
      <WavyBlock className="flex flex-col justify-start items-start gap-6">
        {titles.map((title, index) => (
          <WavyBlockItem key={title} index={index}>
            <h2 className=" text-[9.3vw] font-bold leading-none tracking-tighter uppercase whitespace-nowrap">
              {title}
            </h2>
          </WavyBlockItem>
        ))}
      </WavyBlock>
    </div>
     </main>
  )
}
```

## Lumen adaptation

The demo uses disconnected feature words. **Ours uses the retention narrative as the lines**,
so the type itself carries the argument rather than decorating it:

```
Nobody watches
one reel
and buys.
They watch.
They come back.
They watch more.
Then they trust you.   ← accent color
```

Followed by the "Cutting the ums…" body copy and a `WE CALL IT TIME ON BRAND` mono chip.

Working implementation: `public/mockups/section-03-the-difference.html`
