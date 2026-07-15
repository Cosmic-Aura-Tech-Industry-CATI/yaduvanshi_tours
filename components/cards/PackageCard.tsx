"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { MapPin, Clock, Users, ArrowRight, Heart } from "lucide-react";
import type { TourPackage } from "@/types";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

const resolveImg = (src: string, w: number, h: number) =>
  src.startsWith("/")
    ? src
    : `https://images.unsplash.com/${src}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

// Pricing data per spec
const PKG_PRICING: Record<string, { fiveSeater?: string; sevenSeater?: string; special?: { label: string; price: string }[] }> = {
  "ayodhya-darshan":        { fiveSeater: "₹5,500–6,200",  sevenSeater: "₹7,500–8,200" },
  "mathura-vrindavan":      { fiveSeater: "₹11,000–11,700", sevenSeater: "₹15,000–15,700" },
  "kashi-vishwanath":       { fiveSeater: "₹10,500–11,200", sevenSeater: "₹12,500–13,200" },
  "neem-karoli-kainchi-dham": { fiveSeater: "₹11,500–13,000", sevenSeater: "₹14,500–16,500" },
  "mahakal-omkareshwar":    { fiveSeater: "₹20,000–21,000", sevenSeater: "₹26,000–27,000" },
  "kullu-manali":           { fiveSeater: "₹32,000–33,800", sevenSeater: "₹42,000–43,800" },
  "vaishno-devi-kashmir":   { fiveSeater: "₹40,000–43,500", sevenSeater: "₹50,000–53,500" },
  "char-dham-yatra":        { special: [{ label: "17-Seater Tempo", price: "₹1,40,000" }, { label: "26-Seater Bus", price: "₹1,90,000" }] },
};

interface PackageCardProps {
  pkg: TourPackage;
  index?: number;
}

export function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pricing = PKG_PRICING[pkg.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col group"
      style={{
        boxShadow: hovered
          ? `0 24px 48px rgba(0,0,0,0.18), 0 0 0 1.5px ${GOLD}50`
          : "0 4px 16px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* ── Image ── */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={resolveImg(pkg.image, 520, 420)}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />

        {/* Shimmer sweep */}
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[900ms] pointer-events-none"
          style={{ background: `linear-gradient(105deg, transparent 40%, ${GOLD}18 50%, transparent 60%)` }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        {/* Duration badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{ background: GOLD, color: DARK }}
        >
          <Clock size={9} className="inline mr-1 -mt-0.5" />
          {pkg.duration.days}D / {pkg.duration.nights}N
        </div>

        {/* Popular badge */}
        {pkg.popular && (
          <div
            className="absolute top-3 left-[5.5rem] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: "rgba(0,0,0,0.55)", color: "white", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            ⭐ Popular
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)" }}
        >
          <Heart size={13} className={liked ? "fill-red-500 text-red-500" : "text-white"} />
        </button>

        {/* Location chips on image bottom */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {pkg.destinations.slice(0, 3).map((d) => (
            <span
              key={d}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.52)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.18)" }}
            >
              <MapPin size={7} />
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-display font-bold text-[15px] leading-tight mb-2 transition-colors duration-300"
          style={{ color: hovered ? GOLD : "#111827" }}
        >
          {pkg.title}
        </h3>

        {/* Stars + reviews */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3" viewBox="0 0 20 20"
                style={{ fill: i < Math.floor(pkg.rating) ? "#f59e0b" : "#e5e7eb" }}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-mono">{pkg.rating} ({pkg.reviewCount})</span>
          <span className="flex items-center gap-0.5 text-[10px] text-gray-400 font-mono ml-auto">
            <Users size={9} /> Max {pkg.groupSize.max}
          </span>
        </div>

        {/* Pricing section */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          {pricing?.special ? (
            <div className="space-y-1">
              {pricing.special.map((s) => (
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono">{s.label}</span>
                  <span className="font-bold font-mono" style={{ color: GOLD }}>{s.price}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {pricing?.fiveSeater && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono">5-Seater</span>
                  <span className="font-bold font-mono" style={{ color: GOLD }}>{pricing.fiveSeater}</span>
                </div>
              )}
              {pricing?.sevenSeater && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono">7-Seater</span>
                  <span className="font-semibold font-mono text-gray-600">{pricing.sevenSeater}</span>
                </div>
              )}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex gap-2 mt-3">
            <Link
              href={`/tours/${pkg.slug}`}
              className="flex-1 text-center text-xs font-semibold py-2 rounded-lg border transition-all duration-200 hover:bg-gray-50"
              style={{ borderColor: `${GOLD}60`, color: GOLD }}
              onClick={(e) => e.stopPropagation()}
            >
              View Details
            </Link>
            <Link
              href={`/inquiry?package=${pkg.slug}`}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 hover:brightness-90"
              style={{ background: GOLD, color: DARK }}
              onClick={(e) => e.stopPropagation()}
            >
              Book <ArrowRight size={10} />
            </Link>
          </div>
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
