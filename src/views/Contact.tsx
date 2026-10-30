import Link from 'next/link';
import { MailIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CONTACT_EMAIL } from '../lib/app';

export function Contact() {
  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} className="mb-6" />
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">Contact us</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {CONTACT_EMAIL ? (
          <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-6">
            <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
              <MailIcon width={16} height={16} aria-hidden="true" />
              Email
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 inline-block text-lg font-semibold text-forest-700 hover:underline">
              {CONTACT_EMAIL}
            </a>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
              For questions about a booking, a listing or working with Namastays.
            </p>
          </div>
        ) : (
          <p className="text-[16px] leading-relaxed text-ink-700">
            Contact details are coming soon. In the meantime, hosts can start from the{' '}
            <Link href="/list-your-property" className="font-semibold text-forest-700 hover:underline">
              list your property
            </Link>{' '}
            page.
          </p>
        )}
      </div>
    </>
  );
}
