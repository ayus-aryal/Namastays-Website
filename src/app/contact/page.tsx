import type { Metadata } from 'next';
import { Contact } from '../../views/Contact';

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact the Namastays team.",
  alternates: { canonical: "/contact" }
};

export default function Page() {
  return <Contact />;
}
