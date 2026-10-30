import { MapIcon, RouteIcon, BedDoubleIcon } from 'lucide-react';
import { AppDownloadButton } from './AppDownloadButton';

const features = [
  {
    icon: <RouteIcon width={16} height={16} />,
    title: 'Track your trek',
    body: 'Follow a recorded route and log your own hike with GPS, even without a signal.'
  },
  {
    icon: <MapIcon width={16} height={16} />,
    title: 'Offline trail maps',
    body: 'Download a trek’s map before you leave the road and use it with no data.'
  },
  {
    icon: <BedDoubleIcon width={16} height={16} />,
    title: 'Book stays in the app',
    body: 'Browse here, then reserve your stay in the Namastays app.'
  }
];

export function AppPromo() {
  return (
    <section id="get-the-app" aria-labelledby="app-promo-title" className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 sm:p-12 lg:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-ember-500/25 blur-3xl" aria-hidden="true" />
        <p className="relative mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ember-300">Namastays for Android</p>
        <h2 id="app-promo-title" className="relative max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          Take Namastays on the trail
        </h2>
        <p className="relative mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">
          This website is for planning. The app is for the journey: booking, offline maps and tracking.
        </p>
        <ul className="relative mt-8 grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <li key={f.title} className="flex gap-3.5">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-ember-300">
                {f.icon}
              </span>
              <div>
                <p className="text-[15px] font-semibold text-white">{f.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{f.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="relative mt-9">
          <AppDownloadButton tone="light" />
        </div>
      </div>
    </section>
  );
}
