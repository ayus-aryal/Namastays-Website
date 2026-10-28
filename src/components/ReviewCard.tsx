import React from 'react';
import { ThumbsUpIcon, BadgeCheckIcon } from 'lucide-react';
import { Review } from '../types';
import { Rating } from './Rating';

const initials = (name: string) =>
name.
split(/[\s&]+/).
filter(Boolean).
slice(0, 2).
map((p) => p[0]).
join('').
toUpperCase();

export function ReviewCard({ review }: {review: Review;}) {
  return (
    <article className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
      <header className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-100 font-display text-sm font-bold text-forest-800">
          
          {initials(review.author)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm font-bold text-ink-900">
            {review.author}
            <BadgeCheckIcon width={14} height={14} className="text-forest-600" aria-label="Verified stay" />
          </p>
          <p className="text-xs text-ink-500">
            {review.origin} · {review.date}
            {review.tripType ? ` · ${review.tripType}` : ''}
          </p>
        </div>
        <Rating value={review.rating} className="shrink-0" />
      </header>

      <h4 className="mt-4 text-[15px] font-bold text-ink-900">{review.title}</h4>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-700">{review.body}</p>

      <footer className="mt-4 flex items-center gap-4 border-t border-ink-100 pt-3.5">
        <button
          type="button"
          className="focus-ring inline-flex items-center gap-1.5 rounded-full text-xs font-semibold text-ink-600 transition-colors hover:text-forest-700">
          
          <ThumbsUpIcon width={13} height={13} aria-hidden="true" />
          Helpful ({review.helpful})
        </button>
        <button
          type="button"
          className="focus-ring rounded-full text-xs font-semibold text-ink-500 transition-colors hover:text-ink-800">
          
          Report
        </button>
      </footer>
    </article>);

}