import Link from 'next/link';
import { MountainSnowIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CityTile } from '../components/cards';
import { EmptyState } from '../components/EmptyState';
import type { CitySummary } from '../lib/models';
import { totalCount } from '../lib/format';

export function ExploreHub({ cities, trekCount }: { cities: CitySummary[]; trekCount: number }) {
  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Explore' }]} className="mb-6" />
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">Explore Nepal by destination</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-600 sm:text-base">
            Pick a destination to see its stays, places to eat and places to visit. Treks are listed separately,
            because many trails start and finish outside the cities.
          </p>
        </div>
      </div>

      <section aria-labelledby="all-cities" className="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8">
        <h2 id="all-cities" className="text-2xl font-bold sm:text-3xl">All destinations</h2>
        {cities.length === 0 ? (
          <div className="mt-8">
            <EmptyState title="Destinations are on the way" body="We’re adding places to the site. Check back soon." />
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...cities].sort((a, b) => totalCount(b.counts) - totalCount(a.counts)).map((city) => (
              <CityTile key={city.slug} city={city} />
            ))}
          </div>
        )}
      </section>

      {trekCount > 0 && (
        <section aria-labelledby="treks-callout" className="mx-auto max-w-site px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-3xl border border-ink-100 bg-ink-50/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <h2 id="treks-callout" className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
                <MountainSnowIcon width={22} height={22} aria-hidden="true" />
                Treks &amp; hikes
              </h2>
              <p className="mt-2 text-[15px] text-ink-600">
                {trekCount} {trekCount === 1 ? 'trek' : 'treks'} with route maps, itineraries and offline maps in the app.
              </p>
            </div>
            <Link href="/treks" className="focus-ring inline-block rounded-full bg-forest-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-forest-800">
              Browse treks
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
