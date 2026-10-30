// Exact shapes returned by the Spring Boot public API (GET /api/v1/public/**).
// Mirror of backend/dto/PublicDtos.kt: change both together.

export type CountsDto = { stays: number; food: number; places: number };

export type CitySummaryDto = {
  slug: string;
  name: string;
  state: string | null;
  country: string;
  imageUrl: string | null;
  counts: CountsDto;
};

export type CityDetailDto = {
  slug: string;
  name: string;
  state: string | null;
  country: string;
  imageUrl: string | null;
  lat: number | null;
  lng: number | null;
  tagline: string | null;
  intro: string[];
  bestTime: string | null;
  gettingThere: string | null;
  areas: string[];
  counts: CountsDto;
};

export type RecommenderDto = { name: string; displayName: string; logoUrl: string | null };

export type PlaceSummaryDto = {
  slug: string;
  citySlug: string;
  cityName: string | null;
  name: string;
  description: string | null;
  imageUrl: string | null;
  categories: string[];
  recommender: RecommenderDto | null;
  lat: number;
  lng: number;
};

export type PlaceDetailDto = {
  slug: string;
  citySlug: string;
  cityName: string | null;
  name: string;
  description: string | null;
  images: string[];
  categories: string[];
  tags: string[];
  recommender: RecommenderDto | null;
  lat: number;
  lng: number;
};

export type StaySummaryDto = {
  slug: string;
  name: string;
  propertyType: string;
  description: string | null;
  city: string;
  citySlug: string;
  state: string;
  imageUrls: string[];
  startingPrice: number | null;
  amenities: string[];
  lat: number | null;
  lng: number | null;
};

export type RoomDto = {
  category: string;
  maxGuests: number;
  bedType: string;
  totalRooms: number;
  pricePerNight: number;
};

export type PolicyDto = {
  checkInTime: string | null;
  checkOutTime: string | null;
  extraGuestPrice: string | null;
  smokingAllowed: boolean | null;
  childrenAllowed: boolean | null;
  petsAllowed: boolean | null;
  breakfastIncluded: boolean | null;
  cancellationPolicy: string | null;
};

export type StayDetailDto = {
  slug: string;
  name: string;
  propertyType: string;
  description: string | null;
  yearEstablished: string;
  address: string;
  city: string;
  citySlug: string;
  state: string;
  postalCode: string;
  country: string;
  lat: number | null;
  lng: number | null;
  images: string[];
  amenities: string[];
  policy: PolicyDto | null;
  rooms: RoomDto[];
};

export type TrekSummaryDto = {
  slug: string;
  name: string;
  region: string | null;
  difficulty: string | null;
  durationDays: number | null;
  maxElevation: number | null;
  distanceKm: number | null;
  description: string | null;
  thumbnailUrl: string | null;
};

export type TrekDetailDto = TrekSummaryDto & {
  images: string[];
  basePoint: string | null;
  gpxUrl: string | null;
  tilesSizeMb: number | null;
  waypointsCount: number | null;
  itineraryDays: { dayNumber: number; title: string; description: string }[];
  highlights: { label: string; iconName: string }[];
};

export type SitemapDto = {
  cities: string[];
  stays: { citySlug: string; slug: string }[];
  places: { citySlug: string; slug: string }[];
  treks: string[];
};
