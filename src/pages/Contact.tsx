import React, { useState } from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon, CheckCircle2Icon, LoaderIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MapView } from '../components/MapView';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const topics = [
'A booking or reservation',
'Listing my property',
'A problem with a listing',
'Trail or GPX data',
'Press or partnerships',
'Something else'];


export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please tell us your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (form.message.trim().length < 10) next.message = 'A little more detail helps us route your message';
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 900);
  };

  const field =
  'focus-ring w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 focus-visible:border-forest-600';

  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact us' }]} className="mb-6" />
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">Contact Namastays</h1>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-600 sm:text-base">
            Our team is in Kathmandu and answers in English and Nepali, usually within one working day. For
            anything urgent about a stay you have already booked, call the host first — their number is on your
            confirmation.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-site gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        {/* Form */}
        <section aria-labelledby="contact-form">
          <h2 id="contact-form" className="text-2xl font-bold">
            Send us a message
          </h2>

          {status === 'sent' ?
          <div
            role="status"
            className="mt-6 rounded-2xl border border-forest-200 bg-forest-50 p-8 text-center">
            
              <CheckCircle2Icon width={40} height={40} className="mx-auto text-forest-700" />
              <h3 className="mt-4 text-xl font-bold text-forest-900">Message sent</h3>
              <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-forest-800">
                Thanks {form.name.split(' ')[0]} — we’ve got it. You’ll hear from someone on the {form.topic.
              toLowerCase().
              replace('a ', '')}{' '}
                side within one working day at {form.email}.
              </p>
              <button
              type="button"
              onClick={() => {
                setForm({ name: '', email: '', topic: topics[0], message: '' });
                setStatus('idle');
              }}
              className="focus-ring mt-6 inline-flex rounded-full border border-forest-300 px-5 py-2.5 text-sm font-semibold text-forest-800 hover:bg-white">
              
                Send another message
              </button>
            </div> :

          <form onSubmit={submit} noValidate className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[13.5px] font-semibold text-ink-800">
                    Your name
                  </label>
                  <input
                  id="name"
                  className={field}
                  value={form.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Sita Gurung" />
                
                  {errors.name &&
                <p id="name-error" className="mt-1.5 text-[13px] font-medium text-ember-700">
                      {errors.name}
                    </p>
                }
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-[13.5px] font-semibold text-ink-800">
                    Email address
                  </label>
                  <input
                  id="email"
                  type="email"
                  className={field}
                  value={form.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com" />
                
                  {errors.email &&
                <p id="email-error" className="mt-1.5 text-[13px] font-medium text-ember-700">
                      {errors.email}
                    </p>
                }
                </div>
              </div>

              <div>
                <label htmlFor="topic" className="mb-1.5 block text-[13.5px] font-semibold text-ink-800">
                  What is this about?
                </label>
                <select
                id="topic"
                className={field}
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                
                  {topics.map((t) =>
                <option key={t}>{t}</option>
                )}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-[13.5px] font-semibold text-ink-800">
                  Message
                </label>
                <textarea
                id="message"
                rows={6}
                className={field}
                value={form.message}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what you need. If it is about a specific listing, paste the link." />
              
                {errors.message &&
              <p id="message-error" className="mt-1.5 text-[13px] font-medium text-ember-700">
                    {errors.message}
                  </p>
              }
              </div>

              <button
              type="submit"
              disabled={status === 'sending'}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-ember-500 px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-ember-600 disabled:opacity-70">
              
                {status === 'sending' && <LoaderIcon width={16} height={16} className="animate-spin" />}
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p className="text-[13px] text-ink-500">
                We only use your details to answer this message. See our{' '}
                <a href="/privacy" className="font-semibold text-forest-700 hover:underline">
                  privacy policy
                </a>
                .
              </p>
            </form>
          }
        </section>

        {/* Business info */}
        <aside aria-labelledby="contact-details">
          <h2 id="contact-details" className="text-2xl font-bold">
            Our office
          </h2>
          <dl className="mt-6 space-y-5 text-[15px]">
            {[
            {
              icon: <MapPinIcon width={18} height={18} />,
              label: 'Address',
              value:
              <>
                    Namastays Pvt. Ltd.
                    <br />
                    4th floor, Jhamsikhel Road
                    <br />
                    Lalitpur 44700, Kathmandu Valley, Nepal
                  </>

            },
            {
              icon: <MailIcon width={18} height={18} />,
              label: 'Email',
              value:
              <a href="mailto:hello@namastays.com" className="text-forest-700 hover:underline">
                    hello@namastays.com
                  </a>

            },
            {
              icon: <PhoneIcon width={18} height={18} />,
              label: 'Phone',
              value:
              <a href="tel:+97715520100" className="text-forest-700 hover:underline">
                    +977 1 552 0100
                  </a>

            },
            {
              icon: <ClockIcon width={18} height={18} />,
              label: 'Hours',
              value: 'Sunday–Friday, 09:30–18:00 NPT (UTC+5:45)'
            }].
            map((row) =>
            <div key={row.label} className="flex gap-3.5">
                <dt className="mt-0.5 shrink-0 text-forest-700">
                  {row.icon}
                  <span className="sr-only">{row.label}</span>
                </dt>
                <dd>
                  <span className="block font-semibold text-ink-900">{row.label}</span>
                  <span className="block leading-relaxed text-ink-600">{row.value}</span>
                </dd>
              </div>
            )}
          </dl>

          <MapView
            ariaLabel="Map showing the Namastays office in Lalitpur, Kathmandu Valley"
            center={{ lat: 27.6768, lng: 85.3103 }}
            zoom={15}
            className="mt-7 h-[300px] w-full"
            markers={[
            {
              id: 'office',
              lat: 27.6768,
              lng: 85.3103,
              label: 'Namastays HQ',
              meta: 'Jhamsikhel, Lalitpur',
              active: true
            }]
            } />
          

          <div className="mt-6 rounded-2xl border border-ink-100 bg-ink-50/70 p-5">
            <h3 className="text-[15px] font-bold">Host support</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-600">
              Already listed with us? Host support runs 07:00–21:00 NPT, seven days a week, on{' '}
              <a href="tel:+97715520111" className="font-semibold text-forest-700 hover:underline">
                +977 1 552 0111
              </a>
              .
            </p>
          </div>
        </aside>
      </div>
    </>);

}