"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Compass } from "lucide-react";

const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";

const WHATSAPP_URL = "https://wa.me/918127929551?text=Hello%20Yaduvanshi%20Tours,%20I%20am%20ready%20to%20plan%20a%20customized%20trip%20to%20Incredible%20India.";

export function TripPlanningCTA() {
  return (
    <section className="relative w-full min-h-[500px] flex items-center overflow-hidden z-10">
      {/* Full-Bleed Background Image — high quality WebP */}
      <img 
        src="/destinations/taj-mahal-cta.webp"
        alt="Taj Mahal background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{
          filter: "brightness(1.08) contrast(1.10) saturate(1.15)",
        }}
      />
      
      {/* Dark left-to-right gradient overlay — ensures high text legibility on left while photo shines on right */}
      <div 
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to right, rgba(12,21,25,0.85) 0%, rgba(12,21,25,0.60) 40%, rgba(12,21,25,0.15) 100%)" }}
      />
      
      {/* Subtle top/bottom page-blend */}
      <div 
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(12,21,25,0.6) 0%, transparent 25%, transparent 75%, rgba(12,21,25,0.7) 100%)" }}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-20 py-24 md:py-32">
        <div className="max-w-2xl text-left space-y-6">
          {/* Overline Label with Horizontal Accent Line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-0.5" style={{ background: GOLD }} />
            <span 
              className="text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] uppercase font-accent"
              style={{ color: GOLD }}
            >
              Let&apos;s Plan Your Trip
            </span>
          </motion.div>

          {/* Heading (Regular Serif + Italicized Accent) */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white leading-[1.15]"
          >
            Ready to explore <br />
            <span className="italic font-serif" style={{ color: GOLD }}>Incredible India?</span>
          </motion.h2>

          {/* Brand Voice Tailored Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#D8CFC7]/80 text-base md:text-lg leading-relaxed max-w-xl font-sans"
          >
            Share your preferred dates, choice destinations, and travel style with us. Our destination experts will craft a personalized itinerary and tailored quote within 24 hours—completely hassle-free and with zero pushy phone calls.
          </motion.p>

          {/* Action CTAs Button Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 font-accent tracking-widest text-[10px] uppercase font-bold"
          >
            {/* Get Free Quote */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/inquiry"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg transition-all duration-200 text-[#0C1519] shadow-lg text-center"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})` }}
              >
                Get Free Quote <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Chat on WhatsApp */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg transition-all duration-200 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/5 text-center bg-[#0C1519]/70 backdrop-blur-sm"
              >
                <MessageSquare size={12} /> Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
