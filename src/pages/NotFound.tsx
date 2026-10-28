import React from 'react';
import { Link } from 'react-router-dom';
import { CompassIcon, HomeIcon } from 'lucide-react';
import { CityCard } from '../components/CityCard';
import { SearchBar } from '../components/SearchBar';
import { cities } from '../data/cities';

export function NotFound() {
  return (
    <>
      <section className="mx-auto max-w-site px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <p className="font-display text-6xl font-extrabold text-forest-700 sm:text-7xl">404</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          This trail doesn’t go anywhere
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-ink-600">
          The page you were looking for has moved, closed or never existed. Let’s get you back to a real
          destination — search below, or pick a region to explore.
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <SearchBar variant="compact" />
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/explore"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-forest-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800">
            
            <CompassIcon width={16} height={16} />
            Explore by city
          </Link>
          <Link
            to="/"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700">
            
            <HomeIcon width={16} height={16} />
            Back to home
          </Link>
        </div>
      </section>

      <section aria-labelledby="nf-cities" className="mx-auto max-w-site px-4 pb-16 sm:px-6 lg:px-8">
        <h2 id="nf-cities" className="text-xl font-bold sm:text-2xl">
          Popular destinations
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cities.slice(0, 4).map((city) =>
          <CityCard key={city.slug} city={city} />
          )}
        </div>
      </section>
    </>);

}