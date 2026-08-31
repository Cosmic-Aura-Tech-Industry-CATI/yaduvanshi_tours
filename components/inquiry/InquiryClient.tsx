"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Compass,
  Calendar,
  User,
  Car,
  Mountain,
  Heart,
  MapPin,
  Users,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  Clock,
  Shield,
  Check,
  Loader2,
} from "lucide-react";
import { PACKAGES } from "@/data/packages";
import { VEHICLES } from "@/data/vehicles";

/* ── Design tokens ─────────────────────────────────────────────── */
const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";

/* ── Zod schemas per step ──────────────────────────────────────── */
const step1Schema = z.object({
  type: z.enum(["tour", "vehicle", "wedding", "custom"], {
    required_error: "Please select an experience type",
  }),
});

const step2Schema = z.object({
  type: z.enum(["tour", "vehicle", "wedding", "custom"]),
  packageSlug: z.string().optional(),
  vehicleSlug: z.string().optional(),
  rentalType: z.enum(["local", "outstation"]).optional(),
  weddingVehicle: z.string().optional(),
  guestShuttle: z.string().optional(),
  customDestination: z.string().optional(),
  startDate: z.string().min(1, "Please select a travel date"),
  passengers: z.string().min(1, "Please enter number of travelers"),
  budget: z.string().optional(),
});

const step3Schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number").max(15),
  email: z.string().email("Please enter a valid email").or(z.literal("")),
  notes: z.string().optional(),
});

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type FormData = z.infer<typeof fullSchema>;

/* ── Category card data ────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "tour" as const,
    label: "Tour Package",
    desc: "Curated spiritual, mountain & heritage journeys",
    icon: Mountain,
  },
  {
    id: "vehicle" as const,
    label: "Vehicle Rental",
    desc: "Chauffeur-driven sedans, SUVs & luxury cars",
    icon: Car,
  },
  {
    id: "wedding" as const,
    label: "Wedding Travel",
    desc: "Decorated bridal cars, baraat & guest shuttles",
    icon: Heart,
  },
  {
    id: "custom" as const,
    label: "Custom Trip",
    desc: "Design your own itinerary from scratch",
    icon: Compass,
  },
];

/* ── Step meta ─────────────────────────────────────────────────── */
const STEPS = [
  { num: 1, label: "Experience" },
  { num: 2, label: "Trip Details" },
  { num: 3, label: "Contact" },
  { num: 4, label: "Confirmed" },
];

/* ── Slide direction for AnimatePresence ───────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

/* ── Floating label input ──────────────────────────────────────── */
function FloatingInput({
  label,
  type = "text",
  value,
  error,
  ...props
}: {
  label: string;
  type?: string;
  value: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const hasValue = value && value.length > 0;
  return (
    <div className="relative group">
      <input
        type={type}
        value={value}
        className={`peer w-full bg-[#162127]/60 border rounded-xl px-4 pt-6 pb-2.5 text-sm text-white
          placeholder-transparent focus:outline-none transition-all duration-300
          focus:shadow-[0_0_20px_rgba(232,185,106,0.15)]
          ${error ? "border-red-500/60" : "border-white/10 focus:border-[#E8B96A]/60"}`}
        placeholder={label}
        {...props}
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-accent tracking-wider
          ${hasValue || type === "date"
            ? "top-2 text-[9px] text-[#E8B96A]/80"
            : "top-1/2 -translate-y-1/2 text-xs text-[#D8CFC7]/40 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[9px] peer-focus:text-[#E8B96A]/80"
          }`}
      >
        {label}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400/80 text-[10px] mt-1 ml-1 font-mono"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

/* ── Animated checkmark for success ────────────────────────────── */
function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto relative"
      style={{
        background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))",
        border: "2px solid rgba(34,197,94,0.3)",
        boxShadow: "0 0 40px rgba(34,197,94,0.15)",
      }}
    >
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      >
        <Check size={36} className="text-green-400" strokeWidth={2.5} />
      </motion.div>
      {/* Radiating rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-green-400/20"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-green-400/10"
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
      />
    </motion.div>
  );
}

/* ── Progress indicator ────────────────────────────────────────── */
function ProgressSteps({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((s, i) => {
        const isComplete = current > s.num;
        const isActive = current === s.num;
        return (
          <div key={s.num} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold relative"
                animate={{
                  background: isComplete
                    ? `linear-gradient(135deg, ${GOLD}, ${BRASS})`
                    : isActive
                    ? "rgba(232,185,106,0.15)"
                    : "rgba(255,255,255,0.05)",
                  borderColor: isActive ? GOLD : "rgba(255,255,255,0.1)",
                  borderWidth: isActive ? "2px" : "1px",
                }}
                style={{ borderStyle: "solid" }}
                transition={{ duration: 0.3 }}
              >
                {isComplete ? (
                  <Check size={14} className="text-[#0C1519]" strokeWidth={3} />
                ) : (
                  <span style={{ color: isActive ? GOLD : "rgba(216,207,199,0.4)" }}>
                    {s.num}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${GOLD}40` }}
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </motion.div>
              <span
                className="text-[9px] font-accent tracking-wider mt-1.5 hidden sm:block"
                style={{ color: isActive ? GOLD : "rgba(216,207,199,0.35)" }}
              >
                {s.label}
              </span>
            </div>
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className="w-8 sm:w-14 h-px mx-1 sm:mx-2 mt-[-18px] sm:mt-0"
                style={{
                  background: isComplete
                    ? `linear-gradient(90deg, ${GOLD}, ${BRASS})`
                    : "rgba(255,255,255,0.08)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Context summary card ──────────────────────────────────────── */
function ContextCard({
  image,
  title,
  subtitle,
  price,
}: {
  image: string;
  title: string;
  subtitle: string;
  price: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center gap-4 p-4 rounded-xl border mb-8"
      style={{
        background: "rgba(58,53,52,0.2)",
        borderColor: "rgba(207,157,123,0.12)",
      }}
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{title}</p>
        <p className="text-[#D8CFC7]/50 text-[11px] mt-0.5 truncate">{subtitle}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-[#E8B96A] font-mono font-bold text-sm">{price}</p>
        <p className="text-[#D8CFC7]/30 text-[9px] font-mono">starting</p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN FORM COMPONENT
   ══════════════════════════════════════════════════════════════════ */
function InquiryForm() {
  const searchParams = useSearchParams();

  /* ── Resolve context from query params ─────────────────────── */
  const qType = searchParams?.get("type");
  const qPackage = searchParams?.get("package");
  const qVehicle = searchParams?.get("vehicle");
  const qRental = searchParams?.get("rental");

  // Determine the resolved type
  const resolvedType = qType === "vehicle"
    ? "vehicle"
    : qType === "wedding"
    ? "wedding"
    : qPackage
    ? "tour"
    : qType || "";

  // Look up context data
  const contextPackage = qPackage
    ? PACKAGES.find((p) => p.slug === qPackage)
    : undefined;
  const contextVehicle = qVehicle
    ? VEHICLES.find((v) => v.slug === qVehicle) ||
      VEHICLES.find((v) => v.name.toLowerCase() === qVehicle.toLowerCase())
    : undefined;

  // Should we skip Step 1?
  const hasPresetType = !!resolvedType;
  const initialStep = hasPresetType ? 2 : 1;

  /* ── Form state ────────────────────────────────────────────── */
  const [step, setStep] = useState(initialStep);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    setValue,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      type: (resolvedType as FormData["type"]) || "tour",
      packageSlug: qPackage || PACKAGES[0]?.slug || "",
      vehicleSlug: contextVehicle?.slug || VEHICLES[0]?.slug || "",
      rentalType: (qRental as "local" | "outstation") || "local",
      weddingVehicle: qType === "wedding" && qVehicle ? qVehicle : "",
      guestShuttle: "none",
      customDestination: "",
      startDate: "",
      passengers: "4",
      budget: "",
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const formValues = watch();

  /* ── Dynamic heading ───────────────────────────────────────── */
  const getHeading = useCallback(() => {
    if (contextPackage) return `Planning Your ${contextPackage.title} Journey`;
    if (contextVehicle) return `Reserve Your ${contextVehicle.name}`;
    if (resolvedType === "wedding") return "Plan Your Wedding Travel";
    if (resolvedType === "vehicle") return "Reserve Your Vehicle";
    return "Let's Plan Your Trip";
  }, [contextPackage, contextVehicle, resolvedType]);

  /* ── Step navigation ───────────────────────────────────────── */
  const goNext = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger(["type"]);
    } else if (step === 2) {
      valid = await trigger(["startDate", "passengers"]);
    } else if (step === 3) {
      valid = await trigger(["name", "phone", "email"]);
    }
    if (valid) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, 4));
    }
  };

  const goBack = () => {
    // If we had preset type, don't go back to Step 1
    if (step === 2 && hasPresetType) return;
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  /* ── Submit ────────────────────────────────────────────────── */
  const onSubmit = async (data: FormData) => {
    if (website) return;

    setSubmitting(true);
    setErrorMessage(null);

    const pkg = PACKAGES.find((p) => p.slug === data.packageSlug);
    const packageName = data.type === "tour"
      ? (pkg ? pkg.title : data.packageSlug)
      : (data.type === "custom" ? (data.customDestination ? `Custom: ${data.customDestination}` : "") : "");

    const veh = VEHICLES.find((v) => v.slug === data.vehicleSlug);
    const vehicleName = data.type === "wedding"
      ? (data.weddingVehicle || (veh ? veh.name : ""))
      : (data.type === "vehicle" ? (veh ? veh.name : data.vehicleSlug) : "");

    const payload = {
      type: data.type,
      packageSlug: data.packageSlug,
      packageName,
      vehicleSlug: data.vehicleSlug,
      vehicleName,
      rentalType: data.rentalType,
      weddingVehicle: data.weddingVehicle,
      guestShuttle: data.guestShuttle,
      customDestination: data.customDestination,
      startDate: data.startDate,
      passengers: data.passengers,
      budget: data.budget,
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      notes: data.notes,
      website,
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setInquiryId(result.inquiryId || null);
        setDirection(1);
        setStep(4);
        setSubmitted(true);
      } else {
        setErrorMessage(
          result.message || "We couldn't submit your inquiry right now. Please try again or contact us directly by phone or WhatsApp."
        );
      }
    } catch (err) {
      console.error("Inquiry submission error:", err);
      setErrorMessage(
        "We couldn't submit your inquiry right now. Please check your connection or contact us directly on WhatsApp or phone."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ── WhatsApp handoff message ──────────────────────────────── */
  const buildWhatsAppMessage = () => {
    const v = formValues;
    const typeLabel =
      v.type === "tour" ? "Tour Package" : v.type === "vehicle" ? "Vehicle Rental" : v.type === "wedding" ? "Wedding Travel" : "Custom Trip";
    const pkg = PACKAGES.find((p) => p.slug === v.packageSlug);
    const veh = VEHICLES.find((ve) => ve.slug === v.vehicleSlug);
    let details = `Hi Yaduvanshi Tours and Travels! I just submitted an inquiry:\n\n`;
    if (inquiryId) details += `🔖 Reference: ${inquiryId}\n`;
    details += `📌 Type: ${typeLabel}\n`;
    if (v.type === "tour" && pkg) details += `📦 Package: ${pkg.title}\n`;
    if ((v.type === "vehicle" || v.type === "tour") && veh) details += `🚗 Vehicle: ${veh.name}\n`;
    if (v.type === "wedding" && v.weddingVehicle) details += `💒 Wedding Vehicle: ${v.weddingVehicle}\n`;
    if (v.type === "custom" && v.customDestination) details += `🗺️ Destination: ${v.customDestination}\n`;
    details += `📅 Date: ${v.startDate}\n`;
    details += `👥 Travelers: ${v.passengers}\n`;
    if (v.budget) details += `💰 Budget: ${v.budget}\n`;
    details += `\n👤 Name: ${v.name}\n📱 Phone: ${v.phone}\n`;
    if (v.email) details += `📧 Email: ${v.email}\n`;
    if (v.notes) details += `📝 Notes: ${v.notes}\n`;
    details += `\nPlease confirm my booking. Thank you!`;
    return `https://wa.me/918127929551?text=${encodeURIComponent(details)}`;
  };

  /* ── Get currently selected items for display ──────────────── */
  const selectedPackage = PACKAGES.find((p) => p.slug === formValues.packageSlug);
  const selectedVehicle = VEHICLES.find((v) => v.slug === formValues.vehicleSlug);

  /* ── Suppress form element for step 4 ──────────────────────── */
  useEffect(() => {
    // Scroll to top on step change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <div className="bg-[#0C1519] min-h-screen text-[#D8CFC7] relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 600px 600px at 20% 30%, rgba(207,157,123,0.06), transparent),
            radial-gradient(ellipse 500px 500px at 80% 70%, rgba(114,75,57,0.04), transparent),
            radial-gradient(ellipse 400px 400px at 50% 10%, rgba(232,185,106,0.03), transparent)
          `,
        }}
      />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 pt-28 sm:pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* ── Hero intro ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <p
              className="text-[10px] font-accent tracking-[0.3em] font-semibold mb-3"
              style={{ color: GOLD }}
            >
              LET&apos;S PLAN YOUR JOURNEY
            </p>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              {getHeading()}
            </h1>
            <p className="text-[#D8CFC7]/50 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              No pressure, no spam calls. Share your preferences and our travel
              concierge will craft a personalized itinerary — response within 24
              hours.
            </p>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-5 mt-5">
              {[
                { icon: Shield, text: "No Spam" },
                { icon: Clock, text: "24hr Reply" },
                { icon: Sparkles, text: "Tailored" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-1.5 text-[10px] text-[#D8CFC7]/40 font-mono"
                >
                  <badge.icon size={11} style={{ color: GOLD }} />
                  {badge.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Context summary card ───────────────────────────── */}
          {contextPackage && (
            <ContextCard
              image={contextPackage.image}
              title={contextPackage.title}
              subtitle={`${contextPackage.duration.days}D/${contextPackage.duration.nights}N • ${contextPackage.destinations.slice(0, 3).join(", ")}`}
              price={`₹${contextPackage.packagePrice.toLocaleString("en-IN")}`}
            />
          )}
          {contextVehicle && !contextPackage && (
            <ContextCard
              image={contextVehicle.image}
              title={contextVehicle.name}
              subtitle={`${contextVehicle.seats} Seats • ${contextVehicle.fuel} • ${contextVehicle.transmission}`}
              price={`₹${contextVehicle.localPriceDay.min.toLocaleString("en-IN")}/day`}
            />
          )}

          {/* ── Progress steps ─────────────────────────────────── */}
          {!submitted && <ProgressSteps current={step} />}

          {/* ── Form card ──────────────────────────────────────── */}
          <motion.div
            layout
            className="rounded-2xl border relative overflow-hidden"
            style={{
              background: "rgba(12,21,25,0.85)",
              borderColor: "rgba(207,157,123,0.12)",
              backdropFilter: "blur(20px)",
              boxShadow: `0 0 60px rgba(207,157,123,0.06), 0 20px 60px rgba(0,0,0,0.3)`,
            }}
          >
            {/* Top glow line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${GOLD}30, ${BRASS}20, transparent)`,
              }}
            />

            <div className="p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <AnimatePresence mode="wait" custom={direction}>
                  {/* ═══ STEP 1: Category Selection ═══ */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                          Choose Your Experience
                        </h2>
                        <p className="text-[#D8CFC7]/40 text-xs">
                          What kind of travel are you planning?
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {CATEGORIES.map((cat) => {
                          const Icon = cat.icon;
                          const selected = formValues.type === cat.id;
                          return (
                            <motion.button
                              key={cat.id}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setValue("type", cat.id, { shouldValidate: true })}
                              className="relative p-5 rounded-xl border text-left transition-all cursor-pointer group"
                              style={{
                                borderColor: selected
                                  ? GOLD
                                  : "rgba(255,255,255,0.08)",
                                background: selected
                                  ? "rgba(232,185,106,0.06)"
                                  : "rgba(22,33,39,0.4)",
                              }}
                            >
                              {/* Selected indicator */}
                              {selected && (
                                <motion.div
                                  layoutId="categoryCheck"
                                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                                  style={{
                                    background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                                  }}
                                >
                                  <Check
                                    size={10}
                                    className="text-[#0C1519]"
                                    strokeWidth={3}
                                  />
                                </motion.div>
                              )}
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors"
                                style={{
                                  background: selected
                                    ? "rgba(232,185,106,0.12)"
                                    : "rgba(255,255,255,0.04)",
                                }}
                              >
                                <Icon
                                  size={18}
                                  style={{
                                    color: selected ? GOLD : "rgba(216,207,199,0.5)",
                                  }}
                                />
                              </div>
                              <h3
                                className="font-semibold text-sm mb-1 transition-colors"
                                style={{
                                  color: selected ? "#fff" : "rgba(255,255,255,0.75)",
                                }}
                              >
                                {cat.label}
                              </h3>
                              <p className="text-[11px] text-[#D8CFC7]/40 leading-relaxed">
                                {cat.desc}
                              </p>
                            </motion.button>
                          );
                        })}
                      </div>

                      {errors.type && (
                        <p className="text-red-400/80 text-[10px] font-mono">
                          {errors.type.message}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* ═══ STEP 2: Trip Details ═══ */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                          Tell Us About Your Trip
                        </h2>
                        <p className="text-[#D8CFC7]/40 text-xs">
                          {formValues.type === "tour"
                            ? "Select your preferred tour package and travel dates"
                            : formValues.type === "vehicle"
                            ? "Choose your vehicle and rental preferences"
                            : formValues.type === "wedding"
                            ? "Tell us about your wedding travel needs"
                            : "Describe your dream destination and dates"}
                        </p>
                      </div>

                      {/* ── Tour specifics ── */}
                      {formValues.type === "tour" && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-[#D8CFC7]/60 text-[10px] font-accent tracking-wider block mb-2 uppercase">
                              Tour Package
                            </label>
                            <select
                              {...register("packageSlug")}
                              className="w-full bg-[#162127]/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#E8B96A]/60 transition-all cursor-pointer appearance-none"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23E8B96A' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                            >
                              {PACKAGES.map((pkg) => (
                                <option
                                  key={pkg.slug}
                                  value={pkg.slug}
                                  className="bg-[#162127] text-white"
                                >
                                  {pkg.title} — {pkg.duration.days}D/{pkg.duration.nights}N
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Mini preview of selected package */}
                          {selectedPackage && !contextPackage && (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0">
                                <Image
                                  src={selectedPackage.image}
                                  alt={selectedPackage.title}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-white text-xs font-semibold truncate">{selectedPackage.title}</p>
                                <p className="text-[#D8CFC7]/40 text-[10px]">
                                  From ₹{selectedPackage.packagePrice.toLocaleString("en-IN")} • {selectedPackage.destinations.slice(0, 2).join(", ")}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* ── Vehicle specifics ── */}
                      {formValues.type === "vehicle" && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-[#D8CFC7]/60 text-[10px] font-accent tracking-wider block mb-2 uppercase">
                              Select Vehicle
                            </label>
                            <select
                              {...register("vehicleSlug")}
                              className="w-full bg-[#162127]/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#E8B96A]/60 transition-all cursor-pointer appearance-none"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23E8B96A' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                            >
                              {VEHICLES.map((veh) => (
                                <option
                                  key={veh.slug}
                                  value={veh.slug}
                                  className="bg-[#162127] text-white"
                                >
                                  {veh.name} ({veh.seats} Seats)
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Rental type toggle */}
                          <div>
                            <label className="text-[#D8CFC7]/60 text-[10px] font-accent tracking-wider block mb-2 uppercase">
                              Rental Type
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { id: "local" as const, label: "Local", desc: "Within city (80km/day)" },
                                { id: "outstation" as const, label: "Outstation", desc: "Highway travel" },
                              ].map((rt) => (
                                <button
                                  key={rt.id}
                                  type="button"
                                  onClick={() => setValue("rentalType", rt.id)}
                                  className="p-3.5 rounded-xl border text-center cursor-pointer transition-all"
                                  style={{
                                    borderColor:
                                      formValues.rentalType === rt.id
                                        ? GOLD
                                        : "rgba(255,255,255,0.08)",
                                    background:
                                      formValues.rentalType === rt.id
                                        ? "rgba(232,185,106,0.06)"
                                        : "transparent",
                                  }}
                                >
                                  <p
                                    className="text-sm font-semibold"
                                    style={{
                                      color: formValues.rentalType === rt.id ? GOLD : "#D8CFC7",
                                    }}
                                  >
                                    {rt.label}
                                  </p>
                                  <p className="text-[10px] text-[#D8CFC7]/35 mt-0.5">
                                    {rt.desc}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Mini vehicle preview */}
                          {selectedVehicle && !contextVehicle && (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0">
                                <Image
                                  src={selectedVehicle.image}
                                  alt={selectedVehicle.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-white text-xs font-semibold truncate">{selectedVehicle.name}</p>
                                <p className="text-[#D8CFC7]/40 text-[10px]">
                                  From ₹{selectedVehicle.localPriceDay.min.toLocaleString("en-IN")}/day • {selectedVehicle.seats} seats
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* ── Wedding specifics ── */}
                      {formValues.type === "wedding" && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-[#D8CFC7]/60 text-[10px] font-accent tracking-wider block mb-2 uppercase">
                              Bridal / Groom Vehicle
                            </label>
                            <select
                              {...register("weddingVehicle")}
                              className="w-full bg-[#162127]/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#E8B96A]/60 transition-all cursor-pointer appearance-none"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23E8B96A' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                            >
                              <option value="" className="bg-[#162127] text-white">Select a vehicle...</option>
                              <option value="BMW 5 Series" className="bg-[#162127] text-white">BMW 5 Series (Luxury Sedan)</option>
                              <option value="Toyota Fortuner" className="bg-[#162127] text-white">Toyota Fortuner (Premium SUV)</option>
                              <option value="Audi A6" className="bg-[#162127] text-white">Audi A6 Sedan</option>
                              <option value="Honda City" className="bg-[#162127] text-white">Honda City (Sunroof)</option>
                              <option value="Mercedes Benz" className="bg-[#162127] text-white">Mercedes Benz (Ultra Luxury)</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[#D8CFC7]/60 text-[10px] font-accent tracking-wider block mb-2 uppercase">
                              Guest Shuttle Capacity
                            </label>
                            <select
                              {...register("guestShuttle")}
                              className="w-full bg-[#162127]/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#E8B96A]/60 transition-all cursor-pointer appearance-none"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23E8B96A' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                            >
                              <option value="none" className="bg-[#162127] text-white">No Guest Shuttles (Only bridal car)</option>
                              <option value="10-15" className="bg-[#162127] text-white">10–15 Guests (Tempo Traveller)</option>
                              <option value="15-30" className="bg-[#162127] text-white">15–30 Guests (Multiple Travellers / Bus)</option>
                              <option value="30+" className="bg-[#162127] text-white">30+ Guests (Large Coach Bus)</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* ── Custom trip specifics ── */}
                      {formValues.type === "custom" && (
                        <FloatingInput
                          label="Where would you like to go?"
                          value={formValues.customDestination || ""}
                          {...register("customDestination")}
                        />
                      )}

                      {/* ── Common: Date, Travelers, Budget ── */}
                      <div className="space-y-4 pt-2">
                        <FloatingInput
                          label="Travel Date"
                          type="date"
                          value={formValues.startDate}
                          error={errors.startDate?.message}
                          {...register("startDate")}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FloatingInput
                            label="Travelers"
                            type="number"
                            value={formValues.passengers}
                            error={errors.passengers?.message}
                            min={1}
                            max={50}
                            {...register("passengers")}
                          />
                          <div className="relative">
                            <label className="absolute top-2 left-4 text-[9px] text-[#E8B96A]/80 font-accent tracking-wider pointer-events-none z-10">
                              Budget Range (optional)
                            </label>
                            <select
                              {...register("budget")}
                              className="w-full bg-[#162127]/60 border border-white/10 rounded-xl px-4 pt-6 pb-2.5 text-sm text-white focus:outline-none focus:border-[#E8B96A]/60 transition-all cursor-pointer appearance-none"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23E8B96A' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                            >
                              <option value="" className="bg-[#162127] text-white">Flexible</option>
                              <option value="Under ₹5,000" className="bg-[#162127] text-white">Under ₹5,000</option>
                              <option value="₹5,000–₹15,000" className="bg-[#162127] text-white">₹5,000 – ₹15,000</option>
                              <option value="₹15,000–₹30,000" className="bg-[#162127] text-white">₹15,000 – ₹30,000</option>
                              <option value="₹30,000–₹50,000" className="bg-[#162127] text-white">₹30,000 – ₹50,000</option>
                              <option value="₹50,000+" className="bg-[#162127] text-white">₹50,000+</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ═══ STEP 3: Contact Details ═══ */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                          Almost There
                        </h2>
                        <p className="text-[#D8CFC7]/40 text-xs">
                          We&apos;ll never share your details or make unsolicited calls.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <FloatingInput
                          label="Full Name *"
                          value={formValues.name}
                          error={errors.name?.message}
                          {...register("name")}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="relative">
                            <Phone
                              size={14}
                              className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                              style={{ color: "rgba(232,185,106,0.4)" }}
                            />
                            <input
                              type="tel"
                              placeholder="Mobile / WhatsApp *"
                              {...register("phone")}
                              className={`w-full bg-[#162127]/60 border rounded-xl pl-10 pr-4 py-3.5 text-sm text-white
                                placeholder-[#D8CFC7]/25 focus:outline-none transition-all
                                focus:shadow-[0_0_20px_rgba(232,185,106,0.15)]
                                ${errors.phone ? "border-red-500/60" : "border-white/10 focus:border-[#E8B96A]/60"}`}
                            />
                            {errors.phone && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400/80 text-[10px] mt-1 ml-1 font-mono"
                              >
                                {errors.phone.message}
                              </motion.p>
                            )}
                          </div>

                          <div className="relative">
                            <Mail
                              size={14}
                              className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                              style={{ color: "rgba(232,185,106,0.4)" }}
                            />
                            <input
                              type="email"
                              placeholder="Email (optional)"
                              {...register("email")}
                              className={`w-full bg-[#162127]/60 border rounded-xl pl-10 pr-4 py-3.5 text-sm text-white
                                placeholder-[#D8CFC7]/25 focus:outline-none transition-all
                                focus:shadow-[0_0_20px_rgba(232,185,106,0.15)]
                                ${errors.email ? "border-red-500/60" : "border-white/10 focus:border-[#E8B96A]/60"}`}
                            />
                            {errors.email && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400/80 text-[10px] mt-1 ml-1 font-mono"
                              >
                                {errors.email.message}
                              </motion.p>
                            )}
                          </div>
                        </div>

                        <div className="relative">
                          <textarea
                            rows={3}
                            placeholder="Special requests, extra stops, dietary needs..."
                            {...register("notes")}
                            className="w-full bg-[#162127]/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white
                              placeholder-[#D8CFC7]/25 focus:outline-none focus:border-[#E8B96A]/60 transition-all
                              focus:shadow-[0_0_20px_rgba(232,185,106,0.15)] resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ═══ STEP 4: Success ═══ */}
                  {step === 4 && submitted && (
                    <motion.div
                      key="step4"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="text-center py-6 sm:py-10 space-y-5"
                    >
                      <SuccessCheck />

                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                          You&apos;re All Set!
                        </h2>
                        <p className="text-[#D8CFC7]/50 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                          Thank you, {formValues.name}! Our travel concierge is
                          reviewing your request and will reach out on WhatsApp
                          within 24 hours.
                        </p>
                      </div>

                      {/* Summary */}
                      <div
                        className="max-w-sm mx-auto p-4 rounded-xl border text-left space-y-2"
                        style={{
                          background: "rgba(22,33,39,0.5)",
                          borderColor: "rgba(207,157,123,0.1)",
                        }}
                      >
                        <div className="flex items-center gap-2 text-[10px] text-[#D8CFC7]/40 font-mono">
                          <Sparkles size={10} style={{ color: GOLD }} /> Booking Summary
                        </div>
                        <div className="space-y-1.5 text-xs">
                          {inquiryId && (
                            <div className="flex justify-between pb-1 border-b border-white/[0.06]">
                              <span className="text-[#D8CFC7]/50">Reference ID</span>
                              <span className="text-[#E8B96A] font-mono font-semibold">{inquiryId}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-[#D8CFC7]/50">Type</span>
                            <span className="text-white font-medium">
                              {formValues.type === "tour" ? "Tour Package" : formValues.type === "vehicle" ? "Vehicle Rental" : formValues.type === "wedding" ? "Wedding Travel" : "Custom Trip"}
                            </span>
                          </div>
                          {formValues.type === "tour" && selectedPackage && (
                            <div className="flex justify-between">
                              <span className="text-[#D8CFC7]/50">Package</span>
                              <span className="text-white font-medium">{selectedPackage.title}</span>
                            </div>
                          )}
                          {formValues.type === "vehicle" && selectedVehicle && (
                            <div className="flex justify-between">
                              <span className="text-[#D8CFC7]/50">Vehicle</span>
                              <span className="text-white font-medium">{selectedVehicle.name}</span>
                            </div>
                          )}
                          {formValues.type === "wedding" && formValues.weddingVehicle && (
                            <div className="flex justify-between">
                              <span className="text-[#D8CFC7]/50">Vehicle</span>
                              <span className="text-white font-medium">{formValues.weddingVehicle}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-[#D8CFC7]/50">Date</span>
                            <span className="text-white font-medium">{formValues.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#D8CFC7]/50">Travelers</span>
                            <span className="text-white font-medium">{formValues.passengers}</span>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp handoff */}
                      <motion.a
                        href={buildWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold cursor-pointer transition-all hover:brightness-110"
                        style={{
                          background: "#25D366",
                          color: "#fff",
                          boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <MessageSquare size={16} />
                        Continue on WhatsApp
                      </motion.a>

                      <p className="text-[#D8CFC7]/30 text-[10px] font-mono">
                        Or call us directly at{" "}
                        <a href="tel:+918127929551" className="text-[#E8B96A] hover:text-white transition-colors">
                          +91 81279 29551
                        </a>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-sans mt-4">
                    {errorMessage}
                  </div>
                )}

                {/* ── Navigation buttons ─────────────────────── */}
                {!submitted && (
                  <div className="flex justify-between items-center pt-6 mt-6 border-t border-white/[0.06]">
                    {step > 1 && !(step === 2 && hasPresetType) ? (
                      <motion.button
                        type="button"
                        onClick={goBack}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-5 py-2.5 text-xs font-semibold rounded-full border border-white/10 text-[#D8CFC7]/70 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5 cursor-pointer bg-white/[0.03]"
                      >
                        <ArrowLeft size={13} /> Back
                      </motion.button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <motion.button
                        type="button"
                        onClick={goNext}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-7 py-3 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer transition-all hover:brightness-110"
                        style={{
                          background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                          color: "#0C1519",
                          boxShadow: "0 4px 20px rgba(232,185,106,0.2)",
                        }}
                      >
                        Continue <ArrowRight size={14} />
                      </motion.button>
                    ) : step === 3 ? (
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={submitting ? {} : { scale: 1.03 }}
                        whileTap={submitting ? {} : { scale: 0.97 }}
                        className="px-7 py-3 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer transition-all hover:brightness-110 disabled:opacity-70"
                        style={{
                          background: `linear-gradient(135deg, ${GOLD}, ${BRASS})`,
                          color: "#0C1519",
                          boxShadow: "0 4px 20px rgba(232,185,106,0.25)",
                        }}
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Request <CheckCircle2 size={14} />
                          </>
                        )}
                      </motion.button>
                    ) : null}
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* ── Bottom reassurance ──────────────────────────────── */}
          {!submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8 space-y-2"
            >
              <p className="text-[#D8CFC7]/25 text-[10px] font-mono flex items-center justify-center gap-2">
                <Shield size={10} />
                Your information is secure and never shared with third parties
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Page export ────────────────────────────────────────────────── */
export function InquiryClient() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#0C1519] min-h-screen pt-28 pb-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2
              size={24}
              className="animate-spin mx-auto mb-3"
              style={{ color: GOLD }}
            />
            <p className="font-display text-[#D8CFC7]/50 text-sm">
              Preparing your booking experience...
            </p>
          </div>
        </div>
      }
    >
      <InquiryForm />
    </Suspense>
  );
}
