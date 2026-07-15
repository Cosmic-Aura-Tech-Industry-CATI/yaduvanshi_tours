"use client";

import { useState, use } from "react";
import { PACKAGES } from "@/data/packages";
import { notFound, useRouter } from "next/navigation";
import { Clock, Users, ArrowRight, ShieldCheck, HelpCircle, Star, Car } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

interface TourDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const pkg = PACKAGES.find((p) => p.slug === resolvedParams.slug);

  if (!pkg) {
    notFound();
  }

  // Define eligible vehicles and pricing calculations based on the tour
  const isCharDham = pkg.slug === "char-dham-yatra";
  const vehiclesList = isCharDham
    ? [
        { name: "Tempo Traveller (17-seat)", slug: "force-urbania", capacity: 17, multiplier: 1, basePrice: 140000 },
        { name: "Luxury Mini-Bus (26-seat)", slug: "bus-26", capacity: 26, multiplier: 1.45, basePrice: 203000 },
      ]
    : [
        { name: "Maruti Dzire (5-seat)", slug: "maruti-dzire", capacity: 5, multiplier: 1, basePrice: pkg.packagePrice },
        { name: "Toyota Innova Crysta (7-seat)", slug: "toyota-innova-crysta", capacity: 7, multiplier: 1.35, basePrice: Math.round(pkg.packagePrice * 1.35) },
        { name: "Force Urbania (17-seat)", slug: "force-urbania", capacity: 17, multiplier: 2.2, basePrice: Math.round(pkg.packagePrice * 2.2) },
      ];

  const [selectedVehicle, setSelectedVehicle] = useState(vehiclesList[0]);
  const [activeTab, setActiveTab] = useState<"itinerary" | "highlights" | "inclusions" | "faqs">("itinerary");

  const handleInquiryRedirect = () => {
    router.push(
      `/inquiry?type=tour&package=${pkg.slug}&vehicle=${selectedVehicle.slug}`
    );
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-20 pb-20">
      {/* Immersive Hero Header */}
      <div className="relative h-[350px] md:h-[500px] bg-gray-900 text-white overflow-hidden">
        <img
          src={IMG(pkg.image, 1600, 900)}
          alt={pkg.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-10 left-0 right-0 px-6 max-w-7xl mx-auto">
          <div className="flex gap-2 mb-3">
            <span className="bg-[#C9A84C] text-[#1A2B1C] font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
              {pkg.category} yatra
            </span>
            <span className="bg-white/10 text-white font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm">
              {pkg.duration.days} Days / {pkg.duration.nights} Nights
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-wide max-w-3xl leading-tight">
            {pkg.title}
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-3 font-sans leading-relaxed">
            {pkg.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Package Core Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="flex flex-col items-center">
              <Clock size={18} className="text-[#C9A84C] mb-1" />
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">Duration</span>
              <span className="text-xs font-semibold text-gray-800 mt-0.5">{pkg.duration.days}D / {pkg.duration.nights}N</span>
            </div>
            <div className="flex flex-col items-center border-x border-gray-100">
              <Users size={18} className="text-[#C9A84C] mb-1" />
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">Group Size</span>
              <span className="text-xs font-semibold text-gray-800 mt-0.5">{pkg.groupSize.min} - {pkg.groupSize.max} Pax</span>
            </div>
            <div className="flex flex-col items-center">
              <Star size={18} className="text-[#C9A84C] mb-1 fill-[#C9A84C]" />
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">Rating</span>
              <span className="text-xs font-semibold text-gray-800 mt-0.5">{pkg.rating} ({pkg.reviewCount})</span>
            </div>
          </div>

          {/* Details Tabs Selector */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {[
                { id: "itinerary", label: "Day Itinerary" },
                { id: "highlights", label: "Yatra Highlights" },
                { id: "inclusions", label: "Inclusions" },
                { id: "faqs", label: "FAQs" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "itinerary" | "highlights" | "inclusions" | "faqs")}
                  className={`flex-1 text-center py-3 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
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
              {/* Day Itinerary tab */}
              {activeTab === "itinerary" && (
                <div className="space-y-6">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-8 border-l border-gray-200 last:border-0 last:pb-0 pb-6">
                      {/* Day circular icon indicator */}
                      <span className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1A2B1C] text-[#C9A84C] text-[10px] font-mono font-bold flex items-center justify-center border border-[#C9A84C]/30 shadow-md">
                        {day.day}
                      </span>
                      <h4 className="font-display font-semibold text-gray-800 text-sm">{day.title}</h4>
                      <p className="text-gray-600 text-xs mt-2 leading-relaxed font-sans">{day.description}</p>
                      <div className="flex flex-wrap gap-4 mt-3 text-[10px] text-gray-400 font-mono">
                        {day.accommodation && (
                          <span className="flex items-center gap-1">🏨 Stay: {day.accommodation}</span>
                        )}
                        {day.meals.length > 0 && (
                          <span className="flex items-center gap-1">🍽️ Meals: {day.meals.join(" · ")}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights tab */}
              {activeTab === "highlights" && (
                <ul className="space-y-3">
                  {pkg.highlights.map((h, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-gray-700 text-xs leading-relaxed font-sans">
                      <ShieldCheck size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {/* Inclusions & Exclusions */}
              {activeTab === "inclusions" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-display font-bold text-gray-800 text-xs uppercase tracking-wider mb-3">What&apos;s Included</h4>
                    <ul className="space-y-2.5">
                      {pkg.inclusions.map((i, idx) => (
                        <li key={idx} className="flex gap-2 items-start text-gray-600 text-xs leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-1.5 flex-shrink-0" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-800 text-xs uppercase tracking-wider mb-3">Not Included</h4>
                    <ul className="space-y-2.5">
                      {pkg.exclusions.map((e, idx) => (
                        <li key={idx} className="flex gap-2 items-start text-gray-600 text-xs leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* FAQs tab */}
              {activeTab === "faqs" && (
                <div className="space-y-4">
                  {pkg.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 bg-[#FAFAF8] rounded-lg border border-gray-100">
                      <div className="flex gap-2.5 items-start font-display font-semibold text-gray-800 text-xs">
                        <HelpCircle size={14} className="text-[#C9A84C] mt-0.5" />
                        {faq.question}
                      </div>
                      <p className="text-gray-500 text-xs mt-2 pl-6 font-sans leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Pricing & Booking Calculator Widget */}
        <div className="space-y-6">
          <div className="bg-[#1A2B1C] text-white p-6 rounded-xl shadow-xl border border-[#C9A84C]/25 sticky top-24">
            <span className="text-[#C9A84C] text-[10px] font-mono uppercase tracking-widest block mb-1">Per-Vehicle Package Pricing</span>
            <div className="flex items-baseline gap-2 mb-5">
              <span className="text-3xl font-mono font-bold" style={{ color: GOLD }}>
                ₹{selectedVehicle.basePrice.toLocaleString("en-IN")}
              </span>
              <span className="text-white/60 text-[10px] font-mono uppercase tracking-wider">Total</span>
            </div>

            {/* Vehicle Selection Row */}
            <label className="text-white/80 font-display font-bold text-xs uppercase tracking-wider block mb-3">
              Select Fleet Class
            </label>
            <div className="space-y-2.5 mb-6">
              {vehiclesList.map((veh) => {
                const isSelected = selectedVehicle.slug === veh.slug;
                return (
                  <button
                    key={veh.slug}
                    onClick={() => setSelectedVehicle(veh)}
                    className="w-full text-left p-3 rounded-md border flex items-center justify-between transition-all cursor-pointer"
                    style={{
                      borderColor: isSelected ? GOLD : "rgba(255,255,255,0.1)",
                      backgroundColor: isSelected ? "rgba(201,168,76,0.1)" : "transparent",
                    }}
                  >
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <Car size={13} style={{ color: isSelected ? GOLD : "rgba(255,255,255,0.4)" }} />
                        {veh.name}
                      </div>
                      <div className="text-[10px] text-white/50 font-mono mt-0.5">Max {veh.capacity} Passengers</div>
                    </div>
                    <div className="text-xs font-mono font-semibold" style={{ color: isSelected ? GOLD : "white" }}>
                      ₹{veh.basePrice.toLocaleString("en-IN")}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleInquiryRedirect}
              className="w-full py-3.5 rounded-sm font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:brightness-95"
              style={{ backgroundColor: GOLD, color: DARK }}
            >
              Book / Customise Yatra <ArrowRight size={13} />
            </button>

            <div className="mt-4 pt-4 border-t border-white/10 text-[10px] text-white/50 font-sans leading-relaxed text-center">
              All prices represent complete per-vehicle flat rates including fuel, driver allowance, and sightseeing routing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
