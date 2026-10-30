'use client';

import { useState } from 'react';
import { ImagesIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cx } from '../utils/format';

type PhotoGalleryProps = {
  images: string[];
  alt: string;
  className?: string;
};

export function PhotoGallery({ images, alt, className }: PhotoGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const main = images[0];
  const rest = images.slice(1, 5);

  const move = (dir: 1 | -1) =>
  setLightbox((i) => i === null ? null : (i + dir + images.length) % images.length);

  return (
    <div className={className}>
      <div
        className={cx(
          'grid gap-2 overflow-hidden rounded-2xl',
          rest.length > 0 ? 'sm:grid-cols-[2fr_1fr]' : ''
        )}>
        
        <button
          type="button"
          onClick={() => setLightbox(0)}
          className="focus-ring group relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100 sm:aspect-auto sm:h-[420px]">
          
          <img
            src={main}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          
        </button>

        {rest.length > 0 &&
        <div
          className={cx(
            'grid gap-2 sm:h-[420px] sm:grid-rows-2',
            rest.length > 2 ? 'grid-cols-2' : 'grid-cols-1'
          )}>
          
            {rest.map((img, i) =>
          <button
            key={img + i}
            type="button"
            onClick={() => setLightbox(i + 1)}
            className="focus-ring group relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100 sm:aspect-auto sm:h-full">
            
                <img
              src={img}
              alt={`${alt} — photo ${i + 2}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
            
                {i === rest.length - 1 && images.length > 5 &&
            <span className="absolute inset-0 grid place-items-center bg-ink-900/50 text-sm font-semibold text-white">
                    +{images.length - 5} more
                  </span>
            }
              </button>
          )}
          </div>
        }
      </div>

      <button
        type="button"
        onClick={() => setLightbox(0)}
        className="focus-ring mt-3 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink-800 transition-colors hover:border-forest-600 hover:text-forest-700">
        
        <ImagesIcon width={15} height={15} aria-hidden="true" />
        View all {images.length} photos
      </button>

      {lightbox !== null &&
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${alt} photo viewer`}
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/92 p-4"
        onClick={() => setLightbox(null)}>
        
          <button
          type="button"
          aria-label="Close photo viewer"
          onClick={() => setLightbox(null)}
          className="focus-ring absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
          
            <XIcon width={20} height={20} />
          </button>
          <button
          type="button"
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation();
            move(-1);
          }}
          className="focus-ring absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
          
            <ChevronLeftIcon width={20} height={20} />
          </button>
          <img
          src={images[lightbox]}
          alt={`${alt} — photo ${lightbox + 1} of ${images.length}`}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[82vh] max-w-full rounded-2xl object-contain" />
        
          <button
          type="button"
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation();
            move(1);
          }}
          className="focus-ring absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
          
            <ChevronRightIcon width={20} height={20} />
          </button>
          <p className="absolute bottom-5 text-sm text-white/80">
            {lightbox + 1} / {images.length}
          </p>
        </div>
      }
    </div>);

}