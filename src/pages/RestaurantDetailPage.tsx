import { Link, useParams } from 'react-router-dom';
import {
  MapPinIcon,
  NavigationIcon,
  PhoneIcon,
  HeartIcon,
  ShareIcon,
  ClockIcon,
  BanknoteIcon,
  AwardIcon,
  UtensilsIcon,
  MapIcon } from
'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PhotoGallery } from '../components/PhotoGallery';
import { Rating } from '../components/Rating';
import { Badge } from '../components/Badge';
import { MapView } from '../components/MapView';
import { ReviewCard } from '../components/ReviewCard';
import { Carousel } from '../components/Carousel';
import { ListingCard } from '../components/ListingCard';
import { SectionHeading } from '../components/SectionHeading';
import { getCity } from '../data/cities';
import { foodListings, getFood } from '../data/food';
import { reviewsFor } from '../data/reviews';
import { NotFound } from './NotFound';

export function RestaurantDetailPage() {
  const { citySlug, slug } = useParams();
  const listing = getFood(slug);
  const city = getCity(citySlug);

  if (!listing || !city || listing.citySlug !== city.slug) return <NotFound />;

  const reviews = reviewsFor(listing.slug);
  const nearby = foodListings.filter((f) => f.slug !== listing.slug).slice(0, 6);

  const actions = [
  { icon: <NavigationIcon width={16} height={16} />, label: 'Get directions', primary: true },
  { icon: <MapIcon width={16} height={16} />, label: 'View on map' },
  { icon: <PhoneIcon width={16} height={16} />, label: 'Call' },
  { icon: <HeartIcon width={16} height={16} />, label: 'Save' },
  { icon: <ShareIcon width={16} height={16} />, label: 'Share' }];


  return (
    <>
      <div className="mx-auto max-w-site px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
          { label: 'Home', href: '/' },
          { label: 'Explore', href: '/explore' },
          { label: city.name, href: `/explore/${city.slug}` },
          { label: 'Food', href: `/explore/${city.slug}/food` },
          { label: listing.name }]
          } />
        

        <header className="mt-5 max-w-4xl">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-[42px]">
            {listing.name} — {listing.h1Suffix}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14.5px] text-ink-600">
            <Rating value={listing.rating} reviewCount={listing.reviewCount} size="md" />
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon width={15} height={15} />
              {listing.area}, {city.name}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BanknoteIcon width={15} height={15} />
              {'$'.repeat(listing.priceLevel)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UtensilsIcon width={15} height={15} />
              {listing.cuisines.join(' · ')}
            </span>
          </div>

          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50 px-3.5 py-1.5 text-[13px] font-semibold text-ember-800">
            Discovery listing — no bookings, no commission, no paid placement
          </p>
        </header>

        <PhotoGallery
          images={listing.images}
          alt={`${listing.name} in ${listing.area}`}
          className="mt-6" />
        

        {/* Discovery actions */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          {actions.map((a) =>
          <button
            key={a.label}
            type="button"
            className={
            a.primary ?
            'focus-ring inline-flex items-center gap-2 rounded-full bg-ember-500 px-5 py-3 text-[14px] font-bold text-white transition-colors hover:bg-ember-600' :
            'focus-ring inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-3 text-[14px] font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700'
            }>
            
              {a.icon}
              {a.label}
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-site gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
        <div className="min-w-0">
          {/* Known for */}
          <section aria-labelledby="known-for" className="border-b border-ink-100 pb-8">
            <h2 id="known-for" className="flex items-center gap-2 text-2xl font-bold">
              <AwardIcon width={20} height={20} className="text-ember-500" />
              Known for
            </h2>
            <p className="mt-2 text-[16px] leading-relaxed text-ink-700">{listing.knownFor}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {listing.badges.map((b) =>
              <li key={b}>
                  <Badge tone="ember" size="md">
                    {b}
                  </Badge>
                </li>
              )}
            </ul>
          </section>

          <section aria-labelledby="food-about" className="border-b border-ink-100 py-8">
            <h2 id="food-about" className="text-2xl font-bold">
              About {listing.name}
            </h2>
            <div className="mt-3 space-y-4 text-[15.5px] leading-[1.75] text-ink-700">
              {listing.description.map((p, i) =>
              <p key={i}>{p}</p>
              )}
            </div>
          </section>

          <section aria-labelledby="must-try" className="border-b border-ink-100 py-8">
            <h2 id="must-try" className="text-2xl font-bold">
              What to order
            </h2>
            <p className="mt-2 text-[15px] text-ink-600">
              Prices are what locals pay, reported by Namastays users and checked each month.
            </p>
            <ul className="mt-5 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100">
              {listing.mustTry.map((d) =>
              <li key={d.dish} className="flex items-start justify-between gap-4 bg-white p-4">
                  <div>
                    <p className="text-[15.5px] font-bold text-ink-900">{d.dish}</p>
                    <p className="mt-1 text-[14px] text-ink-600">{d.note}</p>
                  </div>
                  <p className="shrink-0 text-[15px] font-bold text-forest-700">{d.price}</p>
                </li>
              )}
            </ul>
          </section>

          <section aria-labelledby="food-location" className="border-b border-ink-100 py-8">
            <h2 id="food-location" className="text-2xl font-bold">
              How to find it
            </h2>
            <p className="mt-2 text-[15px] text-ink-600">
              {listing.area}, {city.name} — {city.region}
            </p>
            <MapView
              ariaLabel={`Map showing the location of ${listing.name}`}
              center={listing.coords}
              zoom={16}
              className="mt-4 h-[340px] w-full"
              markers={[
              {
                id: listing.slug,
                lat: listing.coords.lat,
                lng: listing.coords.lng,
                label: listing.name,
                meta: listing.area,
                active: true
              }]
              } />
            
            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                type="button"
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-forest-700 px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-forest-800">
                
                <NavigationIcon width={15} height={15} />
                Directions from my location
              </button>
              <a
                href={`tel:${listing.phone.replace(/\s/g, '')}`}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2.5 text-[14px] font-semibold text-ink-800 hover:border-forest-600 hover:text-forest-700">
                
                <PhoneIcon width={15} height={15} />
                {listing.phone}
              </a>
            </div>
          </section>

          <section aria-labelledby="food-reviews" className="py-8">
            <h2 id="food-reviews" className="text-2xl font-bold">
              {listing.reviewCount.toLocaleString()} diner reviews
            </h2>
            <p className="mt-2 text-[15px] text-ink-600">
              Only people who checked in at {listing.name} through the Namastays app can review it.
            </p>
            <ul className="mt-5 grid gap-4">
              {reviews.map((r) =>
              <li key={r.id}>
                  <ReviewCard review={r} />
                </li>
              )}
            </ul>
            <button
              type="button"
              className="focus-ring mt-5 inline-flex rounded-full border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700">
              
              Show all {listing.reviewCount.toLocaleString()} reviews
            </button>
          </section>
        </div>

        {/* Info sidebar — no booking CTA */}
        <aside aria-label="Restaurant information" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-lift">
            <h2 className="text-lg font-bold">Good to know</h2>
            <dl className="mt-4 space-y-4 text-[14.5px]">
              <div className="flex gap-3">
                <dt className="shrink-0 text-ink-400">
                  <ClockIcon width={17} height={17} />
                  <span className="sr-only">Opening hours</span>
                </dt>
                <dd>
                  <span className="block font-semibold text-ink-900">Opening hours</span>
                  <span className="text-ink-600">{listing.hours}</span>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="shrink-0 text-ink-400">
                  <PhoneIcon width={17} height={17} />
                  <span className="sr-only">Phone</span>
                </dt>
                <dd>
                  <span className="block font-semibold text-ink-900">Phone</span>
                  <a href={`tel:${listing.phone.replace(/\s/g, '')}`} className="text-forest-700 hover:underline">
                    {listing.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="shrink-0 text-ink-400">
                  <BanknoteIcon width={17} height={17} />
                  <span className="sr-only">Price level</span>
                </dt>
                <dd>
                  <span className="block font-semibold text-ink-900">Price level</span>
                  <span className="text-ink-600">
                    {'$'.repeat(listing.priceLevel)} · typically NPR{' '}
                    {listing.priceLevel === 1 ? '150–450' : listing.priceLevel === 2 ? '400–900' : '900+'} per
                    person
                  </span>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="shrink-0 text-ink-400">
                  <UtensilsIcon width={17} height={17} />
                  <span className="sr-only">Cuisine</span>
                </dt>
                <dd>
                  <span className="block font-semibold text-ink-900">Cuisine</span>
                  <span className="text-ink-600">{listing.cuisines.join(', ')}</span>
                </dd>
              </div>
            </dl>

            <div className="mt-6 space-y-2.5 border-t border-ink-100 pt-5">
              <button
                type="button"
                className="focus-ring w-full rounded-2xl bg-ember-500 px-5 py-3 text-[14.5px] font-bold text-white transition-colors hover:bg-ember-600">
                
                Get directions
              </button>
              <button
                type="button"
                className="focus-ring w-full rounded-2xl border border-ink-200 px-5 py-3 text-[14.5px] font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700">
                
                Save to my list
              </button>
            </div>

            <p className="mt-4 rounded-xl bg-ink-50 p-3 text-[12.5px] leading-relaxed text-ink-600">
              Namastays does not take reservations or payments for food listings. Walk in, or call ahead for
              large groups.
            </p>
          </div>

          <Link
            to={`/explore/${city.slug}/food`}
            className="focus-ring mt-4 block rounded-2xl border border-ink-200 px-5 py-3 text-center text-sm font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700">
            
            All {city.counts.food} eateries in {city.name}
          </Link>
        </aside>
      </div>

      <section aria-labelledby="more-food" className="border-t border-ink-100 bg-ink-50/40 py-14">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="More places to eat in Nepal"
            description="Discovery-only listings — find them, get directions, tell us what you thought."
            linkLabel="Browse all food"
            linkHref={`/explore/${city.slug}/food`} />
          
          <Carousel ariaLabel="More restaurants and cafes">
            {nearby.map((f) =>
            <ListingCard key={f.slug} category="food" item={f} cityName={getCity(f.citySlug)?.name} />
            )}
          </Carousel>
        </div>
      </section>
    </>);

}