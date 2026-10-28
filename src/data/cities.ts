import { City } from '../types';
import { IMG } from './images';

export const cities: City[] = [
{
  slug: 'kathmandu-valley',
  name: 'Kathmandu Valley',
  region: 'Bagmati Province',
  tagline: 'Temple courtyards, momo alleys and hills on every side',
  intro: [
  'Kathmandu Valley is the cultural heart of Nepal and the place most travellers begin. Within an hour of each other sit three medieval royal cities — Kathmandu, Patan and Bhaktapur — along with the Boudhanath and Swayambhunath stupas, dense bazaar lanes, and a ring of forested hills that hold some of the best short hikes in the country.',
  'Namastays lists 142 independently owned stays across the valley, from restored Newari townhouses in Patan to family homestays in Bungamati and Nagarkot. Our 68 verified eateries cover everything from decades-old momo kitchens in Asan to specialty coffee roasters in Jhamsikhel, and 24 community-recorded trails start from the valley rim.',
  'Most visitors base themselves in Thamel or Lazimpat for access to the old city, or in Patan and Bhaktapur for quieter heritage streets. Traffic is heavy between 9am and 7pm, so cluster your plans by neighbourhood rather than crossing the valley twice in a day.'],

  image: IMG.kathmandu,
  coords: { lat: 27.7172, lng: 85.324 },
  counts: { stays: 142, food: 68, treks: 24 },
  areas: ['Thamel', 'Patan / Jhamsikhel', 'Bhaktapur', 'Boudha', 'Lazimpat', 'Nagarkot'],
  bestTime: 'October–November and March–April for clear skies and mountain views',
  gettingThere: 'Tribhuvan International Airport (KTM) — 6km from the old city'
},
{
  slug: 'pokhara',
  name: 'Pokhara',
  region: 'Gandaki Province',
  tagline: 'Lakeside mornings under the Annapurna wall',
  intro: [
  'Pokhara sits at 820m beside Phewa Lake with the Annapurna range and the fishtail summit of Machhapuchhre rising directly behind it. It is Nepal’s adventure base — the trailhead for the Annapurna region, and the country’s centre for paragliding, kayaking and short ridge walks.',
  'Namastays lists 98 stays here, weighted toward independent lakeside guesthouses and family-run hillside lodges above Sarangkot rather than chain hotels. 54 cafes and restaurants line Lakeside and Old Pokhara, and 31 trails are tracked by the Namastays hiking community, from a 3km sunrise walk to Sarangkot to multi-day approaches into the sanctuary.',
  'Stay in Lakeside for walkable food and boat access, Sedi or Khapaudi for quiet water views, and Sarangkot if you want to wake up above the morning cloud layer.'],

  image: IMG.pokhara,
  coords: { lat: 28.2096, lng: 83.9856 },
  counts: { stays: 98, food: 54, treks: 31 },
  areas: ['Lakeside', 'Sedi', 'Sarangkot', 'Old Pokhara', 'Khapaudi'],
  bestTime: 'September–November; February–April for rhododendron bloom on the ridges',
  gettingThere: 'Pokhara International Airport (PKR) or a 6–7hr drive from Kathmandu'
},
{
  slug: 'chitwan',
  name: 'Chitwan',
  region: 'Bagmati / Narayani',
  tagline: 'Jungle mornings, rhinos and the flat green Terai',
  intro: [
  'Chitwan National Park protects 952 square kilometres of sal forest, grassland and riverine floodplain in Nepal’s lowland Terai. It is the best place in the country to see greater one-horned rhinoceros, gharial crocodiles and — with patience and luck — Bengal tiger.',
  'Namastays lists 47 stays around Sauraha and the quieter western entrances at Meghauli and Amaltari, most of them locally owned eco lodges and Tharu homestays that employ village guides. 22 eateries serve Tharu thali, river fish and traveller cafes, and 9 flat forest and riverside walking routes are recorded by our community.',
  'Jeep safaris, canoe trips and guided walks all run from park entry points; the park closes certain zones during monsoon, so October to March is the reliable window.'],

  image: IMG.chitwan,
  coords: { lat: 27.5291, lng: 84.3542 },
  counts: { stays: 47, food: 22, treks: 9 },
  areas: ['Sauraha', 'Meghauli', 'Amaltari', 'Bharatpur'],
  bestTime: 'October–March for cool days and high wildlife visibility',
  gettingThere: 'Bharatpur Airport (BHR) or a 5hr drive from Kathmandu'
},
{
  slug: 'everest-region',
  name: 'Everest Region',
  region: 'Solukhumbu, Province 1',
  tagline: 'Sherpa villages, prayer flags and the world’s highest trails',
  intro: [
  'The Khumbu is high, thin-aired Sherpa country: stone villages, monasteries, yak trains and the approach to Everest Base Camp. Trails here start above 2,600m and cross passes over 5,000m, so acclimatisation days are non-negotiable.',
  'Namastays lists 63 teahouses and lodges from Lukla up to Dingboche, all independently owned and most run by the families who built them. 18 bakeries and lodge kitchens are listed for the trail — Namche’s bakeries are a genuine institution — and 17 route segments are recorded by hikers using the Namastays app, with GPX tracks you can review before you commit.',
  'Nearly everyone flies into Lukla and walks north; the Jiri and Salleri road approaches add four to six days but help enormously with altitude.'],

  image: IMG.everest,
  coords: { lat: 27.8069, lng: 86.714 },
  counts: { stays: 63, food: 18, treks: 17 },
  areas: ['Lukla', 'Namche Bazaar', 'Tengboche', 'Dingboche', 'Phakding'],
  bestTime: 'Late March–May and October–November',
  gettingThere: 'Flights to Lukla (LUA) from Kathmandu or Ramechhap'
},
{
  slug: 'lumbini',
  name: 'Lumbini',
  region: 'Lumbini Province',
  tagline: 'The birthplace of the Buddha, quiet and walkable',
  intro: [
  'Lumbini is the recorded birthplace of Siddhartha Gautama and a UNESCO World Heritage Site. The sacred garden holds the Maya Devi Temple, the Ashokan pillar and the remains of ancient monasteries, surrounded by a large monastic zone where dozens of countries have built their own temples.',
  'Namastays lists 31 stays, largely guesthouses and monastery-adjacent lodges in Lumbini Bazaar and Bhairahawa, plus 14 vegetarian kitchens and tea houses. 4 flat cycling and walking routes connect the monastic zone, Tilaurakot and the surrounding villages.',
  'The site is best explored on foot or by bicycle in the early morning before the heat; the whole monastic zone is flat and shaded in stretches.'],

  image: IMG.lumbini,
  coords: { lat: 27.4833, lng: 83.2769 },
  counts: { stays: 31, food: 14, treks: 4 },
  areas: ['Sacred Garden', 'Lumbini Bazaar', 'Bhairahawa'],
  bestTime: 'November–February; avoid May–June heat',
  gettingThere: 'Gautam Buddha International Airport (BWA) — 22km away'
},
{
  slug: 'mustang',
  name: 'Mustang',
  region: 'Gandaki Province',
  tagline: 'High desert, ochre cliffs and walled Tibetan towns',
  intro: [
  'Mustang lies in the rain shadow north of the Annapurna and Dhaulagiri massifs — a wind-scoured high desert of ochre cliffs, whitewashed villages and Tibetan Buddhist monasteries. Lower Mustang is reachable by road; Upper Mustang and the walled city of Lo Manthang require a restricted-area permit.',
  'Namastays lists 38 stays across Jomsom, Kagbeni, Marpha and Muktinath, mostly family-run lodges built around apple orchards and courtyards. 12 kitchens are listed — Marpha apple brandy and buckwheat bread are the local signatures — and 11 routes are recorded by our hiking community.',
  'Wind picks up sharply after 11am in the Kali Gandaki valley, so plan walking for the morning.'],

  image: IMG.trekAbc,
  coords: { lat: 28.8118, lng: 83.7802 },
  counts: { stays: 38, food: 12, treks: 11 },
  areas: ['Jomsom', 'Kagbeni', 'Marpha', 'Muktinath'],
  bestTime: 'March–November, including monsoon months',
  gettingThere: 'Flights to Jomsom (JMO) or road from Pokhara via Beni'
},
{
  slug: 'bandipur',
  name: 'Bandipur',
  region: 'Tanahun, Gandaki',
  tagline: 'A car-free hilltop bazaar between Kathmandu and Pokhara',
  intro: [
  'Bandipur is a preserved Newari trading town on a ridge at 1,030m, with a pedestrianised main bazaar of shuttered timber facades and long views to Manaslu and Annapurna on clear mornings. It is the best single overnight stop on the Kathmandu–Pokhara highway.',
  'Namastays lists 19 stays, nearly all restored heritage houses and small homestays on or just off the bazaar, plus 11 eateries. 6 short trails run to Ramkot village, Siddha Gufa cave and the Tundikhel viewpoint.',
  'Because the bazaar is closed to vehicles, arrivals park below the town and walk up — pack light.'],

  image: IMG.stayHomestay,
  coords: { lat: 27.9333, lng: 84.4167 },
  counts: { stays: 19, food: 11, treks: 6 },
  areas: ['Main Bazaar', 'Tundikhel', 'Ramkot'],
  bestTime: 'October–April for clear ridge views',
  gettingThere: 'Off the Prithvi Highway, 4hr from Kathmandu / 2.5hr from Pokhara'
}];


export const getCity = (slug?: string) => cities.find((c) => c.slug === slug);