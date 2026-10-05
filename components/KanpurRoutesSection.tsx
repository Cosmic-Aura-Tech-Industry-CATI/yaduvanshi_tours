"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Car,
  Clock,
  Navigation,
  Phone,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";

interface OutstationRoute {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  duration: string;
  highway: string;
  sedanRate: number;
  suvRate: number;
  innovaRate: number;
  urbaniaRate?: number;
  popularFor: string;
}

const POPULAR_ROUTES: OutstationRoute[] = [
  {
    id: "kanpur-lucknow",
    from: "Kanpur",
    to: "Lucknow (City / Airport)",
    distanceKm: 85,
    duration: "1.5 – 2 hrs",
    highway: "NH 27 (Kanpur-Lucknow Expressway)",
    sedanRate: 1499,
    suvRate: 1999,
    innovaRate: 2499,
    popularFor: "Airport drop, business & day visits",
  },
  {
    id: "kanpur-ayodhya",
    from: "Kanpur",
    to: "Ayodhya (Ram Janmabhoomi)",
    distanceKm: 220,
    duration: "4 – 4.5 hrs",
    highway: "NH 27 / Purvanchal Connect",
    sedanRate: 2799,
    suvRate: 3699,
    innovaRate: 4499,
    urbaniaRate: 6999,
    popularFor: "Ram Mandir, Hanuman Garhi, Saryu Aarti",
  },
  {
    id: "kanpur-varanasi",
    from: "Kanpur",
    to: "Varanasi (Kashi Vishwanath)",
    distanceKm: 330,
    duration: "5.5 – 6 hrs",
    highway: "NH 19 (Grand Trunk Road)",
    sedanRate: 3999,
    suvRate: 5199,
    innovaRate: 6299,
    urbaniaRate: 9899,
    popularFor: "Ganga Aarti, Kashi Corridor, Sarnath",
  },
  {
    id: "kanpur-prayagraj",
    from: "Kanpur",
    to: "Prayagraj (Triveni Sangam)",
    distanceKm: 205,
    duration: "3.5 – 4 hrs",
    highway: "NH 19 (Kanpur - Prayagraj 6-Lane)",
    sedanRate: 2599,
    suvRate: 3399,
    innovaRate: 4199,
    popularFor: "Sangam Snan, Anand Bhavan, Temples",
  },
  {
    id: "kanpur-delhi",
    from: "Kanpur",
    to: "Delhi / Noida / Gurgaon",
    distanceKm: 485,
    duration: "7 – 8 hrs",
    highway: "Agra-Lucknow Exp / Yamuna Exp",
    sedanRate: 5799,
    suvRate: 7499,
    innovaRate: 8999,
    urbaniaRate: 14500,
    popularFor: "Doorstep intercity drop, corporate trips",
  },
  {
    id: "kanpur-agra",
    from: "Kanpur",
    to: "Agra & Mathura-Vrindavan",
    distanceKm: 285,
    duration: "4.5 – 5 hrs",
    highway: "Agra - Lucknow Expressway",
    sedanRate: 3599,
    suvRate: 4699,
    innovaRate: 5699,
    popularFor: "Taj Mahal, Krishna Janmabhoomi darshan",
  },
];

export function KanpurRoutesSection() {
  const [selectedRoute, setSelectedRoute] = useState<OutstationRoute>(POPULAR_ROUTES[0]);

  // Schema for Route ItemList
  const routesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popular Outstation Cab Routes from Kanpur",
    description: "Verified outstation taxi rates, travel durations, and distance matrix from Kanpur.",
    itemListElement: POPULAR_ROUTES.map((route, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Trip",
        name: `Taxi from ${route.from} to ${route.to}`,
        description: `Travel from ${route.from} to ${route.to} (${route.distanceKm} km, ${route.duration}) via ${route.highway}. Starting from ₹${route.sedanRate}.`,
        offers: {
          "@type": "Offer",
          price: route.sedanRate,
          priceCurrency: "INR",
        },
      },
    })),
  };

  return (
    <section
      id="kanpur-outstation-cabs"
      className="relative py-24 px-6 lg:px-12 overflow-hidden"
      style={{ background: "#080E12" }}
    >
      {/* Route ItemList Schema for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(routesSchema) }}
      />

      {/* Decorative ambient gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-[0.07]"
        style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#CF9D7B]/20 mb-4 shadow-sm">
            <Navigation className="w-3.5 h-3.5 text-[#E8B96A]" />
            <span className="text-[10px] sm:text-xs font-accent tracking-widest text-[#E8B96A] uppercase font-semibold">
              Outstation Cab Fare &amp; Distance Matrix
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Popular Outstation Routes from{" "}
            <span className="text-[#E8B96A]">Kanpur</span>
          </h2>

          <p className="mt-4 text-[#D8CFC7]/80 text-sm sm:text-base font-sans leading-relaxed">
            Transparent one-way and round-trip fares with verified highway chauffeurs. Doorstep pickup across 
            Ramadevi, Civil Lines, Swaroop Nagar, Kalyanpur, and all Kanpur localities.
          </p>

          <div
            className="w-24 h-0.5 mx-auto mt-6"
            style={{ background: `linear-gradient(to right, transparent, ${BRASS}, transparent)` }}
          />
        </div>

        {/* Route Selector Tabs on Mobile / Desktop */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {POPULAR_ROUTES.map((route) => {
            const isSelected = selectedRoute.id === route.id;
            return (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-[#E8B96A] to-[#CF9D7B] text-[#0C1519] font-bold shadow-lg shadow-[#E8B96A]/20 scale-105"
                    : "glass-panel text-[#D8CFC7]/70 hover:text-white hover:border-[#CF9D7B]/40"
                }`}
              >
                Kanpur → {route.to.split(" ")[0]}
              </button>
            );
          })}
        </div>

        {/* Selected Route Spotlight Card */}
        <motion.div
          key={selectedRoute.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass-panel p-6 sm:p-10 rounded-3xl border border-[#CF9D7B]/30 shadow-2xl mb-14"
          style={{ background: "rgba(14, 23, 28, 0.7)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Route Summary */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#E8B96A] font-accent font-semibold block">
                Direct Highway Cab Service
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {selectedRoute.from} <span className="text-[#E8B96A]">→</span> {selectedRoute.to}
              </h3>
              <p className="text-xs sm:text-sm text-[#D8CFC7]/75 font-sans leading-relaxed">
                {selectedRoute.popularFor}. Enjoy hassle-free travel via {selectedRoute.highway} with professional highway drivers and on-time pickup guarantee.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-[#E8B96A]" />
                  <div>
                    <span className="text-[10px] uppercase text-[#D8CFC7]/50 block">Distance</span>
                    <span className="text-sm font-semibold text-white font-mono">{selectedRoute.distanceKm} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#E8B96A]" />
                  <div>
                    <span className="text-[10px] uppercase text-[#D8CFC7]/50 block">Travel Time</span>
                    <span className="text-sm font-semibold text-white font-mono">{selectedRoute.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#D8CFC7]/70 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero cancellation fee · 100% Sanitised cabs · 24/7 Desk</span>
              </div>
            </div>

            {/* Right: Fleet Pricing Comparison */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Sedan */}
                <div className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-[#CF9D7B]/40 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-white font-display">Sedan</span>
                      <Car className="w-4 h-4 text-[#E8B96A]" />
                    </div>
                    <span className="text-[11px] text-[#D8CFC7]/60 block mb-3 font-sans">Dzire, Aura, Etios (4 Pax)</span>
                    <div className="text-xl font-bold text-[#E8B96A] font-mono">
                      ₹{selectedRoute.sedanRate.toLocaleString("en-IN")}*
                    </div>
                    <span className="text-[10px] text-[#D8CFC7]/40 block">One-way base fare</span>
                  </div>
                  <a
                    href={`https://wa.me/918127929551?text=Hi%20Yaduvanshi%20Tours,%20I%20want%20to%20book%20a%20Sedan%20from%20${selectedRoute.from}%20to%20${encodeURIComponent(selectedRoute.to)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-2 rounded-xl text-center text-xs font-semibold text-white bg-white/10 hover:bg-[#E8B96A] hover:text-[#0C1519] transition-all"
                  >
                    Book Sedan
                  </a>
                </div>

                {/* SUV / Ertiga */}
                <div className="p-4 rounded-2xl glass-panel border border-[#CF9D7B]/30 hover:border-[#E8B96A] transition-colors relative flex flex-col justify-between">
                  <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-[#E8B96A] to-[#CF9D7B] text-[#0C1519] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-white font-display">Premium SUV</span>
                      <Car className="w-4 h-4 text-[#E8B96A]" />
                    </div>
                    <span className="text-[11px] text-[#D8CFC7]/60 block mb-3 font-sans">Ertiga, Carens (6 Pax)</span>
                    <div className="text-xl font-bold text-[#E8B96A] font-mono">
                      ₹{selectedRoute.suvRate.toLocaleString("en-IN")}*
                    </div>
                    <span className="text-[10px] text-[#D8CFC7]/40 block">One-way base fare</span>
                  </div>
                  <a
                    href={`https://wa.me/918127929551?text=Hi%20Yaduvanshi%20Tours,%20I%20want%20to%20book%20an%20SUV%20from%20${selectedRoute.from}%20to%20${encodeURIComponent(selectedRoute.to)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-2 rounded-xl text-center text-xs font-semibold text-[#0C1519] bg-gradient-to-r from-[#E8B96A] to-[#CF9D7B] hover:brightness-110 transition-all font-bold"
                  >
                    Book SUV
                  </a>
                </div>

                {/* Innova Crysta */}
                <div className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-[#CF9D7B]/40 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-white font-display">Innova Crysta</span>
                      <Car className="w-4 h-4 text-[#E8B96A]" />
                    </div>
                    <span className="text-[11px] text-[#D8CFC7]/60 block mb-3 font-sans">Innova Crysta (7 Pax)</span>
                    <div className="text-xl font-bold text-[#E8B96A] font-mono">
                      ₹{selectedRoute.innovaRate.toLocaleString("en-IN")}*
                    </div>
                    <span className="text-[10px] text-[#D8CFC7]/40 block">Luxury highway ride</span>
                  </div>
                  <a
                    href={`https://wa.me/918127929551?text=Hi%20Yaduvanshi%20Tours,%20I%20want%20to%20book%20an%20Innova%20Crysta%20from%20${selectedRoute.from}%20to%20${encodeURIComponent(selectedRoute.to)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-2 rounded-xl text-center text-xs font-semibold text-white bg-white/10 hover:bg-[#E8B96A] hover:text-[#0C1519] transition-all"
                  >
                    Book Crysta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* All Routes Complete Table for SEO Crawlers & Visitors */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-display font-semibold text-white text-base">
                Kanpur Outstation Fare Chart &amp; Highway Guide
              </h4>
              <p className="text-xs text-[#D8CFC7]/60 font-sans">
                Toll taxes, state road taxes &amp; parking extra at actuals. Round trip discounts available.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:+918127929551"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E8B96A]" />
                Call +91 81279 29551
              </a>
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0C1519] bg-[#E8B96A] hover:brightness-110 transition-colors"
              >
                Custom Quote <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[#E8B96A] font-accent uppercase tracking-wider text-[11px]">
                  <th className="p-3.5 sm:p-4">Route</th>
                  <th className="p-3.5 sm:p-4">Distance</th>
                  <th className="p-3.5 sm:p-4">Duration</th>
                  <th className="p-3.5 sm:p-4">Highway Route</th>
                  <th className="p-3.5 sm:p-4">Sedan Fare</th>
                  <th className="p-3.5 sm:p-4">SUV / Ertiga</th>
                  <th className="p-3.5 sm:p-4">Innova Crysta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#D8CFC7]/80">
                {POPULAR_ROUTES.map((route) => (
                  <tr
                    key={route.id}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer"
                    onClick={() => setSelectedRoute(route)}
                  >
                    <td className="p-3.5 sm:p-4 font-medium text-white whitespace-nowrap">
                      {route.from} → {route.to}
                    </td>
                    <td className="p-3.5 sm:p-4 font-mono">{route.distanceKm} km</td>
                    <td className="p-3.5 sm:p-4 font-mono">{route.duration}</td>
                    <td className="p-3.5 sm:p-4 text-xs text-[#D8CFC7]/60">{route.highway}</td>
                    <td className="p-3.5 sm:p-4 font-mono font-semibold text-[#E8B96A]">
                      ₹{route.sedanRate.toLocaleString("en-IN")}
                    </td>
                    <td className="p-3.5 sm:p-4 font-mono font-semibold text-[#E8B96A]">
                      ₹{route.suvRate.toLocaleString("en-IN")}
                    </td>
                    <td className="p-3.5 sm:p-4 font-mono font-semibold text-[#E8B96A]">
                      ₹{route.innovaRate.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
