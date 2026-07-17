"use client";

import { useState } from "react";
import { VEHICLES } from "@/data/vehicles";
import { RentalCard } from "@/components/cards/RentalCard";
import { Info } from "lucide-react";
import type { RentalType } from "@/types";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

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
    <div className="bg-[#0C1519] min-h-screen pt-28 pb-20 text-[#D8CFC7] overflow-hidden relative">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-5"
        style={{ background: `radial-gradient(circle, ${COFFEE}, transparent 70%)` }} />

      {/* Header */}
      <section className="relative py-20 px-6 overflow-hidden z-10 text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#E8B96A] font-accent text-xs uppercase tracking-[0.25em] block mb-3 font-semibold">Premium Fleet</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wide text-white">
            Vehicle <span className="text-[#E8B96A]">Rentals</span>
          </h1>
          <p className="text-[#D8CFC7]/60 text-sm md:text-base max-w-xl mx-auto mt-5 font-sans leading-relaxed">
            Chauffeur-driven premium rides, sedans, SUVs, and luxury multi-seaters for local, outstation, or wedding travel.
          </p>
          <div className="w-24 h-0.5 mx-auto mt-6" style={{ background: `linear-gradient(to right, transparent, ${BRASS}, transparent)` }} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10 relative z-10">
        {/* Controls Container */}
        <div 
          className="flex flex-col lg:flex-row gap-5 items-center justify-between p-4 rounded-xl border glass-panel"
          style={{
            background: "rgba(58, 53, 52, 0.25)",
            borderColor: "rgba(207, 157, 123, 0.15)",
          }}
        >
          {/* Category Filters */}
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 custom-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider font-accent"
                style={
                  activeCategory === cat
                    ? { background: GOLD, borderColor: GOLD, color: "#0C1519" }
                    : { background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "#D8CFC7" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Pricing Toggle Indicator */}
          <div 
            className="flex p-1.5 rounded-full border w-full lg:w-auto justify-center"
            style={{
              background: "rgba(22, 33, 39, 0.35)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            {[
              { id: "local", label: "Local (₹/Day)" },
              { id: "outstation", label: "Outstation (₹/Km)" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setRentalType(type.id as any)}
                className="px-5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider font-accent"
                style={
                  rentalType === type.id
                    ? { background: GOLD, color: "#0C1519" }
                    : { background: "transparent", color: "#D8CFC7" }
                }
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Guide Callout */}
        <div 
          className="flex items-start gap-3 mt-6 p-5 border rounded-xl text-xs"
          style={{
            background: "rgba(58, 53, 52, 0.15)",
            borderColor: "rgba(207, 157, 123, 0.15)",
          }}
        >
          <Info size={16} style={{ color: GOLD }} className="flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block font-display text-white text-sm">Rental Rate Details:</span>
            <span className="text-[#D8CFC7]/60 block mt-1.5 font-sans leading-relaxed">
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
