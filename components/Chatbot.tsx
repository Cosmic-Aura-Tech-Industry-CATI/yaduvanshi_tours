"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Bot, User } from "lucide-react";

const BRASS = "#CF9D7B";
const COFFEE = "#724B39";
const GOLD = "#E8B96A";
const IVORY = "#F5F0EA";

interface Msg {
  id: number;
  from: "bot" | "user";
  text: string;
}

const FAQ: { q: string; a: string }[] = [
  { q: "What tours do you offer?", a: "We offer curated pilgrimage, mountain, and heritage tour packages across India—including Kashi (Varanasi), Ayodhya, Char Dham Yatra, Kashmir, Himachal Pradesh, Rajasthan, Goa, Kerala, and Gujarat. You can explore all our active packages and book them directly on our [Tour Packages](/tours) page." },
  { q: "How do I book a vehicle?", a: "We provide chauffeur-driven premium vehicle rentals for local travel, outstations, and events. Our fleet includes Hatchbacks, Sedans (Dzire, Etios), SUVs (Innova Crysta, Fortuner), and Multi-seaters (Tempo Traveller, Force Urbania, Luxury Buses). You can view details on our [Vehicle Rentals](/vehicles) page." },
  { q: "Do you offer wedding cars?", a: "Make your special day grand with our premium wedding car services! We offer flower-decorated luxury wedding cars, family group shuttles, and elegant guest convoys. View our options and book on our [Wedding Travel](/weddings) page." },
  { q: "How do I book or plan a trip?", a: "You can easily book or plan your custom itinerary directly by filling out our quick [Plan Your Trip](/inquiry) form, or call/WhatsApp our travel desk for booking assistance." },
];

function renderMessageText(text: string) {
  const parts = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    const textBefore = text.substring(lastIndex, match.index);
    if (textBefore) parts.push(textBefore);
    
    const label = match[1];
    const url = match[2];
    const isExternal = url.startsWith("http") || url.startsWith("tel") || url.startsWith("mailto");
    
    if (isExternal) {
      parts.push(
        <a key={match.index} href={url} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#E8B96A] transition-colors font-semibold">
          {label}
        </a>
      );
    } else {
      parts.push(
        <Link key={match.index} href={url} className="underline hover:text-[#E8B96A] transition-colors font-semibold">
          {label}
        </Link>
      );
    }
    
    lastIndex = regex.lastIndex;
  }
  
  const textAfter = text.substring(lastIndex);
  if (textAfter) parts.push(textAfter);

  return parts.length > 0 ? parts : text;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 0, from: "bot", text: "Namaste! 🙏 I'm your virtual travel assistant. How can I help you plan your trip?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // Sync chatbot open state with window events
  useEffect(() => {
    const handleToggle = () => setOpen((o) => !o);
    window.addEventListener("toggle-chatbot", handleToggle);
    return () => window.removeEventListener("toggle-chatbot", handleToggle);
  }, []);

  // Broadcast state changes so the floating button trigger icon updates
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("chatbot-state", { detail: { open } }));
  }, [open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: Date.now(), from: "user", text };
    setMsgs((p) => [...p, userMsg]);
    setInput("");

    // Simple FAQ matching
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "";

      // 1. Tour Packages matching
      if (
        lower.includes("tour") ||
        lower.includes("package") ||
        lower.includes("yatra") ||
        lower.includes("destination") ||
        lower.includes("holiday") ||
        lower.includes("kedarnath") ||
        lower.includes("ayodhya") ||
        lower.includes("varanasi") ||
        lower.includes("kashi") ||
        lower.includes("kashmir") ||
        lower.includes("manali")
      ) {
        reply = "We offer curated pilgrimage, mountain, and heritage tour packages across India—including Kashi (Varanasi), Ayodhya, Char Dham Yatra, Kashmir, Himachal Pradesh, Rajasthan, Goa, Kerala, and Gujarat. You can explore all our active packages and book them directly on our [Tour Packages](/tours) page.";
      }
      // 2. Vehicle Rental matching
      else if (
        lower.includes("car") ||
        lower.includes("vehicle") ||
        lower.includes("cab") ||
        lower.includes("taxi") ||
        lower.includes("rental") ||
        lower.includes("rent") ||
        lower.includes("dzire") ||
        lower.includes("fortuner") ||
        lower.includes("innova") ||
        lower.includes("tempo") ||
        lower.includes("traveller") ||
        lower.includes("urbania") ||
        lower.includes("fleet")
      ) {
        // Special sub-check for wedding cars so we route to wedding if they ask "wedding car"
        if (lower.includes("wedding") || lower.includes("marriage")) {
          reply = "Make your special day grand with our premium wedding car services! We offer flower-decorated luxury wedding cars, family group shuttles, and elegant guest convoys. View our options and book on our [Wedding Travel](/weddings) page.";
        } else {
          reply = "We provide chauffeur-driven premium vehicle rentals for local travel, outstations, and events. Our fleet includes Hatchbacks, Sedans (Dzire, Etios), SUVs (Innova Crysta, Fortuner), and Multi-seaters (Tempo Traveller, Force Urbania, Luxury Buses). You can view details on our [Vehicle Rentals](/vehicles) page.";
        }
      }
      // 3. Wedding Car Booking matching
      else if (
        lower.includes("wedding") ||
        lower.includes("marriage") ||
        lower.includes("bride") ||
        lower.includes("groom") ||
        lower.includes("convoy") ||
        lower.includes("doli")
      ) {
        reply = "Make your special day grand with our premium wedding car services! We offer flower-decorated luxury wedding cars, family group shuttles, and elegant guest convoys. View our options and book on our [Wedding Travel](/weddings) page.";
      }
      // 4. Booking/Planning/Pricing
      else if (
        lower.includes("book") ||
        lower.includes("reserve") ||
        lower.includes("price") ||
        lower.includes("pricing") ||
        lower.includes("cost") ||
        lower.includes("inquire") ||
        lower.includes("inquiry") ||
        lower.includes("plan")
      ) {
        reply = "You can easily book or plan your custom itinerary directly by filling out our quick [Plan Your Trip](/inquiry) form, or call/WhatsApp our travel desk for booking assistance.";
      }
      // 5. Contact/Location/Address
      else if (
        lower.includes("location") ||
        lower.includes("address") ||
        lower.includes("office") ||
        lower.includes("where") ||
        lower.includes("kanpur")
      ) {
        reply = "Our main booking office is located near Ramadevi Chauraha, Kanpur, Uttar Pradesh, India. You can find detailed maps and contact details on our [Contact Us](/contact) page.";
      }

      if (!reply) {
        reply = "Thank you for your question! Our team will get back to you shortly. Meanwhile, you can call us at +91 94157 63552 or WhatsApp for instant help.";
      }

      setMsgs((p) => [...p, { id: Date.now() + 1, from: "bot", text: reply }]);
    }, 800);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-[5.5rem] top-[60%] -translate-y-1/2 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl z-[80] flex flex-col"
          style={{
            maxHeight: "75vh",
            background: "#0C1519",
            border: `1px solid ${BRASS}20`,
            boxShadow: `0 0 40px rgba(207, 157, 123, 0.15), 0 20px 60px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-3.5 flex items-center justify-between flex-shrink-0 relative"
            style={{ background: "#3A3534" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center glass-panel" style={{ boxShadow: `0 0 10px rgba(207, 157, 123, 0.2)` }}>
                <Bot size={16} style={{ color: BRASS }} />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Travel Assistant</div>
                <div className="text-white/30 text-[10px] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer">
              <X size={18} />
            </button>
            {/* Glow bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${BRASS}40, ${COFFEE}30, transparent)` }} />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar" style={{ maxHeight: "340px" }}>
            {msgs.map((m) => (
              <div key={m.id} className={`flex gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                {m.from === "bot" && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 glass-panel" style={{ boxShadow: `0 0 6px rgba(207,157,123,0.15)` }}>
                    <Bot size={11} style={{ color: BRASS }} />
                  </div>
                )}
                <div
                  className="px-3.5 py-2.5 rounded-xl text-xs leading-relaxed max-w-[75%] font-sans"
                  style={m.from === "user"
                    ? { background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`, color: "#0C1519" }
                    : { background: "rgba(58,53,52,0.3)", color: "#D8CFC7", border: `1px solid rgba(207,157,123,0.1)` }}
                >
                  {renderMessageText(m.text)}
                </div>
                {m.from === "user" && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 glass-panel">
                    <User size={11} className="text-white/50" />
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* FAQ pills */}
          {msgs.length <= 2 && (
            <div className="px-4 pb-3 flex flex-wrap gap-1.5 font-accent tracking-widest text-[9px]">
              {FAQ.map((f) => (
                <button
                  key={f.q}
                  onClick={() => send(f.q)}
                  className="px-2.5 py-1 rounded-full transition-colors cursor-pointer glass-panel"
                  style={{ color: GOLD }}
                >
                  {f.q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="p-3 flex gap-2 flex-shrink-0"
            style={{ borderTop: `1px solid rgba(207,157,123,0.1)` }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-white text-xs px-3 py-2.5 rounded-lg placeholder-white/20 font-mono glass-panel"
              style={{ outline: "none" }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = `0 0 15px rgba(232, 185, 106, 0.25)`;
                e.currentTarget.style.borderColor = `${GOLD}40`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = `0 0 25px rgba(207, 157, 123, 0.12), 0 8px 32px rgba(0, 0, 0, 0.45)`;
                e.currentTarget.style.borderColor = `rgba(207, 157, 123, 0.18)`;
              }}
            />
            <button type="submit"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:brightness-110 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${BRASS})` }}
            >
              <Send size={13} style={{ color: "#0C1519" }} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
