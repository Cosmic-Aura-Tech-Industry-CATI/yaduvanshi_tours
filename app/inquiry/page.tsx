import type { Metadata } from "next";
import { InquiryClient } from "@/components/inquiry/InquiryClient";

export const metadata: Metadata = {
  title: "Plan Your Custom Trip & Instant Quote | Yaduvanshi Tours",
  description: "Book customized tour packages, chauffeur car rentals, or wedding logistics with transparent pricing, instant WhatsApp handoff, and 24/7 concierge support.",
  openGraph: {
    title: "Plan Your Trip | Yaduvanshi Tours & Travels",
    description: "Instant quote and customized travel planning across India.",
  },
};

export default function InquiryPage() {
  return <InquiryClient />;
}
