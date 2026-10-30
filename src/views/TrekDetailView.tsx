import { MapPinIcon, RouteIcon, ClockIcon, MountainIcon, TrendingUpIcon, FlagIcon, SparklesIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Badge } from '../components/Badge';
import { Gallery } from '../components/Gallery';
import { MapView } from '../components/MapView';
import { ElevationProfile } from '../components/ElevationProfile';
import { AppPrompt } from '../components/AppPrompt';
import { centerOf } from '../lib/geo';
import { formatDuration, toParagraphs } from '../lib/format';
import type { Trek, TrekRoute } from '../lib/models';

export function TrekDetailView({ trek, route }: { trek: Trek; route: TrekRoute | null }) {
  const images = trek.images.length > 0 ? trek.images : trek.image ? [trek.image] : [];
  const description = toParagraphs(trek.description);
  const maxElevation = trek.maxElevationM ?? route?.maxElevationM ?? null;

  const stats = [
    trek.distanceKm !== null && { icon: <RouteIcon width={18} height={18} />, label: 'Distance', value: `${trek.distanceKm} km` },
    trek.durationDays !== null && { icon: <ClockIcon width={18} height={18} />, label: 'Duration', value: formatDuration(trek.durationDays) ?? '' },
    maxElevation !== null && { icon: <MountainIcon width={18} height={18} />, label: 'Highest point', value: `${maxElevation.toLocaleString('en-US')} m` },
    route?.elevationGainM != null && { icon: <TrendingUpIcon width={18} height={18} />, label: 'Total climb', value: `${route.elevationGainM.toLocaleString('en-US')} m` },
    trek.basePoint && { icon: <FlagIcon width={18} height={18} />, label: 'Starts at', value: trek.basePoint }
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[];

  const minEle = route?.minElevationM ?? null;
  const maxEle = route?.maxElevationM ?? null;
  const profilePoints =
    route && minEle !== null && maxEle !== null && route.profile.length > 1 && trek.distanceKm
      ? route.profile.map((p) => Math.round(minEle + p * (maxEle - minEle)))
      : null;
  const routeCenter = route ? centerOf(route.route.map(([lat, lng]) => ({ lat, lng }))) : null;

  return (
    <div className="mx-auto max-w-site px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Treks', href: '/treks' }, { label: trek.name }]}
        className="mb-6" />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {trek.difficulty && <Badge tone="ember">{trek.difficulty}</Badge>}
        {trek.region && (
          <Badge icon={<MapPinIcon width={12} height={12} />}>{trek.region}</Badge>
        )}
      </div>
      <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{trek.name}</h1>

      <div className="mt-6">
        <Gallery images={images} alt={trek.name} />
      </div>

      {stats.length > 0 && (
        <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-ink-100 bg-ink-50/60 p-5 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-ink-500">
                {s.icon}
                {s.label}
              </dt>
              <dd className="mt-1.5 text-lg font-bold text-ink-900">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-12">
          {description.length > 0 && (
            <section aria-labelledby="overview">
              <h2 id="overview" className="text-xl font-bold">Overview</h2>
              <div className="mt-3 space-y-4 text-[15.5px] leading-[1.75] text-ink-700">
                {description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>
          )}

          {trek.highlights.length > 0 && (
            <section aria-labelledby="highlights">
              <h2 id="highlights" className="text-xl font-bold">Highlights</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {trek.highlights.map((h) => (
                  <li key={h.label} className="flex items-center gap-3 rounded-xl border border-ink-100 px-4 py-3 text-[14.5px] font-medium text-ink-800">
                    <SparklesIcon width={16} height={16} className="shrink-0 text-ember-500" aria-hidden="true" />
                    {h.label}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {route && routeCenter && (
            <section aria-labelledby="route">
              <h2 id="route" className="text-xl font-bold">Route map</h2>
              <MapView
                ariaLabel={`Route map for ${trek.name}`}
                center={routeCenter}
                zoom={11}
                route={route.route}
                className="mt-4 h-[360px] w-full sm:h-[440px]" />
              {profilePoints && trek.distanceKm && (
                <ElevationProfile className="mt-6" points={profilePoints} distanceKm={trek.distanceKm} />
              )}
            </section>
          )}

          {trek.itinerary.length > 0 && (
            <section aria-labelledby="itinerary">
              <h2 id="itinerary" className="text-xl font-bold">Day-by-day itinerary</h2>
              <ol className="mt-5 space-y-5">
                {trek.itinerary.map((day) => (
                  <li key={day.dayNumber} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-700 text-sm font-bold text-white">
                      {day.dayNumber}
                    </span>
                    <div>
                      <h3 className="text-[16px] font-bold text-ink-900">{day.title}</h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-ink-700">{day.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <AppPrompt
            title="Take this trek offline"
            body={
              trek.offlineMapSizeMb !== null
                ? `Download the offline map (about ${Math.round(trek.offlineMapSizeMb)} MB) and track your hike in the Namastays app.`
                : 'Download the offline map and track your hike in the Namastays app.'
            } />
          {route?.elevationGainM != null && (
            <p className="mt-3 px-1 text-[12px] leading-relaxed text-ink-500">
              Climb and elevation figures are calculated from the recorded route and may differ slightly from other sources.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
