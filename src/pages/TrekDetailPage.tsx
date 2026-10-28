import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  MapPinIcon,
  RouteIcon,
  ClockIcon,
  TrendingUpIcon,
  MountainIcon,
  DownloadIcon,
  ActivityIcon,
  CalendarCheckIcon,
  TicketIcon,
  FlagIcon,
  UsersIcon,
  ShareIcon,
  HeartIcon } from
'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Rating } from '../components/Rating';
import { Badge } from '../components/Badge';
import { MapView } from '../components/MapView';
import { ElevationProfile } from '../components/ElevationProfile';
import { ReviewCard } from '../components/ReviewCard';
import { Carousel } from '../components/Carousel';
import { ListingCard } from '../components/ListingCard';
import { SectionHeading } from '../components/SectionHeading';
import { getCity } from '../data/cities';
import { getTrek, treks } from '../data/treks';
import { staysInCity } from '../data/stays';
import { reviewsFor } from '../data/reviews';
import { NotFound } from './NotFound';
import { compactNumber } from '../utils/format';

export function TrekDetailPage() {
  const { citySlug, slug } = useParams();
  const trek = getTrek(slug);
  const city = getCity(citySlug);

  if (!trek || !city || trek.citySlug !== city.slug) return <NotFound />;

  const reviews = reviewsFor(trek.slug);
  const similar = treks.filter((t) => t.slug !== trek.slug).slice(0, 6);
  const nearbyStays = staysInCity(city.slug).slice(0, 6);

  const stats = [
  { icon: <RouteIcon width={17} height={17} />, label: 'Distance', value: `${trek.distanceKm} km` },
  { icon: <ClockIcon width={17} height={17} />, label: 'Duration', value: trek.durationLabel },
  {
    icon: <TrendingUpIcon width={17} height={17} />,
    label: 'Elevation gain',
    value: `${trek.elevationGainM.toLocaleString()} m`
  },
  {
    icon: <MountainIcon width={17} height={17} />,
    label: 'Max elevation',
    value: `${trek.maxElevationM.toLocaleString()} m`
  }];


  return (
    <>
      {/* Cover */}
      <section className="relative" aria-labelledby="trek-title">
        <div className="absolute inset-0">
          <img src={trek.images[0]} alt={`${trek.name} trail`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink-900/58" />
        </div>
        <div className="relative mx-auto max-w-site px-4 pb-12 pt-6 sm:px-6 sm:pb-14 lg:px-8">
          <Breadcrumbs
            onDark
            items={[
            { label: 'Home', href: '/' },
            { label: 'Explore', href: '/explore' },
            { label: city.name, href: `/explore/${city.slug}` },
            { label: 'Treks', href: `/explore/${city.slug}/treks` },
            { label: trek.name }]
            } />
          

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <Badge tone="ember" size="md">
              {trek.difficulty}
            </Badge>
            <Badge tone="outline" size="md">
              GPX available
            </Badge>
          </div>

          <h1 id="trek-title" className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-[44px]">
            {trek.name} — {trek.h1Suffix}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14.5px] text-white/85">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5">
              <Rating value={trek.rating} reviewCount={trek.reviewCount} />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon width={15} height={15} />
              {trek.startPoint}
            </span>
          </div>

          <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) =>
            <div key={s.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <dt className="flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-white/70">
                  {s.icon}
                  {s.label}
                </dt>
                <dd className="mt-1.5 font-display text-xl font-bold text-white">{s.value}</dd>
              </div>
            )}
          </dl>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <button
              type="button"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-ember-500 px-5 py-3 text-[14px] font-bold text-white transition-colors hover:bg-ember-600">
              
              <DownloadIcon width={16} height={16} />
              Download GPX
            </button>
            <button
              type="button"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-ink-900 transition-colors hover:bg-white/90">
              
              <ActivityIcon width={16} height={16} />
              Track in the app
            </button>
            <button
              type="button"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/10">
              
              <HeartIcon width={16} height={16} />
              Save
            </button>
            <button
              type="button"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/10">
              
              <ShareIcon width={16} height={16} />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <div className="border-b border-ink-100 bg-forest-900">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2.5 text-[14.5px] font-semibold text-white">
            <UsersIcon width={17} height={17} className="text-ember-300" />
            Recorded by {trek.recordedCount.toLocaleString()} hikers on the Namastays app
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/70">
            <span>{compactNumber(Math.round(trek.recordedCount * 0.41))} tracks this season</span>
            <span>{trek.reviewCount.toLocaleString()} community reviews</span>
            <span>{Math.round(trek.recordedCount * 1.7).toLocaleString()} trail photos</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-site gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
        <div className="min-w-0">
          <section aria-labelledby="trek-profile" className="border-b border-ink-100 pb-8">
            <h2 id="trek-profile" className="text-2xl font-bold">
              Elevation profile
            </h2>
            <ElevationProfile points={trek.profile} distanceKm={trek.distanceKm} className="mt-4" />
          </section>

          <section aria-labelledby="trek-map" className="border-b border-ink-100 py-8">
            <h2 id="trek-map" className="text-2xl font-bold">
              Route map &amp; GPX preview
            </h2>
            <p className="mt-2 text-[15px] text-ink-600">
              The line below is the consensus track from {trek.recordedCount.toLocaleString()} recorded
              activities. Green marks the trailhead, orange the finish.
            </p>
            <MapView
              ariaLabel={`Route map for ${trek.name}`}
              center={trek.coords}
              zoom={trek.distanceKm > 50 ? 10 : 12}
              route={trek.route}
              className="mt-4 h-[420px] w-full" />
            
            <button
              type="button"
              className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2.5 text-[14px] font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700">
              
              <DownloadIcon width={15} height={15} />
              Download GPX track ({trek.distanceKm} km)
            </button>
          </section>

          <section aria-labelledby="trek-about" className="border-b border-ink-100 py-8">
            <h2 id="trek-about" className="text-2xl font-bold">
              About this route
            </h2>
            <div className="mt-3 space-y-4 text-[15.5px] leading-[1.75] text-ink-700">
              {trek.description.map((p, i) =>
              <p key={i}>{p}</p>
              )}
            </div>
          </section>

          <section aria-labelledby="trek-photos" className="border-b border-ink-100 py-8">
            <h2 id="trek-photos" className="text-2xl font-bold">
              Community photos
            </h2>
            <p className="mt-2 text-[15px] text-ink-600">
              Uploaded by hikers who recorded this route in the app.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[...trek.images, ...trek.images].slice(0, 6).map((img, i) =>
              <li key={i} className="overflow-hidden rounded-2xl bg-ink-100">
                  <img
                  src={img}
                  alt={`${trek.name} — community photo ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105" />
                
                </li>
              )}
            </ul>
          </section>

          <section aria-labelledby="trek-reviews" className="py-8">
            <h2 id="trek-reviews" className="text-2xl font-bold">
              Community reviews
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Rating value={trek.rating} reviewCount={trek.reviewCount} size="lg" />
              <span className="text-[14px] text-ink-500">
                From hikers who completed and recorded this trail
              </span>
            </div>
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
              
              Show all {trek.reviewCount.toLocaleString()} reviews
            </button>
          </section>
        </div>

        <aside aria-label="Trail details" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-lift">
            <h2 className="text-lg font-bold">Plan this trek</h2>
            <dl className="mt-4 space-y-4 text-[14.5px]">
              {[
              { icon: <FlagIcon width={17} height={17} />, label: 'Trailhead', value: trek.startPoint },
              {
                icon: <CalendarCheckIcon width={17} height={17} />,
                label: 'Best season',
                value: trek.bestSeason
              },
              { icon: <TicketIcon width={17} height={17} />, label: 'Permits & fees', value: trek.permits }].
              map((row) =>
              <div key={row.label} className="flex gap-3">
                  <dt className="shrink-0 text-ink-400">
                    {row.icon}
                    <span className="sr-only">{row.label}</span>
                  </dt>
                  <dd>
                    <span className="block font-semibold text-ink-900">{row.label}</span>
                    <span className="leading-relaxed text-ink-600">{row.value}</span>
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-6 space-y-2.5 border-t border-ink-100 pt-5">
              <button
                type="button"
                className="focus-ring w-full rounded-2xl bg-ember-500 px-5 py-3 text-[14.5px] font-bold text-white transition-colors hover:bg-ember-600">
                
                Download GPX
              </button>
              <Link
                to={`/explore/${city.slug}/stays`}
                className="focus-ring block w-full rounded-2xl border border-ink-200 px-5 py-3 text-center text-[14.5px] font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700">
                
                Find a stay near the trailhead
              </Link>
            </div>

            <p className="mt-4 rounded-xl bg-forest-50 p-3 text-[12.5px] leading-relaxed text-forest-800">
              Namastays is not a trekking agency. We publish community route data and list independently owned
              teahouses — hire guides and porters directly, and check local conditions before you set out.
            </p>
          </div>
        </aside>
      </div>

      <section aria-labelledby="trek-stays" className="border-t border-ink-100 bg-ink-50/40 py-14">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Stays near this trail in ${city.name}`}
            description="Independently owned lodges, teahouses and homestays close to the route."
            linkLabel={`All stays in ${city.name}`}
            linkHref={`/explore/${city.slug}/stays`} />
          
          <Carousel ariaLabel="Stays near this trek">
            {nearbyStays.map((s) =>
            <ListingCard key={s.slug} category="stays" item={s} cityName={city.name} />
            )}
          </Carousel>
        </div>
      </section>

      <section aria-labelledby="similar-treks" className="py-14">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Similar treks and hikes"
            description="Other community-recorded routes across Nepal."
            linkLabel="All destinations"
            linkHref="/explore" />
          
          <Carousel ariaLabel="Similar treks">
            {similar.map((t) =>
            <ListingCard key={t.slug} category="treks" item={t} cityName={getCity(t.citySlug)?.name} />
            )}
          </Carousel>
        </div>
      </section>
    </>);

}