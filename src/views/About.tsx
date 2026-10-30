import Link from 'next/link';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AppPrompt } from '../components/AppPrompt';

export function About() {
  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} className="mb-6" />
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">About Namastays</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-5 text-[16px] leading-[1.8] text-ink-700">
          <p>
            Namastays is a travel platform for Nepal. It brings stays, local places to eat and trekking routes
            together in one place.
          </p>
          <p>
            This website is where you plan: browse destinations, read about stays and treks, and look at routes
            on the map. The Namastays app is where you book stays and use treks on the trail, including offline
            maps for when there is no signal.
          </p>
          <p>Namastays is built in Nepal by a small team.</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/explore" className="focus-ring rounded-full bg-forest-700 px-5 py-3 text-white hover:bg-forest-800">
            Explore destinations
          </Link>
          <Link href="/list-your-property" className="focus-ring rounded-full border border-ink-200 px-5 py-3 text-ink-800 hover:border-forest-600 hover:text-forest-700">
            List your property
          </Link>
          <Link href="/contact" className="focus-ring rounded-full border border-ink-200 px-5 py-3 text-ink-800 hover:border-forest-600 hover:text-forest-700">
            Contact us
          </Link>
        </div>

        <AppPrompt className="mt-12" title="Get the Namastays app" body="Book stays and use offline trek maps on your phone." />
      </div>
    </>
  );
}
