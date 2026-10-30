import Link from 'next/link';
import { CompassIcon, MountainSnowIcon, SmartphoneIcon, SearchIcon, ArrowRightIcon } from 'lucide-react';
import { CityTile, PlaceCard, StayCard, TrekCard } from '../components/cards';
import { SectionHeading } from '../components/SectionHeading';
import { AppPromo } from '../components/AppPromo';
import { HERO_IMAGE_URL } from '../lib/app';
import { optimizeImage } from '../lib/images';
import { isFood } from '../lib/api/mappers';
import { totalCount } from '../lib/format';
import type { CitySummary, Place, Stay, TrekSummary } from '../lib/models';

const steps = [
  { icon: <SearchIcon width={18} height={18} />, title: 'Explore here', body: 'Browse destinations, stays, places to eat and treks, with photos, details and maps.' },
  { icon: <SmartphoneIcon width={18} height={18} />, title: 'Get the app', body: 'The Namastays app is where you book stays and use treks on the trail.' },
  { icon: <MountainSnowIcon width={18} height={18} />, title: 'Go', body: 'Use offline maps and track your route, even when there is no signal.' }
];

type Props = { cities: CitySummary[]; stays: Stay[]; places: Place[]; treks: TrekSummary[] };

export function Home({ cities, stays, places, treks }: Props) {
  const activeCities = cities.filter((c) => totalCount(c.counts) > 0).sort((a, b) => totalCount(b.counts) - totalCount(a.counts));
  const shownCities = activeCities.length > 0 ? activeCities : cities;
  const food = places.filter((p) => isFood(p));
  const visit = places.filter((p) => !isFood(p));
  const hero = optimizeImage(HERO_IMAGE_URL, 1800);

  return (
    <>
      <section className="relative bg-gradient-to-br from-forest-900 to-ink-900" aria-labelledby="hero-title">
        {hero && (
          <div className="absolute inset-0">
            <img src={hero} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-ink-900/55" />
          </div>
        )}
        <div className="relative mx-auto max-w-site px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <span className="font-devanagari">नमस्ते</span> · Namastays
            </p>
            <h1 id="hero-title" className="text-4xl font-extrabold leading-[1.08] text-white sm:text-6xl">
              Stays, food and treks across Nepal
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/85 sm:text-lg">
              Find places to stay, eat and explore, and trek routes with maps and itineraries. Book and navigate in
              the Namastays app.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/explore" className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-white/90">
                <CompassIcon width={16} height={16} />
                Explore destinations
              </Link>
              {treks.length > 0 && (
                <Link href="/treks" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  <MountainSnowIcon width={16} height={16} />
                  Browse treks
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {shownCities.length > 0 && (
        <section aria-labelledby="cities-title" className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            eyebrow="Explore by city"
            title="Where in Nepal are you headed?"
            linkLabel="All destinations"
            linkHref="/explore" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shownCities.slice(0, 6).map((city) => <CityTile key={city.slug} city={city} />)}
          </div>
        </section>
      )}

      {stays.length > 0 && (
        <section aria-labelledby="stays-title" className="mx-auto max-w-site px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <SectionHeading eyebrow="Stays" title="Places to sleep" description="Book them in the Namastays app." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stays.slice(0, 6).map((s) => <StayCard key={s.slug} stay={s} />)}
          </div>
        </section>
      )}

      {treks.length > 0 && (
        <section aria-labelledby="treks-title" className="border-y border-ink-100 bg-forest-50/40 py-16 sm:py-20">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Treks"
              title="Treks and hikes"
              description="Routes with distance, elevation and itineraries. Download offline maps in the app."
              linkLabel="Browse all treks"
              linkHref="/treks" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {treks.slice(0, 6).map((t) => <TrekCard key={t.slug} trek={t} />)}
            </div>
          </div>
        </section>
      )}

      {food.length > 0 && (
        <section aria-labelledby="food-title" className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading eyebrow="Food & cafes" title="Places to eat" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {food.slice(0, 6).map((p) => <PlaceCard key={p.slug} place={p} />)}
          </div>
        </section>
      )}

      {visit.length > 0 && (
        <section aria-labelledby="visit-title" className="mx-auto max-w-site px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <SectionHeading eyebrow="Places" title="Places to visit" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visit.slice(0, 6).map((p) => <PlaceCard key={p.slug} place={p} />)}
          </div>
        </section>
      )}

      <section aria-labelledby="how-title" className="border-y border-ink-100 bg-ink-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <h2 id="how-title" className="text-2xl font-bold sm:text-3xl">How Namastays works</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-ink-100 bg-white p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-50 text-forest-700">{s.icon}</span>
                <h3 className="mt-4 text-[16px] font-bold">{i + 1}. {s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
              </li>
            ))}
          </ol>
          <Link href="/list-your-property" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:underline">
            Own a stay? List your property <ArrowRightIcon width={15} height={15} />
          </Link>
        </div>
      </section>

      <div className="py-16 sm:py-20">
        <AppPromo />
      </div>
    </>
  );
}
