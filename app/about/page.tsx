import type { Metadata } from "next";
import { AboutClient } from "@/components/about/AboutClient";

export const metadata: Metadata = {
  title: "About Us | 15+ Years Legacy in Kanpur Travel & Tours",
  description: "Learn about Yaduvanshi Tours & Travels — 15+ years of delivering luxury chauffeur travel, pilgrimage yatras, and wedding fleets across India with 1000+ happy customers.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Yaduvanshi Tours & Travels Kanpur",
    description: "15+ years of curated luxury and spiritual journeys across India with headquarters in Kanpur, UP.",
    url: "https://yaduvanshitours.com/about",
    images: ["/images/founder.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Yaduvanshi Tours & Travels",
    description: "15+ years of curated luxury and spiritual journeys across India.",
    images: ["/images/founder.webp"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
