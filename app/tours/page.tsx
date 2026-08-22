import type { Metadata } from "next";
import { ToursClient } from "@/components/tours/ToursClient";

export const metadata: Metadata = {
  title: "Tour Packages & Spiritual Journeys | Explore India",
  description: "Browse 26+ curated pilgrimage, mountain, and heritage tour packages across India including Ayodhya, Kashi, Char Dham, Kashmir, and Himachal Pradesh.",
  openGraph: {
    title: "Curated Tour Packages | Yaduvanshi Tours & Travels",
    description: "Spiritual yatras, mountain retreats, and royal heritage tours with dedicated transport and luxury stays.",
  },
};

export default function ExploreToursPage() {
  return <ToursClient />;
}
