"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BRAND_NAME, CTA_PRIMARY, NAV_LINKS } from "@/lib/brand";

/**
 * 00 · Nav — not in the source doc, invented.
 * Wordmark, section links, primary CTA. Goes solid once you leave the hero.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && "border-b border-line bg-bg/80 backdrop-blur-md",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-[17px] font-bold tracking-[-0.02em] text-ink"
        >
          {BRAND_NAME}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-ink-dim transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={CTA_PRIMARY.href}
          className="rounded border border-accent bg-accent px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-dark"
        >
          {CTA_PRIMARY.label}
        </a>
      </nav>
    </header>
  );
}
