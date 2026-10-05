import type { Metadata } from "next";
import { ToursClient } from "@/components/tours/ToursClient";

import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Tour Packages & Pilgrimage Yatras from Kanpur | Explore India",
  description: "Browse 26+ curated pilgrimage, mountain, and heritage tour packages from Kanpur across India including Ayodhya Ram Mandir, Kashi Vishwanath, Char Dham, Kashmir, and Himachal Pradesh.",
  alternates: {
    canonical: "/tours",
  },
  openGraph: {
    title: "Curated Tour Packages from Kanpur | Yaduvanshi Tours & Travels",
    description: "Spiritual yatras, mountain retreats, and royal heritage tours from Kanpur with dedicated transport and luxury stays.",
    url: `${SITE_URL}/tours`,
    images: ["/images/hero-poster.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Packages from Kanpur | Yaduvanshi Tours",
    description: "Curated pilgrimage and holiday tour packages across India from Kanpur.",
    images: ["/images/hero-poster.webp"],
  },
};

export default function ExploreToursPage() {
  return <ToursClient />;
}
