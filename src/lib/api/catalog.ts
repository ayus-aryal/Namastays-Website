import 'server-only';
import { getCities, getPlaces, getStays, getTreks } from './index';
import { totalCount } from '../format';

/** Everything listed on the site, used for the sitemap and for pre-building pages. */
export async function getCatalog() {
  const cities = await getCities();
  const withListings = cities.filter((city) => totalCount(city.counts) > 0);
  const [stays, places, treks] = await Promise.all([
    getStays(),
    Promise.all(withListings.map((city) => getPlaces(city.slug))).then((lists) => lists.flat()),
    getTreks()
  ]);
  return { cities, stays, places, treks };
}
