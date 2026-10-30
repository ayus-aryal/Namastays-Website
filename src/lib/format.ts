const npr = new Intl.NumberFormat('en-NP', {
  style: 'currency',
  currency: 'NPR',
  maximumFractionDigits: 0
});

/** Prices are stored as whole rupees. */
export const formatPrice = (amount: number) => npr.format(amount).replace(/\u00a0/g, ' ');

export const formatDuration = (days: number | null | undefined) =>
  days == null ? null : days === 1 ? '1 day' : `${days} days`;

/** Splits stored text into paragraphs (blank line = new paragraph). */
export const toParagraphs = (text: string | null | undefined): string[] =>
  (text ?? '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

/** "short_hikes" -> "Short hikes" */
export const humanizeCategory = (value: string) => {
  const text = value.replace(/[_-]+/g, ' ').trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const plural = (count: number, one: string, many = `${one}s`) => `${count} ${count === 1 ? one : many}`;

/** "2 stays · 1 place to eat", or "Coming soon" when a city has no listings yet. */
export const describeCounts = (counts: { stays: number; food: number; places: number }) => {
  const parts = [
    counts.stays > 0 && plural(counts.stays, 'stay'),
    counts.food > 0 && `${counts.food} ${counts.food === 1 ? 'place' : 'places'} to eat`,
    counts.places > 0 && `${counts.places} ${counts.places === 1 ? 'place' : 'places'} to visit`
  ].filter(Boolean);
  return parts.length ? parts.join(' · ') : 'Coming soon';
};

export const totalCount = (counts: { stays: number; food: number; places: number }) =>
  counts.stays + counts.food + counts.places;
