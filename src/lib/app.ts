/**
 * Set this to the Google Play listing once the app is published.
 * While it is null, every download prompt on the site shows "Coming soon".
 */
export const PLAY_STORE_URL: string | null = null;

/** Add real profile links here to show social icons in the footer. Empty = none shown. */
export const SOCIAL_LINKS: { label: 'Instagram' | 'Facebook' | 'YouTube'; href: string }[] = [];

/** Public contact address. While null the contact page says details are coming. */
export const CONTACT_EMAIL: string | null = null;

/** Google Play link for the host (partner) app. While null the site says "coming soon". */
export const HOST_APP_URL: string | null = null;

/** Optional Cloudinary photo for the home page hero. While null a plain green background is used. */
export const HERO_IMAGE_URL: string | null = null;
