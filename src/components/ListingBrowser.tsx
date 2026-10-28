import { useMemo, useState } from 'react';
import { LayoutGridIcon, MapIcon, SlidersHorizontalIcon } from 'lucide-react';
import { City, FoodListing, ListingCategory, Stay, Trek } from '../types';
import { FilterChips } from './FilterChips';
import { ListingCard } from './ListingCard';
import { MapView } from './MapView';
import { AnyListing, applyFilters, applySort, buildFilterGroups, SortKey, sortOptions } from '../utils/filters';
import { cx } from '../utils/format';

type ListingBrowserProps = {
  category: ListingCategory;
  items: AnyListing[];
  city: City;
  /** Show the grid/map view toggle (category pages) or grid only (city page sections). */
  allowMapView?: boolean;
  columns?: 2 | 3;
};

export function ListingBrowser({
  category,
  items,
  city,
  allowMapView = false,
  columns = 3
}: ListingBrowserProps) {
  const [active, setActive] = useState<Record<string, string | null>>({});
  const [sort, setSort] = useState<SortKey>('recommended');
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const groups = useMemo(() => buildFilterGroups(category, items, city), [category, items, city]);
  const results = useMemo(
    () => applySort(category, applyFilters(category, items, active), sort),
    [category, items, active, sort]
  );

  const onChange = (groupId: string, value: string | null) =>
  setActive((prev) => ({ ...prev, [groupId]: value }));

  const renderCard = (item: AnyListing, layout: 'grid' | 'row' = 'grid') => {
    if (category === 'stays')
    return (
      <ListingCard
        key={item.slug}
        category="stays"
        item={item as Stay}
        cityName={city.name}
        layout={layout} />);


    if (category === 'food')
    return (
      <ListingCard
        key={item.slug}
        category="food"
        item={item as FoodListing}
        cityName={city.name}
        layout={layout} />);


    return (
      <ListingCard
        key={item.slug}
        category="treks"
        item={item as Trek}
        cityName={city.name}
        layout={layout} />);


  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] font-medium text-ink-600">
          <span className="font-bold text-ink-900">{results.length}</span> of {items.length} results
          {Object.values(active).some(Boolean) ? ' match your filters' : ` in ${city.name}`}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink-800 transition-colors hover:border-ink-400 sm:hidden">
            
            <SlidersHorizontalIcon width={15} height={15} />
            Filters
          </button>

          <label className="inline-flex items-center gap-2 text-[13px] text-ink-500">
            <span className="sr-only sm:not-sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="focus-ring rounded-full border border-ink-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink-800">
              
              {sortOptions(category).map((o) =>
              <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              )}
            </select>
          </label>

          {allowMapView &&
          <div className="inline-flex rounded-full border border-ink-200 bg-white p-1">
              {
            [
            { key: 'grid' as const, label: 'Grid', icon: <LayoutGridIcon width={14} height={14} /> },
            { key: 'map' as const, label: 'Map', icon: <MapIcon width={14} height={14} /> }].

            map((v) =>
            <button
              key={v.key}
              type="button"
              aria-pressed={view === v.key}
              onClick={() => setView(v.key)}
              className={cx(
                'focus-ring inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors',
                view === v.key ? 'bg-ink-900 text-white' : 'text-ink-600 hover:text-ink-900'
              )}>
              
                  {v.icon}
                  {v.label}
                </button>
            )}
            </div>
          }
        </div>
      </div>

      <div className={cx('mb-7 rounded-2xl border border-ink-100 bg-ink-50/60 p-4', !filtersOpen && 'hidden sm:block')}>
        <FilterChips groups={groups} active={active} onChange={onChange} />
      </div>

      {results.length === 0 ?
      <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-12 text-center">
          <h3 className="text-lg font-bold">No matches with those filters</h3>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-ink-600">
            Nothing in {city.name} fits that combination yet. Clear a filter or two — or check a neighbouring
            destination.
          </p>
          <button
          type="button"
          onClick={() => setActive({})}
          className="focus-ring mt-5 inline-flex rounded-full bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-800">
          
            Clear all filters
          </button>
        </div> :
      view === 'map' ?
      <div className="grid gap-5 lg:grid-cols-[minmax(0,380px)_1fr]">
          <ul className="order-2 grid max-h-[620px] gap-3 overflow-y-auto pr-1 lg:order-1">
            {results.map((item) =>
          <li key={item.slug}>{renderCard(item, 'row')}</li>
          )}
          </ul>
          <MapView
          ariaLabel={`Map of ${results.length} results in ${city.name}`}
          center={city.coords}
          zoom={12}
          className="order-1 h-[420px] lg:order-2 lg:h-[620px]"
          markers={results.map((r) => ({
            id: r.slug,
            lat: r.coords.lat,
            lng: r.coords.lng,
            label: r.name,
            meta: r.area
          }))} />
        
        </div> :

      <ul
        className={cx(
          'grid gap-5 sm:grid-cols-2',
          columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
        )}>
        
          {results.map((item) =>
        <li key={item.slug}>{renderCard(item)}</li>
        )}
        </ul>
      }
    </div>);

}