import { CTA_PRIMARY, CTA_WORK } from "@/lib/brand";

/**
 * 01 · Hero.
 *
 * The scroll-morph card choreography (mockups/hero-v1-scroll-morph.html) was cut:
 * it looked good but it cost a 300vh wrapper, a rAF loop and a scatter→circle→arc
 * state machine to say nothing the headline doesn't say faster. This is a plain
 * static hero — no scroll range of its own, no animation loop.
 *
 * Layout: copy left, video bleeding off the right edge, a scrim in the page colour
 * washing over the video's left side so the text always sits on flat background.
 * To put the copy on black instead, flip SCRIM_FROM below.
 */

/** Drop a file in /public and set this to e.g. "/hero.mp4". Null renders the placeholder. */
const HERO_VIDEO: string | null = null;

/** Colour the scrim fades from, behind the copy. Swap to "#0E0E12" for a dark hero. */
const SCRIM_FROM = "var(--color-bg)";

function Media({ className }: { className?: string }) {
  if (HERO_VIDEO) {
    return (
      <video
        className={`h-full w-full object-cover ${className ?? ""}`}
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#2A2A33,#14141A)] ${className ?? ""}`}
    >
      <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-white/30">
        VIDEO
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden lg:block">
      {/* Desktop: media bleeds off the right, scrim keeps the copy on flat ground.
          Mobile stacks instead — behind the copy the scrim never covered it cleanly. */}
      <div className="absolute inset-y-0 right-0 hidden w-[62%] lg:block">
        <Media />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${SCRIM_FROM} 0%, ${SCRIM_FROM} 20%, transparent 80%)`,
          }}
        />
      </div>

      {/* Copy */}
      <div className="relative z-10 w-full px-6 pt-28 pb-12 sm:px-10 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:px-[6vw] lg:py-24">
        <div className="max-w-[600px]">
          <p className="eyebrow flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Video post-production
          </p>

          <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(34px,5.2vw,60px)] font-bold leading-[1.05] tracking-[-0.025em]">
            If it goes on the internet, we edit it.
          </h1>

          <p className="mt-6 max-w-[460px] text-[15px] leading-[1.65] text-ink-dim">
            Podcasts, YouTube, reels, shorts, webinars, promos. Every one of them edited around your
            brand story, so everything you publish looks unmistakably yours.
          </p>

          <p className="mt-4 font-[family-name:var(--font-mono)] text-xs tracking-[0.06em] text-accent">
            Editing you don&apos;t have to double-check.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CTA_PRIMARY.href}
              className="rounded border border-accent bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
            >
              {CTA_PRIMARY.label}
            </a>
            <a
              href={CTA_WORK.href}
              className="rounded border border-line bg-surface px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink-dim"
            >
              {CTA_WORK.label}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile media, stacked under the copy */}
      <div className="mt-4 aspect-video w-full lg:hidden">
        <Media />
      </div>
    </section>
  );
}
