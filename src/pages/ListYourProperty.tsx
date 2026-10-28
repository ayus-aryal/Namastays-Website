import React, { useState } from 'react';
import {
  CheckIcon,
  CheckCircle2Icon,
  LoaderIcon,
  PercentIcon,
  SearchCheckIcon,
  CameraIcon,
  MessagesSquareIcon } from
'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { IMG } from '../data/images';
import { cities } from '../data/cities';
import { cx } from '../utils/format';

const benefits = [
{
  icon: <PercentIcon width={18} height={18} />,
  title: '6% commission, not 20%',
  body: 'Guests pay a 20% deposit online; the balance goes to you directly at check-in. No listing fee, no monthly charge.'
},
{
  icon: <SearchCheckIcon width={18} height={18} />,
  title: 'Your own page on Google',
  body: 'Every property gets an individually indexable page written to match how travellers actually search — not buried in a results list.'
},
{
  icon: <CameraIcon width={18} height={18} />,
  title: 'Free photography',
  body: 'Our photographers cover Kathmandu Valley, Pokhara, Chitwan and the Khumbu at no cost to verified hosts.'
},
{
  icon: <MessagesSquareIcon width={18} height={18} />,
  title: 'Direct guest messaging',
  body: 'Talk to guests before arrival in English or Nepali. You keep the relationship and the repeat business.'
}];


const steps = [
{
  title: 'Tell us about your place',
  body: 'Two minutes: property type, city, rooms, and your licence or registration number.'
},
{
  title: 'We verify your licence',
  body: 'We check Nepal Tourism Board or homestay registration. Usually done within three working days.'
},
{
  title: 'We build your page',
  body: 'Photos, description, map pin, amenities — written for search, reviewed by you before publishing.'
},
{
  title: 'Take your first booking',
  body: 'Set your own prices and availability. Payouts land in your Nepali bank account weekly.'
}];


const propertyTypes = ['Hotel', 'Homestay', 'Guesthouse / Lodge', 'Restaurant / Cafe'];

export function ListYourProperty() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    type: propertyTypes[0],
    city: cities[0].name,
    rooms: '',
    licence: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isFood = form.type === 'Restaurant / Cafe';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.businessName.trim()) next.businessName = 'Required';
    if (!form.ownerName.trim()) next.ownerName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (form.phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a reachable phone number';
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 900);
  };

  const field =
  'focus-ring w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 focus-visible:border-forest-600';

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={IMG.stayBoutique}
            alt="A restored heritage guesthouse courtyard in Kathmandu at dusk"
            className="h-full w-full object-cover" />
          
          <div className="absolute inset-0 bg-ink-900/62" />
        </div>
        <div className="relative mx-auto max-w-site px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8">
          <Breadcrumbs
            onDark
            items={[{ label: 'Home', href: '/' }, { label: 'List your property' }]}
            className="mb-10" />
          
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ember-300">
                For hosts, owners &amp; restaurateurs
              </p>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
                Get found by travellers, keep more of what they pay
              </h1>
              <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/85">
                Namastays lists only independently owned, licensed businesses in Nepal. Listing is free, our
                commission is around 6%, and your property gets a real page that ranks — not a row in someone
                else’s search results.
              </p>
              <ul className="mt-7 space-y-2.5">
                {[
                'Free to list, free photography for verified hosts',
                'You set your own prices and availability',
                'Guests can message you directly before arrival',
                'Restaurants and cafes list free — discovery only, no commission at all'].
                map((p) =>
                <li key={p} className="flex items-start gap-2.5 text-[15px] text-white/90">
                    <CheckIcon width={17} height={17} className="mt-0.5 shrink-0 text-ember-300" />
                    {p}
                  </li>
                )}
              </ul>
            </div>

            {/* Get started form */}
            <div id="get-started" className="rounded-3xl bg-white p-6 shadow-lift sm:p-8">
              {status === 'sent' ?
              <div role="status" className="py-8 text-center">
                  <CheckCircle2Icon width={44} height={44} className="mx-auto text-forest-700" />
                  <h2 className="mt-4 text-xl font-bold">Application received</h2>
                  <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-ink-600">
                    Thanks {form.ownerName.split(' ')[0]}. Our host team will call {form.phone} within three
                    working days to verify {form.businessName} and start building your page.
                  </p>
                  <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="focus-ring mt-6 inline-flex rounded-full border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-800 hover:border-forest-600 hover:text-forest-700">
                  
                    Submit another property
                  </button>
                </div> :

              <form onSubmit={submit} noValidate>
                  <h2 className="text-xl font-bold">Get started</h2>
                  <p className="mt-1.5 text-[14px] text-ink-600">
                    Takes two minutes. No payment details needed.
                  </p>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label htmlFor="businessName" className="mb-1.5 block text-[13px] font-semibold text-ink-800">
                        Business name
                      </label>
                      <input
                      id="businessName"
                      className={field}
                      value={form.businessName}
                      onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                      placeholder="e.g. Kumari Heritage House"
                      aria-invalid={Boolean(errors.businessName)} />
                    
                      {errors.businessName &&
                    <p className="mt-1 text-[12.5px] font-medium text-ember-700">{errors.businessName}</p>
                    }
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="type" className="mb-1.5 block text-[13px] font-semibold text-ink-800">
                          Property type
                        </label>
                        <select
                        id="type"
                        className={field}
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}>
                        
                          {propertyTypes.map((t) =>
                        <option key={t}>{t}</option>
                        )}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="city" className="mb-1.5 block text-[13px] font-semibold text-ink-800">
                          Destination
                        </label>
                        <select
                        id="city"
                        className={field}
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}>
                        
                          {cities.map((c) =>
                        <option key={c.slug}>{c.name}</option>
                        )}
                          <option>Somewhere else in Nepal</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="ownerName" className="mb-1.5 block text-[13px] font-semibold text-ink-800">
                          Your name
                        </label>
                        <input
                        id="ownerName"
                        className={field}
                        value={form.ownerName}
                        onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                        aria-invalid={Boolean(errors.ownerName)} />
                      
                        {errors.ownerName &&
                      <p className="mt-1 text-[12.5px] font-medium text-ember-700">{errors.ownerName}</p>
                      }
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-[13px] font-semibold text-ink-800">
                          Phone
                        </label>
                        <input
                        id="phone"
                        className={field}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+977 98…"
                        aria-invalid={Boolean(errors.phone)} />
                      
                        {errors.phone &&
                      <p className="mt-1 text-[12.5px] font-medium text-ember-700">{errors.phone}</p>
                      }
                      </div>
                    </div>

                    <div>
                      <label htmlFor="hostEmail" className="mb-1.5 block text-[13px] font-semibold text-ink-800">
                        Email
                      </label>
                      <input
                      id="hostEmail"
                      type="email"
                      className={field}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      aria-invalid={Boolean(errors.email)} />
                    
                      {errors.email &&
                    <p className="mt-1 text-[12.5px] font-medium text-ember-700">{errors.email}</p>
                    }
                    </div>

                    <div className={cx('grid gap-4', !isFood && 'sm:grid-cols-2')}>
                      {!isFood &&
                    <div>
                          <label htmlFor="rooms" className="mb-1.5 block text-[13px] font-semibold text-ink-800">
                            Number of rooms
                          </label>
                          <input
                        id="rooms"
                        className={field}
                        value={form.rooms}
                        onChange={(e) => setForm({ ...form, rooms: e.target.value })}
                        placeholder="8" />
                      
                        </div>
                    }
                      <div>
                        <label htmlFor="licence" className="mb-1.5 block text-[13px] font-semibold text-ink-800">
                          Licence / registration no. <span className="font-normal text-ink-400">(optional)</span>
                        </label>
                        <input
                        id="licence"
                        className={field}
                        value={form.licence}
                        onChange={(e) => setForm({ ...form, licence: e.target.value })}
                        placeholder="NTB / homestay / PAN" />
                      
                      </div>
                    </div>
                  </div>

                  <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ember-500 px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-ember-600 disabled:opacity-70">
                  
                    {status === 'sending' && <LoaderIcon width={16} height={16} className="animate-spin" />}
                    {status === 'sending' ? 'Submitting…' : 'Get started'}
                  </button>
                  <p className="mt-3 text-center text-[12.5px] text-ink-500">
                    {isFood ?
                  'Restaurant and cafe listings are always free — we take no commission on food.' :
                  'No commitment. You can leave at any time and take your reviews with you.'}
                  </p>
                </form>
              }
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="host-benefits" className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 id="host-benefits" className="max-w-2xl text-2xl font-bold sm:text-3xl">
          Why hosts move to Namastays
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) =>
          <li key={b.title} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-50 text-forest-700">
                {b.icon}
              </span>
              <h3 className="mt-4 text-[16px] font-bold">{b.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-600">{b.body}</p>
            </li>
          )}
        </ul>
      </section>

      {/* Steps */}
      <section aria-labelledby="host-steps" className="border-y border-ink-100 bg-ink-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <h2 id="host-steps" className="text-2xl font-bold sm:text-3xl">
            How onboarding works
          </h2>
          <ol className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) =>
            <li key={s.title}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-forest-700 font-display text-[15px] font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[16px] font-bold">{s.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-600">{s.body}</p>
              </li>
            )}
          </ol>
        </div>
      </section>

      {/* Host quote */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <blockquote className="text-[19px] font-medium leading-relaxed text-ink-800 sm:text-2xl">
          “We were paying nearly a fifth of every booking to a company in Amsterdam. Now guests find our page
          by searching for heritage stays in Patan, and the money stays in Lalitpur.”
        </blockquote>
        <figcaption className="mt-6 text-[14px] text-ink-600">
          <span className="font-bold text-ink-900">Anjali Shrestha</span> · Kumari Heritage House, Patan ·
          hosting since 2016
        </figcaption>
        <a
          href="#get-started"
          className="focus-ring mt-9 inline-flex rounded-full bg-forest-700 px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-forest-800">
          
          List your property free
        </a>
      </section>
    </>);

}