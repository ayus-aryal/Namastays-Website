import type { Metadata, Viewport } from 'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SITE_NAME, SITE_URL } from '../lib/site';
import { getCities } from '../lib/api';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Namastays — Stays, food and treks across Nepal',
    template: `%s | ${SITE_NAME}`
  },
  description:
    'Discover stays, local food and treks across Nepal, then plan on the website and book in the Namastays app.',
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US'
  },
  twitter: { card: 'summary_large_image' }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#353f8c'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cities = await getCities();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" />
      </head>
      <body>
        <div className="flex min-h-full w-full flex-col bg-white">
          <a
            href="#main"
            className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">
            Skip to content
          </a>
          <Header cities={cities} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer cities={cities} />
        </div>
      </body>
    </html>
  );
}
