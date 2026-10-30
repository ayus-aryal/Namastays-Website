import { ImageOffIcon } from 'lucide-react';
import { PhotoGallery } from './PhotoGallery';
import { optimizeImage } from '../lib/images';

/** Photo gallery that copes with listings that have no photos yet. */
export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const optimized = images.flatMap((url) => {
    const o = optimizeImage(url, 1400);
    return o ? [o] : [];
  });
  if (optimized.length === 0) {
    return (
      <div className="grid aspect-[16/7] place-items-center rounded-2xl bg-ink-100 text-ink-300">
        <ImageOffIcon width={36} height={36} aria-hidden="true" />
      </div>
    );
  }
  return <PhotoGallery images={optimized} alt={alt} />;
}
