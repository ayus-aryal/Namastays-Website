import { Stay } from '../types';
import { IMG } from './images';

export const stays: Stay[] = [
{
  slug: 'kumari-heritage-house',
  citySlug: 'kathmandu-valley',
  name: 'Kumari Heritage House',
  h1Suffix: 'Restored Newari Townhouse in Patan',
  type: 'Boutique Lodge',
  area: 'Patan / Jhamsikhel',
  rating: 4.9,
  reviewCount: 214,
  pricePerNight: 62,
  knownFor: 'Carved courtyard rooms two lanes from Patan Durbar Square',
  images: [IMG.stayBoutique, IMG.stayLakeside, IMG.kathmandu, IMG.foodCafe],
  amenities: [
  'Fast Wi-Fi (40 Mbps)',
  'Rooftop terrace',
  'Free breakfast',
  'Hot water 24hr',
  'Backup power',
  'Airport pickup',
  'Luggage storage',
  'Filtered drinking water'],

  description: [
  'Kumari Heritage House is a 140-year-old Newari family home in Patan that the Shrestha family restored over four years, keeping the original carved window frames, brick facade and inner courtyard while adding modern bathrooms and reliable hot water.',
  'Eight rooms open onto the courtyard or the rooftop, where breakfast is served with a view over the tiled roofs of the old city toward the Kathmandu skyline. Patan Durbar Square, the Patan Museum and the Jhamsikhel restaurant strip are all within a ten-minute walk.',
  'The house is a good fit for travellers who want heritage architecture and a quiet lane rather than the noise of Thamel, and for anyone using Patan as a base for valley-rim day hikes.'],

  coords: { lat: 27.6727, lng: 85.3253 },
  host: { name: 'Anjali Shrestha', since: '2016', licence: 'Nepal Tourism Board #HT-4821' },
  sleeps: 2,
  bedrooms: 1
},
{
  slug: 'nagarkot-ridge-homestay',
  citySlug: 'kathmandu-valley',
  name: 'Nagarkot Ridge Homestay',
  h1Suffix: 'Sunrise Homestay on the Valley Rim',
  type: 'Homestay',
  area: 'Nagarkot',
  rating: 4.7,
  reviewCount: 96,
  pricePerNight: 28,
  knownFor: 'Himalayan sunrise from the terrace, home-cooked dal bhat',
  images: [IMG.stayHomestay, IMG.kathmandu, IMG.trekShivapuri],
  amenities: ['Home-cooked meals', 'Mountain view terrace', 'Wi-Fi', 'Wood stove', 'Trail guide on request'],
  description: [
  'A working farmhouse on the Nagarkot ridge at 2,020m, run by the Tamang family for three generations. Four guest rooms share a long terrace facing north-east — on clear winter mornings you can trace the skyline from Langtang to Everest.',
  'Meals are whatever the farm and the local market produced that day, usually dal bhat with seasonal greens, served at the family table. The homestay is a short walk from the start of the Nagarkot–Changunarayan trail.'],

  coords: { lat: 27.7154, lng: 85.5203 },
  host: { name: 'Bikash Tamang', since: '2019', licence: 'Homestay Registration #NG-217' },
  sleeps: 4,
  bedrooms: 2
},
{
  slug: 'thamel-courtyard-inn',
  citySlug: 'kathmandu-valley',
  name: 'Thamel Courtyard Inn',
  h1Suffix: 'Quiet Garden Hotel in Central Thamel',
  type: 'Hotel',
  area: 'Thamel',
  rating: 4.5,
  reviewCount: 431,
  pricePerNight: 41,
  knownFor: 'Walled garden that blocks the Thamel noise',
  images: [IMG.stayLakeside, IMG.stayBoutique, IMG.foodCafe],
  amenities: ['Garden cafe', 'Wi-Fi', 'Airport pickup', 'Trekking gear storage', 'Laundry', 'Backup power'],
  description: [
  'Set behind a brick wall off Chaksibari Marg, Thamel Courtyard Inn trades street-front convenience for a garden that genuinely quietens the neighbourhood. Twenty-two rooms, all with hot water and blackout curtains.',
  'The staff store trekking bags free while guests are on the trail, and the front desk holds permits paperwork for the Annapurna and Langtang regions.'],

  coords: { lat: 27.7154, lng: 85.3123 },
  host: { name: 'Ram Gurung', since: '2011', licence: 'Nepal Tourism Board #HT-1190' },
  sleeps: 3,
  bedrooms: 1
},
{
  slug: 'phewa-lakeside-guesthouse',
  citySlug: 'pokhara',
  name: 'Phewa Lakeside Guesthouse',
  h1Suffix: 'Lake-View Rooms in Pokhara Lakeside',
  type: 'Guesthouse',
  area: 'Lakeside',
  rating: 4.8,
  reviewCount: 302,
  pricePerNight: 38,
  knownFor: 'Balcony rooms facing Phewa Lake and Machhapuchhre',
  images: [IMG.stayLakeside, IMG.pokhara, IMG.foodCafe],
  amenities: ['Lake-view balcony', 'Free breakfast', 'Wi-Fi', 'Bicycle hire', 'Kayak booking', 'Rooftop yoga deck'],
  description: [
  'A twelve-room guesthouse on the quieter northern stretch of Lakeside, one lane back from the water with unobstructed views across Phewa Lake to the Annapurna wall. Six rooms have private balconies facing the mountains.',
  'Breakfast runs from 6am for paragliding and sunrise departures, and the family arranges boats, kayaks and Sarangkot transfers directly with local operators rather than through agencies.'],

  coords: { lat: 28.2153, lng: 83.9578 },
  host: { name: 'Sunita Adhikari', since: '2014', licence: 'Nepal Tourism Board #HT-3302' },
  sleeps: 2,
  bedrooms: 1
},
{
  slug: 'sarangkot-cloud-lodge',
  citySlug: 'pokhara',
  name: 'Sarangkot Cloud Lodge',
  h1Suffix: 'Above-the-Clouds Ridge Lodge near Pokhara',
  type: 'Eco Lodge',
  area: 'Sarangkot',
  rating: 4.9,
  reviewCount: 148,
  pricePerNight: 74,
  knownFor: 'Waking above the valley cloud layer at 1,590m',
  images: [IMG.trekPoonHill, IMG.stayHomestay, IMG.pokhara],
  amenities: ['Solar hot water', 'Sunrise deck', 'Wi-Fi', 'Organic garden meals', 'Paragliding pickup', 'Wood stove'],
  description: [
  'Built on the Sarangkot ridge with reclaimed stone and local timber, this eight-room lodge sits directly above the paragliding launch. Most mornings the valley fills with cloud below the terrace while the Annapurnas stay clear above it.',
  'Water is solar-heated, vegetables come from the garden behind the kitchen, and the lodge employs its staff from Sarangkot village. It is the natural first or last night for anyone walking the Sarangkot–Naudanda ridge.'],

  coords: { lat: 28.2447, lng: 83.9497 },
  host: { name: 'Deepak Poudel', since: '2018', licence: 'Nepal Tourism Board #HT-5561' },
  sleeps: 3,
  bedrooms: 1
},
{
  slug: 'tharu-village-eco-lodge',
  citySlug: 'chitwan',
  name: 'Tharu Village Eco Lodge',
  h1Suffix: 'Community Eco Lodge at Chitwan National Park',
  type: 'Eco Lodge',
  area: 'Sauraha',
  rating: 4.7,
  reviewCount: 187,
  pricePerNight: 55,
  knownFor: 'Village-owned lodge with resident naturalist guides',
  images: [IMG.chitwan, IMG.stayHomestay, IMG.foodThali],
  amenities: ['Guided jungle walks', 'Canoe trips', 'Mosquito nets', 'Wi-Fi in lounge', 'Tharu dinner', 'Bicycle hire'],
  description: [
  'Ten mud-and-thatch cottages built in Tharu style on the edge of the buffer zone, five minutes’ walk from the Rapti River crossing into Chitwan National Park. The lodge is owned by a village cooperative and every guide is licensed and local.',
  'Dawn canoe trips, jeep safaris and elephant-breeding-centre visits are arranged in-house. Evenings usually end with a Tharu stick dance in the courtyard and dal bhat cooked over wood.'],

  coords: { lat: 27.5798, lng: 84.4933 },
  host: { name: 'Sauraha Community Trust', since: '2013', licence: 'Nepal Tourism Board #HT-2244' },
  sleeps: 4,
  bedrooms: 2
},
{
  slug: 'namche-sherpa-lodge',
  citySlug: 'everest-region',
  name: 'Namche Sherpa Lodge',
  h1Suffix: 'Family Teahouse Lodge in Namche Bazaar',
  type: 'Guesthouse',
  area: 'Namche Bazaar',
  rating: 4.8,
  reviewCount: 264,
  pricePerNight: 45,
  knownFor: 'Acclimatisation base with hot showers and real coffee',
  images: [IMG.everest, IMG.trekAbc, IMG.stayHomestay],
  amenities: ['Hot shower', 'Heated dining hall', 'Wi-Fi (Everest Link)', 'Device charging', 'Oxygen on site', 'Laundry'],
  description: [
  'Three generations of the Sherpa family have run this lodge on the upper terraces of Namche Bazaar at 3,440m. Rooms are simple twins with thick blankets; the draw is the heated dining hall, the hot showers and the view down the Dudh Koshi valley.',
  'Namche is where almost every Everest Base Camp itinerary takes its first acclimatisation day — the lodge organises the Khumjung and Everest View day walks and holds a supplemental oxygen cylinder on site.'],

  coords: { lat: 27.8044, lng: 86.7141 },
  host: { name: 'Pasang Sherpa', since: '2009', licence: 'Nepal Tourism Board #HT-0912' },
  sleeps: 2,
  bedrooms: 1
},
{
  slug: 'sacred-garden-guesthouse',
  citySlug: 'lumbini',
  name: 'Sacred Garden Guesthouse',
  h1Suffix: 'Quiet Guesthouse beside the Lumbini Monastic Zone',
  type: 'Guesthouse',
  area: 'Sacred Garden',
  rating: 4.6,
  reviewCount: 78,
  pricePerNight: 24,
  knownFor: 'Five minutes on foot from the Maya Devi Temple',
  images: [IMG.lumbini, IMG.stayHomestay, IMG.foodThali],
  amenities: ['Bicycle hire', 'Vegetarian kitchen', 'Wi-Fi', 'Meditation garden', 'Air conditioning'],
  description: [
  'A plain, spotless fourteen-room guesthouse on the eastern edge of the monastic zone, close enough to walk to the Maya Devi Temple before the gates open. The garden has a shaded meditation platform used by visiting monks.',
  'The kitchen is fully vegetarian and free bicycles make the flat monastic zone easy to cover in a morning.'],

  coords: { lat: 27.4842, lng: 83.2758 },
  host: { name: 'Kamala Chaudhary', since: '2017', licence: 'Nepal Tourism Board #HT-6108' },
  sleeps: 2,
  bedrooms: 1
},
{
  slug: 'bandipur-bazaar-heritage',
  citySlug: 'bandipur',
  name: 'Bandipur Bazaar Heritage',
  h1Suffix: 'Timber Heritage Rooms on the Car-Free Bazaar',
  type: 'Boutique Lodge',
  area: 'Main Bazaar',
  rating: 4.8,
  reviewCount: 112,
  pricePerNight: 58,
  knownFor: 'Front rooms opening onto the pedestrian bazaar',
  images: [IMG.stayHomestay, IMG.stayBoutique, IMG.trekShivapuri],
  amenities: ['Heritage rooms', 'Rooftop breakfast', 'Wi-Fi', 'Porter to the bazaar', 'Wood stove lounge'],
  description: [
  'A restored Newari trading house on Bandipur’s pedestrianised bazaar, with six rooms behind original carved shutters. Because no vehicles enter the bazaar, mornings here are unusually quiet for Nepal.',
  'Breakfast is on the roof facing Manaslu, and the staff walk guests’ bags up from the road-head car park.'],

  coords: { lat: 27.9351, lng: 84.4131 },
  host: { name: 'Nirajan Pradhan', since: '2015', licence: 'Nepal Tourism Board #HT-4477' },
  sleeps: 3,
  bedrooms: 1
},
{
  slug: 'marpha-orchard-lodge',
  citySlug: 'mustang',
  name: 'Marpha Orchard Lodge',
  h1Suffix: 'Apple Orchard Lodge in Marpha, Mustang',
  type: 'Homestay',
  area: 'Marpha',
  rating: 4.9,
  reviewCount: 88,
  pricePerNight: 33,
  knownFor: 'Apple orchard courtyard and homemade brandy',
  images: [IMG.trekAbc, IMG.stayHomestay, IMG.foodThali],
  amenities: ['Orchard courtyard', 'Home-cooked meals', 'Wi-Fi', 'Solar hot water', 'Bike storage'],
  description: [
  'Marpha is the whitewashed apple village of the Kali Gandaki valley, and this lodge sits inside a working orchard just off the flagstone main street. Five rooms, thick stone walls, and a courtyard that catches the morning sun before the wind arrives.',
  'The family presses its own apple juice and distils the brandy Marpha is known for. Muktinath, Kagbeni and the Jomsom airstrip are all short drives north.'],

  coords: { lat: 28.7529, lng: 83.6889 },
  host: { name: 'Tashi Gurung', since: '2012', licence: 'Homestay Registration #MU-118' },
  sleeps: 3,
  bedrooms: 1
}];


export const getStay = (slug?: string) => stays.find((s) => s.slug === slug);
export const staysInCity = (citySlug: string) => stays.filter((s) => s.citySlug === citySlug);