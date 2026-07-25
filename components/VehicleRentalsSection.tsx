"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
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
    <div id="vehicles-section">
      {/* ── Hero Header ── */}
      <section className="relative pt-28 sm:pt-32 md:pt-40 pb-12 md:pb-16 min-h-[280px] sm:min-h-[320px] md:min-h-[420px] flex flex-col justify-end px-6 lg:px-12 overflow-hidden z-10" style={{ background: "#0C1519" }}>
        {/* Hero Background Image - High Visibility */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-85"
          style={{ backgroundImage: "url('/images/vehicle-hero-bg.webp')" }}
        />
        
        {/* Balanced gradient overlay for maximum car visibility without text glare */}
        <div 
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/30 to-[#0C1519]"
        />

        {/* Ambient blobs */}
        <div className="ambient-blob-brass z-20" style={{ top: "-80px", left: "20%" }} />
        <div className="ambient-blob-coffee z-20" style={{ bottom: "-60px", right: "15%" }} />

        {/* Top glow divider */}
        <div className="glow-divider absolute top-0 inset-x-0 z-20" />

        <div className="max-w-7xl mx-auto relative z-30">
          {/* Header */}
          <div className="mb-10">
            <motion.p
              className="font-script text-2xl sm:text-3xl md:text-4xl mb-1"
              style={{ color: BRASS }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Premium Fleet
            </motion.p>
            <motion.h2
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-glow-gold"
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
      </section>

      {/* ── Fleet Grid (Immediate transition below hero header) ── */}
      <section className="pb-20 pt-10 px-6 lg:px-12 relative overflow-hidden" style={{ background: "#0C1519" }}>
        {/* Background grid texture — coffee */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 29px, ${COFFEE} 30px),
                              repeating-linear-gradient(90deg, transparent, transparent 29px, ${COFFEE} 30px)`,
          }}
        />

        {/* Ambient blobs */}
        <div className="ambient-blob-brass" style={{ top: "-80px", left: "20%" }} />
        <div className="ambient-blob-coffee" style={{ bottom: "-60px", right: "15%" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Static Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map((v, i) => (
              <RentalCard key={v.slug} vehicle={v} index={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold font-accent tracking-widest rounded-sm text-xs transition-all duration-300 btn-glow"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }}
            >
              Explore Full Fleet <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
