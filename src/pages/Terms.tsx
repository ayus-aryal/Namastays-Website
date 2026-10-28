import { LegalLayout, LegalSection } from '../components/LegalLayout';

const sections: LegalSection[] = [
{
  heading: 'Agreement to these terms',
  paragraphs: [
  'These terms are a contract between you and Namastays Pvt. Ltd., a company registered in Kathmandu, Nepal. By using namastays.com or the Namastays app, you accept them. If you do not accept them, please do not use the service.',
  'Additional host terms apply if you list a property or business with us; where they conflict with this page, the host terms govern that relationship.']

},
{
  heading: 'What Namastays is — and is not',
  paragraphs: [
  'Namastays is a marketplace and directory. We connect travellers with independently owned hotels, homestays, guesthouses, restaurants and cafes in Nepal, and we publish hiking route information recorded by our community.',
  'We are not a travel agency, trekking agency, tour operator, or guiding company. We do not sell trekking packages, we do not employ guides or porters, and we do not own or manage any of the properties listed. The contract for your stay is between you and the property.']

},
{
  heading: 'Bookings and payment',
  bullets: [
  'Stays are bookable. Food and cafe listings are discovery-only and cannot be reserved through Namastays.',
  'A booking is confirmed when the host accepts it and you receive a confirmation email.',
  'You pay a deposit (normally 20% of the total) through Namastays and the remaining balance directly to the host, in Nepali rupees, on arrival.',
  'Prices shown include applicable Nepali taxes unless a listing states otherwise. Currency conversions are indicative.',
  'Our service fee is included in the price you see at checkout and is itemised before you confirm.']

},
{
  heading: 'Cancellations and refunds',
  paragraphs: [
  'Each listing displays the host’s cancellation policy before you book. Cancelling within the free-cancellation window returns your deposit in full within ten working days.',
  'If a host cancels a confirmed booking, we refund your deposit in full and will help you find comparable accommodation in the same area where we can.',
  'Where a road closure, flight cancellation, strike, natural disaster or government restriction prevents travel, contact us — we will work with the host on a fair outcome, but we cannot guarantee a refund of amounts already paid to the host.']

},
{
  heading: 'Your responsibilities as a guest',
  bullets: [
  'Give accurate information when booking, and bring valid photo ID for check-in as required by Nepali law.',
  'Respect the property, its neighbours, and local custom — particularly at religious and heritage sites.',
  'Settle the balance owed directly to your host at check-in.',
  'Tell us promptly if a listing is materially different from its description so we can investigate.']

},
{
  heading: 'Trekking, hiking and safety',
  paragraphs: [
  'Route information on Namastays is community-contributed and provided for reference only. Distances, elevation figures, durations and trail conditions are aggregated from user recordings and may be inaccurate or out of date.',
  'Trekking in Nepal carries real risk, including altitude sickness, rockfall, avalanche, river crossings, extreme weather and remoteness from medical care. You are solely responsible for assessing whether a route suits your fitness and experience, for obtaining required permits, for arranging licensed guides where the law or conditions require them, and for holding travel and evacuation insurance.',
  'Namastays does not verify that any route is safe or passable on any given day, and accepts no liability for injury, loss or death arising from your use of route information.']

},
{
  heading: 'Reviews and user content',
  bullets: [
  'Only users who completed a booking, checked in at a food listing, or recorded a route may review it.',
  'Reviews must be your own honest experience. No paid, incentivised, hateful, defamatory or personally identifying content.',
  'Hosts may publicly reply to a review but can never edit or remove one.',
  'You keep ownership of your photos and text, and grant us a non-exclusive, worldwide licence to display and distribute them on Namastays and in our marketing.',
  'We may remove content that breaches these terms, and repeat breaches can result in account closure.']

},
{
  heading: 'Host obligations',
  bullets: [
  'You must be the owner or authorised operator of the business, and hold current Nepal Tourism Board registration, homestay registration, or the equivalent municipal licence.',
  'Listings must be accurate — photographs of the actual property, honest amenity lists, and prices you will actually honour.',
  'You must honour confirmed bookings at the agreed price, and comply with Nepali tax, employment and safety law.',
  'We may suspend or remove a listing that receives sustained complaints or that we cannot verify.']

},
{
  heading: 'Intellectual property',
  paragraphs: [
  'The Namastays name, logo, website, app and original written content belong to Namastays Pvt. Ltd. You may link to any of our pages freely. You may not scrape, copy in bulk, or republish our listings, descriptions or aggregated route data without written permission.']

},
{
  heading: 'Limitation of liability',
  paragraphs: [
  'To the maximum extent permitted by Nepali law, Namastays is not liable for the acts or omissions of any host, guide, restaurant or third party listed on the platform, nor for indirect or consequential loss. Where we are found liable, our total liability is limited to the service fee you paid us on the booking concerned.']

},
{
  heading: 'Governing law and disputes',
  paragraphs: [
  'These terms are governed by the laws of Nepal, and the courts of Kathmandu have exclusive jurisdiction. Before starting proceedings, please contact us — most disputes are resolved directly, and we can usually mediate between guest and host.']

},
{
  heading: 'Changes to these terms',
  paragraphs: [
  'We may update these terms as the service changes. Material changes are announced by email to registered users at least 14 days in advance, and the date at the top of this page is updated. Bookings made before a change are governed by the terms in force when you booked.']

}];


export function Terms() {
  return (
    <LegalLayout
      title="Terms & conditions"
      updated="1 July 2026"
      intro="Namastays is a marketplace connecting travellers with independently owned Nepali businesses, plus a public record of community-tracked trails. These terms set out what you can expect from us, and what we need from you."
      sections={sections} />);


}