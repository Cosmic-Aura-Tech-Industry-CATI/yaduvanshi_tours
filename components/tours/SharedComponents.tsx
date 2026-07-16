"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Star, Clock, ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import type { TourPackage } from "@/data/tours";

const GOLD = "#C9A84C";

// Image resolver for both local assets and Unsplash CDN keys
export const resolveImg = (src: string, w: number, h: number) =>
  src.startsWith("/")
    ? src
    : `https://images.unsplash.com/${src}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

// Region Badge with premium themed colors
export function RegionBadge({ region }: { region: TourPackage["region"] }) {
  const configs = {
    pilgrimage: { bg: "rgba(224,130,38,0.12)", border: "rgba(224,130,38,0.3)", text: "#E08226", label: "Pilgrimage" },
    north: { bg: "rgba(14,116,144,0.12)", border: "rgba(14,116,144,0.3)", text: "#0E7490", label: "North India" },
    west: { bg: "rgba(217,119,6,0.12)", border: "rgba(217,119,6,0.3)", text: "#D97706", label: "West India" },
    south: { bg: "rgba(22,163,74,0.12)", border: "rgba(22,163,74,0.3)", text: "#16A34A", label: "South India" },
  };

  const current = configs[region] || configs.north;

  return (
    <span 
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border"
      style={{ backgroundColor: current.bg, borderColor: current.border, color: current.text }}
    >
      {current.label}
    </span>
  );
}

// Indian Comma Currency Formatter
export function formatIndianCurrency(num: number): string {
  const str = num.toString();
  const lastThree = str.substring(str.length - 3);
  const otherNumbers = str.substring(0, str.length - 3);
  if (otherNumbers !== "") {
    return "₹" + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  }
  return "₹" + lastThree;
}

// Reusable PriceTag Component
export function PriceTag({ price, type }: { price: number; type: TourPackage["pricingType"] }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-1">
        <span className="text-lg md:text-xl font-serif font-bold text-[#C9A84C]">
          {formatIndianCurrency(price)}
        </span>
        <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
          {type === "fixed-fleet" ? "fixed fleet" : "per vehicle"}
        </span>
      </div>
    </div>
  );
}

// Reusable TourCard Component
export function TourCard({ tour }: { tour: TourPackage }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(201,168,76,0.12)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
      }}
    >
      {/* Visual Image */}
      <div className="relative h-56 overflow-hidden bg-black/20">
        <img
          src={resolveImg(tour.image, 500, 360)}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <RegionBadge region={tour.region} />
        </div>
        <div 
          className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold backdrop-blur-md border border-white/10"
          style={{ background: "rgba(19,31,20,0.72)", color: GOLD }}
        >
          <Clock size={12} /> {tour.durationDays} Days
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Star size={11} className="fill-current" style={{ color: GOLD }} />
            <span className="text-[10px] font-mono text-white/60 font-bold">
              {tour.rating} ({tour.reviewsCount} reviews)
            </span>
          </div>
          <h4 className="font-serif text-lg font-bold text-white/95 leading-snug line-clamp-1">
            {tour.name}
          </h4>
          <p className="text-white/60 text-xs font-sans leading-relaxed line-clamp-2">
            {tour.tagline}
          </p>
        </div>

        {/* Footer actions */}
        <div>
          <div className="h-px w-full mb-4 bg-gradient-to-r from-white/10 to-transparent" />
          <div className="flex items-center justify-between">
            <PriceTag price={tour.startingPrice} type={tour.pricingType} />
            <Link
              href={`/tours/${tour.slug}`}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 border hover:scale-105"
              style={{ borderColor: "rgba(201,168,76,0.3)", color: GOLD }}
            >
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Scrolling count-up numbers
export function CountUpNumber({ end, suffix = "" }: { end: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  // Extract pure number from string (e.g. 10000 -> 10000)
  const numericEnd = parseInt(end.replace(/[^0-9]/g, ""), 10) || 0;

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / numericEnd));
    const increment = Math.max(Math.floor(numericEnd / 60), 1);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericEnd) {
        setCount(numericEnd);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [numericEnd, isInView]);

  return (
    <span ref={ref} className="font-serif text-3xl md:text-4xl font-bold text-white">
      {count.toLocaleString()}{suffix}
    </span>
  );
}
