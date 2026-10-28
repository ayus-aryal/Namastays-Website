import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { City } from '../types';
import { cx } from '../utils/format';

type CityCardProps = {
  city: City;
  size?: 'md' | 'lg';
  className?: string;
};

export function CityCard({ city, size = 'md', className }: CityCardProps) {
  return (
    <article
      className={cx(
        'group relative overflow-hidden rounded-2xl bg-ink-900 shadow-card transition-shadow hover:shadow-lift',
        size === 'lg' ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/3]',
        className
      )}>
      
      <img
        src={city.image}
        alt={`${city.name}, ${city.region}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              {city.region}
            </p>
            <h3 className={cx('mt-1 font-bold text-white', size === 'lg' ? 'text-2xl' : 'text-xl')}>
              <Link to={`/explore/${city.slug}`} className="focus-ring rounded">
                <span className="absolute inset-0" aria-hidden="true" />
                {city.name}
              </Link>
            </h3>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-ember-500">
            <ArrowUpRightIcon width={16} height={16} aria-hidden="true" />
          </span>
        </div>

        <p className="mt-2 line-clamp-2 max-w-md text-[13.5px] leading-relaxed text-white/85">
          {city.tagline}
        </p>

        <p className="mt-3 text-[12.5px] font-medium text-white/90">
          {city.counts.stays} stays · {city.counts.food} eateries · {city.counts.treks} treks
        </p>
      </div>
    </article>);

}