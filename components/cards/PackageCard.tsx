"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { MapPin, Heart, Clock, Users } from "lucide-react";
import { Stars } from "../ui/Stars";
import { Badge } from "../ui/badge";
import type { TourPackage } from "@/types";

const GOLD = "#C9A84C";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

interface PackageCardProps {
  pkg: TourPackage;
  index?: number;
}

export function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#C9A84C]/30 transition-all duration-500 group cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={IMG(pkg.image, 480, 320)}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute top-3 left-3">
          <Badge variant="gold">{pkg.duration.days}D / {pkg.duration.nights}N</Badge>
        </div>

        {pkg.popular && (
          <div className="absolute top-3 left-[4.5rem]">
            <Badge variant="dark">Popular</Badge>
          </div>
        )}

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart size={13} className={liked ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 pb-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-1 truncate font-mono">
          <MapPin size={9} />
          {pkg.destinations.slice(0, 3).join(" · ")}
        </div>

        <h3 className="font-display font-semibold text-gray-900 text-base mb-1 group-hover:text-[#C9A84C] transition-colors duration-300">
          {pkg.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <Stars rating={pkg.rating} />
          <span className="text-xs text-gray-400 font-mono">({pkg.reviewCount})</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400 font-mono mb-3">
          <span className="flex items-center gap-1"><Clock size={10} /> {pkg.duration.days}D/{pkg.duration.nights}N</span>
          <span className="flex items-center gap-1"><Users size={10} /> Max {pkg.groupSize.max} pax</span>
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 mt-auto">
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              {pkg.slug === "char-dham-yatra" ? "Tempo (17-seat)" : "Per Vehicle"}
            </div>
            <div className="font-mono font-semibold text-sm" style={{ color: GOLD }}>
              ₹{pkg.packagePrice.toLocaleString("en-IN")}
            </div>
          </div>
          <Link
            href={`/tours/${pkg.slug}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-sm transition-all hover:brightness-90"
            style={{ background: GOLD, color: "#1A2B1C" }}
            onClick={(e) => e.stopPropagation()}
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Gold bottom bar on hover */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: GOLD }} />
    </motion.div>
  );
}
