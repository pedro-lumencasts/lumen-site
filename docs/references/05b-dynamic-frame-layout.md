# Section 05b — Dynamic frame layout

Source: 21st.dev · https://21st.dev/@oeneco/components/dynamic-frame-layout
**Only the demo usage was captured. Component source not included — pull from 21st.dev.**

```tsx
"use client"
import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout"
const demoFrames = [
  { id: 1, video: "…", defaultPos: { x: 0, y: 0, w: 4, h: 4 }, mediaSize: 1, isHovered: false },
  // …9 frames total, 3×3 grid, x/y in steps of 4
]
export function DemoPage() {
  return (
    <div className="h-screen w-screen bg-zinc-900">
      <DynamicFrameLayout frames={demoFrames} className="w-full h-full" hoverSize={6} gapSize={4} />
    </div>
  )
}
```

## Lumen adaptation

Nine frames map exactly to **the nine formats** listed in the copy — that's why the 3×3 grid
fits without padding it out. Each frame carries its aspect-ratio badge (16:9, 9:16, 1:1) so the
grid communicates format range, not just "we have work". Hovering expands the row and column.

Frames should eventually hold real client video, not stills.

Working implementation: `public/mockups/section-05-what-we-edit.html` (part B, CSS-grid version)
