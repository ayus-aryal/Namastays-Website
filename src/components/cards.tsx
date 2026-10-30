import Link from 'next/link';
import { ArrowUpRightIcon, ClockIcon, ImageOffIcon, MapPinIcon, MountainIcon, RouteIcon } from 'lucide-react';
import type { CitySummary, Place, Stay, TrekSummary } from '../lib/models';
import { isFood } from '../lib/api/mappers';
import { optimizeImage } from '../lib/images';
import { describeCounts, formatDuration, formatPrice, humanizeCategory } from '../lib/format';
import { Badge } from './Badge';
import { cx } from '../utils/format';

export const placeHref = (place: Pick<Place, 'citySlug' | 'slug' | 'categories'>) =>
  `/explore/${place.citySlug}/${isFood(place) ? 'food' : 'places'}/${place.slug}`;

function CardImage({ src, alt, children }: { src: string | null | undefined; alt: string; children?: React.ReactNode }) {
  const url = optimizeImage(src, 800);
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
      {url ? (
        <img
          src={url}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      ) : (
        <div className="grid h-full w-full place-items-center text-ink-300">
          <ImageOffIcon width={28} height={28} aria-hidden="true" />
        </div>
      )}
      {children}
    </div>
  );
}

const cardClass =
  'group relative overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-shadow hover:shadow-lift';

export function CityTile({ city }: { city: CitySummary }) {
  const image = optimizeImage(city.image, 900);
  return (
    <article className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 shadow-card transition-shadow hover:shadow-lift">
      {image && (
        <img
          src={image}
          alt={`${city.name}, ${city.region}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">{city.region}</p>
            <h3 className="mt-1 text-xl font-bold text-white">
              <Link href={`/explore/${city.slug}`} className="focus-ring rounded">
                <span className="absolute inset-0" aria-hidden="true" />
                {city.name}
              </Link>
            </h3>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-ember-500">
            <ArrowUpRightIcon width={16} height={16} aria-hidden="true" />
          </span>
        </div>
        <p className="mt-3 text-[12.5px] font-medium text-white/90">{describeCounts(city.counts)}</p>
      </div>
    </article>
  );
}

export function StayCard({ stay, className }: { stay: Stay; className?: string }) {
  return (
    <article className={cx(cardClass, className)}>
      <CardImage src={stay.images[0]} alt={`${stay.name}, ${stay.city}`}>
        <div className="absolute left-3 top-3">
          <Badge tone="outline">{stay.type}</Badge>
        </div>
      </CardImage>
      <div className="p-4">
        <h3 className="font-display text-[17px] font-bold leading-snug">
          <Link href={`/explore/${stay.citySlug}/stays/${stay.slug}`} className="focus-ring rounded">
            <span className="absolute inset-0" aria-hidden="true" />
            {stay.name}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1 text-[13px] text-ink-500">
          <MapPinIcon width={13} height={13} className="shrink-0" aria-hidden="true" />
          <span className="truncate">{stay.city}, {stay.state}</span>
        </p>
        {stay.description && <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-600">{stay.description}</p>}
        <div className="mt-3 flex items-end justify-between gap-3">
          {stay.startingPrice !== null ? (
            <p className="text-[15px] font-bold text-ink-900">
              <span className="text-[13px] font-medium text-ink-500">From </span>
              {formatPrice(stay.startingPrice)}
              <span className="text-[13px] font-medium text-ink-500"> / night</span>
            </p>
          ) : <span />}
          {stay.amenities.length > 0 && (
            <p className="truncate text-[12px] text-ink-500">{stay.amenities.slice(0, 2).join(' · ')}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export function PlaceCard({ place, className }: { place: Place; className?: string }) {
  return (
    <article className={cx(cardClass, className)}>
      <CardImage src={place.image} alt={`${place.name}${place.cityName ? `, ${place.cityName}` : ''}`}>
        {place.categories[0] && (
          <div className="absolute left-3 top-3">
            <Badge tone="outline">{humanizeCategory(place.categories[0])}</Badge>
          </div>
        )}
      </CardImage>
      <div className="p-4">
        <h3 className="font-display text-[17px] font-bold leading-snug">
          <Link href={placeHref(place)} className="focus-ring rounded">
            <span className="absolute inset-0" aria-hidden="true" />
            {place.name}
          </Link>
        </h3>
        {place.cityName && (
          <p className="mt-1 flex items-center gap-1 text-[13px] text-ink-500">
            <MapPinIcon width={13} height={13} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{place.cityName}</span>
          </p>
        )}
        {place.description && <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-ink-600">{place.description}</p>}
        {place.recommender && (
          <p className="mt-3 text-[12.5px] text-ink-500">
            Recommended by <span className="font-semibold text-ink-800">{place.recommender.displayName}</span>
          </p>
        )}
      </div>
    </article>
  );
}

export function TrekCard({ trek, className }: { trek: TrekSummary; className?: string }) {
  const facts = [
    trek.distanceKm !== null && { icon: <RouteIcon width={13} height={13} aria-hidden="true" />, text: `${trek.distanceKm} km` },
    trek.durationDays !== null && { icon: <ClockIcon width={13} height={13} aria-hidden="true" />, text: formatDuration(trek.durationDays) },
    trek.maxElevationM !== null && { icon: <MountainIcon width={13} height={13} aria-hidden="true" />, text: `${trek.maxElevationM.toLocaleString('en-US')} m max` }
  ].filter(Boolean) as { icon: React.ReactNode; text: string | null }[];

  return (
    <article className={cx(cardClass, className)}>
      <CardImage src={trek.image} alt={trek.name}>
        {trek.difficulty && (
          <div className="absolute left-3 top-3">
            <Badge tone="outline">{trek.difficulty}</Badge>
          </div>
        )}
      </CardImage>
      <div className="p-4">
        <h3 className="font-display text-[17px] font-bold leading-snug">
          <Link href={`/treks/${trek.slug}`} className="focus-ring rounded">
            <span className="absolute inset-0" aria-hidden="true" />
            {trek.name}
          </Link>
        </h3>
        {trek.region && (
          <p className="mt-1 flex items-center gap-1 text-[13px] text-ink-500">
            <MapPinIcon width={13} height={13} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{trek.region}</span>
          </p>
        )}
        {trek.description && <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-600">{trek.description}</p>}
        {facts.length > 0 && (
          <ul className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[12.5px] text-ink-600">
            {facts.map((fact, i) => (
              <li key={i} className="inline-flex items-center gap-1">
                {fact.icon}
                {fact.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
