import React from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../utils/format';

type LogoProps = {
  onDark?: boolean;
  className?: string;
};

export function Logo({ onDark = false, className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cx('focus-ring group inline-flex items-center gap-2.5 rounded-lg', className)}
      aria-label="Namastays — home">
      
      <span
        className={cx(
          'grid h-9 w-9 place-items-center rounded-xl transition-colors',
          onDark ? 'bg-white' : 'bg-forest-700'
        )}>
        
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            d="M2 18.5 8.2 8l3.1 5.2L13.6 9l6.4 9.5H2Z"
            fill={onDark ? '#1a4f35' : '#ffffff'} />
          
          <circle cx="17.4" cy="5.6" r="2.2" fill="#f4661a" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            'font-display text-[19px] font-extrabold tracking-tight',
            onDark ? 'text-white' : 'text-ink-900'
          )}>
          
          Namastays
        </span>
        <span
          className={cx(
            'mt-0.5 font-devanagari text-[10px] font-medium tracking-wide',
            onDark ? 'text-white/70' : 'text-ink-500'
          )}>
          
          नमस्टेज् · Nepal
        </span>
      </span>
    </Link>);

}