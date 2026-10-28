import React from 'react';

type ElevationProfileProps = {
  /** Elevation samples in metres, evenly spaced along the route. */
  points: number[];
  distanceKm: number;
  className?: string;
};

export function ElevationProfile({ points, distanceKm, className }: ElevationProfileProps) {
  const width = 800;
  const height = 220;
  const padY = 18;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = Math.max(1, max - min);

  const coords = points.map((p, i) => {
    const x = i / (points.length - 1) * width;
    const y = height - padY - (p - min) / span * (height - padY * 2);
    return [x, y] as const;
  });

  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${line} L${width} ${height} L0 ${height} Z`;

  const gridLabels = [max, min + span / 2, min].map((v) => Math.round(v));

  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-forest-50/50 p-4">
        <div className="flex">
          <div className="flex flex-col justify-between pb-6 pr-3 text-right text-[11px] font-medium text-ink-500">
            {gridLabels.map((v) =>
            <span key={v}>{v.toLocaleString()}m</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="h-[180px] w-full"
              role="img"
              aria-label={`Elevation profile: ${min.toLocaleString()}m to ${max.toLocaleString()}m over ${distanceKm} kilometres`}>
              
              {[0, 0.5, 1].map((t) =>
              <line
                key={t}
                x1={0}
                x2={width}
                y1={padY + t * (height - padY * 2)}
                y2={padY + t * (height - padY * 2)}
                stroke="#bad8c4"
                strokeWidth={1}
                strokeDasharray="4 6" />

              )}
              <path d={area} fill="#1a4f35" fillOpacity={0.14} />
              <path d={line} fill="none" stroke="#1a4f35" strokeWidth={3} strokeLinejoin="round" />
              {coords.
              filter((_, i) => points[i] === max).
              map(([x, y], i) =>
              <circle key={i} cx={x} cy={y} r={5.5} fill="#f4661a" stroke="#ffffff" strokeWidth={2.5} />
              )}
            </svg>
            <div className="mt-1 flex justify-between text-[11px] font-medium text-ink-500">
              <span>0 km</span>
              <span>{(distanceKm / 2).toFixed(1)} km</span>
              <span>{distanceKm} km</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-[13px] text-ink-500">
        Elevation profile generated from {(points.length * 84).toLocaleString()} GPS samples recorded by
        Namastays app users on this route.
      </figcaption>
    </figure>);

}