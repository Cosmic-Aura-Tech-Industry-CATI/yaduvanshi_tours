import type { Metadata } from "next";
import { WeddingsClient } from "@/components/weddings/WeddingsClient";

import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Luxury Wedding Car Rental & Baraat Buses in Kanpur | Audi, Fortuner, Mercedes",
  description: "Make your special day memorable with decorated bridal luxury cars (Audi, Mercedes, BMW, Fortuner) and guest baraat convoys in Kanpur with professional chauffeurs.",
  alternates: {
    canonical: "/weddings",
  },
  openGraph: {
    title: "Luxury Wedding Car Rentals in Kanpur | Yaduvanshi Tours",
    description: "Decorated luxury wedding cars, guest shuttles, and VIP baraat convoys in Kanpur and UP.",
    url: `${SITE_URL}/weddings`,
    images: ["/weddings/yaduvanshi-wedding-car.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Car Rental Kanpur | Yaduvanshi Tours",
    description: "Decorated luxury cars and guest shuttles for weddings in Kanpur.",
    images: ["/weddings/yaduvanshi-wedding-car.webp"],
  },
};

export default function WeddingsPage() {
  return <WeddingsClient />;
}
