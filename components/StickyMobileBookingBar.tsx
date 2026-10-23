"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/siteConfig";

interface StickyMobileBookingBarProps {
  title: string;
  startingPrice: number;
  phoneRaw?: string;
}

export function StickyMobileBookingBar({
  title,
  startingPrice,
  phoneRaw = PHONE_NUMBER,
}: StickyMobileBookingBarProps) {
  const cleanPhone = phoneRaw.replace(/[^0-9]/g, "");
  const encodedMsg = encodeURIComponent(
    `Hello Yadhuvanshi Tours, I would like to enquire / book for: ${title} (Starting ₹${startingPrice.toLocaleString("en-IN")}). Please share vehicle availability and final quote.`
  );

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#080E11]/95 backdrop-blur-md border-t border-[#CF9D7B]/30 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-[#D8CFC7]/60 font-sans">
            Starts At
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-[#E8B96A] font-display">
              ₹{startingPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-[#D8CFC7]/40">onwards</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          {/* Direct Call Button */}
          <a
            href={`tel:${phoneRaw}`}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold tracking-wide transition-all active:scale-95"
            aria-label="Call Yadhuvanshi Tours"
          >
            <Phone className="w-4 h-4 text-[#CF9D7B]" />
            <span>Call</span>
          </a>

          {/* Instant WhatsApp Booking Button */}
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodedMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold tracking-wide shadow-[0_0_16px_rgba(37,211,102,0.4)] transition-all active:scale-95"
            aria-label="Book on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
