import { FoodListing } from '../types';
import { IMG } from './images';

export const foodListings: FoodListing[] = [
{
  slug: 'asan-momo-ghar',
  citySlug: 'kathmandu-valley',
  name: 'Asan Momo Ghar',
  h1Suffix: 'Best Momo in Kathmandu Valley',
  kind: 'Restaurant',
  area: 'Asan / Old City',
  rating: 4.9,
  reviewCount: 1284,
  priceLevel: 1,
  cuisines: ['Newari', 'Nepali', 'Momo'],
  knownFor: 'Buff jhol momo in a 40-year-old family kitchen',
  badges: ['Best Momo', 'Local Favourite', 'Cash only', 'Open since 1984'],
  images: [IMG.foodMomo, IMG.foodThali, IMG.kathmandu, IMG.foodCafe],
  description: [
  'Asan Momo Ghar has been steaming buff momo in the same tiled room off Asan Tole since 1984, and it is the answer most Kathmandu residents give when asked where to eat momo. The kitchen makes three things — steamed, fried and jhol (soup) momo — and does nothing else.',
  'The jhol momo is the reason to come: ten dumplings dropped into a thin, aggressively spiced sesame and tomato broth, served in a steel bowl you drink from at the end. Portions are ten pieces for NPR 180, and the turnover is fast enough that a queue at 1pm usually clears in fifteen minutes.',
  'It is a small, loud, strip-lit room with shared tables, no menu in English and no card machine. Come between 11am and 2pm or after 5pm; the kitchen closes when the day’s filling runs out, often before 8pm.'],

  coords: { lat: 27.7079, lng: 85.3117 },
  hours: '10:30–20:00, closed Tuesdays',
  phone: '+977 1 425 1188',
  mustTry: [
  { dish: 'Buff jhol momo (10 pc)', price: 'NPR 180', note: 'Order this first — it sells out earliest' },
  { dish: 'Steamed buff momo (10 pc)', price: 'NPR 150', note: 'With sesame-tomato achar on the side' },
  { dish: 'Kothey fried momo (10 pc)', price: 'NPR 170', note: 'Crisped on one side only' }]

},
{
  slug: 'jhamsikhel-roasters',
  citySlug: 'kathmandu-valley',
  name: 'Jhamsikhel Roasters',
  h1Suffix: 'Specialty Coffee Roastery in Patan',
  kind: 'Cafe',
  area: 'Patan / Jhamsikhel',
  rating: 4.8,
  reviewCount: 642,
  priceLevel: 2,
  cuisines: ['Coffee', 'Bakery', 'Breakfast'],
  knownFor: 'Single-origin Nepali coffee roasted on site',
  badges: ['Best Coffee', 'Laptop Friendly', 'Vegan options'],
  images: [IMG.foodCafe, IMG.foodThali, IMG.foodMomo],
  description: [
  'Jhamsikhel Roasters buys green beans direct from smallholder farms in Gulmi, Kavre and Lalitpur and roasts them in the back of the cafe twice a week. The bar pulls espresso, V60 and cold brew, and the filter menu rotates by harvest.',
  'The room is brick, timber and plants over two floors, with reliable power backup and enough sockets that it functions as an informal co-working space until mid-afternoon.',
  'Breakfast runs all day: sourdough from their own oven, eggs, and a very good buckwheat pancake. Bags of whole bean are sold at the counter.'],

  coords: { lat: 27.6768, lng: 85.3103 },
  hours: '07:00–20:00 daily',
  phone: '+977 1 552 0714',
  mustTry: [
  { dish: 'Gulmi single-origin V60', price: 'NPR 320', note: 'Ask what is on filter this week' },
  { dish: 'Sourdough & eggs', price: 'NPR 480', note: 'Bread baked in-house each morning' },
  { dish: 'Cold brew', price: 'NPR 300', note: '18-hour steep, served black' }]

},
{
  slug: 'bhaktapur-juju-dhau-house',
  citySlug: 'kathmandu-valley',
  name: 'Bhaktapur Juju Dhau House',
  h1Suffix: 'Traditional King Curd in Bhaktapur',
  kind: 'Street Food',
  area: 'Bhaktapur',
  rating: 4.7,
  reviewCount: 519,
  priceLevel: 1,
  cuisines: ['Newari', 'Dessert'],
  knownFor: 'Juju dhau set in clay pots, made daily',
  badges: ['Heritage Recipe', 'Cash only', 'Under NPR 200'],
  images: [IMG.foodThali, IMG.kathmandu, IMG.foodMomo],
  description: [
  'Juju dhau — "king curd" — is Bhaktapur’s signature: buffalo-milk yoghurt set in unglazed clay pots that draw out moisture and leave it dense enough to hold a spoon upright. This shop off Taumadhi Square has made it for four generations.',
  'Pots are set overnight and sold from the morning until they run out. Eat it plain and cold, standing at the counter; ask before taking the pot away.'],

  coords: { lat: 27.6717, lng: 85.4278 },
  hours: '08:00–18:00 daily',
  phone: '+977 1 661 0432',
  mustTry: [
  { dish: 'Juju dhau (small clay pot)', price: 'NPR 80', note: 'Best before noon' },
  { dish: 'Juju dhau (large pot)', price: 'NPR 150', note: 'Enough for two' }]

},
{
  slug: 'lakeside-thakali-kitchen',
  citySlug: 'pokhara',
  name: 'Lakeside Thakali Kitchen',
  h1Suffix: 'Best Thakali Thali in Pokhara',
  kind: 'Restaurant',
  area: 'Lakeside',
  rating: 4.8,
  reviewCount: 873,
  priceLevel: 2,
  cuisines: ['Thakali', 'Nepali'],
  knownFor: 'Thakali set with unlimited refills and buckwheat roti',
  badges: ['Best Dal Bhat', 'Family Run', 'Vegetarian options'],
  images: [IMG.foodThali, IMG.pokhara, IMG.foodMomo],
  description: [
  'Thakali cooking comes from the Kali Gandaki valley in Mustang, and this Lakeside kitchen — run by a family from Marpha — serves the most complete version in Pokhara. The set arrives as nine bowls: rice, black lentil, seasonal greens, dried radish pickle, mutton or chicken curry, tomato achar, timur-spiked broth, yoghurt and buckwheat roti.',
  'Rice, dal and vegetables are refilled without asking. Come hungry and skip lunch beforehand.',
  'Tables on the upper floor look over the lane toward the lake; the ground floor is quicker if you are heading out on a trek at dawn.'],

  coords: { lat: 28.2098, lng: 83.9585 },
  hours: '11:00–22:00 daily',
  phone: '+977 61 462 118',
  mustTry: [
  { dish: 'Thakali mutton set', price: 'NPR 720', note: 'The full nine-bowl thali' },
  { dish: 'Thakali vegetarian set', price: 'NPR 520', note: 'Refills included' },
  { dish: 'Buckwheat roti', price: 'NPR 120', note: 'Order extra with local ghee' }]

},
{
  slug: 'phewa-sunrise-bakery',
  citySlug: 'pokhara',
  name: 'Phewa Sunrise Bakery',
  h1Suffix: 'Lakeside Bakery and Breakfast in Pokhara',
  kind: 'Bakery',
  area: 'Lakeside',
  rating: 4.6,
  reviewCount: 411,
  priceLevel: 1,
  cuisines: ['Bakery', 'Coffee', 'Breakfast'],
  knownFor: 'Cinnamon rolls out of the oven at 6am',
  badges: ['Early Opening', 'Trek Packed Lunch', 'Vegan options'],
  images: [IMG.foodCafe, IMG.stayLakeside, IMG.foodThali],
  description: [
  'The first door open on Lakeside most mornings, baking for the paragliding and Sarangkot crowd from 6am. Cinnamon rolls, apple pie from Mustang apples, brown bread and a decent flat white.',
  'They pack trail lunches to order if you tell them the night before — useful for anyone starting a trek from Pokhara.'],

  coords: { lat: 28.2141, lng: 83.9591 },
  hours: '06:00–19:00 daily',
  phone: '+977 61 463 902',
  mustTry: [
  { dish: 'Cinnamon roll', price: 'NPR 180', note: 'Out of the oven at 6am and 3pm' },
  { dish: 'Mustang apple pie', price: 'NPR 260', note: 'Seasonal, October to March' },
  { dish: 'Trail lunch box', price: 'NPR 450', note: 'Order the evening before' }]

},
{
  slug: 'rapti-river-tharu-bhojanalaya',
  citySlug: 'chitwan',
  name: 'Rapti River Tharu Bhojanalaya',
  h1Suffix: 'Authentic Tharu Thali in Sauraha, Chitwan',
  kind: 'Restaurant',
  area: 'Sauraha',
  rating: 4.7,
  reviewCount: 296,
  priceLevel: 1,
  cuisines: ['Tharu', 'Nepali', 'River Fish'],
  knownFor: 'Ghonghi snails and smoked river fish, cooked Tharu style',
  badges: ['Regional Speciality', 'Sunset View', 'Family Run'],
  images: [IMG.foodThali, IMG.chitwan, IMG.foodMomo],
  description: [
  'Tharu food is the indigenous cuisine of the Terai and rarely appears on tourist menus. This riverside bhojanalaya in Sauraha cooks it properly: ghonghi (river snails) in a mustard-oil masala, smoked river fish, dhikri rice dumplings and a fiery chutney ground on stone.',
  'Tables sit on a dirt terrace above the Rapti River, which is the best sunset spot in Sauraha — arrive by 5pm in winter to get one.'],

  coords: { lat: 27.5766, lng: 84.4948 },
  hours: '10:00–21:30 daily',
  phone: '+977 56 580 221',
  mustTry: [
  { dish: 'Ghonghi (river snail) masala', price: 'NPR 340', note: 'The dish Tharu cooking is known for' },
  { dish: 'Smoked river fish thali', price: 'NPR 620', note: 'Catch depends on the day' },
  { dish: 'Dhikri with chutney', price: 'NPR 220', note: 'Steamed rice-flour dumplings' }]

},
{
  slug: 'namche-himalayan-bakery',
  citySlug: 'everest-region',
  name: 'Namche Himalayan Bakery',
  h1Suffix: 'The Bakery at 3,440m in Namche Bazaar',
  kind: 'Bakery',
  area: 'Namche Bazaar',
  rating: 4.9,
  reviewCount: 738,
  priceLevel: 2,
  cuisines: ['Bakery', 'Coffee', 'Trail Food'],
  knownFor: 'Apple crumble and real espresso on the Everest trail',
  badges: ['Trail Institution', 'Highest Espresso Bar', 'Wi-Fi'],
  images: [IMG.everest, IMG.foodCafe, IMG.trekAbc],
  description: [
  'Every Everest Base Camp itinerary spends an acclimatisation day in Namche, and nearly everyone spends part of it in this bakery. Wood-fired oven, glass front facing the Kongde ridge, and a cabinet of apple crumble, cinnamon rolls and yak-cheese pastries.',
  'The espresso is genuinely good — beans carried up from Kathmandu — and the wood stove in the corner is the warmest place in the village at 4pm.'],

  coords: { lat: 27.8055, lng: 86.7132 },
  hours: '06:30–20:00 daily (Mar–May, Oct–Nov)',
  phone: '+977 38 540 118',
  mustTry: [
  { dish: 'Apple crumble', price: 'NPR 550', note: 'Served warm with custard' },
  { dish: 'Yak cheese pastry', price: 'NPR 420', note: 'Cheese from the Khumjung dairy' },
  { dish: 'Double espresso', price: 'NPR 400', note: 'The highest espresso machine on the trail' }]

},
{
  slug: 'lumbini-peace-vegetarian',
  citySlug: 'lumbini',
  name: 'Lumbini Peace Vegetarian',
  h1Suffix: 'Pure Vegetarian Thali beside the Sacred Garden',
  kind: 'Restaurant',
  area: 'Sacred Garden',
  rating: 4.5,
  reviewCount: 164,
  priceLevel: 1,
  cuisines: ['Vegetarian', 'Nepali', 'Indian'],
  knownFor: 'Sattvic thali served to pilgrims since 1998',
  badges: ['Pure Vegetarian', 'No alcohol', 'Under NPR 400'],
  images: [IMG.foodThali, IMG.lumbini, IMG.foodCafe],
  description: [
  'A simple pilgrim kitchen at the eastern gate of the monastic zone, entirely vegetarian and free of onion and garlic on request. The standard thali is rice, two dals, three vegetables, roti and curd.',
  'It fills between 12pm and 1.30pm with tour groups; either come early or wait it out with a lassi in the garden.'],

  coords: { lat: 27.4851, lng: 83.2781 },
  hours: '07:00–20:00 daily',
  phone: '+977 71 580 447',
  mustTry: [
  { dish: 'Sattvic thali', price: 'NPR 380', note: 'Refills on rice and dal' },
  { dish: 'Sweet lassi', price: 'NPR 140', note: 'Thick, from local buffalo curd' }]

},
{
  slug: 'marpha-apple-house',
  citySlug: 'mustang',
  name: 'Marpha Apple House',
  h1Suffix: 'Apple Everything in Marpha, Mustang',
  kind: 'Cafe',
  area: 'Marpha',
  rating: 4.8,
  reviewCount: 203,
  priceLevel: 1,
  cuisines: ['Bakery', 'Thakali', 'Coffee'],
  knownFor: 'Apple pie, cider and brandy from the orchard behind',
  badges: ['Local Produce', 'Regional Speciality', 'Sun Terrace'],
  images: [IMG.foodThali, IMG.trekAbc, IMG.foodCafe],
  description: [
  'Marpha grows the best apples in Nepal, and this cafe on the flagstone main street turns them into pie, crumble, dried rings, cider and the brandy the village is famous for.',
  'The sun terrace is the right place to sit out the midday Kali Gandaki wind before continuing to Jomsom or Tukuche.'],

  coords: { lat: 28.7534, lng: 83.6896 },
  hours: '07:00–20:00 (Mar–Nov)',
  phone: '+977 69 440 112',
  mustTry: [
  { dish: 'Marpha apple pie', price: 'NPR 300', note: 'Apples from the orchard behind the kitchen' },
  { dish: 'Hot apple cider', price: 'NPR 220', note: 'Non-alcoholic, spiced with local cinnamon' },
  { dish: 'Buckwheat pancake', price: 'NPR 340', note: 'Served with apple compote' }]

}];


export const getFood = (slug?: string) => foodListings.find((f) => f.slug === slug);
export const foodInCity = (citySlug: string) => foodListings.filter((f) => f.citySlug === citySlug);