"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Users, ArrowRight, Sparkles } from "lucide-react";
import type { Vehicle, RentalType } from "@/types";

const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

const resolveImg = (src: string, w: number, h: number) =>
  src.startsWith("/")
    ? src
    : `https://images.unsplash.com/${src}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

const CATEGORY_LABELS: Record<string, string> = {
  sedan: "Sedan",
  mpv: "MPV",
  suv: "SUV",
  urbania: "Urbania",
  luxury: "Luxury",
  hatchback: "Hatchbacks",
  "tempo-traveller": "Tempo Traveller",
  bus: "Bus",
};

interface RentalCardProps {
  vehicle: Vehicle;
  rentalType?: RentalType;
  index?: number;
}

export function RentalCard({ vehicle: v, index = 0 }: RentalCardProps) {
  const [hovered, setHovered] = useState(false);

  const isFeatured = [
    "bmw-5-series",
    "force-urbania",
    "force-urbania-17-seater",
    "maruti-dzire",
    "maruti-ertiga",
    "toyota-fortuner",
    "toyota-innova-crysta",
    "honda-city",
    "hyundai-verna",
    "mahindra-scorpio",
    "audi-a6",
    "mercedes-benz"
  ].includes(v.slug);

  // Dynamic specifications notes tags extraction
  const getExtraTags = (vehicle: Vehicle) => {
    const tags = [];
    
    // AC Cabin status
    tags.push(vehicle.ac ? "AC" : "Non-AC");
    
    // Transmission
    if (vehicle.transmission) {
      tags.push(vehicle.transmission);
    }
    
    // Check extra charges / specs
    if (vehicle.tollsExtraNote) {
      const note = vehicle.tollsExtraNote.toLowerCase();
      if (note.includes("allowance")) {
        tags.push("Driver Allowance Extra");
      }
      if (note.includes("toll")) {
        tags.push("Toll Tax Extra");
      }
    }

    // Bus special specs
    if (vehicle.specs.Comfort) {
      vehicle.specs.Comfort.split(",").forEach(item => {
        const cleaned = item.trim();
        if (cleaned) tags.push(cleaned);
      });
    }

    // Luxury special premium status
    if (vehicle.category === "luxury") {
      tags.push("Premium Interior");
    }

    // Keep unique tags, max 4
    return Array.from(new Set(tags)).slice(0, 4);
  };

  const extraTags = getExtraTags(v);
  const categoryLabel = (CATEGORY_LABELS[v.category] ?? v.category).toUpperCase();

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
      {/* Image Area: Pure clean white studio backdrop for featured, clean premium text-card style for others */}
      <div 
        className="relative h-64 flex items-center justify-center p-6 overflow-hidden transition-colors duration-300"
        style={{
          background: isFeatured ? "#FFFFFF" : "rgba(22, 33, 39, 0.4)"
        }}
      >
        {isFeatured ? (
          <>
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: `linear-gradient(105deg, transparent 40%, rgba(207, 157, 123, 0.08) 50%, transparent 60%)`,
                transform: hovered ? "translateX(100%)" : "translateX(-100%)",
                transition: "transform 0.9s ease",
              }}
            />

            <img
              src={resolveImg(v.image, 600, 420)}
              alt={v.name}
              className="w-full h-full object-contain transition-transform duration-700 relative z-0"
              style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(232,185,106,0.3)]">🚗</span>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono block text-[#E8B96A]">
                {v.brand} {v.name}
              </span>
              <span className="text-[9px] font-sans text-[#D8CFC7]/40 block uppercase tracking-wider">
                Fleet Details Available Below
              </span>
            </div>
          </div>
        )}

        {/* Popular/Luxury badges on image area */}
        <div className="absolute top-3 left-3 flex gap-1.5 font-accent tracking-widest text-[8px] z-10">
          {v.category === "luxury" && (
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-full font-bold bg-[#0C1519]/75 text-[#E8B96A] border border-[#E8B96A]/20 backdrop-blur-sm"
            >
              <Sparkles size={8} /> Luxury
            </span>
          )}
          {v.popular && v.category !== "luxury" && (
            <span
              className="px-2.5 py-1 rounded-full font-bold uppercase bg-[#0C1519]/75 text-[#F5F0EA] border border-white/10 backdrop-blur-sm"
            >
              Popular
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category Label (Gold, Small, Uppercase, High-Contrast) */}
        <div 
          className="text-[10px] font-bold uppercase tracking-[0.25em] font-accent mb-1.5"
          style={{ color: GOLD }}
        >
          {categoryLabel}
        </div>

        {/* Vehicle Name & Seats Row */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3
            className="font-display font-bold text-lg leading-tight transition-colors duration-300 flex-1 text-white group-hover:text-[#E8B96A]"
            style={{ color: hovered ? GOLD : IVORY }}
          >
            {v.name}
          </h3>
          <div 
            className="flex items-center gap-1 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border flex-shrink-0"
            style={{ 
              borderColor: "rgba(207, 157, 123, 0.2)", 
              background: "rgba(207, 157, 123, 0.05)",
              color: BRASS 
            }}
          >
            <Users size={11} />
            <span>{v.seats} Seats</span>
          </div>
        </div>

        {/* Pricing Rows */}
        <div className="space-y-1 mt-1 font-sans text-xs">
          {v.category === "luxury" ? (
            <div className="flex items-baseline gap-1 text-[#D8CFC7]/75">
              <span className="font-semibold">Rental Price:</span>
              <span className="font-mono font-bold text-[#E8B96A] text-sm">
                ₹{v.localPriceDay.min.toLocaleString("en-IN")} – ₹{v.localPriceDay.max.toLocaleString("en-IN")}
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-1 text-[#D8CFC7]/75">
                <span className="font-semibold min-w-[75px]">Local:</span>
                <span className="font-mono font-bold text-[#E8B96A] text-sm">
                  ₹{v.localPriceDay.min.toLocaleString("en-IN")} – ₹{v.localPriceDay.max.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-baseline gap-1 text-[#D8CFC7]/75">
                <span className="font-semibold min-w-[75px]">Outstation:</span>
                <span className="font-mono font-bold text-[#E8B96A] text-sm">
                  ₹{v.outstationPriceKm.min} – ₹{v.outstationPriceKm.max}/km
                </span>
              </div>
            </>
          )}
        </div>

        {/* Extra Notes Tags */}
        {extraTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {extraTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-mono font-bold"
                style={{ 
                  background: "rgba(207, 157, 123, 0.08)", 
                  border: "1px solid rgba(207, 157, 123, 0.12)", 
                  color: BRASS 
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons (Details + Book Now / Check Vehicle) */}
        <div className="flex gap-2 mt-5 font-accent tracking-widest text-[9px] uppercase font-bold">
          <Link
            href={`/vehicles/${v.slug}`}
            className="flex-1 text-center py-2.5 rounded-lg transition-all duration-200 border border-[#E8B96A]/30 text-[#E8B96A] hover:bg-white/5"
          >
            Details
          </Link>
          <Link
            href={`/inquiry?type=vehicle&vehicle=${v.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all duration-200 hover:brightness-110"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }}
          >
            {v.category === "luxury" ? "Check Vehicle" : "Book Now"} <ArrowRight size={10} />
          </Link>
        </div>
      </div>

      {/* Bottom glowing line on hover */}
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
