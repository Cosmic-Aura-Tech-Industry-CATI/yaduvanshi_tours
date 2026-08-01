"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Star, Clock, ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { type TourPackage, TOUR_PRICING } from "@/data/tours";

const GOLD = "#E8B96A";
const BRASS = "#CF9D7B";

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
        <span className="text-lg md:text-xl font-serif font-bold text-[#E8B96A]">
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
  const images = [tour.image, ...(tour.gallery || [])].filter((img, idx, self) => self.indexOf(img) === idx);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 glass-panel"
      style={{
        background: "rgba(58, 53, 52, 0.25)",
        borderColor: "rgba(207, 157, 123, 0.15)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
      }}
    >
      {/* Visual Image */}
      <div className="relative h-72 sm:h-80 md:h-[380px] lg:h-[400px] overflow-hidden bg-black/20">
        {images.map((img, idx) => {
          const isActive = currentImgIdx === idx;
          const isNext = (currentImgIdx + 1) % images.length === idx;
          if (!isActive && !isNext) return null;

          return (
            <Image
              key={img}
              src={resolveImg(img, 800, 960)}
              alt={tour.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={isActive ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 10 : 0,
              }}
            />
          );
        })}
        {/* Layer of gradient overlay on top of slide */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20 pointer-events-none" />
        
        <div className="absolute top-4 left-4 z-20">
          <RegionBadge region={tour.region} />
        </div>
        <div 
          className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold backdrop-blur-md border border-white/10 z-20"
          style={{ background: "rgba(22, 33, 39, 0.72)", color: GOLD }}
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
        <div className="mt-auto pt-3 border-t border-white/5">
          {/* Detailed vehicle pricing ranges */}
          {(() => {
            const pricing = TOUR_PRICING[tour.slug];
            if (pricing?.special) {
              return (
                <div className="space-y-1 mb-3">
                  {pricing.special.map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-xs">
                      <span className="text-[#D8CFC7]/50 font-mono">{s.label}</span>
                      <span className="font-bold font-mono text-[#E8B96A]">{s.price}</span>
                    </div>
                  ))}
                </div>
              );
            }
            return (
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#D8CFC7]/50 font-mono">5-Seater Range</span>
                  <span className="font-bold font-mono text-[#E8B96A]">
                    {pricing?.fiveSeater || `${formatIndianCurrency(tour.startingPrice)}–${formatIndianCurrency(Math.round(tour.startingPrice * 1.15))}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#D8CFC7]/50 font-mono">7-Seater Range</span>
                  <span className="font-semibold font-mono text-[#D8CFC7]">
                    {pricing?.sevenSeater || `${formatIndianCurrency(Math.round(tour.startingPrice * 1.35))}–${formatIndianCurrency(Math.round(tour.startingPrice * 1.5))}`}
                  </span>
                </div>
              </div>
            );
          })()}

          <div className="flex gap-2.5 mt-4 font-accent tracking-widest text-[10px]">
            <Link
              href={`/tours/${tour.slug}`}
              className="flex-1 text-center py-2.5 rounded-lg transition-all duration-200 glass-panel hover:bg-white/5 border border-white/10"
              style={{ color: GOLD }}
            >
              Details
            </Link>
            <Link
              href={`/inquiry?package=${tour.slug}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg transition-all duration-200 hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }}
            >
              Book <ArrowRight size={10} />
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
