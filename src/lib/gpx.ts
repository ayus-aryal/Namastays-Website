import type { TrekRoute } from './models';

type Point = { lat: number; lng: number; ele: number | null };

const attr = (tag: string, name: string) => {
  const match = new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`).exec(tag);
  return match ? Number(match[1]) : NaN;
};

function readPoints(xml: string): Point[] {
  const points: Point[] = [];
  const pattern = /<(trkpt|rtept)\b([^>]*?)(?:\/>|>([\s\S]*?)<\/\1>)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(xml))) {
    const lat = attr(match[2], 'lat');
    const lng = attr(match[2], 'lon');
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    const eleMatch = match[3] ? /<ele>\s*([^<\s]+)\s*<\/ele>/.exec(match[3]) : null;
    const ele = eleMatch ? Number(eleMatch[1]) : NaN;
    points.push({ lat, lng, ele: Number.isFinite(ele) ? ele : null });
  }
  return points;
}

/** Total climb in metres. Smooths GPS noise and ignores wobbles smaller than `threshold`. */
function elevationGain(elevations: number[], threshold = 3): number {
  if (elevations.length < 2) return 0;
  const window = 5;
  const smooth = elevations.map((_, i) => {
    const from = Math.max(0, i - Math.floor(window / 2));
    const to = Math.min(elevations.length, i + Math.ceil(window / 2));
    const slice = elevations.slice(from, to);
    return slice.reduce((sum, value) => sum + value, 0) / slice.length;
  });
  let gain = 0;
  let reference = smooth[0];
  for (const value of smooth) {
    if (value - reference >= threshold) {
      gain += value - reference;
      reference = value;
    } else if (reference - value >= threshold) {
      reference = value;
    }
  }
  return Math.round(gain);
}

function evenlySpaced<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(items[Math.round((i * (items.length - 1)) / (count - 1))]);
  }
  return result;
}

/**
 * Turns a GPX file into what the trek page needs: a light route line, a normalised
 * elevation profile and elevation stats. Returns null when the file has no usable points.
 */
export function parseGpx(
  xml: string,
  options: { maxRoutePoints?: number; profileSamples?: number } = {}
): TrekRoute | null {
  const { maxRoutePoints = 400, profileSamples = 48 } = options;
  const points = readPoints(xml);
  if (points.length < 2) return null;

  const route = evenlySpaced(points, maxRoutePoints).map(
    (p): [number, number] => [Number(p.lat.toFixed(5)), Number(p.lng.toFixed(5))]
  );

  const elevations = points.map((p) => p.ele).filter((e): e is number => e !== null);
  if (elevations.length < 2) {
    return { route, profile: [], elevationGainM: null, minElevationM: null, maxElevationM: null };
  }

  const min = Math.min(...elevations);
  const max = Math.max(...elevations);
  const range = max - min;
  const profile = evenlySpaced(elevations, profileSamples).map((e) =>
    range === 0 ? 0.5 : Number(((e - min) / range).toFixed(3))
  );

  return {
    route,
    profile,
    elevationGainM: elevationGain(elevations),
    minElevationM: Math.round(min),
    maxElevationM: Math.round(max)
  };
}
