import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOURS_DATA } from "@/data/tours";
import { TourDetailClient } from "@/components/tours/TourDetailClient";
import { SITE_URL } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE_URL = SITE_URL;

// Generate metadata dynamically for proper SEO structure
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tour = TOURS_DATA.find((t) => t.slug === resolvedParams.slug);

  if (!tour) {
    return {
      title: "Package Not Found | Yaduvanshi Tours Kanpur",
      description: "Explore premium pilgrimage, mountain, and desert tours in India with Yaduvanshi Tours & Travels."
    };
  }

  const canonicalUrl = `/tours/${tour.slug}`;
  const fullTitle = `${tour.name} - ${tour.durationDays} Days Tour from Kanpur | Yaduvanshi Tours`;
  const metaDesc = `${tour.tagline} Book ${tour.name} with dedicated AC vehicle, verified chauffeurs, and customized itineraries from Kanpur. Starts ₹${tour.startingPrice.toLocaleString("en-IN")}.`;

  return {
    title: fullTitle,
    description: metaDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tour.name} | Yaduvanshi Tours & Travels Kanpur`,
      description: tour.tagline,
      url: `${BASE_URL}${canonicalUrl}`,
      images: [{ url: tour.image, width: 1200, height: 630, alt: tour.name }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.name} | Yaduvanshi Tours`,
      description: tour.tagline,
      images: [tour.image]
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

  // Structured Data Schema for TouristTrip and BreadcrumbList
  const tourTripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${BASE_URL}/tours/${tour.slug}#trip`,
    name: `${tour.name} from Kanpur`,
    description: tour.description,
    touristType: tour.region === "pilgrimage" ? "Spiritual Pilgrimage" : "Holiday Tour",
    itinerary: {
      "@type": "ItemList",
      numberOfItems: tour.itinerary?.length || 0,
      itemListElement: tour.itinerary?.map((day, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "TouristAttraction",
          name: `Day ${day.day}: ${day.title}`,
          description: day.description
        }
      }))
    },
    offers: {
      "@type": "Offer",
      price: tour.startingPrice,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/tours/${tour.slug}`
    },
    provider: {
      "@type": "TravelAgency",
      name: "Yaduvanshi Tours & Travels",
      url: BASE_URL,
      telephone: "+918127929551"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating || 4.9,
      reviewCount: tour.reviewsCount || 120
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tour Packages",
        item: `${BASE_URL}/tours`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tour.name,
        item: `${BASE_URL}/tours/${tour.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourTripSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TourDetailClient 
        tour={tour} 
        relatedTours={relatedTours} 
      />
    </>
  );
}
