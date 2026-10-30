import type { Metadata } from 'next';
import { Home } from '../views/Home';
import { getCatalog } from '../lib/api/catalog';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default async function HomePage() {
  const { cities, stays, places, treks } = await getCatalog();
  return <Home cities={cities} stays={stays} places={places} treks={treks} />;
}
