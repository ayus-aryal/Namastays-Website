import { LegalLayout, LegalSection } from '../components/LegalLayout';

const sections: LegalSection[] = [
{
  heading: 'Who we are',
  paragraphs: [
  'Namastays Pvt. Ltd. is a company registered in Kathmandu, Nepal (company no. 284119/079/080). We operate the namastays.com website and the Namastays mobile app, which connect travellers with independently owned stays, restaurants and cafes, and community-recorded hiking routes across Nepal.',
  'This policy explains what personal information we collect, why we collect it, and the choices you have. It applies to both the website and the app.']

},
{
  heading: 'Information you give us',
  bullets: [
  'Account details: your name, email address, phone number, and password.',
  'Booking details: dates, guest numbers, and any message you send a host.',
  'Payment information: deposits are processed by our payment partners. We store only the last four digits of a card and a transaction reference — never full card numbers.',
  'Reviews and photos you choose to publish, along with the display name shown on them.',
  'Host applications: business name, licence or registration numbers, and bank details for payouts.']

},
{
  heading: 'Information collected automatically',
  bullets: [
  'Device and browser type, screen size, and approximate location derived from your IP address.',
  'Pages you view and searches you run, so we can improve results and see which listings people are looking for.',
  'In the app, GPS location while you are actively recording a hike — and only while a recording is running.']

},
{
  heading: 'Location and GPX data',
  paragraphs: [
  'Recording a trek in the Namastays app collects precise location, elevation and timing data for the duration of that activity. You control whether a recording is published.',
  'When you publish a track, we add it to the aggregated route data shown on trek pages. Published tracks are stripped of your account identifiers unless you choose to be credited, and we automatically trim the first and last 200 metres of any track that starts or ends at a private address.',
  'You can delete any recording, published or not, from your activity list at any time. Deleted recordings are removed from aggregation within 30 days.']

},
{
  heading: 'How we use your information',
  bullets: [
  'To take and manage bookings, and to pass the necessary details to the host you booked with.',
  'To show you relevant stays, eateries and trails, and to remember what you saved.',
  'To verify that hosts hold a valid Nepal Tourism Board or homestay registration.',
  'To detect fraud, fake reviews and abuse of the platform.',
  'To send booking confirmations and — only if you opt in — occasional emails about new destinations.']

},
{
  heading: 'Who we share it with',
  paragraphs: [
  'We share booking details with the host you booked, payment details with our payment processors, and technical data with the infrastructure and analytics providers that run the service. We never sell personal information, and we do not share it with advertisers.',
  'We may disclose information where Nepali law requires it, or to protect the safety of a guest, host or guide.']

},
{
  heading: 'Cookies',
  paragraphs: [
  'We use a small number of cookies: one to keep you signed in, one to remember your language and currency, and privacy-respecting analytics that measure page performance in aggregate. You can clear or block cookies in your browser, though sign-in will stop working.']

},
{
  heading: 'How long we keep it',
  paragraphs: [
  'Booking records are kept for seven years to meet Nepali tax and accounting requirements. Account data is kept while your account is open and for 90 days after you close it. Published reviews remain on the listing after account closure but are shown without your name if you ask.']

},
{
  heading: 'Your rights',
  bullets: [
  'Request a copy of the personal data we hold about you.',
  'Correct anything inaccurate from your account settings.',
  'Delete your account and associated recordings.',
  'Withdraw marketing consent at any time using the link in any email.',
  'Object to a specific use of your data by writing to us.']

},
{
  heading: 'Children',
  paragraphs: [
  'Namastays is not intended for anyone under 16. We do not knowingly collect information from children, and we delete any such account as soon as we become aware of it.']

},
{
  heading: 'Changes to this policy',
  paragraphs: [
  'If we make a material change we will email registered users at least 14 days before it takes effect, and the date at the top of this page will change. Continuing to use Namastays after that date means you accept the updated policy.']

}];


export function Privacy() {
  return (
    <LegalLayout
      title="Privacy policy"
      updated="1 July 2026"
      intro="We collect as little as we can get away with, we never sell it, and we are explicit about location data because trek tracking depends on it. This page explains exactly what happens to your information."
      sections={sections} />);


}