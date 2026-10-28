import { City, FoodListing, ListingCategory, Stay, Trek } from '../types';
import { FilterGroup } from '../components/FilterChips';

export type AnyListing = Stay | FoodListing | Trek;

export const buildFilterGroups = (
category: ListingCategory,
items: AnyListing[],
city?: City)
: FilterGroup[] => {
  const areas = Array.from(new Set(items.map((i) => i.area))).slice(0, 6);
  const areaGroup: FilterGroup = { id: 'area', label: 'Area', options: areas.length ? areas : city?.areas ?? [] };
  const ratingGroup: FilterGroup = { id: 'rating', label: 'Rating', options: ['4.5+', '4.8+'] };

  if (category === 'stays') {
    return [
    { id: 'price', label: 'Price', options: ['Under $30', '$30–60', '$60+'] },
    ratingGroup,
    { id: 'type', label: 'Type', options: Array.from(new Set((items as Stay[]).map((s) => s.type))) },
    areaGroup];

  }

  if (category === 'food') {
    const cuisines = Array.from(new Set((items as FoodListing[]).flatMap((f) => f.cuisines))).slice(0, 8);
    return [
    { id: 'cuisine', label: 'Cuisine', options: cuisines },
    { id: 'price', label: 'Price', options: ['$', '$$', '$$$'] },
    ratingGroup,
    areaGroup];

  }

  return [
  { id: 'difficulty', label: 'Difficulty', options: ['Easy', 'Moderate', 'Challenging', 'Strenuous'] },
  { id: 'length', label: 'Length', options: ['Under 10 km', '10–50 km', '50 km+'] },
  ratingGroup,
  areaGroup];

};

export const applyFilters = (
category: ListingCategory,
items: AnyListing[],
active: Record<string, string | null>)
: AnyListing[] =>
items.filter((item) => {
  if (active.area && item.area !== active.area) return false;
  if (active.rating === '4.5+' && item.rating < 4.5) return false;
  if (active.rating === '4.8+' && item.rating < 4.8) return false;

  if (category === 'stays') {
    const s = item as Stay;
    if (active.type && s.type !== active.type) return false;
    if (active.price === 'Under $30' && s.pricePerNight >= 30) return false;
    if (active.price === '$30–60' && (s.pricePerNight < 30 || s.pricePerNight > 60)) return false;
    if (active.price === '$60+' && s.pricePerNight <= 60) return false;
  }

  if (category === 'food') {
    const f = item as FoodListing;
    if (active.cuisine && !f.cuisines.includes(active.cuisine)) return false;
    if (active.price && '$'.repeat(f.priceLevel) !== active.price) return false;
  }

  if (category === 'treks') {
    const t = item as Trek;
    if (active.difficulty && t.difficulty !== active.difficulty) return false;
    if (active.length === 'Under 10 km' && t.distanceKm >= 10) return false;
    if (active.length === '10–50 km' && (t.distanceKm < 10 || t.distanceKm > 50)) return false;
    if (active.length === '50 km+' && t.distanceKm <= 50) return false;
  }

  return true;
});

export type SortKey = 'recommended' | 'rating' | 'price-asc' | 'price-desc' | 'distance';

export const sortOptions = (category: ListingCategory): {key: SortKey;label: string;}[] => {
  if (category === 'stays') {
    return [
    { key: 'recommended', label: 'Recommended' },
    { key: 'rating', label: 'Highest rated' },
    { key: 'price-asc', label: 'Price: low to high' },
    { key: 'price-desc', label: 'Price: high to low' }];

  }
  if (category === 'treks') {
    return [
    { key: 'recommended', label: 'Recommended' },
    { key: 'rating', label: 'Highest rated' },
    { key: 'distance', label: 'Shortest first' }];

  }
  return [
  { key: 'recommended', label: 'Recommended' },
  { key: 'rating', label: 'Highest rated' }];

};

export const applySort = (category: ListingCategory, items: AnyListing[], sort: SortKey): AnyListing[] => {
  const copy = [...items];
  if (sort === 'rating') return copy.sort((a, b) => b.rating - a.rating);
  if (sort === 'price-asc' && category === 'stays')
  return copy.sort((a, b) => (a as Stay).pricePerNight - (b as Stay).pricePerNight);
  if (sort === 'price-desc' && category === 'stays')
  return copy.sort((a, b) => (b as Stay).pricePerNight - (a as Stay).pricePerNight);
  if (sort === 'distance' && category === 'treks')
  return copy.sort((a, b) => (a as Trek).distanceKm - (b as Trek).distanceKm);
  return copy.sort((a, b) => b.reviewCount - a.reviewCount);
};