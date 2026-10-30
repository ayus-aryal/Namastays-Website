// Quick end-to-end check of the website's data layer against the real backend.
// Usage: npm run check:api   (needs API_BASE_URL in .env.local)
import { getCities, getCity, getPlaces, getSitemapData, getStays, getTrek, getTrekRoute, getTreks } from '../src/lib/api';

async function step<T>(label: string, run: () => Promise<T>, describe: (value: T) => string) {
  const started = Date.now();
  try {
    const value = await run();
    console.log(`OK   ${label}: ${describe(value)} (${Date.now() - started} ms)`);
    return value;
  } catch (error) {
    console.log(`FAIL ${label}: ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

async function main() {
  console.log(`Backend: ${process.env.API_BASE_URL}\n`);

  const cities = await step('cities', getCities, (c) => c.map((x) => `${x.slug} (stays ${x.counts.stays}, food ${x.counts.food}, places ${x.counts.places})`).join('; '));
  const first = cities?.[0];
  if (first) {
    await step(`city ${first.slug}`, () => getCity(first.slug), (c) => (c ? `coords ${c.coords ? `${c.coords.lat.toFixed(3)},${c.coords.lng.toFixed(3)}` : 'none'}, intro paragraphs ${c.intro.length}, areas ${c.areas.length}` : 'not found'));
    await step(`places in ${first.slug}`, () => getPlaces(first.slug), (p) => `${p.length} place(s)`);
  }
  await step('stays', () => getStays(), (s) => `${s.length} published stay(s)`);

  const treks = await step('treks', getTreks, (t) => `${t.length} trek(s): ${t.map((x) => x.slug).join(', ')}`);
  const trek = treks?.[0] ? await step(`trek ${treks[0].slug}`, () => getTrek(treks[0].slug), (t) => (t ? `${t.itinerary.length} itinerary day(s), ${t.highlights.length} highlight(s), gpx ${t.gpxUrl ? 'yes' : 'no'}` : 'not found')) : null;
  if (trek?.gpxUrl) {
    await step('trek route from GPX', () => getTrekRoute(trek.gpxUrl), (r) => (r ? `${r.route.length} points, gain ${r.elevationGainM} m, max ${r.maxElevationM} m` : 'could not read the GPX file'));
  }

  await step('sitemap', getSitemapData, (s) => `${s.cities.length} cities, ${s.stays.length} stays, ${s.places.length} places, ${s.treks.length} treks`);
}

main();
