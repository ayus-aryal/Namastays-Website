export type Coords = {
  lat: number;
  lng: number;
};

export type City = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  /** Indexable, on-page intro copy. Each string renders as its own paragraph. */
  intro: string[];
  image: string;
  coords: Coords;
  counts: {
    stays: number;
    food: number;
    treks: number;
  };
  areas: string[];
  bestTime: string;
  gettingThere: string;
};

export type Stay = {
  slug: string;
  citySlug: string;
  name: string;
  h1Suffix: string;
  type: 'Hotel' | 'Homestay' | 'Guesthouse' | 'Boutique Lodge' | 'Eco Lodge';
  area: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  knownFor: string;
  images: string[];
  amenities: string[];
  description: string[];
  coords: Coords;
  host: {
    name: string;
    since: string;
    licence: string;
  };
  sleeps: number;
  bedrooms: number;
};

export type FoodListing = {
  slug: string;
  citySlug: string;
  name: string;
  h1Suffix: string;
  kind: 'Restaurant' | 'Cafe' | 'Bakery' | 'Street Food';
  area: string;
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3;
  cuisines: string[];
  knownFor: string;
  badges: string[];
  images: string[];
  description: string[];
  coords: Coords;
  hours: string;
  phone: string;
  mustTry: {dish: string;price: string;note: string;}[];
};

export type Difficulty = 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous';

export type Trek = {
  slug: string;
  citySlug: string;
  name: string;
  h1Suffix: string;
  area: string;
  difficulty: Difficulty;
  distanceKm: number;
  durationLabel: string;
  elevationGainM: number;
  maxElevationM: number;
  rating: number;
  reviewCount: number;
  recordedCount: number;
  knownFor: string;
  images: string[];
  description: string[];
  coords: Coords;
  route: [number, number][];
  /** Normalised elevation samples used to draw the profile graphic. */
  profile: number[];
  startPoint: string;
  bestSeason: string;
  permits: string;
};

export type Review = {
  id: string;
  listingSlug: string;
  author: string;
  origin: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  helpful: number;
  tripType?: string;
};

export type ListingCategory = 'stays' | 'food' | 'treks';