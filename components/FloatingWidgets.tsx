"use client";

import { useState } from "react";
import { Phone, MessageCircle, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";
const PHONE_NUMBER = "+91 98765 43210";
const DIALER_NUMBER = "+919876543210";

export function FloatingWidgets() {
  const [showCallCard, setShowCallCard] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PHONE_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    "Hi, I am interested in planning a tour or renting a vehicle with Yaduvanshi Tours. Please share options and availability."
  );

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3.5 pointer-events-none">
      {/* ── Call Widget & Desktop Tooltip Card ── */}
      <div className="flex items-center gap-3.5 pointer-events-auto">
        <AnimatePresence>
          {showCallCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1A2B1C] text-white p-3.5 rounded-lg shadow-2xl border border-[#C9A84C]/30 flex flex-col gap-2.5 w-60"
            >
              <div className="text-xs text-white/60 font-mono">Customer Support (24x7)</div>
              <div className="font-display font-semibold text-lg tracking-wide text-white">{PHONE_NUMBER}</div>
              <div className="flex gap-2">
                <a
                  href={`tel:${DIALER_NUMBER}`}
                  className="flex-1 text-center text-xs font-semibold py-1.5 rounded-sm bg-[#C9A84C] text-[#1A2B1C] hover:brightness-95 transition-all"
                >
                  Call Now
                </a>
                <button
                  onClick={handleCopy}
                  className="px-2.5 rounded-sm border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center text-white/80"
                  title="Copy number"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setShowCallCard(!showCallCard)}
          className="w-12 h-12 rounded-full shadow-lg bg-[#1A2B1C] border border-[#C9A84C]/20 text-[#C9A84C] flex items-center justify-center cursor-pointer hover:bg-[#1A2B1C]/90 transition-colors"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <Phone size={20} className={showCallCard ? "rotate-12 transition-transform" : ""} />
        </motion.button>
      </div>

      {/* ── WhatsApp Floating Button ── */}
      <div className="pointer-events-auto">
        <motion.a
          href={`https://wa.me/919876543210?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full shadow-lg bg-[#25D366] text-white flex items-center justify-center cursor-pointer relative group"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing ring animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none group-hover:animate-none" />
          <MessageCircle size={26} className="fill-white text-[#25D366]" />
        </motion.a>
      </div>
    </div>
  );
}
