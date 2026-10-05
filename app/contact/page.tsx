import type { Metadata } from "next";
import { ContactClient } from "@/components/contact/ContactClient";

import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact Us & Booking Desk | Ramadevi Chauraha Kanpur",
  description: "Get in touch with Yaduvanshi Tours & Travels. Call or WhatsApp our 24/7 travel desk at +91 81279 29551 or visit our office at Ramadevi Chauraha, Kanpur, UP.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Yaduvanshi Tours & Travels Kanpur",
    description: "24/7 Booking Support, Concierge & Office Locations at Ramadevi Chauraha, Kanpur, UP.",
    url: `${SITE_URL}/contact`,
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Yaduvanshi Tours & Travels Kanpur",
    description: "24/7 Booking Support, Concierge & Office at Ramadevi Chauraha, Kanpur.",
    images: ["/images/logo.png"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
