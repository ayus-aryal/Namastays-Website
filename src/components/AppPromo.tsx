import { ActivityIcon, MapIcon, StarIcon } from 'lucide-react';
import { IMG } from '../data/images';

const features = [
{
  icon: <ActivityIcon width={16} height={16} />,
  title: 'Track treks with GPX',
  body: 'Record distance, pace and elevation on any trail, then publish the track for the next hiker.'
},
{
  icon: <MapIcon width={16} height={16} />,
  title: 'Offline trail maps',
  body: 'Download route maps before Lukla or Ghorepani — no signal needed above the treeline.'
},
{
  icon: <StarIcon width={16} height={16} />,
  title: 'Book and review on the go',
  body: 'Reserve stays, save eateries and leave verified reviews from the road.'
}];


export function AppPromo() {
  return (
    <section
      id="get-the-app"
      aria-labelledby="app-promo-title"
      className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
      
      <div className="overflow-hidden rounded-3xl bg-forest-900">
        <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-14">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ember-300">
              Namastays for Android
            </p>
            <h2 id="app-promo-title" className="text-3xl font-bold text-white sm:text-4xl">
              The trail app that feeds this website
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">
              Every trek page here is built from tracks recorded in the Namastays app by hikers on the ground.
              Record your own, review the stay you slept in, and it becomes part of the public record for
              everyone researching Nepal.
            </p>

            <ul className="mt-8 space-y-5">
              {features.map((f) =>
              <li key={f.title} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-ember-300">
                    {f.icon}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-white">{f.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{f.body}</p>
                  </div>
                </li>
              )}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#"
                className="focus-ring inline-flex items-center gap-2.5 rounded-2xl bg-white px-5 py-3 text-forest-900 transition-colors hover:bg-white/90">
                
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M4 3.3v17.4c0 .5.5.8.9.6l9.3-5.4-3-3L4 3.3Zm12 6.2-2.3 2.3 2.3 2.3 3.4-2c.5-.3.5-1 0-1.3l-3.4-1.3ZM5.5 2.6l7.8 4.5 2.2-1.3-9-5.2c-.4-.2-1 0-1 .6v1.4Z" />
                </svg>
                <span className="text-left text-[11px] leading-tight">
                  Get it on
                  <span className="block text-[14px] font-bold">Google Play</span>
                </span>
              </a>
              <a
                href="#"
                className="focus-ring inline-flex items-center gap-2.5 rounded-2xl border border-white/25 px-5 py-3 text-white transition-colors hover:bg-white/10">
                
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M17.6 12.9c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7c-1.4 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 7.9.7.9 1.5 1.9 2.5 1.9s1.4-.6 2.6-.6 1.5.6 2.6.6 1.8-.9 2.5-1.9c.5-.7.7-1.1 1-1.9-2.5-1-2.6-3.2-2.1-3.3ZM15.4 6.6c.6-.7 1-1.7.9-2.6-.9.1-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5 1 .1 2-.5 2.5-1.2Z" />
                </svg>
                <span className="text-left text-[11px] leading-tight">
                  Coming soon on
                  <span className="block text-[14px] font-bold">App Store</span>
                </span>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[28px] border-[6px] border-ink-800 bg-ink-900 shadow-lift">
              <img
                src={IMG.trekPoonHill}
                alt="Namastays app showing a recorded trek route in the Annapurna foothills"
                className="aspect-[9/16] w-full object-cover"
                loading="lazy" />
              
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-forest-800 px-4 py-2 text-xs font-semibold text-white shadow-lift">
              18,400+ treks recorded by the community
            </div>
          </div>
        </div>
      </div>
    </section>);

}