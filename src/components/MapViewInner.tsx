import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip } from 'react-leaflet';
import { cx } from '../utils/format';

export type MapMarker = {
  id: string;
  lat: number;
  lng: number;
  label: string;
  meta?: string;
  active?: boolean;
};

type MapViewProps = {
  center: {lat: number;lng: number;};
  zoom?: number;
  markers?: MapMarker[];
  /** Draw a trail / GPX route on the map. */
  route?: [number, number][];
  className?: string;
  interactive?: boolean;
  ariaLabel: string;
};

export default function MapViewInner({
  center,
  zoom = 13,
  markers = [],
  route,
  className,
  interactive = true,
  ariaLabel
}: MapViewProps) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={cx(
        'relative isolate z-0 overflow-hidden rounded-2xl border border-ink-200 bg-ink-100',
        className
      )}>
      
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        dragging={interactive}
        doubleClickZoom={interactive}
        zoomControl={interactive}
        attributionControl
        style={{ height: '100%', width: '100%' }}>
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>' />
        

        {route && route.length > 1 &&
        <>
            <Polyline positions={route} pathOptions={{ color: '#ffffff', weight: 7, opacity: 0.9 }} />
            <Polyline positions={route} pathOptions={{ color: '#f4661a', weight: 3.5, opacity: 1 }} />
            <CircleMarker
            center={route[0]}
            radius={7}
            pathOptions={{ color: '#ffffff', weight: 2, fillColor: '#1a4f35', fillOpacity: 1 }}>
            
              <Tooltip direction="top">Trailhead</Tooltip>
            </CircleMarker>
            <CircleMarker
            center={route[route.length - 1]}
            radius={7}
            pathOptions={{ color: '#ffffff', weight: 2, fillColor: '#f4661a', fillOpacity: 1 }}>
            
              <Tooltip direction="top">Finish</Tooltip>
            </CircleMarker>
          </>
        }

        {markers.map((m) =>
        <CircleMarker
          key={m.id}
          center={[m.lat, m.lng]}
          radius={m.active ? 11 : 8}
          pathOptions={{
            color: '#ffffff',
            weight: 2.5,
            fillColor: m.active ? '#f4661a' : '#1a4f35',
            fillOpacity: 1
          }}>
          
            <Tooltip direction="top" offset={[0, -6]}>
              <span className="font-semibold">{m.label}</span>
              {m.meta && <span className="block text-[11px] opacity-70">{m.meta}</span>}
            </Tooltip>
          </CircleMarker>
        )}
      </MapContainer>
    </div>);

}