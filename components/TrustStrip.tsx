"use client";

import { motion } from "motion/react";
import { ShieldCheck, Car, IndianRupee, Headphones, Lock } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Tours",
    desc: "100% authenticated packages",
  },
  {
    icon: Car,
    title: "Experienced Drivers",
    desc: "Trained & background-verified",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    desc: "No hidden charges ever",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Always here when you need us",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    desc: "Safe & encrypted booking",
  },
];

export function TrustStrip() {
  return (
    <section
      className="relative py-5 overflow-hidden"
      style={{ background: DARK }}
    >
      {/* Subtle top border glow */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${GOLD}60, transparent)` }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${GOLD}30, transparent)` }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-x-4 gap-y-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -2 }}
              className="group flex items-center gap-3 cursor-default"
            >
              {/* Icon container */}
              <motion.div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${GOLD}18`,
                  border: `1px solid ${GOLD}35`,
                }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                <f.icon size={16} style={{ color: GOLD }} />
              </motion.div>

              <div>
                <div className="text-white text-xs font-semibold leading-none">{f.title}</div>
                <div className="text-white/40 text-[10px] mt-0.5 font-mono">{f.desc}</div>
              </div>

              {/* Separator */}
              {i < FEATURES.length - 1 && (
                <div
                  className="hidden md:block w-px h-7 ml-4 flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.10)" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
