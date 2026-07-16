"use client";

import { IllustratedMap } from "@/components/IllustratedMap";
import { PACKAGES } from "@/data/packages";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

export default function DestinationsPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-28 pb-20">
      {/* Header */}
      <section className="bg-[#1A2B1C] text-white py-16 px-6 relative overflow-hidden border-b border-[#C9A84C]/20">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-[#C9A84C] font-mono text-xs uppercase tracking-widest block mb-3">Sacred Paths & Valleys</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wide">Top Destinations</h1>
          <p className="text-white/60 text-sm max-w-xl mx-auto mt-4 font-sans leading-relaxed">
            Click pins on our custom illustrated map below to instantly pan to regions, see starting prices, and select pilgrimage route details.
          </p>
        </div>
      </section>

      {/* Illustrated Map Section */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="text-center mb-6">
          <span className="text-gray-400 text-xs font-mono">Interactive Vector Guide</span>
        </div>
        <IllustratedMap />
      </section>

      {/* Destinations detail grid */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="text-left mb-8">
          <h2 className="font-display text-2xl font-bold text-gray-800">Explore Our Featured Regions</h2>
          <p className="text-gray-400 text-xs mt-1 font-sans">Vetted pilgrimage circuits and hill valleys.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div key={pkg.slug} className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-display font-semibold text-gray-800 text-sm flex items-center gap-1">
                    <MapPin size={13} className="text-[#C9A84C] flex-shrink-0" />
                    {pkg.destinations[0]}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono">{pkg.duration.days} Days</span>
                </div>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed font-sans">{pkg.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {pkg.destinations.map((d, i) => (
                    <span key={i} className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-sm">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-50 flex justify-between items-center">
                <div>
                  <div className="text-[9px] text-gray-400 uppercase tracking-wider">Starting Price</div>
                  <div className="text-xs font-mono font-semibold text-[#C9A84C]">
                    ₹{pkg.packagePrice.toLocaleString("en-IN")}
                  </div>
                </div>
                <Link
                  href={`/tours/${pkg.slug}`}
                  className="text-xs font-semibold text-[#C9A84C] hover:text-[#1A2B1C] flex items-center gap-1 group-hover:gap-1.5 transition-all font-display"
                >
                  View Details <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
