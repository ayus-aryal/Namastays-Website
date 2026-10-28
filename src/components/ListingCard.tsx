import { Link } from 'react-router-dom';
import { MapPinIcon, HeartIcon, RouteIcon, TrendingUpIcon, ClockIcon } from 'lucide-react';
import { FoodListing, ListingCategory, Stay, Trek } from '../types';
import { Rating } from './Rating';
import { Badge } from './Badge';
import { cx, listingHref, compactNumber } from '../utils/format';

type Base = {
  className?: string;
  /** Compact horizontal layout used beside map views. */
  layout?: 'grid' | 'row';
};

type ListingCardProps =
({category: 'stays';item: Stay;cityName?: string;} & Base) |
({category: 'food';item: FoodListing;cityName?: string;} & Base) |
({category: 'treks';item: Trek;cityName?: string;} & Base);

export function ListingCard(props: ListingCardProps) {
  const { category, item, cityName, className, layout = 'grid' } = props;
  const href = listingHref(category as ListingCategory, item.citySlug, item.slug);
  const isRow = layout === 'row';

  return (
    <article
      className={cx(
        'group relative overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-shadow hover:shadow-lift',
        isRow && 'flex',
        className
      )}>
      
      <div className={cx('relative overflow-hidden bg-ink-100', isRow ? 'w-36 shrink-0' : 'aspect-[4/3]')}>
        <img
          src={item.images[0]}
          alt={`${item.name} — ${item.area ?? ''}`.trim()}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        
        {!isRow &&
        <>
            <button
            type="button"
            aria-label={`Save ${item.name}`}
            onClick={(e) => e.preventDefault()}
            className="focus-ring absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-700 backdrop-blur transition-colors hover:text-ember-600">
            
              <HeartIcon width={16} height={16} />
            </button>
            <div className="absolute left-3 top-3">
              {category === 'treks' ?
            <Badge tone="outline">{(item as Trek).difficulty}</Badge> :
            category === 'stays' ?
            <Badge tone="outline">{(item as Stay).type}</Badge> :

            <Badge tone="outline">{(item as FoodListing).kind}</Badge>
            }
            </div>
          </>
        }
      </div>

      <div className={cx('flex flex-col', isRow ? 'min-w-0 flex-1 p-3.5' : 'p-4')}>
        <div className="flex items-start justify-between gap-3">
          <h3 className={cx('font-display font-bold leading-snug', isRow ? 'text-[15px]' : 'text-[17px]')}>
            <Link to={href} className="focus-ring rounded">
              <span className="absolute inset-0" aria-hidden="true" />
              {item.name}
            </Link>
          </h3>
          {!isRow && <Rating value={item.rating} showStars={false} className="shrink-0 pt-0.5" />}
        </div>

        <p className="mt-1 flex items-center gap-1 text-[13px] text-ink-500">
          <MapPinIcon width={13} height={13} className="shrink-0" aria-hidden="true" />
          <span className="truncate">
            {item.area}
            {cityName ? `, ${cityName}` : ''}
          </span>
        </p>

        <p className={cx('mt-2 text-[13px] leading-relaxed text-ink-600', isRow ? 'line-clamp-2' : '')}>
          {item.knownFor}
        </p>

        {category === 'treks' && !isRow &&
        <ul className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[12.5px] text-ink-600">
            <li className="inline-flex items-center gap-1">
              <RouteIcon width={13} height={13} aria-hidden="true" />
              {(item as Trek).distanceKm} km
            </li>
            <li className="inline-flex items-center gap-1">
              <TrendingUpIcon width={13} height={13} aria-hidden="true" />
              {(item as Trek).elevationGainM.toLocaleString()} m gain
            </li>
            <li className="inline-flex items-center gap-1">
              <ClockIcon width={13} height={13} aria-hidden="true" />
              {(item as Trek).durationLabel}
            </li>
          </ul>
        }

        {category === 'food' && !isRow && (item as FoodListing).badges.length > 0 &&
        <div className="mt-3 flex flex-wrap gap-1.5">
            {(item as FoodListing).badges.slice(0, 2).map((b) =>
          <Badge key={b} tone="ember">
                {b}
              </Badge>
          )}
          </div>
        }

        <div className="mt-auto flex items-end justify-between gap-3 pt-3.5">
          {category === 'stays' ?
          <p className="text-[15px] font-bold text-ink-900">
              ${(item as Stay).pricePerNight}
              <span className="text-[13px] font-medium text-ink-500"> / night</span>
            </p> :
          category === 'food' ?
          <p className="text-[13px] font-medium text-ink-600">
              <span className="font-bold text-ink-900">{'$'.repeat((item as FoodListing).priceLevel)}</span>{' '}
              · {(item as FoodListing).cuisines.slice(0, 2).join(', ')}
            </p> :

          <p className="text-[13px] font-medium text-ink-600">
              Recorded by{' '}
              <span className="font-bold text-ink-900">{compactNumber((item as Trek).recordedCount)}</span>{' '}
              hikers
            </p>
          }
          <Rating value={item.rating} reviewCount={item.reviewCount} showStars={isRow} className="shrink-0" />
        </div>
      </div>
    </article>);

}