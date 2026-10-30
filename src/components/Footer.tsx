import Link from 'next/link';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from 'lucide-react';
import type { CitySummary } from '../lib/models';
import { SOCIAL_LINKS } from '../lib/app';
import { SECTIONS } from '../lib/site';
import { SECTION_META } from './sections';
import { AppDownloadButton } from './AppDownloadButton';
import { Logo } from './Logo';

const companyLinks = [
  { to: '/about', label: 'About Namastays' },
  { to: '/contact', label: 'Contact us' },
  { to: '/list-your-property', label: 'List your property' },
  { to: '/privacy', label: 'Privacy policy' },
  { to: '/terms', label: 'Terms & conditions' }
];

const socialIcons = {
  Instagram: <InstagramIcon width={17} height={17} />,
  Facebook: <FacebookIcon width={17} height={17} />,
  YouTube: <YoutubeIcon width={17} height={17} />
};

export function Footer({ cities }: { cities: CitySummary[] }) {
  // Only link to sections that actually have listings.
  const sectionLinks = cities.flatMap((city) =>
    SECTIONS.filter((section) => city.counts[section] > 0).map((section) => ({
      href: `/explore/${city.slug}/${section}`,
      label: SECTION_META[section].title(city.name)
    }))
  );

  return (
    <footer className="mt-20 border-t border-ink-100 bg-ink-50/60">
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-600">
              Namastays helps you find stays, local food and treks across Nepal, and book and navigate them in
              the Namastays app.
            </p>
            <div className="mt-5">
              <AppDownloadButton />
            </div>
            {SOCIAL_LINKS.length > 0 && (
              <div className="mt-5 flex items-center gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-forest-600 hover:text-forest-700">
                    {socialIcons[s.label]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <nav aria-labelledby="footer-cities">
              <h2 id="footer-cities" className="mb-3 text-sm font-bold text-ink-900">Explore by city</h2>
              <ul className="space-y-2 text-sm text-ink-600">
                {cities.map((city) => (
                  <li key={city.slug}>
                    <Link href={`/explore/${city.slug}`} className="hover:text-forest-700 hover:underline">
                      {city.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/explore" className="font-semibold text-forest-700 hover:underline">
                    All destinations
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-browse">
              <h2 id="footer-browse" className="mb-3 text-sm font-bold text-ink-900">Browse</h2>
              <ul className="space-y-2 text-sm text-ink-600">
                <li>
                  <Link href="/treks" className="hover:text-forest-700 hover:underline">Treks &amp; hikes</Link>
                </li>
                {sectionLinks.slice(0, 8).map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-forest-700 hover:underline">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-company">
              <h2 id="footer-company" className="mb-3 text-sm font-bold text-ink-900">Company</h2>
              <ul className="space-y-2 text-sm text-ink-600">
                {companyLinks.map((link) => (
                  <li key={link.to}>
                    <Link href={link.to} className="hover:text-forest-700 hover:underline">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-200 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Namastays</p>
          <p>Made in Nepal.</p>
        </div>
      </div>
    </footer>
  );
}
