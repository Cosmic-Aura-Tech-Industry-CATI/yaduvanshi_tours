"use client";

import { motion } from "motion/react";
import { ShieldCheck, Car, IndianRupee, Headphones, Lock } from "lucide-react";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Tours",
    desc: "100% authenticated packages",
  },
  {
    icon: Car,
    title: "Expert Drivers",
    desc: "Trained & verified escorts",
  },
  {
    icon: IndianRupee,
    title: "Best Value",
    desc: "Transparent rates, no hidden fees",
  },
  {
    icon: Headphones,
    title: "Royal Support",
    desc: "24/7 concierge assistance",
  },
];

export function TrustStrip() {
  return (
    <section
      className="relative py-6 overflow-hidden"
      style={{ background: "#0C1519" }}
    >
      {/* Ambient glow blobs */}
      <div className="ambient-blob-brass" style={{ top: "-100px", left: "10%" }} />
      <div className="ambient-blob-coffee" style={{ top: "-80px", right: "15%" }} />

      {/* Top glow divider */}
      <div className="glow-divider absolute top-0 inset-x-0" />
      {/* Bottom glow divider */}
      <div className="glow-divider absolute bottom-0 inset-x-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl border"
          style={{
            background: "rgba(58, 53, 52, 0.2)",
            borderColor: "rgba(207, 157, 123, 0.25)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(207, 157, 123, 0.05)"
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-4 p-4 rounded-xl border cursor-default transition-all duration-300 w-full"
              style={{
                background: "rgba(22, 33, 39, 0.45)",
                borderColor: "rgba(207, 157, 123, 0.12)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)"
              }}
            >
              {/* Icon container — glass with glow */}
              <motion.div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border"
                style={{
                  background: "rgba(22, 33, 39, 0.6)",
                  borderColor: "rgba(207, 157, 123, 0.2)",
                  boxShadow: `0 0 12px rgba(207, 157, 123, 0.15)`,
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 4,
                  borderColor: "#E8B96A",
                  boxShadow: `0 0 22px rgba(232, 185, 106, 0.35), 0 0 44px rgba(232, 185, 106, 0.12)`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                <f.icon size={18} className="transition-all duration-300 group-hover:text-[#E8B96A] group-hover:drop-shadow-[0_0_8px_rgba(232,185,106,0.6)] text-[#CF9D7B]" />
              </motion.div>

              <div>
                <div className="text-white text-xs font-bold leading-none font-accent tracking-widest uppercase">{f.title}</div>
                <div className="text-[#D8CFC7]/50 text-[10px] mt-1.5 font-mono tracking-wide">{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
