import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionListing } from '../../../../views/SectionListing';
import { SECTION_META } from '../../../../components/sections';
import { getCities, getCity, getPlaces, getStays } from '../../../../lib/api';
import { isFood } from '../../../../lib/api/mappers';
import { SECTIONS, isSection, type Section } from '../../../../lib/site';

type Props = { params: Promise<{ citySlug: string; section: string }> };

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.flatMap((city) =>
    SECTIONS.filter((section) => city.counts[section] > 0).map((section) => ({ citySlug: city.slug, section }))
  );
}

async function load(citySlug: string, section: Section) {
  const city = await getCity(citySlug);
  if (!city) return null;
  if (section === 'stays') return { kind: 'stays' as const, city, stays: await getStays(citySlug) };
  const places = (await getPlaces(citySlug)).filter((p) => (section === 'food' ? isFood(p) : !isFood(p)));
  return { kind: 'places' as const, city, places };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug, section } = await params;
  if (!isSection(section)) return {};
  const data = await load(citySlug, section);
  if (!data) return {};
  const count = data.kind === 'stays' ? data.stays.length : data.places.length;
  return {
    title: SECTION_META[section].title(data.city.name),
    description: SECTION_META[section].blurb(data.city.name),
    alternates: { canonical: `/explore/${citySlug}/${section}` },
    robots: count > 0 ? undefined : { index: false, follow: true }
  };
}

export default async function Page({ params }: Props) {
  const { citySlug, section } = await params;
  if (!isSection(section)) notFound();
  const data = await load(citySlug, section);
  if (!data) notFound();
  return data.kind === 'stays'
    ? <SectionListing city={data.city} section="stays" stays={data.stays} />
    : <SectionListing city={data.city} section={section as 'food' | 'places'} places={data.places} />;
}
