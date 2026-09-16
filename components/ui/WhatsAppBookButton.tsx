"use client";

/**
 * WhatsAppBookButton — Reusable WhatsApp CTA button.
 *
 * Opens WhatsApp (native app on mobile, web.whatsapp.com on desktop) with a
 * pre-filled message generated from the supplied props.
 *
 * Usage:
 *   <WhatsAppBookButton itemType="tour"    tourName="Mathura-Vrindavan Pilgrimage" tourDays={2} tourPrice="₹11,000" />
 *   <WhatsAppBookButton itemType="vehicle" vehicleName="Toyota Innova Crysta"       vehicleCategory="MPV" />
 *   <WhatsAppBookButton itemType="wedding" vehicleName="Honda City (Sunroof)" />
 */

import { motion } from "motion/react";

// Business WhatsApp number — digits only, no spaces/dashes
const WA_NUMBER = "918127929551"; // +91 81279 29551

// WhatsApp brand green
const WA_GREEN = "#25D366";

// ─── WhatsApp SVG icon ────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Message builders ─────────────────────────────────────────────────────────

function buildTourMessage(name: string, days: number, price: string): string {
  return `Hi, I'm interested in booking the ${name} tour (${days} Days, starting from ${price}). Please share more details and availability.`;
}

function buildVehicleMessage(vehicleName: string, category: string): string {
  return `Hi, I'm interested in renting the ${vehicleName} (${category}). Please share pricing and availability.`;
}

function buildWeddingMessage(vehicleName: string): string {
  return `Hi, I'm interested in booking the ${vehicleName} for my wedding. Please share pricing and availability.`;
}

// ─── URL builder ─────────────────────────────────────────────────────────────

function buildWaUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── Prop types ───────────────────────────────────────────────────────────────

type TourProps = {
  itemType: "tour";
  tourName: string;
  tourDays: number;
  tourPrice: string;
  className?: string;
  fullWidth?: boolean;
  label?: string;
};

type VehicleProps = {
  itemType: "vehicle";
  vehicleName: string;
  vehicleCategory: string;
  className?: string;
  fullWidth?: boolean;
  label?: string;
};

type WeddingProps = {
  itemType: "wedding";
  vehicleName: string;
  className?: string;
  fullWidth?: boolean;
  label?: string;
};

type WhatsAppBookButtonProps = TourProps | VehicleProps | WeddingProps;

// ─── Component ────────────────────────────────────────────────────────────────

export function WhatsAppBookButton(props: WhatsAppBookButtonProps) {
  const { className = "", fullWidth = false, label = "Book Now" } = props;

  let message: string;
  if (props.itemType === "tour") {
    message = buildTourMessage(props.tourName, props.tourDays, props.tourPrice);
  } else if (props.itemType === "vehicle") {
    message = buildVehicleMessage(props.vehicleName, props.vehicleCategory);
  } else {
    message = buildWeddingMessage(props.vehicleName);
  }

  const href = buildWaUrl(message);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-1.5 font-accent tracking-widest text-[10px] font-bold uppercase rounded-full px-3 py-2.5 transition-all duration-200 cursor-pointer ${fullWidth ? "w-full" : ""} ${className}`}
      style={{
        background: WA_GREEN,
        color: "#ffffff",
        boxShadow: `0 2px 12px rgba(37, 211, 102, 0.35)`,
      }}
      onClick={(e) => e.stopPropagation()}
      aria-label={`Book via WhatsApp: ${label}`}
    >
      <WhatsAppIcon size={13} />
      {label}
    </motion.a>
  );
}
