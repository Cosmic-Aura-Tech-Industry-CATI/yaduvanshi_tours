"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Users, Fuel, Wind, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import type { Vehicle, RentalType } from "@/types";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

interface RentalCardProps {
  vehicle: Vehicle;
  rentalType?: RentalType;
  index?: number;
}

export function RentalCard({ vehicle: v, rentalType = "local", index = 0 }: RentalCardProps) {
  const priceLabel =
    rentalType === "local" || rentalType === "self-drive"
      ? `₹${v.localPriceDay.min.toLocaleString("en-IN")}–${v.localPriceDay.max.toLocaleString("en-IN")}/day`
      : `₹${v.outstationPriceKm.min}–${v.outstationPriceKm.max}/km`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#C9A84C]/30 transition-all duration-500 group flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        {/* Shimmer on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[900ms] bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.12)] to-transparent z-10" />
        <img
          src={IMG(v.image, 600, 360)}
          alt={v.name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
        />

        {v.popular && (
          <div className="absolute top-3 left-3">
            <Badge variant="gold">Popular</Badge>
          </div>
        )}
        {v.selfDriveAvailable && (
          <div className="absolute top-3 right-3">
            <Badge variant="dark">Self Drive</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-0.5">{v.brand}</div>
        <h3 className="font-display font-semibold text-gray-900 text-base group-hover:text-[#C9A84C] transition-colors duration-300">
          {v.name}
        </h3>

        <div className="font-mono font-semibold text-sm mt-1" style={{ color: GOLD }}>
          {priceLabel}
        </div>

        {/* Specs row */}
        <div className="flex flex-wrap gap-3 mt-3">
          {[
            { Icon: Users, label: `${v.seats} Seats` },
            { Icon: Fuel,  label: v.fuel },
            { Icon: Wind,  label: "AC" },
          ].map(({ Icon, label }) => (
            <motion.div
              key={label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-1 text-gray-500"
            >
              <Icon size={11} />
              <span className="text-[11px] font-mono">{label}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-auto pt-3 flex items-center gap-2">
          <Link
            href={`/vehicles/${v.slug}`}
            className="flex-1 text-center text-xs font-semibold py-2 rounded-sm border transition-all hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#1A2B1C]"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            View Details
          </Link>
          <Link
            href={`/inquiry?type=vehicle&vehicle=${v.slug}&rental=${rentalType}`}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-sm transition-all hover:brightness-90"
            style={{ background: GOLD, color: DARK }}
          >
            Enquire <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
