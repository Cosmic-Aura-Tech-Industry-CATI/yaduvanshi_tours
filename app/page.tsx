import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { PackagesSection } from "@/components/PackagesSection";
import { VehicleRentalsSection } from "@/components/VehicleRentalsSection";
import { WeddingSection } from "@/components/WeddingSection";

// Dynamically load heavy below-fold components
const GallerySection = dynamic(() => import("@/components/GallerySection").then((mod) => mod.GallerySection));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection").then((mod) => mod.TestimonialsSection));
const StatsSection = dynamic(() => import("@/components/StatsSection").then((mod) => mod.StatsSection));
const MapCtaSection = dynamic(() => import("@/components/MapCtaSection").then((mod) => mod.MapCtaSection));
const TripPlanningCTA = dynamic(() => import("@/components/TripPlanningCTA").then((mod) => mod.TripPlanningCTA));

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <TrustStrip />
      <PackagesSection />
      <VehicleRentalsSection />
      <WeddingSection />
      <GallerySection />
      <TestimonialsSection />
      <StatsSection />
      <MapCtaSection />
      <TripPlanningCTA />
    </div>
  );
}
