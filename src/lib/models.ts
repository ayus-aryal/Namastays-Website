// Website domain models, built from the public API (see lib/api/mappers.ts).
// Only fields that exist in the backend are here: no ratings, reviews, host details or opening hours
// until the backend has real data for them.

export type Coords = { lat: number; lng: number };

export type CityCounts = {
  stays: number;
  food: number;
  /** Places in every category except food (parks, weekend trips, short hikes...). */
  places: number;
};

export type CitySummary = {
  slug: string;
  name: string;
  /** Province / state, e.g. "Bagmati". */
  region: string;
  country: string;
  image: string | null;
  counts: CityCounts;
};

export type City = CitySummary & {
  coords: Coords | null;
  tagline: string | null;
  /** Each string renders as one paragraph. */
  intro: string[];
  areas: string[];
  bestTime: string | null;
  gettingThere: string | null;
};

export type Stay = {
  slug: string;
  citySlug: string;
  city: string;
  state: string;
  name: string;
  type: string;
  description: string | null;
  images: string[];
  /** Cheapest room per night (NPR), or null when no rooms are listed yet. */
  startingPrice: number | null;
  amenities: string[];
  coords: Coords | null;
};

export type Room = {
  category: string;
  maxGuests: number;
  bedType: string;
  totalRooms: number;
  pricePerNight: number;
};

export type StayPolicy = {
  checkInTime: string | null;
  checkOutTime: string | null;
  extraGuestPrice: string | null;
  smokingAllowed: boolean | null;
  childrenAllowed: boolean | null;
  petsAllowed: boolean | null;
  breakfastIncluded: boolean | null;
  cancellationPolicy: string | null;
};

export type StayDetail = Stay & {
  yearEstablished: string;
  address: string;
  postalCode: string;
  country: string;
  policy: StayPolicy | null;
  rooms: Room[];
};

export type Recommender = {
  name: string;
  displayName: string;
  logoUrl: string | null;
};

/** Any place: food and cafes (category "food") as well as parks, weekend trips, short hikes... */
export type Place = {
  slug: string;
  citySlug: string;
  cityName: string | null;
  name: string;
  description: string | null;
  image: string | null;
  categories: string[];
  recommender: Recommender | null;
  coords: Coords | null;
};

export type PlaceDetail = Omit<Place, 'image'> & {
  images: string[];
  tags: string[];
};

export type TrekItineraryDay = { dayNumber: number; title: string; description: string };
export type TrekHighlight = { label: string; iconName: string };

export type TrekSummary = {
  /** The trek's id doubles as its URL slug. */
  slug: string;
  name: string;
  region: string | null;
  difficulty: string | null;
  durationDays: number | null;
  maxElevationM: number | null;
  distanceKm: number | null;
  description: string | null;
  image: string | null;
};

export type Trek = TrekSummary & {
  images: string[];
  basePoint: string | null;
  /** Used server-side to draw the route. Never link to it: downloads happen in the app. */
  gpxUrl: string | null;
  offlineMapSizeMb: number | null;
  waypointsCount: number | null;
  itinerary: TrekItineraryDay[];
  highlights: TrekHighlight[];
};

/** Derived from the trek's GPX file. */
export type TrekRoute = {
  route: [number, number][];
  /** 0..1 elevation samples for the profile graphic. */
  profile: number[];
  elevationGainM: number | null;
  minElevationM: number | null;
  maxElevationM: number | null;
};

export type Sitemap = {
  cities: string[];
  stays: { citySlug: string; slug: string }[];
  places: { citySlug: string; slug: string }[];
  treks: string[];
};
