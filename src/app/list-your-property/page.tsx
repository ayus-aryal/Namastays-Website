import type { Metadata } from 'next';
import { ListYourProperty } from '../../views/ListYourProperty';

export const metadata: Metadata = {
  title: "List your property",
  description: "Own a stay in Nepal? See how to list your property on Namastays from the host app.",
  alternates: { canonical: "/list-your-property" }
};

export default function Page() {
  return <ListYourProperty />;
}
