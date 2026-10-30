import type { Coords } from './models';

/** Middle of a set of points, for centring a map. */
export function centerOf(points: Coords[]): Coords | null {
  if (points.length === 0) return null;
  const sum = points.reduce((acc, p) => ({ lat: acc.lat + p.lat, lng: acc.lng + p.lng }), { lat: 0, lng: 0 });
  return { lat: sum.lat / points.length, lng: sum.lng / points.length };
}
