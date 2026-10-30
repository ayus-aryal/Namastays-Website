/**
 * Cloudinary serves resized, modern-format copies of an image if you add transformations to the URL.
 * Stored URL:  https://res.cloudinary.com/<cloud>/image/upload/v123/name.jpg
 * Optimised:   https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,w_800/v123/name.jpg
 * Anything that isn't a plain Cloudinary upload URL is returned unchanged.
 */
export function optimizeImage(url: string | null | undefined, width = 800): string | null {
  if (!url) return null;
  const marker = '/image/upload/';
  const at = url.indexOf(marker);
  if (!url.startsWith('https://res.cloudinary.com/') || at === -1) return url;

  const rest = url.slice(at + marker.length);
  // A version segment (v123...) comes first when no transformation has been applied yet.
  if (!/^v\d+\//.test(rest)) return url;

  return `${url.slice(0, at + marker.length)}f_auto,q_auto,w_${Math.round(width)}/${rest}`;
}
