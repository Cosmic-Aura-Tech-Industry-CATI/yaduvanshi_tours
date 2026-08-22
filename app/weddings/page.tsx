import type { Metadata } from "next";
import { WeddingsClient } from "@/components/weddings/WeddingsClient";

export const metadata: Metadata = {
  title: "Wedding Car Rental & Guest Shuttles | Luxury Fleet",
  description: "Make your special day memorable with decorated bridal luxury cars, Audi, Mercedes, Fortuner, and guest convoys with professional chauffeurs.",
  openGraph: {
    title: "Wedding Car Rentals | Yaduvanshi Tours & Travels",
    description: "Decorated luxury wedding cars, guest shuttles, and VIP baraat convoys.",
    images: ["/weddings/yaduvanshi-wedding-car.webp"],
  },
};

export default function WeddingsPage() {
  return <WeddingsClient />;
}
