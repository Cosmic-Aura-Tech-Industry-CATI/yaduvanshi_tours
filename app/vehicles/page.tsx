"use client";

import { useState } from "react";
import { VEHICLES } from "@/data/vehicles";
import { RentalCard } from "@/components/cards/RentalCard";
import { Search, Info } from "lucide-react";
import type { RentalType } from "@/types";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

const CATEGORIES = ["All", "Sedan", "MPV", "SUV", "Luxury", "Tempo-Traveller", "Urbania"];

export default function VehiclesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [rentalType, setRentalType] = useState<RentalType>("local");

  const filteredVehicles = VEHICLES.filter((vehicle) => {
    const matchesCategory =
      activeCategory === "All" ||
      vehicle.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesCategory;
  });

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-28 pb-20">
      {/* Header */}
      <section className="bg-[#1A2B1C] text-white py-16 px-6 relative overflow-hidden border-b border-[#C9A84C]/20">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-[#C9A84C] font-mono text-xs uppercase tracking-widest block mb-3">Premium Fleet</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wide">Vehicle Rentals</h1>
          <p className="text-white/60 text-sm max-w-xl mx-auto mt-4 font-sans leading-relaxed">
            Chauffeur-driven premium rides, sedans, SUVs, and luxury multi-seaters for local, outstation, or wedding travel.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* Controls Container */}
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          {/* Category Filters */}
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 text-xs font-semibold rounded-sm border transition-all cursor-pointer whitespace-nowrap"
                style={
                  activeCategory === cat
                    ? { background: GOLD, borderColor: GOLD, color: DARK }
                    : { background: "transparent", borderColor: "#e5e7eb", color: "#4b5563" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Pricing Toggle Indicator */}
          <div className="flex bg-[#FAFAF8] p-1.5 rounded-sm border border-gray-200 w-full lg:w-auto justify-center">
            {[
              { id: "local", label: "Local (₹/Day)" },
              { id: "outstation", label: "Outstation (₹/Km)" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setRentalType(type.id as any)}
                className="px-4 py-1.5 text-xs font-bold rounded-sm transition-all cursor-pointer whitespace-nowrap"
                style={
                  rentalType === type.id
                    ? { background: GOLD, color: DARK }
                    : { background: "transparent", color: "#6b7280" }
                }
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Guide Callout */}
        <div className="flex items-start gap-2.5 mt-6 p-4 bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-lg text-[#1A2B1C] text-xs">
          <Info size={16} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block font-display">Rental Rate Details:</span>
            <span className="text-gray-600 block mt-1 font-sans">
              * **Local Package**: Pricing is calculated on standard 8 Hours / 80 Kilometers base packages. 
              * **Outstation Package**: Billed per kilometer with a minimum billing of 250km (or 300km for coaches/Urbania) per day. Driver allowances apply extra.
            </span>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredVehicles.map((vehicle, idx) => (
            <RentalCard
              key={vehicle.slug}
              vehicle={vehicle}
              rentalType={rentalType}
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
