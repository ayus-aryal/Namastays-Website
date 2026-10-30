import { Breadcrumbs } from '../components/Breadcrumbs';
import { PlaceCard, StayCard } from '../components/cards';
import { EmptyState } from '../components/EmptyState';
import { MapView } from '../components/MapView';
import { AppPrompt } from '../components/AppPrompt';
import { SECTION_META } from '../components/sections';
import { centerOf } from '../lib/geo';
import { plural } from '../lib/format';
import type { Section } from '../lib/site';
import type { City, Place, Stay } from '../lib/models';

type Props =
  | { city: City; section: 'stays'; stays: Stay[] }
  | { city: City; section: 'food' | 'places'; places: Place[] };

export function SectionListing(props: Props) {
  const { city, section } = props;
  const meta = SECTION_META[section as Section];
  const items = 'stays' in props ? props.stays : props.places;
  const points = items.flatMap((item) => (item.coords ? [{ item, coords: item.coords }] : []));
  const center = centerOf(points.map((p) => p.coords)) ?? city.coords;

  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Explore', href: '/explore' },
              { label: city.name, href: `/explore/${city.slug}` },
              { label: meta.label }
            ]}
            className="mb-6" />
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">{meta.title(city.name)}</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">{meta.blurb(city.name)}</p>
          {items.length > 0 && (
            <p className="mt-4 text-sm font-semibold text-ink-700">
              {plural(items.length, section === 'stays' ? 'stay' : 'place')}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-site px-4 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <EmptyState
            title={`No ${meta.label.toLowerCase()} listed in ${city.name} yet`}
            body="We’re adding more every week. Try another destination."
            href="/explore"
            linkLabel="All destinations" />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="grid gap-5 sm:grid-cols-2">
              {'stays' in props
                ? props.stays.map((s) => <StayCard key={s.slug} stay={s} />)
                : props.places.map((p) => <PlaceCard key={p.slug} place={p} />)}
            </div>
            {center && points.length > 0 && (
              <div className="lg:sticky lg:top-24 lg:self-start">
                <MapView
                  ariaLabel={`Map of ${meta.label.toLowerCase()} in ${city.name}`}
                  center={center}
                  zoom={12}
                  className="h-[320px] w-full lg:h-[520px]"
                  markers={points.map(({ item, coords }) => ({ id: item.slug, ...coords, label: item.name }))} />
              </div>
            )}
          </div>
        )}
        <AppPrompt className="mt-12" title="Get more in the app" body="Book stays, save places and use offline maps in the Namastays app." />
      </div>
    </>
  );
}
