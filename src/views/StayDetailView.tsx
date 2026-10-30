import { MapPinIcon, CheckIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Badge } from '../components/Badge';
import { Gallery } from '../components/Gallery';
import { MapView } from '../components/MapView';
import { AppPrompt } from '../components/AppPrompt';
import { formatPrice } from '../lib/format';
import type { StayDetail } from '../lib/models';

const yesNo = (label: string, value: boolean | null) =>
  value === null ? null : { label, value: value ? 'Yes' : 'No' };

export function StayDetailView({ stay }: { stay: StayDetail }) {
  const policy = stay.policy;
  const rules = policy
    ? [
        policy.checkInTime && { label: 'Check-in', value: policy.checkInTime },
        policy.checkOutTime && { label: 'Check-out', value: policy.checkOutTime },
        yesNo('Breakfast included', policy.breakfastIncluded),
        yesNo('Children welcome', policy.childrenAllowed),
        yesNo('Pets allowed', policy.petsAllowed),
        yesNo('Smoking allowed', policy.smokingAllowed),
        policy.extraGuestPrice && { label: 'Extra guest', value: policy.extraGuestPrice }
      ].filter((rule): rule is { label: string; value: string } => Boolean(rule))
    : [];

  return (
    <div className="mx-auto max-w-site px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Explore', href: '/explore' },
          { label: stay.city, href: `/explore/${stay.citySlug}` },
          { label: 'Stays', href: `/explore/${stay.citySlug}/stays` },
          { label: stay.name }
        ]}
        className="mb-6" />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Badge tone="forest">{stay.type}</Badge>
        {stay.yearEstablished && <Badge>Established {stay.yearEstablished}</Badge>}
      </div>
      <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{stay.name}</h1>
      <p className="mt-2 flex items-center gap-1.5 text-[15px] text-ink-600">
        <MapPinIcon width={15} height={15} aria-hidden="true" />
        {stay.address}, {stay.city}, {stay.state}
      </p>

      <div className="mt-6">
        <Gallery images={stay.images} alt={stay.name} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-10">
          {stay.description && (
            <section aria-labelledby="about">
              <h2 id="about" className="text-xl font-bold">About this stay</h2>
              <p className="mt-3 text-[15.5px] leading-[1.75] text-ink-700">{stay.description}</p>
            </section>
          )}

          {stay.amenities.length > 0 && (
            <section aria-labelledby="amenities">
              <h2 id="amenities" className="text-xl font-bold">Amenities</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {stay.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-[14.5px] text-ink-700">
                    <CheckIcon width={16} height={16} className="shrink-0 text-forest-600" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {stay.rooms.length > 0 && (
            <section aria-labelledby="rooms">
              <h2 id="rooms" className="text-xl font-bold">Rooms</h2>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-ink-100">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Room</th>
                      <th className="px-4 py-3 font-semibold">Sleeps</th>
                      <th className="px-4 py-3 font-semibold">Bed</th>
                      <th className="px-4 py-3 text-right font-semibold">Per night</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {stay.rooms.map((room, i) => (
                      <tr key={`${room.category}-${i}`}>
                        <td className="px-4 py-3 font-semibold text-ink-900">{room.category}</td>
                        <td className="px-4 py-3 text-ink-700">{room.maxGuests}</td>
                        <td className="px-4 py-3 text-ink-700">{room.bedType}</td>
                        <td className="px-4 py-3 text-right font-semibold text-ink-900">{formatPrice(room.pricePerNight)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {(rules.length > 0 || policy?.cancellationPolicy) && (
            <section aria-labelledby="policies">
              <h2 id="policies" className="text-xl font-bold">House rules &amp; policies</h2>
              {rules.length > 0 && (
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {rules.map((rule) => (
                    <div key={rule.label} className="rounded-xl border border-ink-100 bg-ink-50/60 px-4 py-3">
                      <dt className="text-[12px] font-semibold uppercase tracking-wide text-ink-500">{rule.label}</dt>
                      <dd className="mt-1 text-[14.5px] font-medium text-ink-900">{rule.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {policy?.cancellationPolicy && (
                <p className="mt-4 text-[14.5px] leading-relaxed text-ink-700">
                  <span className="font-semibold text-ink-900">Cancellation: </span>
                  {policy.cancellationPolicy}
                </p>
              )}
            </section>
          )}

          {stay.coords && (
            <section aria-labelledby="location">
              <h2 id="location" className="text-xl font-bold">Location</h2>
              <p className="mt-2 text-[14.5px] text-ink-600">
                {stay.address}, {stay.city}{stay.postalCode ? ` ${stay.postalCode}` : ''}, {stay.country}
              </p>
              <MapView
                ariaLabel={`Map showing ${stay.name}`}
                center={stay.coords}
                zoom={15}
                className="mt-4 h-[320px] w-full"
                markers={[{ id: stay.slug, ...stay.coords, label: stay.name, active: true }]} />
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
            {stay.startingPrice !== null && (
              <p className="text-2xl font-bold text-ink-900">
                <span className="text-sm font-medium text-ink-500">From </span>
                {formatPrice(stay.startingPrice)}
                <span className="text-sm font-medium text-ink-500"> / night</span>
              </p>
            )}
            <AppPrompt
              className="mt-4"
              title="Book in the Namastays app"
              body="Check availability and reserve this stay in the app. Booking isn’t available on the website." />
          </div>
        </aside>
      </div>
    </div>
  );
}
