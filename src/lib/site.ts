export const SITE_NAME = 'Namastays';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
/** Sections that live under a city. Treks have their own top-level pages (/treks). */
export const SECTIONS = ['stays', 'food', 'places'] as const;
export type Section = (typeof SECTIONS)[number];
export const isSection = (value: string): value is Section => (SECTIONS as readonly string[]).includes(value);

/** Trim copy to a length that search engines won't cut off mid-sentence. */
export function clip(text: string, max = 158) {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\-–—]$/, '') + '…';
}
