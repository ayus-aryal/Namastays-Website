import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ListingBrowser } from '../components/ListingBrowser';
import { getCity } from '../data/cities';
import { staysInCity } from '../data/stays';
import { foodInCity } from '../data/food';
import { treksInCity } from '../data/treks';
import { ListingCategory } from '../types';
import { NotFound } from './NotFound';
import { categoryLabel } from '../utils/format';

const copy: Record<
  ListingCategory,
  {h1: (city: string) => string;lead: (city: string) => string;body: (city: string) => string[];}> =
{
  stays: {
    h1: (city) => `Hotels, homestays and lodges in ${city}`,
    lead: (city) =>
    `Every stay listed in ${city} is independently owned and licensed. Filter by price, area and property type, compare on the map, and book directly with the family that runs it.`,
    body: (city) => [
    `Accommodation in ${city} ranges from budget guesthouses under $30 a night to restored heritage properties and ridge lodges. Namastays does not list chain hotels or foreign-managed resorts — if a property is here, its owner is a registered Nepali business.`,
    `Prices shown are per night for a standard double room including tax. Booking is handled directly with the host: you pay a deposit through Namastays and the balance on arrival, which is how the majority of each booking stays with the property rather than going offshore.`]

  },
  food: {
    h1: (city) => `Best restaurants and cafes in ${city}`,
    lead: (city) =>
    `Momo counters, Thakali kitchens, bakeries and specialty roasters across ${city} — verified, reviewed and mapped. Food listings on Namastays are discovery-only: no bookings, no commission, no paid placement.`,
    body: (city) => [
    `We list the kitchens residents of ${city} actually recommend, including small cash-only rooms that never appear on international delivery apps. Every listing has opening hours, a phone number, price level, and the dishes it is genuinely known for.`,
    `You cannot reserve a table through Namastays. Each page gives you directions, a map, a call button and a save option so you can plan your eating around where you already are.`]

  },
  treks: {
    h1: (city) => `Treks and hikes near ${city}`,
    lead: (city) =>
    `Trails around ${city} with real distance, duration and elevation data, recorded by hikers using the Namastays app. Filter by difficulty and length, then review the GPX track before you go.`,
    body: (city) => [
    `Every route below has been walked and recorded by members of the Namastays community. Stats come from aggregated GPS tracks rather than agency brochures, so the distances and elevation gains reflect what people actually walked.`,
    `Namastays is not a trekking agency and does not sell guided packages. We publish route data, permit requirements and community reviews, and list the independently owned teahouses along the way.`]

  }
};

export function CategoryListingPage() {
  const { citySlug, category } = useParams();
  const city = getCity(citySlug);
  const cat = category as ListingCategory;

  if (!city || !['stays', 'food', 'treks'].includes(cat)) return <NotFound />;

  const items = cat === 'stays' ? staysInCity(city.slug) : cat === 'food' ? foodInCity(city.slug) : treksInCity(city.slug);
  const text = copy[cat];
  const otherCats = (['stays', 'food', 'treks'] as ListingCategory[]).filter((c) => c !== cat);

  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <Breadcrumbs
            items={[
            { label: 'Home', href: '/' },
            { label: 'Explore', href: '/explore' },
            { label: city.name, href: `/explore/${city.slug}` },
            { label: categoryLabel[cat] }]
            }
            className="mb-6" />
          
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">{text.h1(city.name)}</h1>
          <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-ink-700 sm:text-base">
            {text.lead(city.name)}
          </p>
          <p className="mt-3 text-[13px] font-medium text-ink-500">
            {items.length} listings shown · {city.counts[cat]} total in {city.name} · updated weekly
          </p>
        </div>
      </div>

      <section aria-label={`${categoryLabel[cat]} in ${city.name}`} className="mx-auto max-w-site px-4 py-10 sm:px-6 lg:px-8">
        <ListingBrowser category={cat} items={items} city={city} allowMapView columns={3} />
      </section>

      <section
        aria-labelledby="category-about"
        className="mx-auto max-w-site px-4 pb-16 sm:px-6 lg:px-8">
        
        <div className="grid gap-10 rounded-3xl border border-ink-100 bg-ink-50/50 p-6 sm:p-9 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 id="category-about" className="text-xl font-bold sm:text-2xl">
              About {categoryLabel[cat].toLowerCase()} in {city.name}
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-[1.75] text-ink-700">
              {text.body(city.name).map((p, i) =>
              <p key={i}>{p}</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink-900">Keep exploring {city.name}</h3>
            <ul className="mt-3 space-y-2">
              {otherCats.map((c) =>
              <li key={c}>
                  <Link
                  to={`/explore/${city.slug}/${c}`}
                  className="focus-ring group inline-flex items-center gap-2 text-[15px] font-semibold text-forest-700 hover:underline">
                  
                    {categoryLabel[c]} in {city.name}
                    <ArrowRightIcon width={15} height={15} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to={`/explore/${city.slug}`}
                  className="focus-ring inline-flex items-center gap-2 text-[15px] font-semibold text-forest-700 hover:underline">
                  
                  {city.name} destination guide
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="focus-ring inline-flex items-center gap-2 text-[15px] font-semibold text-forest-700 hover:underline">
                  
                  All destinations in Nepal
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>);

}