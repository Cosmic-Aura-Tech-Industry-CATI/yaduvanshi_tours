import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOURS_DATA } from "@/data/tours";
import { TourDetailClient } from "@/components/tours/TourDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate metadata dynamically for proper SEO structure
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tour = TOURS_DATA.find((t) => t.slug === resolvedParams.slug);

  if (!tour) {
    return {
      title: "Package Not Found | Yaduvanshi Tours",
      description: "Explore premium pilgrimage, mountain, and desert tours in India with Yaduvanshi Tours & Travels."
    };
  }

  return {
    title: `${tour.name} - ${tour.durationDays} Days Tour | Yaduvanshi Tours`,
    description: tour.tagline + " " + tour.description.substring(0, 120) + "...",
    openGraph: {
      title: `${tour.name} | Yaduvanshi Tours`,
      description: tour.tagline,
      images: [{ url: tour.image }]
    }
  };
}

// Statically pre-render all 26 tour paths on build time
export async function generateStaticParams() {
  return TOURS_DATA.map((tour) => ({
    slug: tour.slug,
  }));
}

export default async function TourDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const tour = TOURS_DATA.find((t) => t.slug === resolvedParams.slug);

  if (!tour) {
    notFound();
  }

  // Find related tours within the same region (limit to 3, excluding active tour)
  const relatedTours = TOURS_DATA.filter(
    (t) => t.region === tour.region && t.slug !== tour.slug
  ).slice(0, 3);

  return (
    <TourDetailClient 
      tour={tour} 
      relatedTours={relatedTours} 
    />
  );
}
