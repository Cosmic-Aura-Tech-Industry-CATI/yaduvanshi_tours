"use client";

import { useState, use } from "react";
import { VEHICLES } from "@/data/vehicles";
import { notFound, useRouter } from "next/navigation";
import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

interface VehicleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const v = VEHICLES.find((vehicle) => vehicle.slug === resolvedParams.slug);

  if (!v) {
    notFound();
  }

  const similarVehicles = VEHICLES.filter(
    (vehicle) => vehicle.category === v.category && vehicle.slug !== v.slug
  ).slice(0, 3);

  const [activeTab, setActiveTab] = useState<"pricing" | "specs" | "terms">("pricing");

  const handleBookRedirect = (mode: "local" | "outstation") => {
    router.push(
      `/inquiry?type=vehicle&vehicle=${v.slug}&rental=${mode}`
    );
  };

  return (
    <div className="bg-[#0C1519] min-h-screen pt-20 pb-20 text-[#D8CFC7] overflow-hidden relative">
      {/* Background blobs for firelight depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }} />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-5"
        style={{ background: `radial-gradient(circle, ${COFFEE}, transparent 70%)` }} />

      {/* Hero Showcase */}
      <div className="relative h-[300px] md:h-[450px] bg-black/80 text-white overflow-hidden z-10">
        <Image
          src={v.image}
          alt={v.name}
          fill
          priority
          sizes="100vw"
          className="object-contain opacity-90 p-8 md:p-16"
          style={{ background: "#fff" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1519] to-transparent" />
        <div className="absolute bottom-10 left-0 right-0 px-6 max-w-7xl mx-auto">
          <span className="text-[#E8B96A] font-accent text-[10px] font-bold uppercase tracking-widest block mb-2">
            {v.brand} · {v.category}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-wide leading-tight text-white">
            {v.name}
          </h1>
          <div className="flex gap-4 mt-3 text-xs text-[#D8CFC7]/80 font-mono">
            <span>👥 {v.seats} Seats</span>
            <span>⛽ {v.fuel}</span>
            <span>⚙️ {v.transmission}</span>
            <span>❄️ {v.ac ? "AC Cabin" : "Non-AC"}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Left Column: Details, Specs, Inclusions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tabs Selector */}
          <div 
            className="rounded-xl border overflow-hidden glass-panel"
            style={{
              background: "rgba(58, 53, 52, 0.25)",
              borderColor: "rgba(207, 157, 123, 0.15)",
            }}
          >
            <div className="flex border-b border-white/5 bg-black/20">
              {[
                { id: "pricing", label: "Rental Pricing" },
                { id: "specs", label: "Technical Specifications" },
                { id: "terms", label: "Rules & Terms" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 text-center py-3.5 text-xs font-bold transition-all border-b-2 cursor-pointer uppercase font-accent tracking-wider ${
                    activeTab === tab.id
                      ? "text-[#E8B96A] border-[#E8B96A]"
                      : "text-[#D8CFC7]/50 border-transparent hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* Pricing breakdown */}
              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div className={`grid grid-cols-1 ${v.category === "luxury" ? "" : "md:grid-cols-2"} gap-4`}>
                    {/* Local package card */}
                    <div 
                      className="p-5 rounded-lg border flex flex-col justify-between"
                      style={{
                        background: "rgba(22, 33, 39, 0.35)",
                        borderColor: "rgba(255,255,255,0.05)",
                      }}
                    >
                      <div>
                        <h4 className="font-display font-bold text-white text-base">Local Daily Package</h4>
                        <p className="text-[10px] text-[#D8CFC7]/50 font-mono mt-1">Standard (8 Hours / 80 Km limit)</p>
                        <div className="text-xl font-mono font-bold text-[#E8B96A] mt-4">
                          ₹{v.localPriceDay.min.toLocaleString("en-IN")} - ₹{v.localPriceDay.max.toLocaleString("en-IN")}
                          <span className="text-xs text-[#D8CFC7]/50 font-sans font-normal"> /day</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleBookRedirect("local")}
                        className="mt-6 w-full text-center text-xs font-bold font-accent tracking-wider py-2.5 rounded-full border border-[#E8B96A] text-[#E8B96A] hover:bg-[#E8B96A] hover:text-[#0C1519] transition-all cursor-pointer bg-[#E8B96A]/5"
                      >
                        Enquire Local Daily
                      </button>
                    </div>

                    {/* Outstation package card */}
                    {v.category !== "luxury" && (
                      <div 
                        className="p-5 rounded-lg border flex flex-col justify-between"
                        style={{
                          background: "rgba(22, 33, 39, 0.35)",
                          borderColor: "rgba(255,255,255,0.05)",
                        }}
                      >
                        <div>
                          <h4 className="font-display font-bold text-white text-base">Outstation Highway Travel</h4>
                          <p className="text-[10px] text-[#D8CFC7]/50 font-mono mt-1">Charged per kilometer run</p>
                          <div className="text-xl font-mono font-bold text-[#E8B96A] mt-4">
                            ₹{v.outstationPriceKm.min} - ₹{v.outstationPriceKm.max}
                            <span className="text-xs text-[#D8CFC7]/50 font-sans font-normal"> /km</span>
                          </div>
                          <ul className="text-[10px] text-[#D8CFC7]/60 font-sans mt-3.5 space-y-1.5">
                            <li>• Minimum billable run: {v.outstationMinKm} km/day</li>
                            <li>• Driver allowance: ₹{v.driverAllowancePerDay}/day</li>
                          </ul>
                        </div>
                        <button
                          onClick={() => handleBookRedirect("outstation")}
                          className="mt-6 w-full text-center text-xs font-bold font-accent tracking-wider py-3 rounded-full transition-all cursor-pointer text-[#0C1519]"
                          style={{
                            background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                            boxShadow: `0 4px 15px rgba(232,185,106,0.15)`
                          }}
                        >
                          Enquire Outstation
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div 
                    className="p-4 rounded-lg border text-xs text-[#D8CFC7]/70 font-sans leading-relaxed flex gap-2.5 items-start"
                    style={{
                      background: "rgba(58, 53, 52, 0.15)",
                      borderColor: "rgba(207, 157, 123, 0.15)",
                    }}
                  >
                    <Info size={15} style={{ color: GOLD }} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Important Note:</strong> {v.tollsExtraNote}. Toll taxes, parking charges, and inter-state permit clearances are paid directly by the client or billed extra on actual receipts.
                    </div>
                  </div>
                </div>
              )}

              {/* Specs breakdown */}
              {activeTab === "specs" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/10 font-display font-bold text-[#D8CFC7]/50 uppercase tracking-widest text-[10px]">
                        <th className="py-2.5">Feature Specification</th>
                        <th className="py-2.5">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-[#D8CFC7]/80 font-sans">
                      {Object.entries(v.specs).map(([key, val]) => (
                        <tr key={key} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 font-semibold text-white">{key}</td>
                          <td className="py-3">{val}</td>
                        </tr>
                      ))}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3 font-semibold text-white">Seating Capacity</td>
                        <td className="py-3">{v.seats} Comfort Seats</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3 font-semibold text-white">Luggage Space</td>
                        <td className="py-3">{v.luggageCapacity} large bags</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Rules & Terms */}
              {activeTab === "terms" && (
                <div className="space-y-6 font-sans">
                  <div>
                    <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-2">Driver-driven details</h4>
                    <p className="text-[#D8CFC7]/70 text-xs leading-relaxed">
                      All outstation rentals include an experienced highway chauffeur. Travel routes are mapped prior to departure. Drivers require a night boarding allowance of ₹{v.driverAllowancePerDay} for stays on multi-day journeys.
                    </p>
                  </div>
                  {v.selfDriveAvailable && (
                    <div>
                      <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-2">Self-drive terms</h4>
                      <p className="text-[#D8CFC7]/70 text-xs leading-relaxed">
                        To claim self-drive: must present a valid, non-learner driving license, Aadhaar card, and submit a security deposit of ₹5,000. Fuel is calculated on a full-to-full tank policy.
                      </p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-bold text-red-500 text-xs uppercase tracking-wider mb-2">Cancellation Policy</h4>
                    <p className="text-[#D8CFC7]/70 text-xs leading-relaxed">
                      * Cancel up to 48 hours prior to journey start: 90% refund of deposit.<br />
                      * Cancel inside 24-48 hours: 50% refund.<br />
                      * Cancel inside 24 hours: No refund of initial reservation booking amount.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic summary/quick booking */}
        <div>
          <div 
            className="p-6 rounded-xl border sticky top-24 space-y-5 shadow-2xl backdrop-blur-md glass-panel"
            style={{
              background: "rgba(58, 53, 52, 0.25)",
              borderColor: "rgba(207, 157, 123, 0.25)",
            }}
          >
            <span className="text-[#E8B96A] text-[10px] font-accent uppercase tracking-widest block font-semibold">Quick Quote Inquiry</span>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-white">{v.name}</h3>
              <div className="text-[10px] text-[#D8CFC7]/50 font-mono">Premium {v.category.toUpperCase()} Rental</div>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-3.5 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#D8CFC7]/60">Seats:</span>
                <span className="font-semibold text-white">{v.seats} Passenger capacity</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#D8CFC7]/60">Air Conditioning:</span>
                <span className="font-semibold text-white">Equipped with Climate AC</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#D8CFC7]/60">Transmission:</span>
                <span className="font-semibold text-white">{v.transmission}</span>
              </div>
            </div>

            <button
              onClick={() => handleBookRedirect(v.category === "luxury" ? "local" : "outstation")}
              className="w-full py-3.5 rounded-full font-bold font-accent tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:brightness-110 mt-4 text-[#0C1519]"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                boxShadow: `0 4px 15px rgba(232,185,106,0.2)`
              }}
            >
              {v.category === "luxury" ? "PLAN CHAUFFEUR BOOKING" : "PLAN OUTSTATION BOOKING"} <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Similar Vehicles Carousel / Grid */}
      {similarVehicles.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-20 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#E8B96A] font-accent text-[10px] font-bold uppercase tracking-widest block mb-1">
                Explore More
              </span>
              <h2 className="font-display text-2xl font-bold tracking-wide text-white">
                Similar <span className="text-[#E8B96A]">Vehicles</span>
              </h2>
            </div>
            <div className="w-16 h-0.5" style={{ background: `linear-gradient(to right, ${BRASS}, transparent)` }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarVehicles.map((similarVehicle, idx) => (
              <Link
                key={similarVehicle.slug}
                href={`/vehicles/${similarVehicle.slug}`}
                className="group rounded-xl overflow-hidden glass-panel border border-white/5 bg-[#162127]/20 p-4 transition-all duration-300 hover:border-[#CF9D7B]/30 hover:bg-[#162127]/40 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden relative mb-4">
                    {similarVehicle.image ? (
                      <div className="bg-white w-full h-full flex items-center justify-center p-3">
                        <Image
                          src={similarVehicle.image}
                          alt={similarVehicle.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 250px"
                          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="bg-black/40 w-full h-full flex flex-col items-center justify-center text-center p-3">
                        <span className="text-2xl">🚗</span>
                        <span className="text-[8px] font-bold text-[#E8B96A] mt-1 font-mono uppercase tracking-wider block">
                          Premium Fleet
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-[9px] text-[#D8CFC7]/40 uppercase tracking-[0.2em] font-mono mb-0.5">
                    {similarVehicle.brand}
                  </div>
                  <h4 className="font-display font-bold text-sm text-white group-hover:text-[#E8B96A] transition-colors leading-tight">
                    {similarVehicle.name}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="font-mono text-xs font-bold text-[#E8B96A]">
                    ₹{similarVehicle.localPriceDay.min.toLocaleString("en-IN")}
                    <span className="text-[9px] text-[#D8CFC7]/50 font-sans font-normal">/day</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#D8CFC7]/50">
                    👥 {similarVehicle.seats} Seats
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
