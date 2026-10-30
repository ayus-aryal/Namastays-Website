'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, type ComponentProps } from 'react';
import { cx } from '../utils/format';

export type { MapMarker } from './MapViewInner';

// Leaflet touches `window` on import, so the map only loads in the browser.
const MapViewInner = dynamic(() => import('./MapViewInner'), { ssr: false });

type MapViewProps = ComponentProps<typeof MapViewInner>;

export function MapView(props: MapViewProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Same box as the real map so the layout doesn't jump when it loads.
    return (
      <div
        role="region"
        aria-label={props.ariaLabel}
        className={cx(
          'relative isolate z-0 overflow-hidden rounded-2xl border border-ink-200 bg-ink-100',
          props.className
        )} />
    );
  }
  return <MapViewInner {...props} />;
}
