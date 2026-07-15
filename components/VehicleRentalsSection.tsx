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

          {/* Controls */}
          <div className="flex items-center gap-3">
            <Link
              href="/vehicles"
              className="hidden md:inline-flex items-center gap-1.5 text-sm border px-5 py-2.5 rounded-sm transition-all duration-300"
              style={{ borderColor: `${GOLD}50`, color: GOLD }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `${GOLD}18`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              See Full Fleet <ArrowRight size={13} />
            </Link>
            <button
              onClick={() => scrollCar("l")}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105"
              style={{ borderColor: `${GOLD}50`, color: GOLD }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = `${GOLD}18`)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollCar("r")}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105"
              style={{ borderColor: `${GOLD}50`, color: GOLD }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = `${GOLD}18`)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredVehicles.map((v, i) => (
            <div key={v.slug} className="flex-none w-[290px] snap-start">
              <RentalCard vehicle={v} index={i} />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-10 md:hidden">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-sm text-sm transition-all hover:brightness-90"
            style={{ background: GOLD, color: DARK }}
          >
            See Full Fleet <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
