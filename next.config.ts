import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Treks used to live under a city; they now have their own pages.
    return [
      { source: '/explore/:citySlug/treks', destination: '/treks', permanent: true },
      { source: '/explore/:citySlug/treks/:slug', destination: '/treks/:slug', permanent: true }
    ];
  }
};

export default nextConfig;
