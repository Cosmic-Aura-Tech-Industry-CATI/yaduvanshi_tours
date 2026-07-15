"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Users, Fuel, ArrowRight, Sparkles } from "lucide-react";
import type { Vehicle, RentalType } from "@/types";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

const resolveImg = (src: string, w: number, h: number) =>
  src.startsWith("/")
    ? src
    : `https://images.unsplash.com/${src}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

// Pricing override per spec
const VEHICLE_PRICING: Record<string, { primary: string; secondary: string }> = {
  "toyota-innova-crysta": { primary: "₹3,200–4,500/day", secondary: "₹18–22/km outstation" },
  "maruti-dzire":         { primary: "₹2,000–2,700/day", secondary: "₹11–14/km outstation" },
  "toyota-fortuner":      { primary: "₹22,000–30,000/day", secondary: "₹28–35/km outstation" },
  "force-urbania":        { primary: "₹8,500–11,000/day", secondary: "₹32–36/km outstation" },
  "bmw-5-series":         { primary: "₹20,000–25,000/day", secondary: "Premium chauffeur" },
  "maruti-ertiga":        { primary: "₹2,500–3,200/day", secondary: "₹13–17/km outstation" },
};

const CATEGORY_LABELS: Record<string, string> = {
  sedan: "Sedan",
  mpv: "MPV",
  suv: "SUV",
  urbania: "Coach",
  luxury: "Luxury",
};

interface RentalCardProps {
  vehicle: Vehicle;
  rentalType?: RentalType;
  index?: number;
}

export function RentalCard({ vehicle: v, rentalType: _rentalType, index = 0 }: RentalCardProps) {
  const [hovered, setHovered] = useState(false);
  const pricing = VEHICLE_PRICING[v.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
        border: hovered ? `1.5px solid ${GOLD}60` : "1.5px solid rgba(255,255,255,0.08)",
        boxShadow: hovered ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${GOLD}18` : "0 4px 20px rgba(0,0,0,0.25)",
        backdropFilter: "blur(8px)",
        transition: "border 0.3s, box-shadow 0.4s",
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-black/30">
        {/* Shimmer */}
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full z-10 pointer-events-none transition-transform duration-[900ms]"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${GOLD}15 50%, transparent 60%)`,
            transform: hovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.9s ease",
          }}
        />

        <img
          src={resolveImg(v.image, 600, 380)}
          alt={v.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category + Luxury badge */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}50`, backdropFilter: "blur(6px)" }}
          >
            {CATEGORY_LABELS[v.category] ?? v.category}
          </span>
          {v.category === "luxury" && (
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
              style={{ background: "rgba(0,0,0,0.5)", color: GOLD, backdropFilter: "blur(6px)", border: `1px solid ${GOLD}40` }}
            >
              <Sparkles size={8} /> Luxury
            </span>
          )}
          {v.popular && v.category !== "luxury" && (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase"
              style={{ background: "rgba(0,0,0,0.5)", color: "white", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Popular
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[9px] text-white/35 uppercase tracking-[0.2em] font-mono mb-0.5">{v.brand}</div>
        <h3
          className="font-display font-bold text-base leading-tight transition-colors duration-300"
          style={{ color: hovered ? GOLD : "white" }}
        >
          {v.name}
        </h3>

        {/* Pricing */}
        {pricing && (
          <div className="mt-2">
            <div className="font-mono font-bold text-sm" style={{ color: GOLD }}>{pricing.primary}</div>
            <div className="text-white/40 text-[10px] font-mono mt-0.5">{pricing.secondary}</div>
          </div>
        )}

        {/* Specs */}
        <div className="flex gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-white/55 text-xs">
            <Users size={11} style={{ color: GOLD }} />
            <span className="font-mono">{v.seats} Seats</span>
          </span>
          <span className="flex items-center gap-1.5 text-white/55 text-xs">
            <Fuel size={11} style={{ color: GOLD }} />
            <span className="font-mono">{v.fuel}</span>
          </span>
          <span className="text-white/55 text-xs font-mono">AC</span>
        </div>

        {/* CTAs */}
        <div className="flex gap-2 mt-4">
          <Link
            href={`/vehicles/${v.slug}`}
            className="flex-1 text-center text-xs font-semibold py-2.5 rounded-lg border transition-all duration-200"
            style={{ borderColor: `${GOLD}50`, color: GOLD }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${GOLD}15`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Details
          </Link>
          <Link
            href={`/inquiry?type=vehicle&vehicle=${v.slug}`}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 hover:brightness-90"
            style={{ background: GOLD, color: DARK }}
          >
            Book Now <ArrowRight size={10} />
          </Link>
        </div>
      </div>

      {/* Animated bottom gold bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
        style={{ width: hovered ? "100%" : "0%", background: GOLD }}
      />
    </motion.div>
  );
}
