import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, FacebookIcon, YoutubeIcon, MailIcon } from 'lucide-react';
import { cities } from '../data/cities';
import { Logo } from './Logo';

const companyLinks = [
{ to: '/about', label: 'About Namastays' },
{ to: '/contact', label: 'Contact us' },
{ to: '/list-your-property', label: 'List your property' },
{ to: '/privacy', label: 'Privacy policy' },
{ to: '/terms', label: 'Terms & conditions' }];


export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-100 bg-ink-50/60">
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-600">
              Namastays is a Nepal-first marketplace for independently owned stays, kitchens and community-
              recorded trails. Every listing belongs to a licensed local owner — not a foreign aggregator.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="#get-the-app"
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ink-900 px-3.5 py-2.5 text-white">
                
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M17.6 12.9c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7c-1.4 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 7.9.7.9 1.5 1.9 2.5 1.9s1.4-.6 2.6-.6 1.5.6 2.6.6 1.8-.9 2.5-1.9c.5-.7.7-1.1 1-1.9-2.5-1-2.6-3.2-2.1-3.3ZM15.4 6.6c.6-.7 1-1.7.9-2.6-.9.1-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5 1 .1 2-.5 2.5-1.2Z" />
                </svg>
                <span className="text-left text-[11px] leading-tight">
                  Coming soon on
                  <span className="block text-[13px] font-semibold">App Store</span>
                </span>
              </a>
              <a
                href="#get-the-app"
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ink-900 px-3.5 py-2.5 text-white">
                
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M4 3.3v17.4c0 .5.5.8.9.6l9.3-5.4-3-3L4 3.3Zm12 6.2-2.3 2.3 2.3 2.3 3.4-2c.5-.3.5-1 0-1.3l-3.4-1.3ZM5.5 2.6l7.8 4.5 2.2-1.3-9-5.2c-.4-.2-1 0-1 .6v1.4Z" />
                </svg>
                <span className="text-left text-[11px] leading-tight">
                  Get it on
                  <span className="block text-[13px] font-semibold">Google Play</span>
                </span>
              </a>
            </div>
            <div className="mt-5 flex items-center gap-2">
              {[
              { icon: <InstagramIcon width={17} height={17} />, label: 'Instagram' },
              { icon: <FacebookIcon width={17} height={17} />, label: 'Facebook' },
              { icon: <YoutubeIcon width={17} height={17} />, label: 'YouTube' },
              { icon: <MailIcon width={17} height={17} />, label: 'Email' }].
              map((s) =>
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-forest-600 hover:text-forest-700">
                
                  {s.icon}
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <nav aria-labelledby="footer-cities">
              <h2 id="footer-cities" className="mb-3 text-sm font-bold text-ink-900">
                Explore by city
              </h2>
              <ul className="space-y-2 text-sm text-ink-600">
                {cities.map((city) =>
                <li key={city.slug}>
                    <Link to={`/explore/${city.slug}`} className="hover:text-forest-700 hover:underline">
                      {city.name}
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/explore" className="font-semibold text-forest-700 hover:underline">
                    All destinations
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-categories">
              <h2 id="footer-categories" className="mb-3 text-sm font-bold text-ink-900">
                Popular searches
              </h2>
              <ul className="space-y-2 text-sm text-ink-600">
                <li>
                  <Link to="/explore/kathmandu-valley/food" className="hover:text-forest-700 hover:underline">
                    Best momo in Kathmandu Valley
                  </Link>
                </li>
                <li>
                  <Link to="/explore/pokhara/treks" className="hover:text-forest-700 hover:underline">
                    Short hikes near Pokhara
                  </Link>
                </li>
                <li>
                  <Link to="/explore/kathmandu-valley/stays" className="hover:text-forest-700 hover:underline">
                    Heritage stays in Patan
                  </Link>
                </li>
                <li>
                  <Link to="/explore/everest-region/stays" className="hover:text-forest-700 hover:underline">
                    Teahouses on the Everest trail
                  </Link>
                </li>
                <li>
                  <Link to="/explore/chitwan/stays" className="hover:text-forest-700 hover:underline">
                    Chitwan homestays &amp; eco lodges
                  </Link>
                </li>
                <li>
                  <Link to="/explore/pokhara/food" className="hover:text-forest-700 hover:underline">
                    Best dal bhat in Pokhara
                  </Link>
                </li>
                <li>
                  <Link to="/explore/mustang/treks" className="hover:text-forest-700 hover:underline">
                    Mustang treks &amp; permits
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-company">
              <h2 id="footer-company" className="mb-3 text-sm font-bold text-ink-900">
                Company
              </h2>
              <ul className="space-y-2 text-sm text-ink-600">
                {companyLinks.map((link) =>
                <li key={link.to}>
                    <Link to={link.to} className="hover:text-forest-700 hover:underline">
                      {link.label}
                    </Link>
                  </li>
                )}
              </ul>
              <h2 className="mb-3 mt-6 text-sm font-bold text-ink-900">Language</h2>
              <div className="inline-flex rounded-full border border-ink-200 bg-white p-1 text-xs font-semibold">
                <span className="rounded-full bg-forest-700 px-3 py-1.5 text-white">English</span>
                <span className="px-3 py-1.5 font-devanagari text-ink-500">नेपाली</span>
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-200 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Namastays Pvt. Ltd. · Registered in Kathmandu, Nepal · Company No. 284119/079/080</p>
          <p>Made in Nepal, for Nepal’s hosts and guides.</p>
        </div>
      </div>
    </footer>);

}