import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalLayoutProps = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalLayout({ title, updated, intro, sections }: LegalLayoutProps) {
  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: title }]} className="mb-6" />
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 text-[13.5px] font-medium text-ink-500">Last updated {updated}</p>
          <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-ink-700">{intro}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-site gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">On this page</p>
          <ol className="space-y-2 text-[14px]">
            {sections.map((s, i) =>
            <li key={s.heading}>
                <a
                href={`#section-${i + 1}`}
                className="focus-ring rounded text-ink-600 hover:text-forest-700 hover:underline">
                
                  {i + 1}. {s.heading}
                </a>
              </li>
            )}
          </ol>
        </nav>

        <div className="max-w-3xl">
          {sections.map((s, i) =>
          <section key={s.heading} id={`section-${i + 1}`} className="mb-10 scroll-mt-24">
              <h2 className="text-xl font-bold sm:text-2xl">
                {i + 1}. {s.heading}
              </h2>
              {s.paragraphs?.map((p, j) =>
            <p key={j} className="mt-3 text-[15.5px] leading-[1.8] text-ink-700">
                  {p}
                </p>
            )}
              {s.bullets &&
            <ul className="mt-4 space-y-2.5">
                  {s.bullets.map((b) =>
              <li key={b} className="flex gap-3 text-[15.5px] leading-[1.7] text-ink-700">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-600" />
                      {b}
                    </li>
              )}
                </ul>
            }
            </section>
          )}

          <div className="rounded-2xl border border-ink-100 bg-ink-50/70 p-5">
            <h2 className="text-[16px] font-bold">Questions about this page?</h2>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-600">
              Write to{' '}
              <a href="mailto:legal@namastays.com" className="font-semibold text-forest-700 hover:underline">
                legal@namastays.com
              </a>{' '}
              or Namastays Pvt. Ltd., 4th floor, Jhamsikhel Road, Lalitpur 44700, Nepal.
            </p>
          </div>
        </div>
      </div>
    </>);

}