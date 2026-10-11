import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VEHICLES } from "@/data/vehicles";
import { VehicleDetailClient } from "@/components/vehicles/VehicleDetailClient";
import { SITE_URL } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE_URL = SITE_URL;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const vehicle = VEHICLES.find((v) => v.slug === resolvedParams.slug);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Yaduvanshi Tours Kanpur",
      description: "Explore premium fleet rentals with Yaduvanshi Tours & Travels in Kanpur.",
    };
  }

  const canonicalUrl = `/vehicles/${vehicle.slug}`;
  const fullTitle = `${vehicle.name} Rental in Kanpur (${vehicle.seats} Seater) | Yaduvanshi Tours`;
  const metaDesc = `Book ${vehicle.name} (${vehicle.brand} ${vehicle.category.toUpperCase()}) with verified chauffeur in Kanpur. Ideal for local city travel, outstation trips, and weddings. From ₹${vehicle.localPriceDay.min.toLocaleString("en-IN")}/day or ₹${vehicle.outstationPriceKm.min}/km.`;

  return {
    title: fullTitle,
    description: metaDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${vehicle.name} Rental in Kanpur | Yaduvanshi Tours`,
      description: `Chauffeur-driven ${vehicle.name} (${vehicle.seats} Seats, ${vehicle.ac ? "AC" : "Non-AC"}). Local & outstation rental in Kanpur.`,
      url: `${BASE_URL}${canonicalUrl}`,
      images: [{ url: vehicle.image, width: 1200, height: 630, alt: `${vehicle.name} Rental Kanpur` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicle.name} Rental in Kanpur | Yaduvanshi Tours`,
      description: `Book ${vehicle.name} in Kanpur with chauffeur. From ₹${vehicle.localPriceDay.min}/day.`,
      images: [vehicle.image],
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

  // Structured Data: Product / Car Rental & BreadcrumbList
  const vehicleProductSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/vehicles/${vehicle.slug}#product`,
    name: `${vehicle.name} Rental in Kanpur`,
    description: `Rent ${vehicle.name} (${vehicle.brand} ${vehicle.category}) with driver in Kanpur for local city trips, weddings, or outstation tours. Starting ₹${vehicle.localPriceDay.min}/day or ₹${vehicle.outstationPriceKm.min}/km.`,
    image: `${BASE_URL}${vehicle.image}`,
    brand: {
      "@type": "Brand",
      name: vehicle.brand,
    },
    category: vehicle.category,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: vehicle.localPriceDay.min,
      highPrice: vehicle.localPriceDay.max,
      price: vehicle.localPriceDay.min,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "AutoRental",
        name: "Yaduvanshi Tours & Travels",
        telephone: "+918127929551",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vehicle Rentals",
        item: `${BASE_URL}/vehicles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${vehicle.name} Rental`,
        item: `${BASE_URL}/vehicles/${vehicle.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleProductSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <VehicleDetailClient 
        vehicle={vehicle} 
        similarVehicles={similarVehicles} 
      />
    </>
  );
}
