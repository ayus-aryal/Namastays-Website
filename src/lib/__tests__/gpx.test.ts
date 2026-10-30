import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseGpx } from '../gpx';

const gpx = (points: string) =>
  `<?xml version="1.0"?><gpx version="1.1"><trk><trkseg>${points}</trkseg></trk></gpx>`;

test('reads route, elevation stats and a normalised profile', () => {
  // 20 points climbing steadily from 1000 m to 1190 m
  const points = Array.from({ length: 20 }, (_, i) =>
    `<trkpt lat="${28 + i * 0.001}" lon="${84 + i * 0.001}"><ele>${1000 + i * 10}</ele></trkpt>`
  ).join('');
  const result = parseGpx(gpx(points));
  assert.ok(result);
  assert.equal(result.route.length, 20);
  assert.deepEqual(result.route[0], [28, 84]);
  assert.equal(result.minElevationM, 1000);
  assert.equal(result.maxElevationM, 1190);
  assert.ok(result.elevationGainM! >= 170 && result.elevationGainM! <= 190, `gain was ${result.elevationGainM}`);
  assert.equal(result.profile[0], 0);
  assert.equal(result.profile.at(-1), 1);
});

test('ignores small GPS wobble when counting climb', () => {
  const eles = [1000, 1001, 999, 1002, 1000, 1001, 999, 1000, 1002, 1000];
  const points = eles.map((e, i) => `<trkpt lat="28.${i}" lon="84.${i}"><ele>${e}</ele></trkpt>`).join('');
  assert.equal(parseGpx(gpx(points))!.elevationGainM, 0);
});

test('accepts lon before lat, single quotes and points without elevation', () => {
  const points = `<trkpt lon='84.1' lat='28.1'/><trkpt lon="84.2" lat="28.2"></trkpt>`;
  const result = parseGpx(gpx(points));
  assert.ok(result);
  assert.deepEqual(result.route, [[28.1, 84.1], [28.2, 84.2]]);
  assert.deepEqual(result.profile, []);
  assert.equal(result.elevationGainM, null);
});

test('thins long tracks down to the point limit, keeping first and last', () => {
  const points = Array.from({ length: 5000 }, (_, i) => `<trkpt lat="${27 + i * 0.0001}" lon="85"><ele>${i}</ele></trkpt>`).join('');
  const result = parseGpx(gpx(points), { maxRoutePoints: 100, profileSamples: 20 });
  assert.equal(result!.route.length, 100);
  assert.equal(result!.profile.length, 20);
  assert.equal(result!.route[0][0], 27);
  assert.equal(result!.route.at(-1)![0], Number((27 + 4999 * 0.0001).toFixed(5)));
});

test('returns null when there is nothing usable', () => {
  assert.equal(parseGpx('<gpx></gpx>'), null);
  assert.equal(parseGpx(gpx('<trkpt lat="28" lon="84"></trkpt>')), null);
  assert.equal(parseGpx('not xml at all'), null);
});
