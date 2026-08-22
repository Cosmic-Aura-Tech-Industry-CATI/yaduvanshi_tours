"use client";

import { useState, useMemo, memo } from "react";
import Image from "next/image";
import { VEHICLES } from "@/data/vehicles";
import { RentalCard } from "@/components/cards/RentalCard";
import { Info } from "lucide-react";
import type { Vehicle, RentalType } from "@/types";

const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";

const CATEGORIES = ["All", "Hatchback", "Sedan", "SUV", "MPV", "Luxury", "Tempo-Traveller", "Urbania", "Bus"];

const VehicleGrid = memo(function VehicleGrid({
  vehicles,
  rentalType,
}: {
  vehicles: Vehicle[];
  rentalType: RentalType;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {vehicles.map((vehicle, idx) => (
        <RentalCard
          key={vehicle.slug}
          vehicle={vehicle}
          rentalType={rentalType}
          index={idx}
        />
      ))}
    </div>
  );
});

export function VehiclesClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [rentalType, setRentalType] = useState<RentalType>("local");
  const [activeSeats, setActiveSeats] = useState("All");
  const [selfDriveOnly, setSelfDriveOnly] = useState(false);

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((vehicle) => {
      const matchesCategory =
        activeCategory === "All" ||
        vehicle.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesSeats =
        activeSeats === "All" ||
        (activeSeats === "4-5" && vehicle.seats <= 5) ||
        (activeSeats === "6-7" && vehicle.seats >= 6 && vehicle.seats <= 7) ||
        (activeSeats === "12+" && vehicle.seats >= 12);

      const matchesSelfDrive = !selfDriveOnly || vehicle.selfDriveAvailable;

      return matchesCategory && matchesSeats && matchesSelfDrive;
    });
  }, [activeCategory, activeSeats, selfDriveOnly]);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-8 relative z-10">
      {/* Controls Container */}
      <div
        className="flex flex-col gap-5 p-4 rounded-xl border glass-panel"
        style={{
          background: "rgba(58, 53, 52, 0.25)",
          borderColor: "rgba(207, 157, 123, 0.15)",
        }}
      >
        {/* Row 1: Category Filters */}
        <div className="flex gap-2 w-full overflow-x-auto pb-1 custom-scrollbar">
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

        {/* Row 2: Secondary filters (Seats & Self-drive & Pricing type) */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between pt-4 border-t border-white/5">
          {/* Seating Capacity Selector */}
          <div className="flex gap-2.5 items-center w-full lg:w-auto">
            <span className="text-[10px] text-[#D8CFC7]/50 font-bold uppercase tracking-widest font-accent">Seats:</span>
            <div className="flex gap-1 bg-[#162127]/35 p-1 rounded-full border border-white/5">
              {["All", "4-5", "6-7", "12+"].map((seat) => (
                <button
                  key={seat}
                  onClick={() => setActiveSeats(seat)}
                  className="px-3.5 py-1.5 text-[9px] font-bold rounded-full transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider font-accent"
                  style={
                    activeSeats === seat
                      ? { background: GOLD, color: "#0C1519" }
                      : { background: "transparent", color: "#D8CFC7" }
                  }
                >
                  {seat === "All" ? "All Seats" : `${seat} Seats`}
                </button>
              ))}
            </div>
          </div>

          {/* Self-Drive Filter */}
          <div className="flex w-full lg:w-auto justify-start">
            <button
              onClick={() => setSelfDriveOnly(!selfDriveOnly)}
              className="px-4 py-2 text-[9px] font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider font-accent"
              style={
                selfDriveOnly
                  ? { background: GOLD, borderColor: GOLD, color: "#0C1519" }
                  : { background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "#D8CFC7" }
              }
            >
              ?? Self-Drive Only
            </button>
          </div>

          {/* Pricing Toggle */}
          <div
            className="flex p-1 rounded-full border w-full lg:w-auto justify-center"
            style={{
              background: "rgba(22, 33, 39, 0.35)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            {[
              { id: "local", label: "Local (?/Day)" },
              { id: "outstation", label: "Outstation (?/Km)" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setRentalType(type.id as "local" | "outstation")}
                className="px-4 py-1.5 text-[10px] font-bold rounded-full transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider font-accent"
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
      </div>

      {/* Fleet Grid */}
      <VehicleGrid vehicles={filteredVehicles} rentalType={rentalType} />

      {/* Pricing Guide Callout */}
      <div
        className="flex items-start gap-3 mt-12 p-5 border rounded-xl text-xs"
        style={{
          background: "rgba(58, 53, 52, 0.15)",
          borderColor: "rgba(207, 157, 123, 0.15)",
        }}
      >
        <Info size={16} style={{ color: GOLD }} className="flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block font-display text-white text-sm">Rental Rate Details:</span>
          <span className="text-[#D8CFC7]/60 block mt-1.5 font-sans leading-relaxed">
            � <strong>Local Package:</strong> Pricing is calculated on standard 8 Hours / 80 Kilometers base packages.<br />
            � <strong>Outstation Package:</strong> Billed per kilometer with a minimum billing of 250km (or 300km for coaches/Urbania) per day. Driver allowances apply extra.
          </span>
        </div>
      </div>
    </div>
  );
}
