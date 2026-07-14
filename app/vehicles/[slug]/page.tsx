"use client";

import { useState, use } from "react";
import { VEHICLES } from "@/data/vehicles";
import { notFound, useRouter } from "next/navigation";
import { Users, Fuel, Shield, Calendar, ArrowRight, Table, Gauge, Compass, Eye } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

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

  const [activeTab, setActiveTab] = useState<"pricing" | "specs" | "terms">("pricing");

  const handleBookRedirect = (mode: "local" | "outstation") => {
    router.push(
      `/inquiry?type=vehicle&vehicle=${v.slug}&rental=${mode}`
    );
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-20 pb-20">
      {/* Hero Showcase */}
      <div className="relative h-[300px] md:h-[450px] bg-gray-900 text-white overflow-hidden">
        <img
          src={IMG(v.image, 1600, 900)}
          alt={v.name}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-10 left-0 right-0 px-6 max-w-7xl mx-auto">
          <span className="text-[#C9A84C] font-mono text-[10px] font-bold uppercase tracking-widest block mb-2">
            {v.brand} · {v.category}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-wide leading-tight">
            {v.name}
          </h1>
          <div className="flex gap-4 mt-3 text-xs text-white/70 font-mono">
            <span>👥 {v.seats} Seats</span>
            <span>⛽ {v.fuel}</span>
            <span>⚙️ {v.transmission}</span>
            <span>❄️ {v.ac ? "AC Cabin" : "Non-AC"}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details, Specs, Inclusions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tabs Selector */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100">
              {[
                { id: "pricing", label: "Rental Pricing" },
                { id: "specs", label: "Technical Specifications" },
                { id: "terms", label: "Rules & Terms" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 text-center py-3.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === tab.id
                      ? "text-[#C9A84C] border-[#C9A84C]"
                      : "text-gray-500 border-transparent hover:text-gray-800"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Local package card */}
                    <div className="p-5 rounded-lg border border-gray-100 bg-[#FAFAF8] flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-bold text-gray-800 text-sm">Local Daily Package</h4>
                        <p className="text-[10px] text-gray-400 font-mono mt-1">Standard (8 Hours / 80 Km limit)</p>
                        <div className="text-2xl font-mono font-bold text-[#C9A84C] mt-3">
                          ₹{v.localPriceDay.min.toLocaleString("en-IN")} - ₹{v.localPriceDay.max.toLocaleString("en-IN")}
                          <span className="text-xs text-gray-400 font-sans font-normal"> /day</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleBookRedirect("local")}
                        className="mt-6 w-full text-center text-xs font-semibold py-2.5 rounded-sm border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1A2B1C] transition-all cursor-pointer"
                      >
                        Enquire Local Daily
                      </button>
                    </div>

                    {/* Outstation package card */}
                    <div className="p-5 rounded-lg border border-gray-100 bg-[#FAFAF8] flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-bold text-gray-800 text-sm">Outstation Highway Travel</h4>
                        <p className="text-[10px] text-gray-400 font-mono mt-1">Charged per kilometer run</p>
                        <div className="text-2xl font-mono font-bold text-[#C9A84C] mt-3">
                          ₹{v.outstationPriceKm.min} - ₹{v.outstationPriceKm.max}
                          <span className="text-xs text-gray-400 font-sans font-normal"> /km</span>
                        </div>
                        <ul className="text-[10px] text-gray-500 font-sans mt-3 space-y-1">
                          <li>• Minimum billable run: {v.outstationMinKm} km/day</li>
                          <li>• Driver allowance: ₹{v.driverAllowancePerDay}/day</li>
                        </ul>
                      </div>
                      <button
                        onClick={() => handleBookRedirect("outstation")}
                        className="mt-6 w-full text-center text-xs font-semibold py-2.5 rounded-sm bg-[#C9A84C] text-[#1A2B1C] hover:brightness-95 transition-all cursor-pointer"
                      >
                        Enquire Outstation
                      </button>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="p-4 rounded-lg bg-[#C9A84C]/5 border border-[#C9A84C]/15 text-xs text-gray-600 font-sans leading-relaxed">
                    <strong>Important Note:</strong> {v.tollsExtraNote}. Toll taxes, parking charges, and inter-state permit clearances are paid directly by the client or billed extra on actual receipts.
                  </div>
                </div>
              )}

              {/* Specs breakdown */}
              {activeTab === "specs" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 font-display font-bold text-gray-500">
                        <th className="py-2.5">Feature Specification</th>
                        <th className="py-2.5">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-600 font-sans">
                      {Object.entries(v.specs).map(([key, val]) => (
                        <tr key={key}>
                          <td className="py-3 font-semibold text-gray-800">{key}</td>
                          <td className="py-3">{val}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="py-3 font-semibold text-gray-800">Seating Capacity</td>
                        <td className="py-3">{v.seats} Comfort Seats</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-gray-800">Luggage Space</td>
                        <td className="py-3">Accommodates up to {v.luggageCapacity} large bags</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Rules & Terms */}
              {activeTab === "terms" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-display font-bold text-gray-800 text-xs uppercase tracking-wider mb-2.5">Driver-driven details</h4>
                    <p className="text-gray-600 text-xs font-sans leading-relaxed">
                      All outstation rentals include an experienced highway chauffeur. Travel routes are mapped prior to departure. Drivers require a night boarding allowance of ₹{v.driverAllowancePerDay} for stays on multi-day journeys.
                    </p>
                  </div>
                  {v.selfDriveAvailable && (
                    <div>
                      <h4 className="font-display font-bold text-gray-800 text-xs uppercase tracking-wider mb-2.5">Self-drive terms</h4>
                      <p className="text-gray-600 text-xs font-sans leading-relaxed">
                        To claim self-drive: must present a valid, non-learner driving license, Aadhaar card, and submit a security deposit of ₹5,000. Fuel is calculated on a full-to-full tank policy.
                      </p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-bold text-gray-800 text-xs uppercase tracking-wider mb-2.5 text-red-600">Cancellation Policy</h4>
                    <p className="text-gray-600 text-xs font-sans leading-relaxed">
                      * Cancel up to 48 hours prior to journey start: 90% refund of deposit.
                      * Cancel inside 24-48 hours: 50% refund.
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
          <div className="bg-[#1A2B1C] text-white p-6 rounded-xl shadow-xl border border-[#C9A84C]/25 sticky top-24 space-y-5">
            <span className="text-[#C9A84C] text-[10px] font-mono uppercase tracking-widest block">Quick Quote Inquiry</span>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-white">{v.name}</h3>
              <div className="text-[10px] text-white/50 font-mono">Premium {v.category.toUpperCase()} Rental</div>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Seats:</span>
                <span className="font-semibold text-white">{v.seats} Passenger capacity</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Air Conditioning:</span>
                <span className="font-semibold text-white">Equipped with Climate AC</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Transmission:</span>
                <span className="font-semibold text-white">{v.transmission}</span>
              </div>
            </div>

            <button
              onClick={() => handleBookRedirect("outstation")}
              className="w-full py-3.5 rounded-sm font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:brightness-95 mt-4"
              style={{ backgroundColor: GOLD, color: DARK }}
            >
              Plan Outstation Booking <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
