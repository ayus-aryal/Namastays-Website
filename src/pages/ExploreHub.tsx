import React from 'react';
import { Link } from 'react-router-dom';
import { BedDoubleIcon, UtensilsCrossedIcon, MountainSnowIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CityCard } from '../components/CityCard';
import { SearchBar } from '../components/SearchBar';
import { MapView } from '../components/MapView';
import { cities } from '../data/cities';

export function ExploreHub() {
  const totals = cities.reduce(
    (acc, c) => ({
      stays: acc.stays + c.counts.stays,
      food: acc.food + c.counts.food,
      treks: acc.treks + c.counts.treks
    }),
    { stays: 0, food: 0, treks: 0 }
  );

  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Explore' }]} className="mb-6" />

          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
                Explore Nepal by destination
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-600 sm:text-base">
                Nepal packs eight of the world’s fourteen 8,000m peaks, subtropical jungle, medieval city
                squares and high desert into an area smaller than England. Namastays organises it the way you
                actually travel it — by destination, then by whether you need a bed, a meal or a trail.
              </p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600 sm:text-base">
                Every destination below has its own hub page, and every stay, kitchen and trek inside it has an
                individual page with photos, real reviews and location — {totals.stays} stays,{' '}
                {totals.food} eateries and {totals.treks} recorded trails in total.
              </p>

              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
                {[
                { icon: <BedDoubleIcon width={16} height={16} />, label: 'Bookable stays', value: totals.stays },
                {
                  icon: <UtensilsCrossedIcon width={16} height={16} />,
                  label: 'Restaurants & cafes',
                  value: totals.food
                },
                {
                  icon: <MountainSnowIcon width={16} height={16} />,
                  label: 'Tracked trails',
                  value: totals.treks
                }].
                map((s) =>
                <div key={s.label}>
                    <dt className="flex items-center gap-1.5 text-[13px] font-medium text-ink-500">
                      {s.icon}
                      {s.label}
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-bold">{s.value}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-8 max-w-xl">
                <SearchBar variant="compact" />
              </div>
            </div>

            <MapView
              ariaLabel="Map of Namastays destinations across Nepal"
              center={{ lat: 28.1, lng: 84.3 }}
              zoom={6}
              className="h-[340px] w-full lg:h-[460px]"
              markers={cities.map((c) => ({
                id: c.slug,
                lat: c.coords.lat,
                lng: c.coords.lng,
                label: c.name,
                meta: `${c.counts.stays} stays · ${c.counts.treks} treks`
              }))} />
            
          </div>
        </div>
      </div>

      <section aria-labelledby="all-cities" className="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8">
        <h2 id="all-cities" className="text-2xl font-bold sm:text-3xl">
          All destinations
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] text-ink-600">
          Seven regions live today, with Ilam, Rara and Dolpo opening later in 2026.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) =>
          <CityCard key={city.slug} city={city} />
          )}
        </div>
      </section>

      <section
        aria-labelledby="quick-links"
        className="mx-auto max-w-site px-4 pb-16 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl border border-ink-100 bg-ink-50/70 p-6 sm:p-9">
          <h2 id="quick-links" className="text-xl font-bold sm:text-2xl">
            Jump straight to a category
          </h2>
          <p className="mt-2 text-[15px] text-ink-600">
            Category pages are filterable and sortable, with a map view for every result set.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {(
            [
            { key: 'stays', label: 'Stays', icon: <BedDoubleIcon width={15} height={15} /> },
            { key: 'food', label: 'Food & Cafes', icon: <UtensilsCrossedIcon width={15} height={15} /> },
            { key: 'treks', label: 'Treks & Hikes', icon: <MountainSnowIcon width={15} height={15} /> }] as
            const).
            map((cat) =>
            <div key={cat.key}>
                <h3 className="flex items-center gap-2 text-sm font-bold text-ink-900">
                  {cat.icon}
                  {cat.label}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-600">
                  {cities.map((c) =>
                <li key={c.slug}>
                      <Link
                    to={`/explore/${c.slug}/${cat.key}`}
                    className="hover:text-forest-700 hover:underline">
                    
                        {cat.label} in {c.name}
                      </Link>
                    </li>
                )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </>);

}