"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { VEHICLES } from "@/data/vehicles";
import { RentalCard } from "@/components/cards/RentalCard";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

// The 6 featured vehicles per spec
const FEATURED_SLUGS = [
  "toyota-innova-crysta",
  "maruti-dzire",
  "toyota-fortuner",
  "force-urbania",
  "bmw-5-series",
  "maruti-ertiga",
];

export function VehicleRentalsSection() {
  const featuredVehicles = FEATURED_SLUGS
    .map((slug) => VEHICLES.find((v) => v.slug === slug))
    .filter(Boolean) as typeof VEHICLES;

  return (
    <section className="py-20 overflow-hidden relative" style={{ background: "#0C1519" }}>
      {/* Background grid texture — coffee */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 29px, ${COFFEE} 30px),
                            repeating-linear-gradient(90deg, transparent, transparent 29px, ${COFFEE} 30px)`,
        }}
      />

      {/* Ambient glow blobs */}
      <div className="ambient-blob-brass" style={{ top: "-80px", left: "20%" }} />
      <div className="ambient-blob-coffee" style={{ bottom: "-60px", right: "15%" }} />

      {/* Top glow divider */}
      <div className="glow-divider absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <motion.p
              className="font-script text-2xl mb-1"
              style={{ color: BRASS }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Premium Fleet
            </motion.p>
            <motion.h2
              className="font-display font-bold text-3xl md:text-4xl text-glow-gold"
              style={{ color: GOLD }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Royal Fleet & Car Rentals
            </motion.h2>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-8 h-px" style={{ background: `linear-gradient(to right, ${BRASS}, transparent)` }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: BRASS, boxShadow: `0 0 6px ${BRASS}60` }} />
              <div className="w-8 h-px" style={{ background: `linear-gradient(to left, ${BRASS}, transparent)` }} />
            </div>
          </div>
        </div>

        {/* Static Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {featuredVehicles.map((v, i) => (
            <RentalCard key={v.slug} vehicle={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
