"use client";

import { useState } from "react";
import { PACKAGES } from "@/data/packages";
import { PackageCard } from "@/components/cards/PackageCard";
import { Search, MapPin, Compass } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

const CATEGORIES = ["All", "Spiritual", "Mountains"];

export default function ToursPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTours = PACKAGES.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.destinations.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      activeCategory === "All" || tour.category === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-28 pb-20">
      {/* Page Header */}
      <section className="bg-[#1A2B1C] text-white py-16 px-6 relative overflow-hidden border-b border-[#C9A84C]/20">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-[#C9A84C] font-mono text-xs uppercase tracking-widest block mb-3">Explore India</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wide">Tour Packages</h1>
          <p className="text-white/60 text-sm max-w-xl mx-auto mt-4 font-sans leading-relaxed">
            Discover sacred pilgrimages, serene Himalayan escapes, and tailored travel routes. Highly cost-effective per-vehicle pricing.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* Controls: Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          {/* Category Tabs */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 text-xs font-semibold rounded-sm border transition-all cursor-pointer whitespace-nowrap"
                style={
                  activeCategory === cat
                    ? { background: GOLD, borderColor: GOLD, color: DARK }
                    : { background: "transparent", borderColor: "#e5e7eb", color: "#4b5563" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search destination or package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAF8] border border-gray-200 rounded-sm pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#C9A84C] font-sans"
            />
          </div>
        </div>

        {/* Listings Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {filteredTours.map((tour, i) => (
              <PackageCard key={tour.slug} pkg={tour} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center justify-center gap-4">
            <Compass size={40} className="text-gray-300 animate-spin-slow" />
            <h3 className="font-display font-semibold text-lg text-gray-700">No packages found</h3>
            <p className="text-gray-400 text-xs max-w-xs">
              Try adjusting your search filters or browse other available yatra categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
