import type { Metadata } from 'next';
import { ExploreHub } from '../../views/ExploreHub';
import { getCities, getTreks } from '../../lib/api';

export const metadata: Metadata = {
  title: 'Explore Nepal by destination',
  description: 'Browse Nepal by destination and find stays, places to eat and places to visit in each one.',
  alternates: { canonical: '/explore' }
};

export default async function Page() {
  const [cities, treks] = await Promise.all([getCities(), getTreks()]);
  return <ExploreHub cities={cities} trekCount={treks.length} />;
}
