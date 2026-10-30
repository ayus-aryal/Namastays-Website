import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CityPage } from '../../../views/CityPage';
import { getCities, getCity, getPlaces, getStays } from '../../../lib/api';
import { totalCount } from '../../../lib/format';
import { optimizeImage } from '../../../lib/images';
import { clip } from '../../../lib/site';

type Props = { params: Promise<{ citySlug: string }> };

export async function generateStaticParams() {
  return (await getCities()).map((c) => ({ citySlug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug } = await params;
  const city = await getCity(citySlug);
  if (!city) return {};
  const hasContent = totalCount(city.counts) > 0 || city.intro.length > 0;
  const image = optimizeImage(city.image, 1200);
  return {
    title: hasContent ? `${city.name}: stays, food and places to visit` : city.name,
    description: clip(city.tagline ?? city.intro[0] ?? `Stays, food and places to visit in ${city.name}, ${city.region}.`),
    alternates: { canonical: `/explore/${city.slug}` },
    // Don't ask search engines to index a city page that has nothing on it yet.
    robots: hasContent ? undefined : { index: false, follow: true },
    ...(image ? { openGraph: { images: [image] } } : {})
  };
}

export default async function Page({ params }: Props) {
  const { citySlug } = await params;
  const city = await getCity(citySlug);
  if (!city) notFound();
  const [stays, places] = await Promise.all([getStays(citySlug), getPlaces(citySlug)]);
  return <CityPage city={city} stays={stays} places={places} />;
}
