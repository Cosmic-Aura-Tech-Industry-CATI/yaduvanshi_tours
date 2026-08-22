import type { Metadata } from "next";
import { AboutClient } from "@/components/about/AboutClient";

export const metadata: Metadata = {
  title: "About Us | Our Legacy & Customer Stories",
  description: "Learn about Yaduvanshi Tours & Travels � 15+ years of delivering luxury chauffeur travel, pilgrimage yatras, and wedding fleets across India with 1000+ happy customers.",
  openGraph: {
    title: "About Yaduvanshi Tours & Travels",
    description: "15+ years of curated luxury and spiritual journeys across India.",
    images: ["/images/founder.webp"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
