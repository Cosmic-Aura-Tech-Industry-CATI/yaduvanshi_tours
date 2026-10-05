import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins, Cinzel, Dancing_Script, DM_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

import { ClientWidgets } from "@/components/ClientWidgets";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

import { travelAgencySchema, websiteSchema } from "@/lib/seoSchema";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yaduvanshitours.com"),
  title: {
    default: "Yaduvanshi Tours & Travels | Best Tours and Travels in Kanpur | Taxi & Car Rental Service",
    template: "%s | Yaduvanshi Tours & Travels Kanpur",
  },
  description: "Yaduvanshi Tours & Travels is Kanpur's premier tours and travels agency. Book 24/7 taxi service in Kanpur, outstation cabs, luxury car rental, Tempo Traveller, Force Urbania, wedding cars, and Ayodhya/Kashi tour packages.",
  keywords: [
    "Kanpur Tours and Travels",
    "Tours and travels in Kanpur",
    "Best travels in Kanpur",
    "Tour and travels Kanpur",
    "Taxi service in Kanpur",
    "Car rental in Kanpur",
    "Cab service Kanpur",
    "Outstation cab Kanpur",
    "Luxury car rental Kanpur",
    "Tempo Traveller in Kanpur",
    "Force Urbania rental Kanpur",
    "Wedding car rental Kanpur",
    "Ayodhya tour package from Kanpur",
    "Kashi Vishwanath tour package from Kanpur",
    "Char Dham Yatra package Kanpur",
    "Kanpur to Lucknow taxi",
    "Kanpur airport cab service",
    "Chakeri Kanpur taxi",
    "Yaduvanshi Tours and Travels Kanpur",
    "Ramadevi Kanpur travels",
    "Kanpur tour packages"
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Yaduvanshi Tours & Travels | Best Tours and Travels in Kanpur",
    description: "Kanpur's #1 travel agency for outstation cabs, luxury car rentals, Ayodhya & Kashi pilgrimage packages, Tempo Travellers, and wedding fleets.",
    url: "https://yaduvanshitours.com",
    siteName: "Yaduvanshi Tours & Travels Kanpur",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-poster.webp",
        width: 1200,
        height: 630,
        alt: "Yaduvanshi Tours & Travels Kanpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yaduvanshi Tours & Travels | Kanpur Tours and Travels",
    description: "Best tours and travels in Kanpur. Outstation cabs, car rental, Tempo Traveller & pilgrimage packages.",
    images: ["/images/hero-poster.webp"],
  },
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Kanpur, Uttar Pradesh, India",
    "geo.position": "26.4312;80.3920",
    "ICBM": "26.4312, 80.3920",
    "target-country": "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${poppins.variable} ${cinzel.variable} ${dancingScript.variable} ${dmMono.variable} h-full antialiased overflow-x-hidden max-w-full`}
    >
      <head>
        {/* Global JSON-LD Schema: TravelAgency / LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
        />
        {/* Global JSON-LD Schema: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0C1519] text-[#D8CFC7] font-sans overflow-x-hidden max-w-full">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <ClientWidgets />
      </body>
    </html>
  );
}
