import { Breadcrumbs } from '../components/Breadcrumbs';
import { HOST_APP_URL } from '../lib/app';

const steps = [
  { title: 'Get the host app', body: 'Listing is done in the Namastays host app for Android.' },
  { title: 'Sign in with your phone number', body: 'You receive a one-time code by SMS to verify your number.' },
  { title: 'Add your property', body: 'Enter your details and address, then add photos, rooms and prices, amenities and your house policies.' },
  { title: 'We review it', body: 'New listings are checked by our team. Until approval your listing shows as pending verification.' },
  { title: 'Go live', body: 'Once approved, your property can go live on Namastays.' }
];

export function ListYourProperty() {
  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'List your property' }]} className="mb-6" />
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">List your property on Namastays</h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-600">
            Own a hotel, homestay or lodge in Nepal? Add it to Namastays from your phone.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">How it works</h2>
        <ol className="mt-6 space-y-5">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-700 text-sm font-bold text-white">{i + 1}</span>
              <div>
                <h3 className="text-[16px] font-bold text-ink-900">{s.title}</h3>
                <p className="mt-1 text-[14.5px] leading-relaxed text-ink-700">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl border border-forest-100 bg-forest-50 p-5">
          <p className="text-sm font-bold text-forest-900">Namastays host app</p>
          {HOST_APP_URL ? (
            <a href={HOST_APP_URL} className="focus-ring mt-3 inline-block rounded-2xl bg-ink-900 px-5 py-3 text-sm font-semibold text-white">
              Get the host app
            </a>
          ) : (
            <p className="mt-2 text-[14.5px] leading-relaxed text-forest-900/80">The host app is coming soon on Google Play.</p>
          )}
        </div>
      </div>
    </>
  );
}
