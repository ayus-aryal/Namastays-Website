import React from 'react';
import { StarIcon } from 'lucide-react';
import { cx } from '../utils/format';

type RatingProps = {
  value: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showStars?: boolean;
  className?: string;
};

export function Rating({ value, reviewCount, size = 'sm', showStars = true, className }: RatingProps) {
  const iconSize = size === 'lg' ? 18 : size === 'md' ? 15 : 13;
  const textSize = size === 'lg' ? 'text-base' : size === 'md' ? 'text-sm' : 'text-[13px]';

  return (
    <span className={cx('inline-flex items-center gap-1.5', textSize, className)}>
      {showStars &&
      <span className="inline-flex items-center gap-0.5" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) =>
        <StarIcon
          key={i}
          width={iconSize}
          height={iconSize}
          className={i < Math.round(value) ? 'fill-ember-500 text-ember-500' : 'fill-ink-200 text-ink-200'} />

        )}
        </span>
      }
      <span className="font-semibold text-ink-900">{value.toFixed(1)}</span>
      {typeof reviewCount === 'number' &&
      <span className="text-ink-500">({reviewCount.toLocaleString()})</span>
      }
      <span className="sr-only">{value.toFixed(1)} out of 5 stars</span>
    </span>);

}