import { MapPinIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Badge } from '../components/Badge';
import { Gallery } from '../components/Gallery';
import { MapView } from '../components/MapView';
import { AppPrompt } from '../components/AppPrompt';
import { SECTION_META } from '../components/sections';
import { isFood } from '../lib/api/mappers';
import { humanizeCategory, toParagraphs } from '../lib/format';
import type { PlaceDetail } from '../lib/models';

export function PlaceDetailView({ place }: { place: PlaceDetail }) {
  const section = isFood(place) ? 'food' : 'places';
  const description = toParagraphs(place.description);

  return (
    <div className="mx-auto max-w-site px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Explore', href: '/explore' },
          ...(place.cityName ? [{ label: place.cityName, href: `/explore/${place.citySlug}` }] : []),
          { label: SECTION_META[section].label, href: `/explore/${place.citySlug}/${section}` },
          { label: place.name }
        ]}
        className="mb-6" />

      {place.categories.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {place.categories.map((c) => <Badge key={c} tone="brand">{humanizeCategory(c)}</Badge>)}
        </div>
      )}
      <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{place.name}</h1>
      {place.cityName && (
        <p className="mt-2 flex items-center gap-1.5 text-[15px] text-ink-600">
          <MapPinIcon width={15} height={15} aria-hidden="true" />
          {place.cityName}
        </p>
      )}

      <div className="mt-6">
        <Gallery images={place.images} alt={place.name} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-10">
          {description.length > 0 && (
            <section aria-labelledby="about">
              <h2 id="about" className="text-xl font-bold">About</h2>
              <div className="mt-3 space-y-4 text-[15.5px] leading-[1.75] text-ink-700">
                {description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>
          )}

          {place.recommender && (
            <p className="rounded-2xl border border-ink-100 bg-ink-50/60 px-4 py-3 text-[14.5px] text-ink-700">
              Recommended by <span className="font-semibold text-ink-900">{place.recommender.displayName}</span>
            </p>
          )}

          {place.tags.length > 0 && (
            <section aria-labelledby="tags">
              <h2 id="tags" className="text-xl font-bold">Good to know</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {place.tags.map((t) => (
                  <li key={t} className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-700">{t}</li>
                ))}
              </ul>
            </section>
          )}

          {place.coords && (
            <section aria-labelledby="location">
              <h2 id="location" className="text-xl font-bold">Location</h2>
              <MapView
                ariaLabel={`Map showing ${place.name}`}
                center={place.coords}
                zoom={15}
                className="mt-4 h-[320px] w-full"
                markers={[{ id: place.slug, ...place.coords, label: place.name, active: true }]} />
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <AppPrompt title="Find more in the app" body="Discover more places like this and plan your trip in the Namastays app." />
        </aside>
      </div>
    </div>
  );
}
