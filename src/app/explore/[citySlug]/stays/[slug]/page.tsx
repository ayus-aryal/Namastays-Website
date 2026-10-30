import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StayDetailView } from '../../../../../views/StayDetailView';
import { getStay, getStays } from '../../../../../lib/api';
import { optimizeImage } from '../../../../../lib/images';
import { clip } from '../../../../../lib/site';

type Props = { params: Promise<{ citySlug: string; slug: string }> };

export async function generateStaticParams() {
  return (await getStays()).map((s) => ({ citySlug: s.citySlug, slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug, slug } = await params;
  const stay = await getStay(slug);
  if (!stay || stay.citySlug !== citySlug) return {};
  const image = optimizeImage(stay.images[0], 1200);
  return {
    title: `${stay.name}: ${stay.type} in ${stay.city}`,
    description: clip(stay.description ?? `${stay.name} is a ${stay.type.toLowerCase()} in ${stay.city}, ${stay.state}.`),
    alternates: { canonical: `/explore/${stay.citySlug}/stays/${stay.slug}` },
    openGraph: image ? { images: [image] } : undefined
  };
}

export default async function Page({ params }: Props) {
  const { citySlug, slug } = await params;
  const stay = await getStay(slug);
  if (!stay || stay.citySlug !== citySlug) notFound();
  return <StayDetailView stay={stay} />;
}
