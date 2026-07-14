"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import { RentalCard } from "@/components/cards/RentalCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

export function VehicleRentalsSection() {
  const carRef = useRef<HTMLDivElement>(null);

  const scrollCar = (dir: "l" | "r") => {
    carRef.current?.scrollBy({
      left: dir === "l" ? -330 : 330,
      behavior: "smooth",
    });
  };

  const featuredVehicles = VEHICLES.filter(
    (v) =>
      v.popular ||
      ["maruti-dzire", "hyundai-creta", "toyota-innova-crysta", "toyota-fortuner"].includes(v.slug)
  );

  return (
    <section className="py-20 overflow-hidden" style={{ background: DARK }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
          <SectionHeader script="Premium Rides" heading="Car Rentals for Every Journey" light />
          <div className="flex items-center gap-3 mt-6 md:mt-2">
            <Link
              href="/vehicles"
              className="hidden md:flex items-center gap-1.5 text-sm border px-4 py-2 rounded-sm text-white/65 border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
            >
              View All <ArrowRight size={13} />
            </Link>
            <button
              onClick={() => scrollCar("l")}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer"
              style={{ borderColor: `${GOLD}60`, color: GOLD }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollCar("r")}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer"
              style={{ borderColor: `${GOLD}60`, color: GOLD }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div
          ref={carRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredVehicles.map((v, i) => (
            <div key={v.slug} className="flex-none w-[280px] snap-start">
              <RentalCard vehicle={v} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
