import type { Metadata } from 'next';
import { Terms } from '../../views/Terms';

export const metadata: Metadata = {
  title: 'Terms and conditions',
  description: 'The Namastays terms and conditions are being finalised.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true }
};

export default function Page() {
  return <Terms />;
}
