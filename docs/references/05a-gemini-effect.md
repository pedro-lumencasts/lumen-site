# Section 05a — Gemini-style path fan-out

Source: 21st.dev · `@/components/ui/google-gemini-effect`
**Only the demo usage was captured. Component source not included — pull from 21st.dev.**

```tsx
"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
export function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[pathLengthFirst,pathLengthSecond,pathLengthThird,pathLengthFourth,pathLengthFifth]}
      />
    </div>
  );
}
```

## Lumen adaptation

The paths mean something here: **one recording fans out into five formats.** A `ONE RECORDING`
chip sits at the origin point; format labels (SHORTS / CLIPS / LONG-FORM / REELS / PROMOS)
light up at the end of each path as it completes. That's the copy's "one recording usually
becomes several pieces" made literal.

Working implementation: `mockups/section-05-what-we-edit.html` (part A)
