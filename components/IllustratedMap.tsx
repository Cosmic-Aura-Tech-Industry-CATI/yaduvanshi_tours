"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { MapPin } from "lucide-react";

const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";
const DARK = "#0C1519";

interface MapPinData {
  id: string;
  name: string;
  x: number; // percentage width
  y: number; // percentage height
  price: string;
  duration: string;
  slug: string;
}

const PINS: MapPinData[] = [
  {
    id: "katra",
    name: "Vaishno Devi (Katra)",
    x: 35,
    y: 18,
    price: "₹40,000",
    duration: "10 Days",
    slug: "vaishno-devi",
  },
  {
    id: "manali",
    name: "Kullu Manali",
    x: 42,
    y: 24,
    price: "₹26,000",
    duration: "6 Days",
    slug: "kullu-manali",
  },
  {
    id: "chardham",
    name: "Char Dham region",
    x: 48,
    y: 28,
    price: "₹1,40,000",
    duration: "10 Days",
    slug: "char-dham-yatra",
  },
  {
    id: "mathura",
    name: "Mathura-Vrindavan",
    x: 44,
    y: 42,
    price: "₹11,000",
    duration: "2 Days",
    slug: "mathura-vrindavan",
  },
  {
    id: "ayodhya",
    name: "Ayodhya",
    x: 58,
    y: 45,
    price: "₹5,500",
    duration: "2 Days",
    slug: "ayodhya-darshan",
  },
  {
    id: "varanasi",
    name: "Kashi (Varanasi)",
    x: 63,
    y: 50,
    price: "₹10,500",
    duration: "2 Days",
    slug: "kashi-vishwanath",
  },
  {
    id: "ujjain",
    name: "Mahakal (Ujjain)",
    x: 38,
    y: 58,
    price: "₹20,000",
    duration: "3 Days",
    slug: "mahakal-omkareshwar",
  },
];

export function IllustratedMap() {
  const router = useRouter();
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  const handlePinClick = (slug: string) => {
    router.push(`/tours/${slug}`);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden border shadow-2xl flex flex-col items-center justify-center p-6 bg-[#0C1519]"
      style={{ borderColor: "rgba(207, 157, 123, 0.15)" }}>
      {/* Background Stylized Mesh Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#E8B96A_1px,transparent_1px),linear-gradient(to_bottom,#E8B96A_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Decorative compass rose */}
      <div className="absolute top-6 left-6 text-white/10 select-none">
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="40" strokeDasharray="3 3" />
          <path d="M50 5 L50 95 M5 50 L95 50 M20 20 L80 80 M20 80 L80 20" />
          <polygon points="50,15 54,46 50,50 46,46" fill={GOLD} stroke="none" />
          <polygon points="50,85 54,54 50,50 46,54" fill="currentColor" opacity="0.5" stroke="none" />
          <polygon points="85,50 54,54 50,50 54,46" fill={GOLD} stroke="none" />
          <polygon points="15,50 46,54 50,50 46,46" fill="currentColor" opacity="0.5" stroke="none" />
          <text x="47" y="12" fill={GOLD} fontSize="10" className="font-accent font-semibold">N</text>
        </svg>
      </div>

      {/* Main Stylized Vector SVG Layout */}
      <svg
        viewBox="0 0 800 800"
        className="w-full h-full max-w-[500px] md:max-w-[700px] select-none text-white/5"
        fill="currentColor"
      >
        {/* Stylized region outlines for North/Central India */}
        <g stroke="rgba(207, 157, 123, 0.15)" strokeWidth="1.5">
          {/* North boundary (Kashmir, Himachal, Ladakh) */}
          <path d="M 280 250 L 320 180 L 340 100 L 390 70 L 440 90 L 460 130 L 480 180 L 470 230 L 490 270 L 530 290 L 550 340 L 490 380 L 440 400 L 370 410 L 340 450 L 290 440 Z" fill="#3A3534" opacity="0.2" />
          {/* Central boundary (UP, MP, Rajasthan) */}
          <path d="M 290 440 L 340 450 L 370 410 L 440 400 L 490 380 L 550 340 L 610 330 L 690 350 L 740 420 L 710 490 L 670 540 L 620 590 L 540 620 L 460 630 L 380 610 L 260 580 L 240 500 L 260 460 Z" fill="#3A3534" opacity="0.15" />
          {/* Major travel highways representation */}
          <path d="M 350 180 Q 400 210 420 240 T 480 280 T 440 420 T 580 450 T 630 500" fill="none" stroke={GOLD} strokeWidth="1" strokeDasharray="5 5" opacity="0.25" />
          <path d="M 440 420 Q 380 500 380 580" fill="none" stroke={GOLD} strokeWidth="1" strokeDasharray="5 5" opacity="0.25" />
        </g>
      </svg>

      {/* Pins overlay */}
      {PINS.map((pin) => {
        const isHovered = hoveredPin === pin.id;
        return (
          <div
            key={pin.id}
            className="absolute cursor-pointer pointer-events-auto group"
            style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%, -50%)" }}
            onMouseEnter={() => setHoveredPin(pin.id)}
            onMouseLeave={() => setHoveredPin(null)}
            onClick={() => handlePinClick(pin.slug)}
          >
            {/* Pulsing ring */}
            <span className="absolute -inset-2.5 rounded-full bg-[#E8B96A]/20 animate-ping opacity-60 pointer-events-none group-hover:scale-125" />
            
            {/* Core Marker */}
            <motion.div
              animate={{ scale: isHovered ? 1.25 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative w-7 h-7 rounded-full flex items-center justify-center shadow-lg border text-[#E8B96A] bg-[#0C1519]"
              style={{ borderColor: "#CF9D7B" }}
            >
              <MapPin size={14} className="fill-[#E8B96A]/25" />
            </motion.div>

            {/* Floating Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: -45, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 -translate-x-1/2 z-50 text-white px-3.5 py-2.5 rounded-xl shadow-2xl w-44 flex flex-col pointer-events-none border glass-panel"
                  style={{
                    background: "#0C1519",
                    borderColor: "#CF9D7B",
                  }}
                >
                  <div className="font-display font-semibold text-xs text-[#E8B96A] tracking-wide">{pin.name}</div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-[#D8CFC7]/70">
                    <span>{pin.duration}</span>
                    <span className="text-[#E8B96A] font-semibold">{pin.price}</span>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-4 border-x-transparent border-t-4"
                    style={{ borderTopColor: "#CF9D7B" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
