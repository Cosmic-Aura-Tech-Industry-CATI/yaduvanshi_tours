import type { Metadata } from "next";
import Image from "next/image";
import { VehiclesClient } from "@/components/vehicles/VehiclesClient";
import { WhyOurFleetSection } from "@/components/WhyOurFleetSection";
import { QuickBookingCTA } from "@/components/QuickBookingCTA";

export const metadata: Metadata = {
  title: "Vehicle Rentals & Fleet | Chauffeur & Self-Drive",
  description: "Explore our premium fleet of sedans, SUVs, Tempo Travellers, Force Urbanias, and luxury buses for local, outstation, and wedding travel across India.",
  openGraph: {
    title: "Premium Vehicle Fleet Rentals | Yaduvanshi Tours",
    description: "Chauffeur-driven sedans, SUVs, and luxury buses with transparent pricing.",
  },
};

const BRASS = "#CF9D7B";

export default function VehiclesPage() {
  return (
    <div className="bg-[#0C1519] min-h-screen pt-28 pb-20 text-[#D8CFC7] overflow-hidden relative">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />

      {/* Header / Hero */}
      <section className="relative py-24 md:py-32 px-6 lg:px-12 overflow-hidden z-10 text-center flex items-center justify-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0 opacity-85">
          <Image
            src="/images/vehicle-hero-bg.webp"
            alt="Vehicle Rentals Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Balanced gradient overlay */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-[#0C1519]/50 via-[#0C1519]/35 to-[#0C1519]"
        />

        {/* Content Layer */}
        <div className="max-w-7xl mx-auto relative z-20">
          <span className="text-[#E8B96A] font-accent text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] block mb-3 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Premium Fleet</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Vehicle <span className="text-[#E8B96A]">Rentals</span>
          </h1>
          <p className="text-[#D8CFC7] text-base md:text-lg max-w-2xl mx-auto mt-5 font-sans leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium">
            Chauffeur-driven premium rides, sedans, SUVs, and luxury multi-seaters for local, outstation, or wedding travel.
          </p>
          <div className="w-24 h-0.5 mx-auto mt-6" style={{ background: `linear-gradient(to right, transparent, ${BRASS}, transparent)` }} />
        </div>
      </section>

      {/* Interactive Client Filter & Fleet Grid */}
      <VehiclesClient />

      {/* Trust Grid & Direct Quick Booking Sections */}
      <WhyOurFleetSection />
      <QuickBookingCTA />
    </div>
  );
}
