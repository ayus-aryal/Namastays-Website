import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  HandCoinsIcon,
  MountainSnowIcon,
  MessagesSquareIcon,
  ArrowRightIcon } from
'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { CityCard } from '../components/CityCard';
import { ListingCard } from '../components/ListingCard';
import { Carousel } from '../components/Carousel';
import { SectionHeading } from '../components/SectionHeading';
import { AppPromo } from '../components/AppPromo';
import { cities } from '../data/cities';
import { stays } from '../data/stays';
import { foodListings } from '../data/food';
import { treks } from '../data/treks';
import { IMG } from '../data/images';

const valueProps = [
{
  icon: <HandCoinsIcon width={18} height={18} />,
  title: 'Money stays in Nepal',
  body: 'Owners keep the majority of every booking. No foreign aggregator taking a 25% cut out of the country.'
},
{
  icon: <ShieldCheckIcon width={18} height={18} />,
  title: 'Every host is licensed',
  body: 'We verify Nepal Tourism Board registration or homestay licences before a stay goes live.'
},
{
  icon: <MountainSnowIcon width={18} height={18} />,
  title: 'Trails recorded by hikers',
  body: 'Trek pages are built from real GPX tracks logged in the app — not brochure copy from an agency.'
},
{
  icon: <MessagesSquareIcon width={18} height={18} />,
  title: 'Reviews you can trust',
  body: 'Only guests who actually stayed, ate or walked can review. Owners can reply, never delete.'
}];


export function Home() {
  const featuredStays = stays.slice(0, 6);
  const featuredTreks = treks.filter((t) => t.slug !== 'chitwan-riverside-forest-walk').slice(0, 6);
  const featuredFood = foodListings.slice(0, 6);
  const cityByStay = (slug: string) => cities.find((c) => c.slug === slug)?.name;

  return (
    <>
      {/* Hero */}
      <section className="relative" aria-labelledby="hero-title">
        <div className="absolute inset-0">
          <img
            src={IMG.hero}
            alt="A trekker on a stone trail above terraced hills with the Annapurna range at sunrise"
            className="h-full w-full object-cover" />
          
          <div className="absolute inset-0 bg-ink-900/45" />
        </div>

        <div className="relative mx-auto max-w-site px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <span className="font-devanagari">नमस्ते</span> · 438 stays · 209 eateries · 102 trails
            </p>
            <h1 id="hero-title" className="text-4xl font-extrabold leading-[1.08] text-white sm:text-6xl">
              Stay, eat and trek across Nepal — with the people who live there
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/85 sm:text-lg">
              Namastays is Nepal’s own marketplace for independently owned hotels and homestays, the kitchens
              locals actually eat in, and the treks our hiking community records and maps itself.
            </p>
          </div>

          <div className="mt-9 max-w-3xl">
            <SearchBar />
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {[
            { label: 'Best momo in Kathmandu Valley', to: '/explore/kathmandu-valley/food' },
            { label: 'Short hikes near Pokhara', to: '/explore/pokhara/treks' },
            { label: 'Chitwan eco lodges', to: '/explore/chitwan/stays' },
            { label: 'Everest teahouses', to: '/explore/everest-region/stays' }].
            map((chip) =>
            <li key={chip.label}>
                <Link
                to={chip.to}
                className="focus-ring inline-flex rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20">
                
                  {chip.label}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* Featured cities */}
      <section aria-labelledby="cities-title" className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Explore by city"
          title="Where in Nepal are you headed?"
          description="Every destination has its own indexed hub page with stays, kitchens and trails — start broad, then narrow down."
          linkLabel="All destinations"
          linkHref="/explore" />
        
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <CityCard city={cities[0]} size="lg" className="sm:col-span-2 lg:col-span-2" />
          <CityCard city={cities[1]} />
          <CityCard city={cities[2]} />
          <CityCard city={cities[3]} />
          <CityCard city={cities[4]} />
        </div>
      </section>

      {/* Featured stays */}
      <section aria-labelledby="stays-title" className="mx-auto max-w-site px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <SectionHeading
          eyebrow="Bookable stays"
          title="Independently owned places to sleep"
          description="Heritage townhouses, ridge lodges, Tharu cottages and Khumbu teahouses — all owned and run by the families you meet at the door."
          linkLabel="Browse all stays"
          linkHref="/explore/kathmandu-valley/stays" />
        
        <Carousel ariaLabel="Featured stays across Nepal">
          {featuredStays.map((stay) =>
          <ListingCard key={stay.slug} category="stays" item={stay} cityName={cityByStay(stay.citySlug)} />
          )}
        </Carousel>
      </section>

      {/* Featured treks */}
      <section
        aria-labelledby="treks-title"
        className="border-y border-ink-100 bg-forest-50/40 py-16 sm:py-20">
        
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Community-tracked trails"
            title="Treks and hikes, mapped by the people who walked them"
            description="Distance, elevation gain and GPX tracks recorded in the Namastays app — from 90-minute sunrise walks to twelve days on the Khumbu."
            linkLabel="Browse all treks"
            linkHref="/explore/pokhara/treks" />
          
          <Carousel ariaLabel="Featured treks and hikes in Nepal">
            {featuredTreks.map((trek) =>
            <ListingCard key={trek.slug} category="treks" item={trek} cityName={cityByStay(trek.citySlug)} />
            )}
          </Carousel>
        </div>
      </section>

      {/* Featured food */}
      <section aria-labelledby="food-title" className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Discovery only — no bookings"
          title="The kitchens locals send you to"
          description="Momo counters, Thakali kitchens, trail bakeries and specialty roasters. Find them, get directions, call ahead — no reservations, no commission."
          linkLabel="Browse all food & cafes"
          linkHref="/explore/kathmandu-valley/food" />
        
        <Carousel ariaLabel="Featured restaurants and cafes in Nepal">
          {featuredFood.map((f) =>
          <ListingCard key={f.slug} category="food" item={f} cityName={cityByStay(f.citySlug)} />
          )}
        </Carousel>
      </section>

      {/* Why Namastays */}
      <section aria-labelledby="why-title" className="border-y border-ink-100 bg-ink-900 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ember-300">
              Why Namastays
            </p>
            <h2 id="why-title" className="text-3xl font-bold text-white sm:text-4xl">
              Built in Nepal, so Nepal keeps the value
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/70 sm:text-base">
              International booking platforms take a quarter of every reservation out of the country and bury
              small guesthouses beneath paid placement. Namastays lists only independently owned, licensed
              businesses, charges a fraction of the commission, and gives every single one its own page that
              Google can actually find.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((v) =>
            <li key={v.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-ember-500/15 text-ember-300">
                  {v.icon}
                </span>
                <h3 className="mt-4 text-[16px] font-bold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{v.body}</p>
              </li>
            )}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-white/90">
              
              Read our story
              <ArrowRightIcon width={15} height={15} />
            </Link>
            <Link
              to="/list-your-property"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              
              List your property
            </Link>
          </div>
        </div>
      </section>

      <div className="py-16 sm:py-20">
        <AppPromo />
      </div>
    </>);

}