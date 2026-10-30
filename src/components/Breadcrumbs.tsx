import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { cx } from '../utils/format';

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  /** Use on dark photo backgrounds. */
  onDark?: boolean;
  className?: string;
};

export function Breadcrumbs({ items, onDark = false, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cx('w-full', className)}>
      <ol
        className={cx(
          'flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px]',
          onDark ? 'text-white/80' : 'text-ink-500'
        )}>
        
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-x-1.5">
              {item.href && !isLast ?
              <Link
                href={item.href}
                className={cx(
                  'focus-ring rounded transition-colors',
                  onDark ? 'hover:text-white' : 'hover:text-forest-700 hover:underline'
                )}>
                
                  {item.label}
                </Link> :

              <span
                aria-current={isLast ? 'page' : undefined}
                className={cx('font-medium', onDark ? 'text-white' : 'text-ink-900')}>
                
                  {item.label}
                </span>
              }
              {!isLast && <ChevronRightIcon width={13} height={13} className="shrink-0 opacity-60" />}
            </li>);

        })}
      </ol>
    </nav>);

}