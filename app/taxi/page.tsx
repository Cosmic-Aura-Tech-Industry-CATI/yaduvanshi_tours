import type { Metadata } from "next";
import Link from "next/link";
import { getAllRoutes } from "@/data/seo-landings";
import { SITE_URL } from "@/lib/siteConfig";
import { MapPin, Navigation, ArrowRight, ShieldCheck, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Outstation Cab & Taxi Service from Kanpur | Flat Fares | Yaduvanshi",
  description: "Book reliable outstation taxi service from Kanpur to Ayodhya, Lucknow, Varanasi, Prayagraj, Delhi & across India. Clean AC Sedans, SUVs & Tempo Travellers from ₹11/km.",
  alternates: {
    canonical: `${SITE_URL}/taxi`,
  },
};

export default function TaxiIndexPage() {
  const routes = getAllRoutes();

  return (
    <main className="min-h-screen bg-[#080E11] text-[#D8CFC7] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#CF9D7B]/10 text-[#E8B96A] border border-[#CF9D7B]/30 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Highway Drivers & Sanitised Cabs
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-4">
            Outstation Taxi Services from Kanpur
          </h1>
          <p className="text-sm sm:text-base text-[#D8CFC7]/75 font-sans leading-relaxed">
            Travel seamlessly between major cities, pilgrimage hubs, and airports across Uttar Pradesh and North India. Transparent tariffs, zero surge pricing, and 24/7 doorstep pickup.
          </p>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <Link
              key={route.slug}
              href={`/taxi/${route.slug}`}
              className="group rounded-2xl bg-[#0f171c]/90 border border-[#CF9D7B]/20 hover:border-[#CF9D7B]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(207,157,123,0.15)] hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#E8B96A] mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8B96A]/10 border border-[#E8B96A]/20">
                    {route.hero.badge}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{route.hero.ratingValue}</span>
                  </div>
                </div>

                <h2 className="text-xl font-display font-bold text-white group-hover:text-[#E8B96A] transition-colors mb-2">
                  {route.hero.h1}
                </h2>

                <p className="text-xs text-[#D8CFC7]/70 font-sans line-clamp-2 mb-4 leading-relaxed">
                  {route.hero.subheading}
                </p>

                {route.routeDetails && (
                  <div className="space-y-1.5 text-xs text-[#D8CFC7]/60 mb-6 font-sans">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-3.5 h-3.5 text-[#CF9D7B]" />
                      <span>{route.routeDetails.distanceKm} km • {route.routeDetails.estimatedTimeHours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#CF9D7B]" />
                      <span>via {route.routeDetails.primaryHighway}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#D8CFC7]/50 uppercase tracking-wider block">
                    Starting From
                  </span>
                  <span className="text-lg font-bold text-[#E8B96A] font-display">
                    ₹{route.hero.startingPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-[#E8B96A] transition-colors">
                  <span>View Rates</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
