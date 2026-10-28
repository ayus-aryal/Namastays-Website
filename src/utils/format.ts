import { ListingCategory } from '../types';

export const usd = (value: number) => '$' + value;

export const priceLevelLabel = (level: 1 | 2 | 3) => '$'.repeat(level);

export const categoryLabel: Record<ListingCategory, string> = {
  stays: 'Stays',
  food: 'Food & Cafes',
  treks: 'Treks & Hikes'
};

export const categorySingular: Record<ListingCategory, string> = {
  stays: 'Stay',
  food: 'Restaurant / Cafe',
  treks: 'Trek'
};

export const listingHref = (category: ListingCategory, citySlug: string, slug: string) =>
'/explore/' + citySlug + '/' + category + '/' + slug;

export const categoryHref = (category: ListingCategory, citySlug: string) =>
'/explore/' + citySlug + '/' + category;

export const compactNumber = (value: number) =>
value >= 1000 ? (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(value);

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');