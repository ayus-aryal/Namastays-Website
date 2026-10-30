import 'server-only';
import { apiGet, apiGetOrNull } from './client';
import { toCity, toCitySummary, toPlace, toPlaceDetail, toSitemap, toStay, toStayDetail, toTrek, toTrekSummary } from './mappers';
import type {
  CityDetailDto,
  CitySummaryDto,
  PlaceDetailDto,
  PlaceSummaryDto,
  SitemapDto,
  StayDetailDto,
  StaySummaryDto,
  TrekDetailDto,
  TrekSummaryDto
} from './dto';
import type { City, CitySummary, Place, PlaceDetail, Sitemap, Stay, StayDetail, Trek, TrekRoute, TrekSummary } from '../models';
import { parseGpx } from '../gpx';

// Everything the website reads from the backend goes through these functions.
// Lists throw on failure; single items return null when the backend says 404.

const enc = encodeURIComponent;

export async function getCities(): Promise<CitySummary[]> {
  return (await apiGet<CitySummaryDto[]>('/cities')).map(toCitySummary);
}

export async function getCity(slug: string): Promise<City | null> {
  const dto = await apiGetOrNull<CityDetailDto>(`/cities/${enc(slug)}`);
  return dto && toCity(dto);
}

export async function getStays(citySlug?: string): Promise<Stay[]> {
  const query = citySlug ? `?city=${enc(citySlug)}` : '';
  return (await apiGet<StaySummaryDto[]>(`/stays${query}`)).map(toStay);
}

export async function getStay(slug: string): Promise<StayDetail | null> {
  const dto = await apiGetOrNull<StayDetailDto>(`/stays/${enc(slug)}`);
  return dto && toStayDetail(dto);
}

export async function getPlaces(citySlug: string, category?: string): Promise<Place[]> {
  const query = `?city=${enc(citySlug)}${category ? `&category=${enc(category)}` : ''}`;
  return (await apiGet<PlaceSummaryDto[]>(`/places${query}`)).map(toPlace);
}

export async function getPlace(citySlug: string, slug: string): Promise<PlaceDetail | null> {
  const dto = await apiGetOrNull<PlaceDetailDto>(`/places/${enc(citySlug)}/${enc(slug)}`);
  return dto && toPlaceDetail(dto);
}

export async function getTreks(): Promise<TrekSummary[]> {
  return (await apiGet<TrekSummaryDto[]>('/treks')).map(toTrekSummary);
}

export async function getTrek(slug: string): Promise<Trek | null> {
  const dto = await apiGetOrNull<TrekDetailDto>(`/treks/${enc(slug)}`);
  return dto && toTrek(dto);
}

export async function getSitemapData(): Promise<Sitemap> {
  return toSitemap(await apiGet<SitemapDto>('/sitemap'));
}

/**
 * Downloads the trek's GPX and reduces it to a route line + elevation profile.
 * Returns null (and the page simply shows no map) if the file is missing or unreadable.
 */
export async function getTrekRoute(gpxUrl: string | null): Promise<TrekRoute | null> {
  if (!gpxUrl) return null;
  try {
    const response = await fetch(gpxUrl, {
      signal: AbortSignal.timeout(20_000),
      next: { revalidate: 86_400, tags: ['trek-route'] }
    });
    if (!response.ok) return null;
    return parseGpx(await response.text());
  } catch {
    return null;
  }
}
