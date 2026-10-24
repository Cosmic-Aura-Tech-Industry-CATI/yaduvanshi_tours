import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/data/seo-landings";
import { SITE_URL } from "@/lib/siteConfig";
import { ShieldCheck, Star, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Tours & Travels Services in Kanpur | Taxi, Tempo Traveller & Car Hire",
  description: "Explore complete travel services by Yaduvanshi Tours Kanpur. Outstation cabs, local taxi rentals, 9-26 seater Tempo Travellers, Force Urbania & wedding fleets.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

export default function ServicesIndexPage() {
  const services = getAllServices();

  return (
    <main className="min-h-screen bg-[#080E11] text-[#D8CFC7] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#CF9D7B]/10 text-[#E8B96A] border border-[#CF9D7B]/30 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Serving Kanpur, Lucknow & Uttar Pradesh Since 2010
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-4">
            Tours, Taxi & Car Rental Services
          </h1>
          <p className="text-sm sm:text-base text-[#D8CFC7]/75 font-sans leading-relaxed">
            From local city taxi packages to outstation pilgrimage journeys and luxury group coaches, discover Kanpur&apos;s most reliable travel and vehicle hire services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-2xl bg-[#0f171c]/90 border border-[#CF9D7B]/20 hover:border-[#CF9D7B]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(207,157,123,0.15)] hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#E8B96A] mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8B96A]/10 border border-[#E8B96A]/20">
                    {service.hero.badge}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{service.hero.ratingValue}</span>
                  </div>
                </div>

                <h2 className="text-xl font-display font-bold text-white group-hover:text-[#E8B96A] transition-colors mb-2">
                  {service.hero.h1}
                </h2>

                <p className="text-xs text-[#D8CFC7]/70 font-sans line-clamp-3 mb-6 leading-relaxed">
                  {service.hero.subheading}
                </p>

                {service.serviceFeatures && service.serviceFeatures.length > 0 && (
                  <div className="space-y-1.5 text-xs text-[#D8CFC7]/60 mb-6 font-sans">
                    {service.serviceFeatures.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[#CF9D7B]" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#D8CFC7]/50 uppercase tracking-wider block">
                    Starting From
                  </span>
                  <span className="text-lg font-bold text-[#E8B96A] font-display">
                    ₹{service.hero.startingPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-[#E8B96A] transition-colors">
                  <span>Explore Service</span>
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
