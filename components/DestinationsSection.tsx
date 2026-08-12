"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, ArrowRight } from "lucide-react";
import { DESTINATIONS } from "@/data/destinations";
import { SectionHeader } from "@/components/ui/SectionHeader";

import { buildImageUrl, handleImageError } from "@/lib/imageUtils";

const GOLD = "#C9A84C";

export function DestinationsSection() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-10">
          <SectionHeader script="Where Will You Go?" heading="Top Destinations" />
          <Link
            href="/destinations"
            className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-sm hover:bg-[#C9A84C] hover:text-[#1A2B1C] hover:border-transparent transition-all self-end"
          >
            All Destinations <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DESTINATIONS.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${
                i === 0 ? "row-span-2" : ""
              }`}
              style={{ height: i === 0 ? 380 : 178 }}
            >
              <Link href={`/destinations/${d.slug}`}>
                <Image
                  src={buildImageUrl(d.image, 600, i === 0 ? 760 : 360)}
                  alt={d.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white font-display font-semibold text-lg leading-tight">
                    {d.name}
                  </div>
                  <div className="text-white/60 text-xs font-mono mt-0.5 flex items-center gap-0.5">
                    <MapPin size={10} style={{ color: GOLD }} />
                    {d.state}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
