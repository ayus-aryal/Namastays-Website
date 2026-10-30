import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TrekDetailView } from '../../../views/TrekDetailView';
import { getTrek, getTrekRoute, getTreks } from '../../../lib/api';
import { formatDuration } from '../../../lib/format';
import { optimizeImage } from '../../../lib/images';
import { clip } from '../../../lib/site';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getTreks()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrek(slug);
  if (!trek) return {};
  const duration = formatDuration(trek.durationDays);
  const image = optimizeImage(trek.images[0] ?? trek.image, 1200);
  return {
    title: duration ? `${trek.name}: ${duration} trek` : trek.name,
    description: clip(trek.description ?? `${trek.name}${trek.region ? ` in ${trek.region}` : ''}: route, itinerary and offline map.`),
    alternates: { canonical: `/treks/${trek.slug}` },
    ...(image ? { openGraph: { images: [image] } } : {})
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const trek = await getTrek(slug);
  if (!trek) notFound();
  const route = await getTrekRoute(trek.gpxUrl);
  return <TrekDetailView trek={trek} route={route} />;
}
