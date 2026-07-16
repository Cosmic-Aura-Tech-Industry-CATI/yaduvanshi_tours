"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, ArrowRight, Bot } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const GOLD = "#C9A84C";
const DARK = "#1A2B1C";

interface Message {
  sender: "bot" | "user";
  text: string;
  options?: string[];
  formField?: "name" | "phone" | "destination" | "confirm";
}

const FAQS = [
  {
    key: "rates",
    label: "What are your vehicle rates?",
    response: "Our vehicle rates start from ₹2,000/day for Maruti Dzire (5-seater sedan) up to ₹25,000/day for luxury BMW 5 Series. We offer local (80km/8hrs limit) and outstation packages.",
  },
  {
    key: "packages",
    label: "Do you offer tour packages?",
    response: "Yes! We specialize in premium heritage and pilgrimage packages, including Ayodhya (from ₹5,500/vehicle), Mathura-Vrindavan, Varanasi, and the premium Char Dham Yatra. Prices are calculated per vehicle for maximum group value.",
  },
  {
    key: "custom",
    label: "Can I customize a package?",
    // Triggers lead capture flow
    response: "Absolutely. Let's build your custom plan. May I know your name first?",
    triggerLead: true,
  },
  {
    key: "inclusion",
    label: "What's included in the price?",
    response: "All standard vehicle rentals include fuel, vehicle cost, and professional chauffeur service. High-way tolls, state entry taxes, and parking fees are extra and billed at actuals.",
  },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Namaste! Welcome to Yaduvanshi Tours. How can I assist you today?",
      options: FAQS.map((faq) => faq.label),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [leadData, setLeadData] = useState({
    name: "",
    phone: "",
    destination: "",
  });
  const [activeStep, setActiveStep] = useState<"none" | "name" | "phone" | "destination">("none");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionClick = (optionLabel: string) => {
    // Add user message
    const newMessages: Message[] = [...messages, { sender: "user", text: optionLabel }];
    setMessages(newMessages);

    // Find if option corresponds to FAQ
    const faq = FAQS.find((f) => f.label === optionLabel);
    if (faq) {
      setTimeout(() => {
        if (faq.triggerLead) {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: faq.response },
          ]);
          setActiveStep("name");
        } else {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: faq.response,
              options: FAQS.map((f) => f.label),
            },
          ]);
        }
      }, 600);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputValue("");

    setTimeout(() => {
      if (activeStep === "name") {
        setLeadData((prev) => ({ ...prev, name: userText }));
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Nice to meet you, ${userText}! Please share your 10-digit mobile number so our team can contact you.` },
        ]);
        setActiveStep("phone");
      } else if (activeStep === "phone") {
        setLeadData((prev) => ({ ...prev, phone: userText }));
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Great! Where are you planning to travel, and for which dates?" },
        ]);
        setActiveStep("destination");
      } else if (activeStep === "destination") {
        const finalDest = userText;
        const updatedLead = { ...leadData, destination: finalDest };
        setLeadData(updatedLead);
        setActiveStep("none");

        // Format direct WhatsApp link
        const waText = encodeURIComponent(
          `Hi, my name is ${updatedLead.name}. I am looking to book a trip to ${finalDest}. Contact number: ${updatedLead.phone}. Please connect me to an agent.`
        );
        const waUrl = `https://wa.me/919876543210?text=${waText}`;

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `Thank you! I have saved your preferences:\n👤 Name: ${updatedLead.name}\n📞 Phone: ${updatedLead.phone}\n📍 Destination: ${finalDest}\n\nClick below to immediately connect with our travel experts on WhatsApp!`,
          },
        ]);

        // Delay showing WhatsApp handoff button
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "Connect to live assistant now:",
              options: ["👉 Click to open WhatsApp"],
            },
          ]);
        }, 600);
      } else {
        // Fallback or restart
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "I am a simple virtual assistant. You can ask me FAQs or customize a tour package using the menu options below:",
            options: FAQS.map((f) => f.label),
          },
        ]);
      }
    }, 600);
  };

  const handleWhatsappTrigger = (optionText: string) => {
    if (optionText.includes("WhatsApp")) {
      const waText = encodeURIComponent(
        `Hi, my name is ${leadData.name || "Customer"}. I am looking to book a trip to ${leadData.destination || "Varanasi/Ayodhya"}. Contact: ${leadData.phone || ""}. Please assist.`
      );
      window.open(`https://wa.me/919876543210?text=${waText}`, "_blank");
    } else {
      handleOptionClick(optionText);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start pointer-events-none">
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-[#1A2B1C] text-white rounded-lg shadow-2xl border border-[#C9A84C]/30 flex flex-col w-[350px] max-w-[calc(100vw-32px)] h-[480px] mb-4 pointer-events-auto overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center" style={{ backgroundColor: "#142115" }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#1A2B1C]">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="font-display font-semibold text-sm tracking-wide">Yadu Assistant</div>
                  <div className="text-[10px] text-green-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online Support
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white cursor-pointer transition-colors p-1">
                <X size={18} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((m, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] text-xs p-3 rounded-md leading-relaxed whitespace-pre-line ${
                        m.sender === "user"
                          ? "bg-[#C9A84C] text-[#1A2B1C] font-medium"
                          : "bg-white/5 text-white/90 border border-white/5"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>

                  {/* Render Options / FAQ Buttons */}
                  {m.options && m.options.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5 pl-1">
                      {m.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleWhatsappTrigger(opt)}
                          className="text-[11px] text-[#C9A84C] border border-[#C9A84C]/30 bg-[#C9A84C]/5 px-2.5 py-1.5 rounded-sm hover:bg-[#C9A84C] hover:text-[#1A2B1C] hover:border-transparent transition-all cursor-pointer text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex gap-2" style={{ backgroundColor: "#142115" }}>
              <input
                type="text"
                placeholder={
                  activeStep === "name"
                    ? "Enter your name..."
                    : activeStep === "phone"
                    ? "Enter phone number..."
                    : activeStep === "destination"
                    ? "Enter destinations/dates..."
                    : "Type a message..."
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A84C]/60 font-sans"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:brightness-95"
                style={{ backgroundColor: GOLD, color: DARK }}
              >
                <Send size={12} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat Trigger Button ── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full shadow-lg bg-[#C9A84C] text-[#1A2B1C] flex items-center justify-center cursor-pointer hover:scale-105 pointer-events-auto"
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={20} className={isOpen ? "rotate-90 transition-transform" : ""} />
      </motion.button>
    </div>
  );
}
