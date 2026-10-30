import Link from 'next/link';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CONTACT_EMAIL } from '../lib/app';

export function LegalStub({ title }: { title: string }) {
  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: title }]} className="mb-6" />
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-[16px] leading-relaxed text-ink-700">
          We are finalising this page. It will be published here before the Namastays app launches.
          {CONTACT_EMAIL ? (
            <>
              {' '}Questions in the meantime? Write to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-forest-700 hover:underline">{CONTACT_EMAIL}</a>.
            </>
          ) : (
            <>
              {' '}Go back to the{' '}
              <Link href="/" className="font-semibold text-forest-700 hover:underline">home page</Link>.
            </>
          )}
        </p>
      </div>
    </>
  );
}
