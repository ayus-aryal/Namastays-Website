import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BedDoubleIcon,
  UtensilsCrossedIcon,
  MountainSnowIcon,
  CalendarCheckIcon,
  PlaneIcon,
  MapPinIcon,
  ArrowRightIcon } from
'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ListingBrowser } from '../components/ListingBrowser';
import { MapView } from '../components/MapView';
import { CityCard } from '../components/CityCard';
import { cities, getCity } from '../data/cities';
import { staysInCity } from '../data/stays';
import { foodInCity } from '../data/food';
import { treksInCity } from '../data/treks';
import { ListingCategory } from '../types';
import { NotFound } from './NotFound';
import { cx } from '../utils/format';

const tabs: {key: ListingCategory;label: string;icon: React.ReactNode;}[] = [
{ key: 'stays', label: 'Stays', icon: <BedDoubleIcon width={16} height={16} /> },
{ key: 'food', label: 'Food & Cafes', icon: <UtensilsCrossedIcon width={16} height={16} /> },
{ key: 'treks', label: 'Treks & Hikes', icon: <MountainSnowIcon width={16} height={16} /> }];


export function CityPage() {
  const { citySlug } = useParams();
  const city = getCity(citySlug);
  const [tab, setTab] = useState<ListingCategory>('stays');

  if (!city) return <NotFound />;

  const stays = staysInCity(city.slug);
  const food = foodInCity(city.slug);
  const treks = treksInCity(city.slug);
  const items = tab === 'stays' ? stays : tab === 'food' ? food : treks;
  const nearby = cities.filter((c) => c.slug !== city.slug).slice(0, 3);

  return (
    <>
      {/* City hero */}
      <section className="relative" aria-labelledby="city-title">
        <div className="absolute inset-0">
          <img src={city.image} alt={`${city.name}, ${city.region}`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink-900/55" />
        </div>
        <div className="relative mx-auto max-w-site px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8">
          <Breadcrumbs
            onDark
            items={[{ label: 'Home', href: '/' }, { label: 'Explore', href: '/explore' }, { label: city.name }]}
            className="mb-8" />
          
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <MapPinIcon width={13} height={13} />
            {city.region}, Nepal
          </p>
          <h1 id="city-title" className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            {city.name}: stays, food and treks
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/85 sm:text-lg">
            {city.tagline}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {tabs.map((t) =>
            <Link
              key={t.key}
              to={`/explore/${city.slug}/${t.key}`}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-[13.5px] font-semibold text-ink-900 transition-colors hover:bg-white">
              
                {t.icon}
                {city.counts[t.key === 'food' ? 'food' : t.key === 'stays' ? 'stays' : 'treks']} {t.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* SEO intro */}
      <section aria-labelledby="city-intro" className="mx-auto max-w-site px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 id="city-intro" className="text-2xl font-bold sm:text-3xl">
              Travelling to {city.name}
            </h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-[1.75] text-ink-700">
              {city.intro.map((p, i) =>
              <p key={i}>{p}</p>
              )}
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
                <dt className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">
                  <CalendarCheckIcon width={15} height={15} />
                  Best time to visit
                </dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-ink-800">{city.bestTime}</dd>
              </div>
              <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
                <dt className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">
                  <PlaneIcon width={15} height={15} />
                  Getting there
                </dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-ink-800">{city.gettingThere}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <h3 className="text-sm font-bold text-ink-900">Areas &amp; neighbourhoods</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {city.areas.map((a) =>
                <li
                  key={a}
                  className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-700">
                  
                    {a}
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div>
            <MapView
              ariaLabel={`Map of ${city.name} listings`}
              center={city.coords}
              zoom={11}
              className="h-[300px] w-full sm:h-[380px]"
              markers={[...stays, ...food, ...treks].map((l) => ({
                id: l.slug,
                lat: l.coords.lat,
                lng: l.coords.lng,
                label: l.name,
                meta: l.area
              }))} />
            
            <ul className="mt-4 grid grid-cols-3 gap-3 text-center">
              {tabs.map((t) =>
              <li key={t.key} className="rounded-2xl border border-ink-100 bg-white p-3 shadow-card">
                  <p className="font-display text-xl font-bold">{city.counts[t.key]}</p>
                  <p className="mt-0.5 text-[12px] font-medium text-ink-500">{t.label}</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Tabbed listings */}
      <section
        aria-labelledby="city-listings"
        className="border-t border-ink-100 bg-ink-50/40 py-12 sm:py-16">
        
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <h2 id="city-listings" className="text-2xl font-bold sm:text-3xl">
            What’s listed in {city.name}
          </h2>

          <div
            role="tablist"
            aria-label="Listing categories"
            className="mt-6 flex gap-1 overflow-x-auto rounded-full border border-ink-200 bg-white p-1">
            
            {tabs.map((t) =>
            <button
              key={t.key}
              role="tab"
              type="button"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={cx(
                'focus-ring inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors',
                tab === t.key ? 'bg-forest-700 text-white' : 'text-ink-600 hover:text-ink-900'
              )}>
              
                {t.icon}
                {t.label}
                <span className={cx('text-[12px]', tab === t.key ? 'text-white/70' : 'text-ink-400')}>
                  {t.key === 'stays' ? stays.length : t.key === 'food' ? food.length : treks.length}
                </span>
              </button>
            )}
          </div>

          <div className="mt-8">
            <ListingBrowser category={tab} items={items} city={city} />
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {tabs.map((t) =>
            <Link
              key={t.key}
              to={`/explore/${city.slug}/${t.key}`}
              className="focus-ring group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700">
              
                See all {t.label.toLowerCase()} in {city.name}
                <ArrowRightIcon width={15} height={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section aria-labelledby="nearby" className="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8">
        <h2 id="nearby" className="text-2xl font-bold sm:text-3xl">
          Other destinations in Nepal
        </h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map((c) =>
          <CityCard key={c.slug} city={c} />
          )}
        </div>
      </section>
    </>);

}