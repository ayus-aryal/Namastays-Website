import type { Metadata } from 'next';
import { Privacy } from '../../views/Privacy';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'The Namastays privacy policy is being finalised.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true }
};

export default function Page() {
  return <Privacy />;
}
