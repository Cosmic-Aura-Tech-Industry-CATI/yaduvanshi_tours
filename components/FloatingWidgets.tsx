"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Phone, X, MessageCircle } from "lucide-react";
import { TOURS_DATA } from "@/data/tours";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

export function FloatingWidgets() {
  const [showCall, setShowCall] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const pathname = usePathname();

  let whatsappMessage = "Hello Yaduvanshi Tours and Travels, I have a query.";
  if (pathname) {
    if (pathname.startsWith("/vehicles")) {
      whatsappMessage = "Hello Yaduvanshi Tours and Travels, I am interested in booking a vehicle.";
    } else if (pathname.startsWith("/tours/")) {
      const slug = pathname.split("/").pop();
      const tour = TOURS_DATA.find((t) => t.slug === slug);
      if (tour) {
        whatsappMessage = `Hello Yaduvanshi Tours and Travels, I am interested in ${tour.name} tour package.`;
      } else {
        whatsappMessage = "Hello Yaduvanshi Tours and Travels, I am interested in a tour package.";
      }
    } else if (pathname.startsWith("/tours")) {
      whatsappMessage = "Hello Yaduvanshi Tours and Travels, I am interested in a tour package.";
    } else if (pathname.startsWith("/weddings")) {
      whatsappMessage = "Hello Yaduvanshi Tours and Travels, I am interested in booking a wedding vehicle.";
    } else if (pathname.startsWith("/contact")) {
      whatsappMessage = "Hello Yaduvanshi Tours and Travels, I would like more information.";
    } else if (pathname !== "/") {
      whatsappMessage = "Hello Yaduvanshi Tours and Travels, I would like more information.";
    }
  }
  const whatsappUrl = `https://wa.me/918127929551?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    const handleState = (e: Event) => {
      setChatOpen((e as CustomEvent).detail.open);
    };
    window.addEventListener("chatbot-state", handleState);
    return () => window.removeEventListener("chatbot-state", handleState);
  }, []);

  const toggleChat = () => {
    window.dispatchEvent(new CustomEvent("toggle-chatbot"));
  };

  return (
    <>
      {/* Phone tooltip card — positioned to the left of the Call button */}
      <AnimatePresence>
        {showCall && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="fixed right-[5.5rem] top-[50%] -translate-y-1/2 rounded-xl p-4 shadow-2xl z-[80] glass-panel-strong"
            style={{ width: 230 }}
          >
            <button
              onClick={() => setShowCall(false)}
              className="absolute top-2 right-2 text-white/30 hover:text-white transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
            <p className="text-[#D8CFC7]/55 text-[11px] mb-2 font-mono">Speak with our concierge:</p>
            <a href="tel:+918127929551"
              className="block text-[#E8B96A] font-bold text-sm mb-3 hover:text-white transition-colors font-mono"
            >
              +91 81279 29551
            </a>
            <a href="tel:+918127929551"
              className="flex items-center justify-center gap-1.5 w-full py-2.5 text-[10px] font-accent tracking-widest font-semibold rounded-sm transition-all hover:brightness-110 btn-glow"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }}
            >
              <Phone size={12} /> Call Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons — stacked vertically on the right side at top: 60% — increased button size to w-14 h-14 */}
      <div 
        className="fixed right-5 top-[60%] -translate-y-1/2 z-[80] flex flex-col items-center gap-4"
        style={{ pointerEvents: "auto" }}
      >
        {/* Phone button (gold with radar pulse glow) */}
        <motion.button
          onClick={() => setShowCall((p) => !p)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer pulse-ring-gold"
          style={{
            background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
            boxShadow: `0 0 15px rgba(232, 185, 106, 0.35), 0 4px 20px rgba(0,0,0,0.45)`,
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: `0 0 25px rgba(232, 185, 106, 0.55), 0 4px 30px rgba(0,0,0,0.5)`,
          }}
          whileTap={{ scale: 0.92 }}
        >
          <Phone size={20} style={{ color: "#0C1519" }} />
        </motion.button>

        {/* WhatsApp (green with radar pulse glow) */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer pulse-ring-green"
          style={{
            background: "#25D366",
            boxShadow: `0 0 15px rgba(37,211,102,0.3), 0 4px 20px rgba(0,0,0,0.3)`,
            border: "2px solid rgba(37,211,102,0.3)",
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: `0 0 25px rgba(37,211,102,0.5), 0 4px 30px rgba(0,0,0,0.4)`,
          }}
          whileTap={{ scale: 0.92 }}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>

        {/* Chatbot trigger button (dark-gold with pulse glow) */}
        <motion.button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
            boxShadow: `0 0 12px rgba(207, 157, 123, 0.25)`,
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: `0 0 20px rgba(207, 157, 123, 0.45)`,
          }}
          whileTap={{ scale: 0.92 }}
          animate={{
            boxShadow: chatOpen
              ? `0 0 10px rgba(207,157,123,0.3)`
              : [
                  `0 0 15px rgba(207,157,123,0.3), 0 0 30px rgba(207,157,123,0.15)`,
                  `0 0 25px rgba(207,157,123,0.55), 0 0 50px rgba(207,157,123,0.25)`,
                  `0 0 15px rgba(207,157,123,0.3), 0 0 30px rgba(207,157,123,0.15)`,
                ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            {chatOpen
              ? <motion.div key="x" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }}><X size={22} style={{ color: "#0C1519" }} /></motion.div>
              : <motion.div key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><MessageCircle size={22} style={{ color: "#0C1519" }} /></motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
