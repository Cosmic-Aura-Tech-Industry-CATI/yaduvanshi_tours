"use client";

import { motion } from "motion/react";
import { UserCheck, Headphones, Wrench, Sparkles } from "lucide-react";

const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";

const features = [
  {
    icon: UserCheck,
    title: "Chauffeur Excellence",
    description: "Courteous, verified, and highly experienced drivers trained for long-distance routes and city tours."
  },
  {
    icon: Headphones,
    title: "24/7 Roadside Concierge",
    description: "Around-the-clock support dispatcher to assist with routing, modifications, or roadside assistance."
  },
  {
    icon: Wrench,
    title: "Meticulous Maintenance",
    description: "Every vehicle undergoes strict multi-point safety inspections and servicing before departure."
  },
  {
    icon: Sparkles,
    title: "Sanitized & Immaculate",
    description: "Complete interior sanitization, deep vacuuming, and fresh air fresheners for a spotless cabin atmosphere."
  }
];

export function WhyOurFleetSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  return (
    <section className="relative py-24 bg-[#0C1519] border-t border-white/5 overflow-hidden z-10">
      {/* Background visual glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-5 pointer-events-none blur-[100px]"
        style={{ background: `radial-gradient(circle, ${BRASS}, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
            <span 
              className="text-[10px] font-bold tracking-[0.25em] uppercase font-accent"
              style={{ color: GOLD }}
            >
              Why Our Fleet
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Built around your <span className="italic font-serif" style={{ color: GOLD }}>comfort</span>.
          </h2>
          <p className="text-[#D8CFC7]/70 text-sm md:text-base leading-relaxed">
            Every journey with Yaduvanshi Tours is designed with strict safety protocols, warm service, and absolute reliability at its heart.
          </p>
        </div>

        {/* 4-Column Feature Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="group relative p-8 rounded-2xl glass-panel border border-white/5 bg-[#162127]/10 transition-all duration-300 hover:border-[#CF9D7B]/30 hover:bg-[#162127]/25 flex flex-col items-center text-center cursor-default hover:shadow-[0_10px_30px_rgba(207,157,123,0.05)]"
              >
                {/* Circular Icon Container */}
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 mb-6 group-hover:scale-110"
                  style={{
                    borderColor: "rgba(207, 157, 123, 0.2)",
                    background: "rgba(207, 157, 123, 0.04)"
                  }}
                >
                  <Icon size={22} style={{ color: GOLD }} />
                </div>

                <h3 
                  className="font-display font-bold text-base text-white mb-2 transition-colors duration-300 group-hover:text-[#E8B96A]"
                >
                  {feat.title}
                </h3>
                
                <p className="text-[#D8CFC7]/60 text-xs leading-relaxed font-sans">
                  {feat.description}
                </p>

                {/* Staggered corner accent details inside card */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-[#CF9D7B]/40 transition-colors" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 group-hover:border-[#CF9D7B]/40 transition-colors" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
