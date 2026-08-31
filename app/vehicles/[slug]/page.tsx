import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VEHICLES } from "@/data/vehicles";
import { VehicleDetailClient } from "@/components/vehicles/VehicleDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const vehicle = VEHICLES.find((v) => v.slug === resolvedParams.slug);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Yaduvanshi Tours",
      description: "Explore premium fleet rentals with Yaduvanshi Tours & Travels.",
    };
  }

  return {
    title: vehicle.name + " Rental (" + vehicle.brand + ") | Yaduvanshi Tours",
    description: `Book ${vehicle.name} (${vehicle.seats} Seater ${vehicle.category.toUpperCase()}) for local Kanpur travel, outstation trips, or weddings. Starts ₹${vehicle.localPriceDay.min.toLocaleString("en-IN")}/day.`,
    openGraph: {
      title: vehicle.name + " Rental | Yaduvanshi Tours",
      description: "Chauffeur-driven " + vehicle.name + " (" + vehicle.seats + " Seats, " + (vehicle.ac ? "AC" : "Non-AC") + ").",
      images: [{ url: vehicle.image }],
    },
  };
}

export async function generateStaticParams() {
  return VEHICLES.map((vehicle) => ({
    slug: vehicle.slug,
  }));
}

export default async function VehicleDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const vehicle = VEHICLES.find((v) => v.slug === resolvedParams.slug);

  if (!vehicle) {
    notFound();
  }

  const similarVehicles = VEHICLES.filter(
    (v) => v.category === vehicle.category && v.slug !== vehicle.slug
  ).slice(0, 3);

  return (
    <VehicleDetailClient 
      vehicle={vehicle} 
      similarVehicles={similarVehicles} 
    />
  );
}
