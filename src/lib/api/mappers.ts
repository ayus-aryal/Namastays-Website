import type {
  Coords,
  City,
  CitySummary,
  Place,
  PlaceDetail,
  Sitemap,
  Stay,
  StayDetail,
  Trek,
  TrekSummary
} from '../models';
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

/** Null when a coordinate is missing; (0, 0) is how the backend stores "not set". */
export function toCoords(lat: number | null | undefined, lng: number | null | undefined): Coords | null {
  if (lat == null || lng == null || Number.isNaN(lat) || Number.isNaN(lng)) return null;
  if (lat === 0 && lng === 0) return null;
  return { lat, lng };
}

export const toCitySummary = (dto: CitySummaryDto): CitySummary => ({
  slug: dto.slug,
  name: dto.name,
  region: dto.state ?? dto.country,
  country: dto.country,
  image: dto.imageUrl,
  counts: dto.counts
});

export const toCity = (dto: CityDetailDto): City => ({
  ...toCitySummary(dto),
  coords: toCoords(dto.lat, dto.lng),
  tagline: dto.tagline,
  intro: dto.intro,
  areas: dto.areas,
  bestTime: dto.bestTime,
  gettingThere: dto.gettingThere
});

export const toStay = (dto: StaySummaryDto): Stay => ({
  slug: dto.slug,
  citySlug: dto.citySlug,
  city: dto.city,
  state: dto.state,
  name: dto.name,
  type: dto.propertyType,
  description: dto.description,
  images: dto.imageUrls,
  startingPrice: dto.startingPrice,
  amenities: dto.amenities,
  coords: toCoords(dto.lat, dto.lng)
});

export const toStayDetail = (dto: StayDetailDto): StayDetail => ({
  slug: dto.slug,
  citySlug: dto.citySlug,
  city: dto.city,
  state: dto.state,
  name: dto.name,
  type: dto.propertyType,
  description: dto.description,
  images: dto.images,
  startingPrice: dto.rooms.length ? Math.min(...dto.rooms.map((room) => room.pricePerNight)) : null,
  amenities: dto.amenities,
  coords: toCoords(dto.lat, dto.lng),
  yearEstablished: dto.yearEstablished,
  address: dto.address,
  postalCode: dto.postalCode,
  country: dto.country,
  policy: dto.policy,
  rooms: dto.rooms
});

export const toPlace = (dto: PlaceSummaryDto): Place => ({
  slug: dto.slug,
  citySlug: dto.citySlug,
  cityName: dto.cityName,
  name: dto.name,
  description: dto.description,
  image: dto.imageUrl,
  categories: dto.categories,
  recommender: dto.recommender,
  coords: toCoords(dto.lat, dto.lng)
});

export const toPlaceDetail = (dto: PlaceDetailDto): PlaceDetail => ({
  slug: dto.slug,
  citySlug: dto.citySlug,
  cityName: dto.cityName,
  name: dto.name,
  description: dto.description,
  images: dto.images,
  categories: dto.categories,
  tags: dto.tags,
  recommender: dto.recommender,
  coords: toCoords(dto.lat, dto.lng)
});

export const toTrekSummary = (dto: TrekSummaryDto): TrekSummary => ({
  slug: dto.slug,
  name: dto.name,
  region: dto.region,
  difficulty: dto.difficulty,
  durationDays: dto.durationDays,
  maxElevationM: dto.maxElevation,
  distanceKm: dto.distanceKm,
  description: dto.description,
  image: dto.thumbnailUrl
});

export const toTrek = (dto: TrekDetailDto): Trek => ({
  ...toTrekSummary(dto),
  images: dto.images,
  basePoint: dto.basePoint,
  gpxUrl: dto.gpxUrl,
  offlineMapSizeMb: dto.tilesSizeMb,
  waypointsCount: dto.waypointsCount,
  itinerary: dto.itineraryDays,
  highlights: dto.highlights
});

export const toSitemap = (dto: SitemapDto): Sitemap => dto;

/** True for a place listed under the "food" category (cafes, restaurants, bakeries...). */
export const isFood = (place: Pick<Place, 'categories'>) =>
  place.categories.some((category) => category.toLowerCase() === 'food');
