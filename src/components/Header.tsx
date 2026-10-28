import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ChevronDownIcon,
  MenuIcon,
  XIcon,
  SmartphoneIcon,
  BedDoubleIcon,
  UtensilsCrossedIcon,
  MountainSnowIcon } from
'lucide-react';
import { cities } from '../data/cities';
import { Logo } from './Logo';
import { cx } from '../utils/format';

const primaryLinks = [
{ to: '/explore/kathmandu-valley/stays', label: 'Stays', icon: <BedDoubleIcon width={15} height={15} /> },
{ to: '/explore/kathmandu-valley/food', label: 'Food', icon: <UtensilsCrossedIcon width={15} height={15} /> },
{ to: '/explore/pokhara/treks', label: 'Treks', icon: <MountainSnowIcon width={15} height={15} /> }];


export function Header() {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setExploreOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) setExploreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExploreOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-site items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 lg:flex">
          <div className="relative" ref={exploreRef}>
            <button
              type="button"
              aria-expanded={exploreOpen}
              aria-haspopup="true"
              onClick={() => setExploreOpen((v) => !v)}
              className={cx(
                'focus-ring inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
                exploreOpen ? 'bg-ink-50 text-ink-900' : 'text-ink-700 hover:bg-ink-50 hover:text-ink-900'
              )}>
              
              Explore
              <ChevronDownIcon
                width={15}
                height={15}
                className={cx('transition-transform', exploreOpen && 'rotate-180')} />
              
            </button>

            {exploreOpen &&
            <div className="absolute left-0 top-[calc(100%+10px)] w-[560px] overflow-hidden rounded-2xl border border-ink-100 bg-white p-2 shadow-lift">
                <p className="px-3 pb-1.5 pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                  Explore Nepal by city
                </p>
                <ul className="grid grid-cols-2 gap-1">
                  {cities.map((city) =>
                <li key={city.slug}>
                      <Link
                    to={`/explore/${city.slug}`}
                    className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-ink-50">
                    
                        <img
                      src={city.image}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-lg object-cover"
                      loading="lazy" />
                    
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-ink-900">
                            {city.name}
                          </span>
                          <span className="block truncate text-xs text-ink-500">
                            {city.counts.stays} stays · {city.counts.food} eateries · {city.counts.treks}{' '}
                            treks
                          </span>
                        </span>
                      </Link>
                    </li>
                )}
                </ul>
                <Link
                to="/explore"
                className="mt-1 block rounded-xl bg-forest-50 px-3 py-2.5 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100">
                
                  View all destinations →
                </Link>
              </div>
            }
          </div>

          {primaryLinks.map((link) =>
          <NavLink
            key={link.label}
            to={link.to}
            className="focus-ring rounded-full px-3.5 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900">
            
              {link.label}
            </NavLink>
          )}
          <NavLink
            to="/list-your-property"
            className="focus-ring rounded-full px-3.5 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900">
            
            List your property
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="focus-ring hidden rounded-full px-3.5 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50 sm:inline-flex">
            
            Sign in
          </button>
          <Link
            to="/#get-the-app"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-forest-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-800">
            
            <SmartphoneIcon width={15} height={15} aria-hidden="true" />
            <span className="hidden sm:inline">Get the app</span>
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-800 lg:hidden">
            
            {mobileOpen ? <XIcon width={18} height={18} /> : <MenuIcon width={18} height={18} />}
          </button>
        </div>
      </div>

      {mobileOpen &&
      <div className="border-t border-ink-100 bg-white lg:hidden">
          <div className="mx-auto max-w-site px-4 py-4 sm:px-6">
            <p className="pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">Browse</p>
            <ul className="mb-4 grid gap-1">
              <li>
                <Link
                to="/explore"
                className="block rounded-xl bg-ink-50 px-3 py-2.5 text-sm font-semibold text-ink-900">
                
                  Explore all cities
                </Link>
              </li>
              {primaryLinks.map((link) =>
            <li key={link.label}>
                  <Link
                to={link.to}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-700">
                
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
            )}
            </ul>
            <p className="pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">Cities</p>
            <ul className="mb-4 grid grid-cols-2 gap-1">
              {cities.map((city) =>
            <li key={city.slug}>
                  <Link
                to={`/explore/${city.slug}`}
                className="block rounded-xl px-3 py-2 text-sm text-ink-700">
                
                    {city.name}
                  </Link>
                </li>
            )}
            </ul>
            <div className="flex flex-col gap-2">
              <Link
              to="/list-your-property"
              className="rounded-xl border border-ink-200 px-3 py-2.5 text-center text-sm font-semibold text-ink-800">
              
                List your property
              </Link>
              <button
              type="button"
              className="rounded-xl bg-ink-900 px-3 py-2.5 text-sm font-semibold text-white">
              
                Sign in
              </button>
            </div>
          </div>
        </div>
      }
    </header>);

}