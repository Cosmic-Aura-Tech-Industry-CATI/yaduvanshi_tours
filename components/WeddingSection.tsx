"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, Flower2, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";
const DARKER = "#131F14";

const IMG = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

export function WeddingSection() {
  return (
    <section className="py-24 bg-white px-6 lg:px-12 relative overflow-hidden">
      {/* Decorative details */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5 pointer-events-none"
        style={{ background: GOLD }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: GOLD }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Images grid */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 relative"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 rounded-2xl overflow-hidden h-72 sm:h-96 shadow-lg group">
              <img
                src={IMG("photo-1519741497674-611481863552", 700, 500)}
                alt="Decorated wedding car"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-4 rounded-2xl overflow-hidden h-40 sm:h-52 self-end shadow-md group">
              <img
                src={IMG("photo-1519671282429-b8493a5f678a", 400, 400)}
                alt="Wedding couple"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-4 rounded-2xl overflow-hidden h-40 sm:h-52 self-start shadow-md group">
              <img
                src={IMG("photo-1465495976277-4387d4b0e4a6", 400, 400)}
                alt="Rose decorations"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-8 rounded-2xl overflow-hidden h-48 sm:h-64 shadow-lg group">
              <img
                src={IMG("photo-1522673607200-164d1b6ce486", 600, 400)}
                alt="Luxury wedding fleet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <SectionHeader
            script="Elegant Ceremonies"
            heading="Luxury Wedding Car Services"
            sub="Make your special day grand. We provide premium chauffeur-driven luxury cars decorated with exquisite flowers, and manage complete guest logistics across venues."
          />

          <ul className="space-y-3.5 text-sm text-gray-600">
            {[
              "Flower decorated luxury groom & bride cars",
              "Tempo Travellers & coaches for guest shuttles",
              "Verified, professional uniformed chauffeurs",
              "24/7 dedicated wedding transport desk coordination",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${GOLD}15` }}
                >
                  <Flower2 size={11} style={{ color: GOLD }} />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/weddings"
              className="flex items-center justify-center gap-2 px-7 py-3.5 font-semibold rounded-sm text-sm hover:brightness-90 transition-all cursor-pointer"
              style={{ background: GOLD, color: DARK }}
            >
              Explore Wedding Fleet <ChevronRight size={15} />
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-7 py-3.5 border border-green-500 text-green-700 font-semibold text-sm rounded-sm hover:bg-green-50 transition-colors"
            >
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
