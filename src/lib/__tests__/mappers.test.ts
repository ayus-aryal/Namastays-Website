import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isFood, toCitySummary, toCoords, toPlace, toStayDetail, toTrek } from '../api/mappers';
import { formatDuration, formatPrice, humanizeCategory, toParagraphs } from '../format';

test('maps a city exactly as the real API returns it', () => {
  // Response copied from the live /public/cities endpoint.
  const butwal = toCitySummary({
    slug: 'butwal',
    name: 'Butwal',
    state: 'Lumbini',
    country: 'Nepal',
    imageUrl: 'https://res.cloudinary.com/du8h4deld/image/upload/v1789107320/butwal_r8qhi5.jpg',
    counts: { stays: 0, food: 1, places: 1 }
  });
  assert.equal(butwal.region, 'Lumbini');
  assert.deepEqual(butwal.counts, { stays: 0, food: 1, places: 1 });
  assert.equal(toCitySummary({ ...butwal, state: null, imageUrl: null, counts: butwal.counts } as never).region, 'Nepal');
});

test('treats missing and (0, 0) coordinates as unknown', () => {
  assert.equal(toCoords(null, 85), null);
  assert.equal(toCoords(0, 0), null);
  assert.deepEqual(toCoords(27.7, 85.3), { lat: 27.7, lng: 85.3 });
});

test('place mapping keeps categories and drops bogus coordinates', () => {
  const place = toPlace({
    slug: 'x', citySlug: 'butwal', cityName: 'Butwal', name: 'X', description: null, imageUrl: null,
    categories: ['Food'], recommender: null, lat: 0, lng: 0
  });
  assert.equal(place.coords, null);
  assert.equal(isFood(place), true);
  assert.equal(isFood({ categories: ['parks'] }), false);
});

test('stay detail derives the starting price from its rooms', () => {
  const stay = toStayDetail({
    slug: 's', name: 'S', propertyType: 'Homestay', description: null, yearEstablished: '2010', address: 'A',
    city: 'Kathmandu', citySlug: 'kathmandu', state: 'Bagmati', postalCode: '44600', country: 'Nepal',
    lat: 27.7, lng: 85.3, images: [], amenities: [], policy: null,
    rooms: [
      { category: 'Deluxe', maxGuests: 2, bedType: 'Queen', totalRooms: 2, pricePerNight: 3500 },
      { category: 'Standard', maxGuests: 2, bedType: 'Twin', totalRooms: 3, pricePerNight: 2200 }
    ]
  });
  assert.equal(stay.startingPrice, 2200);
  assert.equal(toStayDetail({ ...stay, rooms: [], type: 'x' } as never).startingPrice, null);
});

test('trek mapping renames fields the pages use', () => {
  const trek = toTrek({
    slug: 'abc', name: 'ABC', region: 'Annapurna', difficulty: 'Moderate', durationDays: 7, maxElevation: 4130,
    distanceKm: 62.5, description: 'd', thumbnailUrl: 't.jpg', images: ['a.jpg'], basePoint: 'Nayapul',
    gpxUrl: 'g.gpx', tilesSizeMb: 48.2, waypointsCount: 12,
    itineraryDays: [{ dayNumber: 1, title: 'Start', description: 'Go' }], highlights: [{ label: 'View', iconName: 'eye' }]
  });
  assert.equal(trek.maxElevationM, 4130);
  assert.equal(trek.image, 't.jpg');
  assert.equal(trek.offlineMapSizeMb, 48.2);
  assert.equal(trek.itinerary[0].title, 'Start');
});

test('formatting helpers', () => {
  assert.match(formatPrice(2200), /2,200/);
  assert.match(formatPrice(2200), /NPR|Rs/);
  assert.equal(formatDuration(1), '1 day');
  assert.equal(formatDuration(7), '7 days');
  assert.equal(formatDuration(null), null);
  assert.deepEqual(toParagraphs('One.\n\nTwo.\n \nThree.'), ['One.', 'Two.', 'Three.']);
  assert.deepEqual(toParagraphs(null), []);
  assert.equal(humanizeCategory('short_hikes'), 'Short hikes');
});
