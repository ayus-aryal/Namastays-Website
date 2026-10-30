import { Breadcrumbs } from '../components/Breadcrumbs';
import { TrekCard } from '../components/cards';
import { EmptyState } from '../components/EmptyState';
import { AppPrompt } from '../components/AppPrompt';
import type { TrekSummary } from '../lib/models';

export function TreksPage({ treks }: { treks: TrekSummary[] }) {
  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Treks' }]} className="mb-6" />
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">Treks and hikes in Nepal</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">
            Routes with distances, itineraries and elevation, plus offline maps you can download in the Namastays app.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-site px-4 py-10 sm:px-6 lg:px-8">
        {treks.length === 0 ? (
          <EmptyState title="Treks are coming soon" body="We’re adding our first routes. Check back soon." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {treks.map((t) => <TrekCard key={t.slug} trek={t} />)}
          </div>
        )}
        <AppPrompt className="mt-12" title="Hike with the app" body="Download a trek’s offline map and track your hike in the Namastays app." />
      </div>
    </>
  );
}
