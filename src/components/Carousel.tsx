import React, { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cx } from '../utils/format';

type CarouselProps = {
  children: React.ReactNode;
  ariaLabel: string;
  /** Tailwind width classes applied to each slide wrapper. */
  itemClassName?: string;
};

export function Carousel({ children, ariaLabel, itemClassName }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: 'smooth' });
  };

  const items = React.Children.toArray(children);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-[62px] right-0 hidden gap-2 sm:flex">
        {[
        { dir: -1 as const, icon: <ChevronLeftIcon width={17} height={17} />, label: 'Scroll left' },
        { dir: 1 as const, icon: <ChevronRightIcon width={17} height={17} />, label: 'Scroll right' }].
        map((b) =>
        <button
          key={b.label}
          type="button"
          aria-label={b.label}
          onClick={() => scrollBy(b.dir)}
          className="focus-ring pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition-colors hover:border-forest-600 hover:text-forest-700">
          
            {b.icon}
          </button>
        )}
      </div>

      <ul
        ref={trackRef}
        aria-label={ariaLabel}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        
        {items.map((child, i) =>
        <li
          key={i}
          className={cx('shrink-0 snap-start', itemClassName ?? 'w-[280px] sm:w-[320px]')}>
          
            {child}
          </li>
        )}
      </ul>
    </div>);

}