"use client";

import { IllustratedMap } from "@/components/IllustratedMap";
import { PACKAGES } from "@/data/packages";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

export default function DestinationsPage() {
  return (
    <div className="bg-[#0C1519] min-h-screen pt-28 pb-20 text-[#D8CFC7] overflow-hidden relative">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-5"
        style={{ background: `radial-gradient(circle, ${COFFEE}, transparent 70%)` }} />

      {/* Header */}
      <section className="relative py-20 px-6 lg:px-12 overflow-hidden z-10 text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#E8B96A] font-accent text-xs sm:text-sm uppercase tracking-[0.25em] block mb-3 font-semibold">Sacred Paths & Valleys</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wide text-white">
            Top <span className="text-[#E8B96A]">Destinations</span>
          </h1>
          <p className="text-[#D8CFC7]/80 text-base md:text-lg max-w-2xl mx-auto mt-5 font-sans leading-relaxed">
            Click pins on our custom illustrated map below to instantly pan to regions, see starting prices, and select pilgrimage route details.
          </p>
          <div className="w-24 h-0.5 mx-auto mt-6" style={{ background: `linear-gradient(to right, transparent, ${BRASS}, transparent)` }} />
        </div>
      </section>

      {/* Illustrated Map Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10 relative z-10">
        <div className="text-center mb-6">
          <span className="text-[#D8CFC7]/40 text-xs font-mono uppercase tracking-wider">Interactive Vector Guide</span>
        </div>
        <IllustratedMap />
      </section>

      {/* Destinations detail grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10">
        <div className="text-left mb-10">
          <h2 className="font-display text-3xl font-bold text-white">Explore Our Featured Regions</h2>
          <p className="text-[#D8CFC7]/50 text-xs mt-2 font-sans">Vetted pilgrimage circuits and hill valleys.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div 
              key={pkg.slug} 
              className="rounded-xl p-6 border flex flex-col justify-between group glass-panel"
              style={{
                background: "rgba(58, 53, 52, 0.25)",
                borderColor: "rgba(207, 157, 123, 0.15)",
              }}
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-display font-semibold text-white text-base flex items-center gap-1.5">
                    <MapPin size={15} className="text-[#E8B96A] flex-shrink-0" />
                    {pkg.destinations[0]}
                  </h3>
                  <span className="text-[10px] text-[#E8B96A] font-mono bg-[#E8B96A]/10 border border-[#E8B96A]/20 px-2 py-0.5 rounded-full">{pkg.duration.days} Days</span>
                </div>
                <p className="text-[#D8CFC7]/70 text-xs mt-3 leading-relaxed font-sans">{pkg.subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pkg.destinations.map((d, i) => (
                    <span key={i} className="text-[9px] bg-white/5 text-[#D8CFC7]/50 px-2.5 py-0.5 rounded-full border border-white/5">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
                <div>
                  <div className="text-[9px] text-[#D8CFC7]/40 uppercase tracking-wider">Starting Price</div>
                  <div className="text-sm font-mono font-bold text-[#E8B96A] mt-0.5">
                    ₹{pkg.packagePrice.toLocaleString("en-IN")}
                  </div>
                </div>
                <Link
                  href={`/tours/${pkg.slug}`}
                  className="text-xs font-semibold text-[#E8B96A] hover:text-white flex items-center gap-1.5 group-hover:translate-x-1 transition-all font-accent tracking-wider uppercase"
                >
                  View Details <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
