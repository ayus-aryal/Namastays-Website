import Link from 'next/link';
import { CompassIcon, HomeIcon } from 'lucide-react';
import { CityTile } from '../components/cards';
import { getCities } from '../lib/api';
import { totalCount } from '../lib/format';

export async function NotFound() {
  const cities = (await getCities())
    .sort((a, b) => totalCount(b.counts) - totalCount(a.counts))
    .slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-site px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <p className="font-display text-6xl font-extrabold text-brand-700 sm:text-7xl">404</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          This trail doesn’t go anywhere
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-ink-600">
          The page you were looking for has moved or never existed. Pick a destination to keep exploring.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/explore"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800">
            <CompassIcon width={16} height={16} />
            Explore by city
          </Link>
          <Link
            href="/"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-800 transition-colors hover:border-brand-600 hover:text-brand-700">
            <HomeIcon width={16} height={16} />
            Back to home
          </Link>
        </div>
      </section>

      {cities.length > 0 && (
        <section aria-labelledby="nf-cities" className="mx-auto max-w-site px-4 pb-16 sm:px-6 lg:px-8">
          <h2 id="nf-cities" className="text-xl font-bold sm:text-2xl">Destinations</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((city) => <CityTile key={city.slug} city={city} />)}
          </div>
        </section>
      )}
    </>
  );
}
