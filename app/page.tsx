"use client";

import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { PackagesSection } from "@/components/PackagesSection";
import { VehicleRentalsSection } from "@/components/VehicleRentalsSection";
import { WeddingSection } from "@/components/WeddingSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { StatsSection } from "@/components/StatsSection";
import { MapCtaSection } from "@/components/MapCtaSection";

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
    </div>
  );
}
