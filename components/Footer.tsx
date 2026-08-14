"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";

const QUICK_LINKS = [
  { label: "Home",             href: "/" },
  { label: "Tour Packages",    href: "/tours" },
  { label: "Vehicle Rentals",  href: "/vehicles" },
  { label: "Wedding Cars",     href: "/weddings" },
  { label: "Destinations",     href: "/destinations" },
  { label: "About Us",         href: "/about" },
  { label: "Contact Us",       href: "/contact" },
  { label: "Plan Your Trip",   href: "/inquiry" },
];

const TOP_DESTINATIONS = [
  "Himachal Pradesh",
  "Kashmir",
  "Rajasthan",
  "Goa",
  "Kerala",
  "Agra & Taj Mahal",
];

export function Footer() {
  return (
    <footer className="pt-14 pb-6 relative overflow-hidden" style={{ background: "#080E11" }}>
      {/* Glowing top border */}
      <div className="glow-divider absolute top-0 inset-x-0" />

      {/* Ambient blobs */}
      <div className="ambient-blob-brass" style={{ top: "-120px", right: "10%" }} />
      <div className="ambient-blob-coffee" style={{ bottom: "-100px", left: "20%" }} />

      {/* Grid texture — coffee */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 29px, ${COFFEE} 30px),
                          repeating-linear-gradient(90deg, transparent, transparent 29px, ${COFFEE} 30px)`,
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Prominent Centered Brand Header */}
        <div className="flex flex-col items-center text-center mb-16 relative z-10 pt-4">
          <Link href="/" className="flex flex-col items-center gap-2 group">
            {/* Premium brand signature — height-driven, auto-width, no empty margins */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              style={{
                position: "relative",
                height: "260px",
                width: "380px",
                maxWidth: "88vw",
                display: "block",
                filter: "drop-shadow(0 8px 36px rgba(232,185,106,0.60))",
              }}
            >
              <Image
                src="/images/logo.webp"
                alt="Yaduvanshi Tour & Travels"
                fill
                sizes="(max-width: 768px) 88vw, 380px"
                className="object-contain"
              />
            </motion.div>
          </Link>
          <div className="w-80 h-px mt-8 mb-2" style={{ background: `linear-gradient(to right, transparent, ${BRASS}65, transparent)` }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Description & Socials */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 font-display">About Our Journey</h4>
            <p className="text-[#D8CFC7]/40 text-sm leading-relaxed mb-6 font-sans">
              Crafting legendary journeys across India&apos;s royal heritage and scenic horizons since 2010.
            </p>
            <div className="flex gap-2.5">
              {/* Facebook */}
              {/* TODO: Replace with real Facebook profile URL */}
              <a href="https://www.facebook.com/yaduvanshitourandtravels" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center glass-panel text-white/40 hover:text-[#E8B96A] transition-all duration-300 hover:shadow-[0_0_15px_rgba(232,185,106,0.3)] hover:scale-105">
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              {/* TODO: Replace with real Instagram profile URL */}
              <a href="https://www.instagram.com/yaduvanshitourandtravels" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center glass-panel text-white/40 hover:text-[#E8B96A] transition-all duration-300 hover:shadow-[0_0_15px_rgba(232,185,106,0.3)] hover:scale-105">
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Twitter */}
              {/* TODO: Replace with real Twitter/X profile URL */}
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center glass-panel text-white/40 hover:text-[#E8B96A] transition-all duration-300 hover:shadow-[0_0_15px_rgba(232,185,106,0.3)] hover:scale-105">
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              {/* Youtube */}
              {/* TODO: Replace with real YouTube channel URL */}
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center glass-panel text-white/40 hover:text-[#E8B96A] transition-all duration-300 hover:shadow-[0_0_15px_rgba(232,185,106,0.3)] hover:scale-105">
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 font-display">Quick Links</h4>
            <ul className="space-y-2.5 font-sans">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-sm text-[#D8CFC7]/50 hover:text-[#E8B96A] transition-colors duration-200 relative group inline-block"
                  >
                    {l.label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                      style={{ background: `linear-gradient(to right, ${GOLD}, ${BRASS})`, boxShadow: `0 0 4px ${GOLD}30` }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 font-display">Top Destinations</h4>
            <ul className="space-y-2.5 font-sans">
              {TOP_DESTINATIONS.map((d) => (
                <li key={d}>
                  <span className="text-sm text-[#D8CFC7]/50 inline-block cursor-default">
                    {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 font-display">Contact Info</h4>
            <div className="space-y-3 font-sans">
              {[
                { Icon: Phone,  text: "+91 81279 29551" },
                { Icon: Mail,   text: "manojyadav20101993@gmail.com" },
                { Icon: MapPin, text: "Ramadevi Chauraha, Kanpur, UP" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-2 text-[#D8CFC7]/50 text-xs">
                  <Icon size={13} className="mt-0.5 flex-shrink-0" style={{ color: BRASS }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: `1px solid rgba(207, 157, 123, 0.15)` }}>
          <p className="text-xs text-[#D8CFC7]/25 font-sans">© {new Date().getFullYear()} Yaduvanshi Tours & Travels. All rights reserved.</p>
          <div className="flex items-center gap-2 font-sans">
            <span className="text-xs text-[#D8CFC7]/25">Designed &amp; Developed by</span>
            <a
              href="https://dimisi.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/dimisi-logo.webp"
                alt="DIMISI"
                width={60}
                height={20}
                style={{ filter: "drop-shadow(0 0 4px rgba(207,157,123,0.3))" }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
