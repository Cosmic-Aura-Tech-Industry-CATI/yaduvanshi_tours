"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Phone, MessageSquare, ArrowRight, Zap } from "lucide-react";

const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

// Replace with client's actual contact number/link details
const CONTACT_PHONE = "+917500366888";
const WHATSAPP_URL = "https://wa.me/917500366888?text=Hello%20Yaduvanshi%20Tours,%20I%20am%20interested%20in%20booking%2520a%20vehicle.";

export function QuickBookingCTA() {
  return (
    <section className="relative py-16 bg-[#0C1519] overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-10 md:p-14 rounded-3xl overflow-hidden glass-panel border border-[#CF9D7B]/20 bg-[#162127]/15 hover-glow shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
          style={{
            boxShadow: "0 0 30px rgba(207, 157, 123, 0.08), 0 10px 30px rgba(0,0,0,0.5)"
          }}
        >
          {/* Ambient decorative glow inside */}
          <div 
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-10 blur-[60px]"
            style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }}
          />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
            {/* Left Content */}
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2">
                <Zap size={11} style={{ color: GOLD }} className="animate-pulse" />
                <span 
                  className="text-[10px] font-bold tracking-[0.25em] uppercase font-accent"
                  style={{ color: GOLD }}
                >
                  Quick Booking
                </span>
              </div>
              
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
                Need a vehicle <span className="italic font-serif" style={{ color: GOLD }}>today</span>?
              </h2>
              
              <p className="text-[#D8CFC7]/75 text-sm md:text-base font-sans leading-relaxed">
                Connect directly with our fleet dispatch desk for instant pricing, availability, and confirmed same-day bookings.
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:self-center font-accent tracking-widest text-[10px] uppercase font-bold">
              {/* Call Now */}
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg transition-all duration-200 hover:brightness-110 shadow-lg text-center"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }}
              >
                <Phone size={12} /> Call Now
              </a>

              {/* WhatsApp Us */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg transition-all duration-200 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/5 text-center bg-[#0C1519]/50"
              >
                <MessageSquare size={12} /> WhatsApp Us
              </a>

              {/* Get Free Quote */}
              <Link
                href="/inquiry?type=vehicle"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg transition-all duration-200 border border-[#E8B96A]/30 text-[#E8B96A] hover:bg-white/5 text-center bg-[#0C1519]/50"
              >
                Get Free Quote <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Staggered corner accent details inside panel */}
          <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-[#CF9D7B]/25" />
          <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-[#CF9D7B]/25" />
        </motion.div>
      </div>
    </section>
  );
}
