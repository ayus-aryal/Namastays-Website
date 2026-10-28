import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  MapPinIcon,
  ShareIcon,
  HeartIcon,
  BedDoubleIcon,
  UsersIcon,
  ShieldCheckIcon,
  CheckIcon,
  CalendarIcon,
  StarIcon } from
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
import { getStay, stays } from '../data/stays';
import { reviewsFor } from '../data/reviews';
import { NotFound } from './NotFound';

const ratingBars = [
{ label: 'Cleanliness', value: 4.9 },
{ label: 'Location', value: 4.8 },
{ label: 'Value', value: 4.9 },
{ label: 'Host communication', value: 5.0 }];


export function StayDetailPage() {
  const { citySlug, slug } = useParams();
  const stay = getStay(slug);
  const city = getCity(citySlug);

  if (!stay || !city || stay.citySlug !== city.slug) return <NotFound />;

  const reviews = reviewsFor(stay.slug);
  const similar = stays.filter((s) => s.slug !== stay.slug).slice(0, 6);

  return (
    <>
      <div className="mx-auto max-w-site px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
          { label: 'Home', href: '/' },
          { label: 'Explore', href: '/explore' },
          { label: city.name, href: `/explore/${city.slug}` },
          { label: 'Stays', href: `/explore/${city.slug}/stays` },
          { label: stay.name }]
          } />
        

        <header className="mt-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                {stay.name} — {stay.h1Suffix}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14.5px] text-ink-600">
                <Rating value={stay.rating} reviewCount={stay.reviewCount} size="md" />
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon width={15} height={15} />
                  {stay.area}, {city.name}
                </span>
                <Badge tone="forest" icon={<ShieldCheckIcon width={13} height={13} />}>
                  Licensed host
                </Badge>
                <Badge tone="neutral">{stay.type}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-[13.5px] font-semibold text-ink-800 transition-colors hover:border-ink-400">
                
                <ShareIcon width={15} height={15} />
                Share
              </button>
              <button
                type="button"
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-[13.5px] font-semibold text-ink-800 transition-colors hover:border-ember-500 hover:text-ember-600">
                
                <HeartIcon width={15} height={15} />
                Save
              </button>
            </div>
          </div>
        </header>

        <PhotoGallery images={stay.images} alt={`${stay.name}, ${stay.area}`} className="mt-6" />
      </div>

      <div className="mx-auto mt-10 grid max-w-site gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
        {/* Main column */}
        <div className="min-w-0">
          <section aria-labelledby="stay-about" className="border-b border-ink-100 pb-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[14.5px] font-medium text-ink-700">
              <span className="inline-flex items-center gap-2">
                <UsersIcon width={16} height={16} className="text-forest-700" />
                Sleeps {stay.sleeps}
              </span>
              <span className="inline-flex items-center gap-2">
                <BedDoubleIcon width={16} height={16} className="text-forest-700" />
                {stay.bedrooms} bedroom{stay.bedrooms > 1 ? 's' : ''}
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheckIcon width={16} height={16} className="text-forest-700" />
                {stay.host.licence}
              </span>
            </div>

            <h2 id="stay-about" className="mt-7 text-2xl font-bold">
              About this stay
            </h2>
            <div className="mt-3 space-y-4 text-[15.5px] leading-[1.75] text-ink-700">
              {stay.description.map((p, i) =>
              <p key={i}>{p}</p>
              )}
            </div>

            <div className="mt-7 flex items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest-700 font-display text-base font-bold text-white">
                {stay.host.name.
                split(' ').
                slice(0, 2).
                map((p) => p[0]).
                join('')}
              </span>
              <div>
                <p className="text-[15px] font-bold">Hosted by {stay.host.name}</p>
                <p className="text-[13.5px] text-ink-600">
                  Hosting on Namastays since {stay.host.since} · Responds within a few hours
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="stay-amenities" className="border-b border-ink-100 py-8">
            <h2 id="stay-amenities" className="text-2xl font-bold">
              Amenities
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {stay.amenities.map((a) =>
              <li key={a} className="flex items-center gap-2.5 text-[15px] text-ink-700">
                  <CheckIcon width={16} height={16} className="shrink-0 text-forest-600" aria-hidden="true" />
                  {a}
                </li>
              )}
            </ul>
          </section>

          <section aria-labelledby="stay-location" className="border-b border-ink-100 py-8">
            <h2 id="stay-location" className="text-2xl font-bold">
              Where you’ll be
            </h2>
            <p className="mt-2 text-[15px] text-ink-600">
              {stay.area}, {city.name}, {city.region}
            </p>
            <MapView
              ariaLabel={`Map showing the location of ${stay.name}`}
              center={stay.coords}
              zoom={15}
              className="mt-4 h-[340px] w-full"
              markers={[
              { id: stay.slug, lat: stay.coords.lat, lng: stay.coords.lng, label: stay.name, active: true }]
              } />
            
            <p className="mt-3 text-[13.5px] text-ink-500">
              Exact address is shared after booking is confirmed.
            </p>
          </section>

          <section aria-labelledby="stay-reviews" className="py-8">
            <h2 id="stay-reviews" className="text-2xl font-bold">
              {stay.reviewCount.toLocaleString()} guest reviews
            </h2>

            <div className="mt-5 grid gap-6 rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:grid-cols-[auto_1fr] sm:gap-10">
              <div className="text-center sm:text-left">
                <p className="font-display text-4xl font-extrabold">{stay.rating.toFixed(1)}</p>
                <Rating value={stay.rating} className="mt-1" />
                <p className="mt-1 text-[13px] text-ink-500">Verified guests only</p>
              </div>
              <dl className="grid gap-3 sm:grid-cols-2">
                {ratingBars.map((b) =>
                <div key={b.label} className="flex items-center gap-3">
                    <dt className="w-36 shrink-0 text-[13.5px] text-ink-600">{b.label}</dt>
                    <dd className="flex flex-1 items-center gap-2">
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                        <span
                        className="block h-full rounded-full bg-forest-700"
                        style={{ width: `${b.value / 5 * 100}%` }} />
                      
                      </span>
                      <span className="w-7 text-[13px] font-semibold">{b.value.toFixed(1)}</span>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <ul className="mt-5 grid gap-4">
              {reviews.map((r) =>
              <li key={r.id}>
                  <ReviewCard review={r} />
                </li>
              )}
            </ul>

            {reviews.length > 0 &&
            <button
              type="button"
              className="focus-ring mt-5 inline-flex rounded-full border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700">
              
                Show all {stay.reviewCount.toLocaleString()} reviews
              </button>
            }
          </section>
        </div>

        {/* Booking sidebar */}
        <aside aria-label="Booking" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-lift">
            <p className="flex items-end gap-1.5">
              <span className="font-display text-3xl font-extrabold">${stay.pricePerNight}</span>
              <span className="pb-1 text-[14.5px] text-ink-500">per night</span>
            </p>
            <Rating value={stay.rating} reviewCount={stay.reviewCount} className="mt-2" />

            <div className="mt-5 grid grid-cols-2 gap-2">
              {['Check in', 'Check out'].map((label) =>
              <label key={label} className="block">
                  <span className="mb-1 block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-500">
                    {label}
                  </span>
                  <span className="focus-ring flex items-center gap-2 rounded-xl border border-ink-200 px-3 py-2.5 text-[14px] text-ink-700">
                    <CalendarIcon width={15} height={15} className="text-ink-400" />
                    Add date
                  </span>
                </label>
              )}
            </div>

            <label className="mt-3 block">
              <span className="mb-1 block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-500">
                Guests
              </span>
              <select className="focus-ring w-full rounded-xl border border-ink-200 px-3 py-2.5 text-[14px] text-ink-700">
                {Array.from({ length: stay.sleeps }, (_, i) => i + 1).map((n) =>
                <option key={n}>
                    {n} guest{n > 1 ? 's' : ''}
                  </option>
                )}
              </select>
            </label>

            <button
              type="button"
              className="focus-ring mt-5 w-full rounded-2xl bg-ember-500 px-5 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-ember-600">
              
              Book now
            </button>
            <p className="mt-3 text-center text-[12.5px] text-ink-500">
              No charge yet — you’ll confirm before paying. 20% deposit online, balance direct to the host.
            </p>

            <dl className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-ink-600">${stay.pricePerNight} × 3 nights</dt>
                <dd className="font-semibold">${stay.pricePerNight * 3}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-600">Namastays service fee</dt>
                <dd className="font-semibold">${Math.round(stay.pricePerNight * 3 * 0.06)}</dd>
              </div>
              <div className="flex justify-between border-t border-ink-100 pt-2 text-[15px]">
                <dt className="font-bold">Total</dt>
                <dd className="font-bold">
                  ${stay.pricePerNight * 3 + Math.round(stay.pricePerNight * 3 * 0.06)}
                </dd>
              </div>
            </dl>

            <p className="mt-4 flex items-start gap-2 rounded-xl bg-forest-50 p-3 text-[12.5px] leading-relaxed text-forest-800">
              <StarIcon width={14} height={14} className="mt-0.5 shrink-0" />
              6% service fee — roughly a quarter of what international platforms charge. The rest stays with{' '}
              {stay.host.name}.
            </p>
          </div>

          <Link
            to={`/explore/${city.slug}/stays`}
            className="focus-ring mt-4 block rounded-2xl border border-ink-200 px-5 py-3 text-center text-sm font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700">
            
            Compare all stays in {city.name}
          </Link>
        </aside>
      </div>

      <section aria-labelledby="similar-stays" className="border-t border-ink-100 bg-ink-50/40 py-14">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Similar stays across Nepal"
            description="Independently owned properties with comparable ratings and price."
            linkLabel="All destinations"
            linkHref="/explore" />
          
          <Carousel ariaLabel="Similar stays">
            {similar.map((s) =>
            <ListingCard key={s.slug} category="stays" item={s} cityName={getCity(s.citySlug)?.name} />
            )}
          </Carousel>
        </div>
      </section>
    </>);

}