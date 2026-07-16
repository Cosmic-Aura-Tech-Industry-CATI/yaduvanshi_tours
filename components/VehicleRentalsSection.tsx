"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import { RentalCard } from "@/components/cards/RentalCard";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";
const DARKER = "#131F14";

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
  const carRef = useRef<HTMLDivElement>(null);

  const scrollCar = (dir: "l" | "r") => {
    carRef.current?.scrollBy({ left: dir === "l" ? -340 : 340, behavior: "smooth" });
  };

  const featuredVehicles = FEATURED_SLUGS
    .map((slug) => VEHICLES.find((v) => v.slug === slug))
    .filter(Boolean) as typeof VEHICLES;

  return (
    <section className="py-20 overflow-hidden relative" style={{ background: DARKER }}>
      {/* Background grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 29px, ${GOLD} 30px),
                            repeating-linear-gradient(90deg, transparent, transparent 29px, ${GOLD} 30px)`,
        }}
      />
      {/* Radial ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 800, height: 300,
          background: `radial-gradient(ellipse at top, ${GOLD}10, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <motion.p
              className="font-script text-2xl mb-1"
              style={{ color: GOLD }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Premium Rides
            </motion.p>
            <motion.h2
              className="font-display font-bold text-3xl md:text-4xl text-white"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Car Rentals for Every Journey
            </motion.h2>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
              <div className="w-8 h-px" style={{ background: GOLD }} />
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
