import type { Metadata } from 'next';
import { About } from '../../views/About';

export const metadata: Metadata = {
  title: "About Namastays",
  description: "Namastays is a travel platform for Nepal, bringing together stays, local places to eat and trekking routes.",
  alternates: { canonical: "/about" }
};

export default function Page() {
  return <About />;
}
