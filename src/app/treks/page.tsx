import type { Metadata } from 'next';
import { TreksPage } from '../../views/TreksPage';
import { getTreks } from '../../lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const treks = await getTreks();
  return {
    title: 'Treks and hikes in Nepal',
    description: 'Trek routes in Nepal with distance, duration, elevation, itineraries and offline maps in the Namastays app.',
    alternates: { canonical: '/treks' },
    robots: treks.length > 0 ? undefined : { index: false, follow: true }
  };
}

export default async function Page() {
  return <TreksPage treks={await getTreks()} />;
}
