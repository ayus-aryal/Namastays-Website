import Link from 'next/link';
import { CalendarCheckIcon, PlaneIcon, MapPinIcon, ArrowRightIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PlaceCard, StayCard } from '../components/cards';
import { EmptyState } from '../components/EmptyState';
import { AppPrompt } from '../components/AppPrompt';
import { MapView } from '../components/MapView';
import { SECTION_META } from '../components/sections';
import { SectionHeading } from '../components/SectionHeading';
import { centerOf } from '../lib/geo';
import { optimizeImage } from '../lib/images';
import { isFood } from '../lib/api/mappers';
import type { City, Place, Stay } from '../lib/models';

const PREVIEW = 6;

export function CityPage({ city, stays, places }: { city: City; stays: Stay[]; places: Place[] }) {
  const food = places.filter((p) => isFood(p));
  const visit = places.filter((p) => !isFood(p));
  const sections = [
    { key: 'stays' as const, count: stays.length, cards: stays.slice(0, PREVIEW).map((s) => <StayCard key={s.slug} stay={s} />) },
    { key: 'food' as const, count: food.length, cards: food.slice(0, PREVIEW).map((p) => <PlaceCard key={p.slug} place={p} />) },
    { key: 'places' as const, count: visit.length, cards: visit.slice(0, PREVIEW).map((p) => <PlaceCard key={p.slug} place={p} />) }
  ].filter((section) => section.count > 0);

  const mapPoints = [...stays.map((s) => s.coords), ...places.map((p) => p.coords)].filter((c): c is NonNullable<typeof c> => c !== null);
  const mapCenter = city.coords ?? centerOf(mapPoints);
  const hero = optimizeImage(city.image, 1600);
  const hasGuide = city.intro.length > 0 || city.bestTime || city.gettingThere || city.areas.length > 0;

  return (
    <>
      <section className="relative bg-ink-900" aria-labelledby="city-title">
        {hero && (
          <div className="absolute inset-0">
            <img src={hero} alt={`${city.name}, ${city.region}`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-ink-900/55" />
          </div>
        )}
        <div className="relative mx-auto max-w-site px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8">
          <Breadcrumbs onDark items={[{ label: 'Home', href: '/' }, { label: 'Explore', href: '/explore' }, { label: city.name }]} className="mb-8" />
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <MapPinIcon width={13} height={13} />
            {city.region}, {city.country}
          </p>
          <h1 id="city-title" className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">{city.name}</h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/85 sm:text-lg">
            {city.tagline ?? `Stays, food and places to visit in ${city.name}.`}
          </p>
          {sections.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2.5">
              {sections.map((s) => (
                <Link
                  key={s.key}
                  href={`/explore/${city.slug}/${s.key}`}
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-[13.5px] font-semibold text-ink-900 transition-colors hover:bg-white">
                  {SECTION_META[s.key].icon}
                  {s.count} {SECTION_META[s.key].label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {hasGuide && (
        <section aria-labelledby="city-intro" className="mx-auto max-w-site px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 id="city-intro" className="text-2xl font-bold sm:text-3xl">Travelling to {city.name}</h2>
              {city.intro.length > 0 && (
                <div className="mt-4 space-y-4 text-[15.5px] leading-[1.75] text-ink-700">
                  {city.intro.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              )}
              {(city.bestTime || city.gettingThere) && (
                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  {city.bestTime && (
                    <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
                      <dt className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">
                        <CalendarCheckIcon width={15} height={15} />
                        Best time to visit
                      </dt>
                      <dd className="mt-2 text-[14.5px] leading-relaxed text-ink-800">{city.bestTime}</dd>
                    </div>
                  )}
                  {city.gettingThere && (
                    <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
                      <dt className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">
                        <PlaneIcon width={15} height={15} />
                        Getting there
                      </dt>
                      <dd className="mt-2 text-[14.5px] leading-relaxed text-ink-800">{city.gettingThere}</dd>
                    </div>
                  )}
                </dl>
              )}
              {city.areas.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-ink-900">Areas &amp; neighbourhoods</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {city.areas.map((a) => (
                      <li key={a} className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-700">{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {mapCenter && (
              <MapView
                ariaLabel={`Map of ${city.name}`}
                center={mapCenter}
                zoom={12}
                className="h-[340px] w-full lg:h-[420px]"
                markers={[
                  ...stays.flatMap((s) => (s.coords ? [{ id: `stay-${s.slug}`, ...s.coords, label: s.name, meta: s.type }] : [])),
                  ...places.flatMap((p) => (p.coords ? [{ id: `place-${p.slug}`, ...p.coords, label: p.name }] : []))
                ]} />
            )}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-site space-y-14 px-4 py-12 sm:px-6 lg:px-8">
        {sections.length === 0 ? (
          <EmptyState
            title={`We’re still adding places in ${city.name}`}
            body="There are no listings here yet. Browse another destination, or see our treks."
            href="/explore"
            linkLabel="All destinations" />
        ) : (
          sections.map((s) => (
            <section key={s.key} aria-labelledby={`section-${s.key}`}>
              <SectionHeading
                title={SECTION_META[s.key].title(city.name)}
                description={SECTION_META[s.key].blurb(city.name)}
                linkLabel={s.count > PREVIEW ? `View all ${s.count}` : undefined}
                linkHref={s.count > PREVIEW ? `/explore/${city.slug}/${s.key}` : undefined} />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{s.cards}</div>
              {s.count <= PREVIEW && (
                <Link href={`/explore/${city.slug}/${s.key}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:underline">
                  Open {SECTION_META[s.key].label.toLowerCase()} page <ArrowRightIcon width={14} height={14} />
                </Link>
              )}
            </section>
          ))
        )}
        <AppPrompt
          title={`Take ${city.name} with you`}
          body="Save places, book stays and use offline maps in the Namastays app." />
      </div>
    </>
  );
}
