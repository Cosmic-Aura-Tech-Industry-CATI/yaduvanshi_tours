import type { Metadata } from "next";
import { ContactClient } from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us & Booking Desk | Kanpur Office",
  description: "Get in touch with Yaduvanshi Tours & Travels. Call or WhatsApp our 24/7 travel desk at +91 81279 29551 or visit our head office at Ramadevi Chauraha, Kanpur, UP.",
  openGraph: {
    title: "Contact Yaduvanshi Tours & Travels",
    description: "24/7 Booking Support, Concierge & Office Locations in Kanpur, UP.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
