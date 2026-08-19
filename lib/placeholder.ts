/**
 * Dumb placeholder frames.
 *
 * Every image on the site is standing in for client footage we don't have yet.
 * These are deliberately, obviously fake: a flat colour block with a dashed inset.
 * No network request, nothing to 404, nothing that could pass for real work.
 *
 * They carry a hue rather than being flat grey on purpose — section 02 sells its
 * before/after by running saturation filters over the same frame, and that reads
 * as nothing at all on a grey box.
 *
 * When real footage arrives, replace the `placeholder(...)` calls with the URLs.
 */

export type Ratio = "16:9" | "9:16" | "1:1";

export function placeholder(seed = 0, ratio: Ratio = "16:9") {
  const [w, h] = ratio === "9:16" ? [90, 160] : ratio === "1:1" ? [120, 120] : [160, 90];
  // Deterministic, so server and client render the same block.
  const hue = Math.round((((seed * 47) % 360) + 360) % 360);

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">` +
    `<rect width="${w}" height="${h}" fill="hsl(${hue},32%,52%)"/>` +
    `<rect x="5" y="5" width="${w - 10}" height="${h - 10}" fill="none" ` +
    `stroke="rgba(255,255,255,0.45)" stroke-width="0.7" stroke-dasharray="3 3"/>` +
    `</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
