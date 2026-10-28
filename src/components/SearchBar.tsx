import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, MapPinIcon, UtensilsCrossedIcon, MountainSnowIcon, BedDoubleIcon } from 'lucide-react';
import { cities } from '../data/cities';
import { ListingCategory } from '../types';
import { cx } from '../utils/format';

const tabs: {id: ListingCategory;label: string;icon: React.ReactNode;}[] = [
{ id: 'stays', label: 'Stays', icon: <BedDoubleIcon width={15} height={15} /> },
{ id: 'food', label: 'Food', icon: <UtensilsCrossedIcon width={15} height={15} /> },
{ id: 'treks', label: 'Treks', icon: <MountainSnowIcon width={15} height={15} /> }];


type SearchBarProps = {
  variant?: 'hero' | 'compact';
  defaultCategory?: ListingCategory;
  className?: string;
};

export function SearchBar({ variant = 'hero', defaultCategory = 'stays', className }: SearchBarProps) {
  const navigate = useNavigate();
  const [category, setCategory] = useState<ListingCategory>(defaultCategory);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<number | undefined>(undefined);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q ?
    cities.filter((c) => c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)) :
    cities;
    return pool.slice(0, 5);
  }, [query]);

  const go = (citySlug?: string) => {
    const target = citySlug ?? suggestions[0]?.slug;
    navigate(target ? `/explore/${target}/${category}` : '/explore');
  };

  const isHero = variant === 'hero';

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        go();
      }}
      className={cx(
        'w-full rounded-3xl bg-white p-2.5',
        isHero ? 'shadow-lift sm:p-3' : 'border border-ink-200 shadow-card',
        className
      )}>
      
      <div
        className="mb-2.5 flex gap-1 rounded-full bg-ink-50 p-1"
        role="tablist"
        aria-label="What are you looking for?">
        
        {tabs.map((tab) =>
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={category === tab.id}
          onClick={() => setCategory(tab.id)}
          className={cx(
            'focus-ring flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors',
            category === tab.id ?
            'bg-white text-forest-800 shadow-sm' :
            'text-ink-500 hover:text-ink-800'
          )}>
          
            {tab.icon}
            {tab.label}
          </button>
        )}
      </div>

      <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="site-search" className="sr-only">
            Destination or city in Nepal
          </label>
          <MapPinIcon
            width={18}
            height={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
            aria-hidden="true" />
          
          <input
            id="site-search"
            type="text"
            value={query}
            autoComplete="off"
            placeholder="Where in Nepal? Try Pokhara or Kathmandu Valley"
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              window.clearTimeout(blurTimer.current);
              setOpen(true);
            }}
            onBlur={() => {
              blurTimer.current = window.setTimeout(() => setOpen(false), 120);
            }}
            className="focus-ring h-12 w-full rounded-2xl border border-ink-200 bg-white pl-11 pr-4 text-[15px] text-ink-900 placeholder:text-ink-400 focus-visible:border-forest-600" />
          

          {open && suggestions.length > 0 &&
          <ul
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-ink-100 bg-white py-1.5 shadow-lift"
            role="listbox"
            aria-label="City suggestions">
            
              {suggestions.map((city) =>
            <li key={city.slug}>
                  <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(city.slug)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-ink-50">
                
                    <img
                  src={city.image}
                  alt=""
                  className="h-9 w-9 rounded-lg object-cover"
                  loading="lazy" />
                
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-ink-900">{city.name}</span>
                      <span className="block truncate text-xs text-ink-500">
                        {city.region} · {city.counts.stays} stays · {city.counts.food} eateries ·{' '}
                        {city.counts.treks} treks
                      </span>
                    </span>
                  </button>
                </li>
            )}
            </ul>
          }
        </div>

        <button
          type="submit"
          className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-ember-500 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-ember-600">
          
          <SearchIcon width={17} height={17} aria-hidden="true" />
          Search
        </button>
      </div>
    </form>);

}