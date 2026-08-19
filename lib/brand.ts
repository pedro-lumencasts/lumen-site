/**
 * Single source of truth for the wordmark.
 *
 * Open decision #6: the company name is unresolved (the source doc still says
 * "Lumencasts", a rename is under discussion). Everything that prints the name
 * imports from here, so the swap is one edit.
 */

export const BRAND_NAME = "Lumen";

/** Section 12's header doubles as a tagline. Also unresolved — depends on the naming. */
export const BRAND_TAGLINE = "Built To Binge.";

export const NAV_LINKS = [
  { label: "The work", href: "#the-work" },
  { label: "What we edit", href: "#what-we-edit" },
  { label: "Pricing", href: "#pricing" },
  { label: "Questions", href: "#questions" },
];

/** Resolved: primary CTA is "Try one video" (open decision #4). */
export const CTA_PRIMARY = { label: "Try one video", href: "#start" };
export const CTA_SECONDARY = { label: "Build your order", href: "#start" };
export const CTA_WORK = { label: "See the work", href: "#the-work" };
