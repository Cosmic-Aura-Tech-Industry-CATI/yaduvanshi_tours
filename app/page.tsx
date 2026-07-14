"use client";

import { Hero } from "@/components/Hero";
import { PackagesSection } from "@/components/PackagesSection";
import { VehicleRentalsSection } from "@/components/VehicleRentalsSection";
import { WeddingSection } from "@/components/WeddingSection";
import { DestinationsSection } from "@/components/DestinationsSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MapCtaSection } from "@/components/MapCtaSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <PackagesSection />
      <VehicleRentalsSection />
      <WeddingSection />
      <DestinationsSection />
      <GallerySection />
      <TestimonialsSection />
      <MapCtaSection />
    </div>
  );
}
