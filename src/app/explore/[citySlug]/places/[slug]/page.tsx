import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PlaceDetailView } from '../../../../../views/PlaceDetailView';
import { getCatalog } from '../../../../../lib/api/catalog';
import { getPlace } from '../../../../../lib/api';
import { isFood } from '../../../../../lib/api/mappers';
import { optimizeImage } from '../../../../../lib/images';
import { clip } from '../../../../../lib/site';

type Props = { params: Promise<{ citySlug: string; slug: string }> };

export async function generateStaticParams() {
  const { places } = await getCatalog();
  return places.filter((p) => !isFood(p)).map((p) => ({ citySlug: p.citySlug, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug, slug } = await params;
  const place = await getPlace(citySlug, slug);
  if (!place || isFood(place)) return {};
  const image = optimizeImage(place.images[0], 1200);
  return {
    title: `${place.name}${place.cityName ? ` in ${place.cityName}` : ''}`,
    description: clip(place.description ?? `${place.name}${place.cityName ? ` in ${place.cityName}` : ''}.`),
    alternates: { canonical: `/explore/${place.citySlug}/places/${place.slug}` },
    openGraph: image ? { images: [image] } : undefined
  };
}

export default async function Page({ params }: Props) {
  const { citySlug, slug } = await params;
  const place = await getPlace(citySlug, slug);
  if (!place || isFood(place)) notFound();
  return <PlaceDetailView place={place} />;
}
