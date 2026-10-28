import React from 'react';
import { Link } from 'react-router-dom';
import { HandCoinsIcon, UsersIcon, MapPinnedIcon, LeafIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { IMG } from '../data/images';

const team = [
{
  name: 'Aarav Shrestha',
  role: 'Co-founder & CEO',
  from: 'Patan, Lalitpur',
  bio: 'Ran his family’s guesthouse for six years before building Namastays. Still answers host support calls.'
},
{
  name: 'Sunita Rai',
  role: 'Co-founder & Head of Product',
  from: 'Dharan, Sunsari',
  bio: 'Former Android engineer in Bengaluru. Built the first GPX tracker on a Poon Hill trek in 2023.'
},
{
  name: 'Pemba Sherpa',
  role: 'Head of Trails',
  from: 'Khumjung, Solukhumbu',
  bio: 'Licensed mountain guide with 40+ Khumbu seasons. Verifies every route we publish above 3,000m.'
},
{
  name: 'Nisha Chaudhary',
  role: 'Host Partnerships',
  from: 'Sauraha, Chitwan',
  bio: 'Onboards homestays across the Terai and runs our Tharu community host programme.'
}];


const numbers = [
{ value: '438', label: 'Licensed stays listed' },
{ value: '209', label: 'Independent kitchens' },
{ value: '18,400+', label: 'Treks recorded in-app' },
{ value: '6%', label: 'Average commission' }];


export function About() {
  return (
    <>
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={IMG.kathmandu}
            alt="Temple courtyards in Kathmandu Valley at golden hour"
            className="h-full w-full object-cover" />
          
          <div className="absolute inset-0 bg-ink-900/60" />
        </div>
        <div className="relative mx-auto max-w-site px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8">
          <Breadcrumbs onDark items={[{ label: 'Home', href: '/' }, { label: 'About us' }]} className="mb-10" />
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ember-300">
            Our mission
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
            Nepal’s tourism should be owned by Nepalis
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/85">
            We built Namastays because the platforms that decide which Nepali business gets seen are all
            headquartered somewhere else — and they take a quarter of the money with them.
          </p>
        </div>
      </section>

      <section aria-labelledby="story" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 id="story" className="text-2xl font-bold sm:text-3xl">
          Why we started
        </h2>
        <div className="mt-5 space-y-5 text-[16px] leading-[1.8] text-ink-700">
          <p>
            Tourism is roughly 7% of Nepal’s economy and the livelihood of well over a million people. Almost
            all of it is delivered by small businesses: eight-room guesthouses, family teahouses on the Khumbu
            trail, momo kitchens that have been in the same room for forty years, village guides who know
            where the rhinos drink.
          </p>
          <p>
            Almost none of that is visible online in a way those owners control. International booking
            platforms charge 15–25% commission, rank by ad spend, and make a lodge in Namche compete for
            attention with a hotel chain in Bangkok. A restaurant with the best momo in the valley has no page
            at all — just scattered mentions in blog posts written by people passing through.
          </p>
          <p>
            Namastays does two things about that. We keep commission at around 6% so the money stays with the
            host. And we give every single listing — stay, kitchen or trail — its own real, crawlable page with
            genuine on-page detail, so that when someone searches "best momo in Kathmandu valley" or "short
            hikes near Pokhara", they land on the business, not on an aggregator’s ad slot.
          </p>
          <p>
            We are a marketplace and a public record. We are not a trekking agency, we do not sell packages,
            and we do not employ guides. What we do is make independent Nepali hospitality findable, and let
            the hiking community map its own country.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
          {
            icon: <HandCoinsIcon width={18} height={18} />,
            title: 'Low commission, on purpose',
            body: '~6% instead of 15–25%. It is enough to run the platform and no more.'
          },
          {
            icon: <MapPinnedIcon width={18} height={18} />,
            title: 'Findable by design',
            body: 'Every listing gets its own indexable page with real, useful on-page content.'
          },
          {
            icon: <UsersIcon width={18} height={18} />,
            title: 'Community-owned trail data',
            body: 'Routes come from hikers’ GPX tracks, published free for anyone to use.'
          },
          {
            icon: <LeafIcon width={18} height={18} />,
            title: 'Independents only',
            body: 'No chains, no foreign-managed resorts, no paid ranking. Ever.'
          }].
          map((c) =>
          <div key={c.title} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-50 text-forest-700">
                {c.icon}
              </span>
              <h3 className="mt-4 text-[16px] font-bold">{c.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-600">{c.body}</p>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="numbers" className="border-y border-ink-100 bg-forest-900 py-14">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <h2 id="numbers" className="text-xl font-bold text-white sm:text-2xl">
            Where we are today
          </h2>
          <dl className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {numbers.map((n) =>
            <div key={n.label}>
                <dd className="font-display text-3xl font-extrabold text-white sm:text-4xl">{n.value}</dd>
                <dt className="mt-1.5 text-[13.5px] text-white/70">{n.label}</dt>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section aria-labelledby="team" className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 id="team" className="text-2xl font-bold sm:text-3xl">
          The team
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] text-ink-600">
          Twelve people across Kathmandu, Pokhara and Namche. Everyone on the team has worked in Nepali
          hospitality or guiding.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) =>
          <li key={m.name} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-forest-100 font-display text-lg font-bold text-forest-800">
                {m.name.
              split(' ').
              map((p) => p[0]).
              join('')}
              </span>
              <h3 className="mt-4 text-[16px] font-bold">{m.name}</h3>
              <p className="text-[13.5px] font-semibold text-forest-700">{m.role}</p>
              <p className="mt-0.5 text-[13px] text-ink-500">{m.from}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-600">{m.bio}</p>
            </li>
          )}
        </ul>
      </section>

      <section className="mx-auto max-w-site px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-ink-100 bg-ink-50/70 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-bold">Own a hotel, homestay or restaurant in Nepal?</h2>
            <p className="mt-2 max-w-xl text-[15px] text-ink-600">
              Listing is free. We verify your licence, photograph your property if you need it, and build you a
              page that Google can find.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/list-your-property"
              className="focus-ring inline-flex rounded-full bg-ember-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-ember-600">
              
              List your property
            </Link>
            <Link
              to="/contact"
              className="focus-ring inline-flex rounded-full border border-ink-300 px-5 py-3 text-sm font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700">
              
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>);

}