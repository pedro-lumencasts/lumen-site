import { BRAND_NAME, NAV_LINKS } from "@/lib/brand";

/** 13 · Footer — not in the source doc, invented. */
export function SiteFooter() {
  return (
    <footer className="border-t border-line px-6 py-14">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-[280px]">
          <p className="font-[family-name:var(--font-display)] text-[17px] font-bold tracking-[-0.02em] text-ink">
            {BRAND_NAME}
          </p>
          <p className="mt-3 text-sm leading-[1.6] text-ink-dim">
            Video post-production. Editing you don&apos;t have to double-check.
          </p>
        </div>

        <div className="flex gap-14">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-ink-dim">
              Site
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-ink-dim transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-ink-dim">
              Start
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a href="#start" className="text-sm text-ink-dim transition-colors hover:text-ink">
                  Try one video
                </a>
              </li>
              <li>
                <a href="#start" className="text-sm text-ink-dim transition-colors hover:text-ink">
                  Build your order
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1200px] items-center justify-between border-t border-line pt-6 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] text-ink-dim">
        <span>
          © {new Date().getFullYear()} {BRAND_NAME}
        </span>
        <span>[PLACEHOLDER] Legal links</span>
      </div>
    </footer>
  );
}
