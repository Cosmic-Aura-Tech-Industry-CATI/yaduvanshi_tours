"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, Check, Send } from "lucide-react";

const GOLD   = "#C9A84C";
const DARKER = "#131F14";

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
  { label: "Himachal Pradesh", href: "/destinations/himachal-pradesh" },
  { label: "Kashmir",          href: "/destinations/kashmir" },
  { label: "Rajasthan",        href: "/destinations/rajasthan" },
  { label: "Goa",              href: "/destinations/goa" },
  { label: "Kerala",           href: "/destinations/kerala" },
  { label: "Agra & Taj Mahal", href: "/destinations/agra" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone]   = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <footer className="pt-14 pb-6 relative overflow-hidden" style={{ background: DARKER }}>
      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 29px, ${GOLD} 30px),
                          repeating-linear-gradient(90deg, transparent, transparent 29px, ${GOLD} 30px)`,
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0" fill="none">
                <polygon points="16,3 29,27 3,27" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
                <polygon points="16,10 23,23 9,23" fill={GOLD} opacity="0.35" />
              </svg>
              <div>
                <div className="font-display font-bold text-white text-base leading-none">Yaduvanshi</div>
                <div className="text-[8px] tracking-widest uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Tours & Travels</div>
              </div>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              Creating unforgettable journeys across India since 2010. Travel with comfort, safety &amp; trust.
            </p>
            <div className="flex gap-2.5">
              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-white/12 text-white/45 hover:text-[#C9A84C] hover:border-[#C9A84C]/60 hover:scale-105 transition-all duration-300">
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-white/12 text-white/45 hover:text-[#C9A84C] hover:border-[#C9A84C]/60 hover:scale-105 transition-all duration-300">
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-white/12 text-white/45 hover:text-[#C9A84C] hover:border-[#C9A84C]/60 hover:scale-105 transition-all duration-300">
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              {/* Youtube */}
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-white/12 text-white/45 hover:text-[#C9A84C] hover:border-[#C9A84C]/60 hover:scale-105 transition-all duration-300">
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-sm text-white/45 hover:text-[#C9A84C] transition-colors duration-200 relative group inline-block"
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ background: GOLD }} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Top Destinations</h4>
            <ul className="space-y-2.5">
              {TOP_DESTINATIONS.map((d) => (
                <li key={d.label}>
                  <Link href={d.href}
                    className="text-sm text-white/45 hover:text-[#C9A84C] transition-colors duration-200 relative group inline-block"
                  >
                    {d.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ background: GOLD }} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Contact Info</h4>
            <div className="space-y-3 mb-7">
              {[
                { Icon: Phone,  text: "+91 98765 43210" },
                { Icon: Mail,   text: "info@yaduvanshitours.com" },
                { Icon: MapPin, text: "123, Travel Street, New Delhi – 110001" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-2 text-white/45 text-xs">
                  <Icon size={13} className="mt-0.5 flex-shrink-0" style={{ color: GOLD }} />
                  {text}
                </div>
              ))}
            </div>

            <h4 className="text-white font-semibold text-sm mb-2">Newsletter</h4>
            <p className="text-white/35 text-xs mb-3">Get exclusive deals & travel tips in your inbox.</p>
            <form onSubmit={submit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white/6 border border-white/10 text-white text-xs px-3 py-2.5 rounded-sm placeholder-white/25 focus:outline-none focus:border-[#C9A84C]/50 transition-colors font-mono"
              />
              <button type="submit"
                className="w-10 h-10 flex items-center justify-center rounded-sm hover:brightness-90 flex-shrink-0 transition-all"
                style={{ background: GOLD }}
              >
                <AnimatePresence mode="wait">
                  {done
                    ? <motion.div key="ok"   initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={16} style={{ color: "#1A2B1C" }} /></motion.div>
                    : <motion.div key="send" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Send  size={15} style={{ color: "#1A2B1C" }} /></motion.div>
                  }
                </AnimatePresence>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-xs text-white/28">© {new Date().getFullYear()} Yaduvanshi Tours & Travels. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms & Conditions"].map((l) => (
              <a key={l} href="#" className="text-xs text-white/28 hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
