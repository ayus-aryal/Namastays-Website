import type { MetadataRoute } from 'next';
import { SECTIONS, SITE_URL } from '../lib/site';
import { getCatalog } from '../lib/api/catalog';
import { totalCount } from '../lib/format';
import { placeHref } from '../components/cards';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { cities, stays, places, treks } = await getCatalog();

  const paths = [
    '/',
    '/explore',
    '/about',
    '/contact',
    '/list-your-property',
    ...(treks.length > 0 ? ['/treks'] : []),
    // Pages with nothing on them are marked noindex, so they are left out here too.
    ...cities
      .filter((city) => totalCount(city.counts) > 0)
      .flatMap((city) => [
        `/explore/${city.slug}`,
        ...SECTIONS.filter((section) => city.counts[section] > 0).map((section) => `/explore/${city.slug}/${section}`)
      ]),
    ...stays.map((s) => `/explore/${s.citySlug}/stays/${s.slug}`),
    ...places.map((p) => placeHref(p)),
    ...treks.map((t) => `/treks/${t.slug}`)
  ];
  return paths.map((p) => ({ url: `${SITE_URL}${p}` }));
}
