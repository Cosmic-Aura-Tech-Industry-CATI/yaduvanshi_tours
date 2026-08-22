"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, Clock, Users, ArrowRight, Heart } from "lucide-react";
import type { TourPackage } from "@/types";
import { TOUR_PRICING } from "@/data/tours";
import { buildImageUrl, handleImageError } from "@/lib/imageUtils";

const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

interface PackageCardProps {
  pkg: TourPackage;
  index?: number;
}

export function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pricing = TOUR_PRICING[pkg.slug] || (pkg.startingPrice ? { fiveSeater: `₹${pkg.startingPrice.toLocaleString("en-IN")}` } : undefined);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer flex flex-col group glass-panel corner-brackets hover-glow"
      style={{
        boxShadow: hovered
          ? `0 0 35px rgba(207, 157, 123, 0.35), 0 24px 48px rgba(0,0,0,0.55)`
          : "0 0 20px rgba(207, 157, 123, 0.12), 0 4px 16px rgba(0,0,0,0.35)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* ── Image ── */}
      <div className="relative h-72 sm:h-80 md:h-[380px] lg:h-[400px] overflow-hidden">
        <Image
          src={buildImageUrl(pkg.image, 800, 960)}
          alt={pkg.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          onError={handleImageError}
        />

        {/* Shimmer sweep — brass */}
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[900ms] pointer-events-none"
          style={{ background: `linear-gradient(105deg, transparent 40%, ${BRASS}20 50%, transparent 60%)` }}
        />

        {/* Gradient overlay — Chinese Black / Coffee tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1519]/90 via-[#724B39]/20 to-transparent" />

        {/* Duration badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-accent tracking-widest font-semibold uppercase"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }}
        >
          <Clock size={9} className="inline mr-1 -mt-0.5" />
          {pkg.duration.days}D / {pkg.duration.nights}N
        </div>

        {/* Popular badge */}
        {pkg.popular && (
          <div
            className="absolute top-3 left-[5.5rem] px-2.5 py-1 rounded-full text-[9px] font-accent tracking-widest font-semibold uppercase glass-panel"
            style={{ color: GOLD }}
          >
            ⭐ Popular
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center glass-panel transition-all duration-200 hover:scale-110"
        >
          <Heart size={13} className={liked ? "fill-[#CF9D7B] text-[#CF9D7B]" : "text-white"} />
        </button>

        {/* Location chips on image bottom */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {pkg.destinations.slice(0, 3).map((d) => (
            <span
              key={d}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-accent tracking-widest font-medium glass-panel"
              style={{ color: "#D8CFC7" }}
            >
              <MapPin size={7} />
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-display font-semibold text-lg leading-tight mb-2 transition-colors duration-300"
          style={{ color: hovered ? GOLD : IVORY }}
        >
          {pkg.title}
        </h3>

        {/* Stars + reviews */}
        <div className="flex items-center gap-1.5 mb-3 font-mono text-[9px]">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3" viewBox="0 0 20 20"
                style={{ fill: i < Math.floor(pkg.rating) ? GOLD : "rgba(255,255,255,0.12)" }}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[#D8CFC7]/50">{pkg.rating} ({pkg.reviewCount})</span>
          <span className="flex items-center gap-0.5 text-[#D8CFC7]/50 ml-auto">
            <Users size={9} /> Max {pkg.groupSize.max}
          </span>
        </div>

        {/* Pricing section */}
        <div className="mt-auto pt-3" style={{ borderTop: `1px solid rgba(207, 157, 123, 0.15)` }}>
          {pricing?.special ? (
            <div className="space-y-1">
              {pricing.special.map((s) => (
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <span className="text-[#D8CFC7]/50 font-mono">{s.label}</span>
                  <span className="font-bold font-mono text-glow-gold" style={{ color: GOLD }}>{s.price}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {pricing?.fiveSeater && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#D8CFC7]/50 font-mono">5-Seater</span>
                  <span className="font-bold font-mono text-glow-gold" style={{ color: GOLD }}>{pricing.fiveSeater}</span>
                </div>
              )}
              {pricing?.sevenSeater && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#D8CFC7]/50 font-mono">7-Seater</span>
                  <span className="font-semibold font-mono" style={{ color: "#D8CFC7" }}>{pricing.sevenSeater}</span>
                </div>
              )}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex gap-2 mt-3 font-accent tracking-widest text-[10px]">
            <Link
              href={`/tours/${pkg.slug}`}
              className="flex-1 text-center py-2.5 rounded-lg transition-all duration-200 glass-panel hover:bg-white/5"
              style={{ color: GOLD }}
              onClick={(e) => e.stopPropagation()}
            >
              Details
            </Link>
            <Link
              href={`/inquiry?package=${pkg.slug}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg transition-all duration-200 hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }}
              onClick={(e) => e.stopPropagation()}
            >
              Book <ArrowRight size={10} />
            </Link>
          </div>
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
