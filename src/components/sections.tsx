import type { ReactNode } from 'react';
import { BedDoubleIcon, UtensilsCrossedIcon, TreesIcon } from 'lucide-react';
import type { Section } from '../lib/site';

export const SECTION_META: Record<
  Section,
  { label: string; title: (city: string) => string; blurb: (city: string) => string; icon: ReactNode }
> = {
  stays: {
    label: 'Stays',
    title: (city) => `Stays in ${city}`,
    blurb: (city) => `Hotels, homestays and lodges in ${city}. Book them in the Namastays app.`,
    icon: <BedDoubleIcon width={16} height={16} />
  },
  food: {
    label: 'Food & Cafes',
    title: (city) => `Places to eat in ${city}`,
    blurb: (city) => `Restaurants, cafes and local kitchens worth finding in ${city}.`,
    icon: <UtensilsCrossedIcon width={16} height={16} />
  },
  places: {
    label: 'Places to visit',
    title: (city) => `Places to visit in ${city}`,
    blurb: (city) => `Parks, short hikes, weekend trips and other places to explore around ${city}.`,
    icon: <TreesIcon width={16} height={16} />
  }
};
