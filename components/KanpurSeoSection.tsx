"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Car,
  Compass,
  Users,
  Sparkles,
  Phone,
  ChevronDown,
  ShieldCheck,
  Clock,
  Award,
} from "lucide-react";
import { KANPUR_FAQS, kanpurFaqSchema } from "@/lib/seoSchema";

const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";

const KANPUR_LOCALITIES = [
  "Ramadevi Chauraha",
  "Civil Lines",
  "Swaroop Nagar",
  "Kalyanpur",
  "Kidwai Nagar",
  "Govind Nagar",
  "Kakadeo",
  "Kanpur Cantt",
  "Kanpur Central Station",
  "Chakeri Airport (KNU)",
  "Panki",
  "Barra",
  "Shyam Nagar",
  "Ratan Lal Nagar",
  "Unnao Bypass",
  "Lucknow Highway",
];

const SERVICE_HIGHLIGHTS = [
  {
    icon: Car,
    title: "Kanpur Taxi & Cab Service",
    description:
      "Reliable local 8hr/80km rentals and outstation cab booking from Kanpur starting at ₹11/km. Verified courteous chauffeurs and pristine AC cars.",
    linkText: "View Vehicle Fleet",
    href: "/vehicles",
  },
  {
    icon: Compass,
    title: "Pilgrimage Tours from Kanpur",
    description:
      "Direct custom tour packages from Kanpur to Ayodhya Ram Mandir, Varanasi Kashi Vishwanath, Chitrakoot, Prayagraj, and Char Dham Yatra.",
    linkText: "Explore Tour Packages",
    href: "/tours",
  },
  {
    icon: Users,
    title: "Tempo Traveller & Urbania",
    description:
      "Kanpur's leading fleet of 12, 17, and 26-seater Force Tempo Travellers & luxury Force Urbanias for family vacations, corporate retreats, and yatras.",
    linkText: "Group Rentals",
    href: "/vehicles",
  },
  {
    icon: Sparkles,
    title: "Luxury Wedding Car Rentals",
    description:
      "Make your wedding unforgettable in Kanpur with decorated Audi, Mercedes, BMW, and Toyota Fortuner bridal cars, plus baraat convoy buses.",
    linkText: "Wedding Cars",
    href: "/weddings",
  },
];

export function KanpurSeoSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="kanpur-tours-and-travels"
      className="relative py-24 px-6 lg:px-12 overflow-hidden"
      style={{ background: "#0A1014" }}
    >
      {/* FAQ Schema Injection for AEO (Google AI Overviews & Perplexity) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kanpurFaqSchema) }}
      />

      {/* Decorative ambient gradients */}
      <div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }}
      />
      <div
        className="absolute bottom-10 -right-40 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#CF9D7B]/20 mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#E8B96A]" />
            <span className="text-[10px] sm:text-xs font-accent tracking-widest text-[#E8B96A] uppercase font-semibold">
              Kanpur’s Premier Tours &amp; Travels Partner
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Best Tours &amp; Travels in{" "}
            <span className="text-[#E8B96A] underline decoration-[#CF9D7B]/40 decoration-wavy decoration-1 underline-offset-8">
              Kanpur
            </span>
          </h2>

          <p className="mt-5 text-[#D8CFC7]/80 text-sm sm:text-base md:text-lg font-sans leading-relaxed">
            Headquartered at <strong className="text-white">Ramadevi Chauraha, Kanpur</strong>, 
            Yaduvanshi Tours &amp; Travels brings 15+ years of trusted excellence in outstation taxi services, 
            pan-India pilgrimage yatras, corporate group travel, and luxury wedding logistics.
          </p>

          <div
            className="w-28 h-0.5 mx-auto mt-6"
            style={{ background: `linear-gradient(to right, transparent, ${BRASS}, transparent)` }}
          />
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SERVICE_HIGHLIGHTS.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-[#CF9D7B]/30 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_8px_30px_rgba(207,157,123,0.12)]"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "rgba(207, 157, 123, 0.15)", border: `1px solid ${BRASS}33` }}
                  >
                    <Icon className="w-6 h-6 text-[#E8B96A]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2.5 font-display group-hover:text-[#E8B96A] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D8CFC7]/70 leading-relaxed font-sans mb-4">
                    {service.description}
                  </p>
                </div>
                <Link
                  href={service.href}
                  className="inline-flex items-center text-xs font-semibold text-[#E8B96A] hover:text-white transition-colors gap-1.5 pt-2 border-t border-white/5"
                >
                  {service.linkText} →
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Local Areas Served Grid in Kanpur */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E8B96A] font-accent font-semibold block mb-1">
                Local Pickup &amp; Door-to-Door Service
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Serving Every Corner of Kanpur &amp; NCR
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#D8CFC7]/75">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E8B96A]" /> 24/7 Availability
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E8B96A]" /> Verified Chauffeurs
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#E8B96A]" /> 4.9★ Rated
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#D8CFC7]/70 font-sans mb-5 leading-relaxed">
            Need an early morning pickup for Chakeri Airport, a late-night drop from Kanpur Central, or an outstation cab to Lucknow or Delhi? We provide doorstep pickup across all Kanpur residential and commercial hubs:
          </p>

          <div className="flex flex-wrap gap-2">
            {KANPUR_LOCALITIES.map((loc) => (
              <span
                key={loc}
                className="px-3 py-1.5 rounded-lg text-xs font-sans bg-white/[0.03] border border-white/10 text-[#D8CFC7]/85 hover:border-[#CF9D7B]/40 hover:text-[#E8B96A] transition-colors"
              >
                📍 {loc}
              </span>
            ))}
          </div>
        </div>

        {/* AEO: Direct Answer Conversational FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#E8B96A] font-accent font-semibold block mb-2">
              Helpful Travel Guide
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display">
              Frequently Asked Questions About Tours &amp; Travels in Kanpur
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#D8CFC7]/70 font-sans">
              Clear answers to the most common questions our travelers ask about cab rentals, pilgrimage yatras, and booking terms in Kanpur.
            </p>
          </div>

          <div className="space-y-3.5">
            {KANPUR_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-white/10 overflow-hidden transition-all duration-300"
                  style={{
                    background: isOpen ? "rgba(207, 157, 123, 0.08)" : "rgba(18, 28, 33, 0.5)",
                    borderColor: isOpen ? "rgba(232, 185, 106, 0.35)" : "rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 select-none cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-medium text-sm sm:text-base text-white hover:text-[#E8B96A] transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-[#E8B96A] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#D8CFC7]/85 font-sans leading-relaxed border-t border-white/5 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick Desk Contact Callout */}
          <div className="mt-10 p-6 rounded-2xl glass-panel border border-[#CF9D7B]/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-white font-display font-semibold text-base">
                Have a specific itinerary in mind from Kanpur?
              </h4>
              <p className="text-xs text-[#D8CFC7]/70 font-sans mt-0.5">
                Speak directly with Mr. Manoj Yadav at our Ramadevi Chauraha desk for instant customized quotes.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:+918127929551"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#0C1519] bg-gradient-to-r from-[#E8B96A] to-[#CF9D7B] hover:brightness-110 shadow-md transition-all whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                Call +91 81279 29551
              </a>
              <Link
                href="/inquiry"
                className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all whitespace-nowrap"
              >
                Plan Custom Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
