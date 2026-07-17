"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Users, Fuel, ArrowRight, Sparkles } from "lucide-react";
import type { Vehicle, RentalType } from "@/types";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

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
      className="relative rounded-2xl overflow-hidden flex flex-col cursor-pointer glass-panel corner-brackets hover-glow"
      style={{
        boxShadow: hovered
          ? `0 0 35px rgba(207, 157, 123, 0.35), 0 20px 40px rgba(0,0,0,0.55)`
          : "0 0 20px rgba(207, 157, 123, 0.12), 0 4px 20px rgba(0,0,0,0.35)",
        border: hovered ? `1.5px solid ${BRASS}50` : "1.5px solid rgba(207, 157, 123, 0.18)",
        transition: "border 0.3s, box-shadow 0.4s",
      }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-black/30">
        {/* Shimmer — brass */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${BRASS}18 50%, transparent 60%)`,
            transform: hovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.9s ease",
          }}
        />

        <img
          src={resolveImg(v.image, 600, 420)}
          alt={v.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />

        {/* Gradient overlay — Chinese Black */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1519]/90 via-transparent to-transparent" />

        {/* Category + Luxury badge */}
        <div className="absolute top-3 left-3 flex gap-1.5 font-accent tracking-widest text-[9px]">
          <span
            className="px-2.5 py-1 rounded-full font-bold uppercase glass-panel"
            style={{ color: BRASS }}
          >
            {CATEGORY_LABELS[v.category] ?? v.category}
          </span>
          {v.category === "luxury" && (
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-full font-bold glass-panel"
              style={{ color: GOLD }}
            >
              <Sparkles size={8} /> Luxury
            </span>
          )}
          {v.popular && v.category !== "luxury" && (
            <span
              className="px-2.5 py-1 rounded-full font-bold uppercase glass-panel"
              style={{ color: IVORY }}
            >
              Popular
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[9px] text-[#D8CFC7]/40 uppercase tracking-[0.2em] font-mono mb-0.5">{v.brand}</div>
        <h3
          className="font-display font-bold text-lg leading-tight transition-colors duration-300"
          style={{ color: hovered ? GOLD : IVORY }}
        >
          {v.name}
        </h3>

        {/* Pricing */}
        {pricing && (
          <div className="mt-3">
            <div className="font-mono font-bold text-base text-glow-gold" style={{ color: GOLD }}>{pricing.primary}</div>
            <div className="text-[#D8CFC7]/40 text-[10px] font-mono mt-0.5">{pricing.secondary}</div>
          </div>
        )}

        {/* Specs */}
        <div className="flex gap-4 mt-4 font-sans">
          <span className="flex items-center gap-1.5 text-[#D8CFC7]/60 text-xs">
            <Users size={12} style={{ color: BRASS }} />
            <span className="font-mono">{v.seats} Seats</span>
          </span>
          <span className="flex items-center gap-1.5 text-[#D8CFC7]/60 text-xs">
            <Fuel size={12} style={{ color: BRASS }} />
            <span className="font-mono">{v.fuel}</span>
          </span>
          <span className="text-[#D8CFC7]/60 text-xs font-mono">AC</span>
        </div>

        {/* CTAs */}
        <div className="flex gap-2 mt-5 font-accent tracking-widest text-[10px]">
          <Link
            href={`/vehicles/${v.slug}`}
            className="flex-1 text-center py-2.5 rounded-lg transition-all duration-200 glass-panel hover:bg-white/5"
            style={{ color: GOLD }}
          >
            Details
          </Link>
          <Link
            href={`/inquiry?type=vehicle&vehicle=${v.slug}`}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg transition-all duration-200 hover:brightness-110"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }}
          >
            Book Now <ArrowRight size={10} />
          </Link>
        </div>
      </div>

      {/* Animated bottom glow bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
        style={{
          width: hovered ? "100%" : "0%",
          background: `linear-gradient(to right, ${GOLD}, ${BRASS})`,
          boxShadow: hovered ? `0 0 10px ${GOLD}40` : "none",
        }}
      />
    </motion.div>
  );
}
