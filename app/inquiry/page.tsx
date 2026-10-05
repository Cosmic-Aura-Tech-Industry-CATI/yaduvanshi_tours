import type { Metadata } from "next";
import { InquiryClient } from "@/components/inquiry/InquiryClient";

export const metadata: Metadata = {
  title: "Plan Your Custom Trip & Instant Quote | Kanpur Tours & Travels",
  description: "Book customized tour packages, chauffeur car rentals, or wedding logistics with transparent pricing, instant WhatsApp handoff, and 24/7 concierge support in Kanpur.",
  alternates: {
    canonical: "/inquiry",
  },
  openGraph: {
    title: "Plan Your Trip | Yaduvanshi Tours & Travels Kanpur",
    description: "Instant quote and customized travel planning across India from Kanpur.",
    url: "https://yaduvanshitours.com/inquiry",
    images: ["/images/hero-poster.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan Your Custom Trip | Yaduvanshi Tours",
    description: "Instant quote and customized travel planning across India.",
    images: ["/images/hero-poster.webp"],
  },
};

export default function InquiryPage() {
  return <InquiryClient />;
}
