import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins, Cinzel, Dancing_Script, DM_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const Chatbot = dynamic(() => import("@/components/Chatbot").then((mod) => mod.Chatbot));
const FloatingWidgets = dynamic(() => import("@/components/FloatingWidgets").then((mod) => mod.FloatingWidgets));

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yaduvanshitours.com"),
  title: {
    default: "Yaduvanshi Tours & Travels — Wander Beyond Ordinary",
    template: "%s | Yaduvanshi Tours & Travels",
  },
  description: "Unveil India's Soul. We craft earthy-luxury, cinematic travel experiences across India's royal destinations, sacred pilgrimage circuits, and premium vehicle fleet.",
  keywords: [
    "Yaduvanshi Tours",
    "Kanpur Tours and Travels",
    "Ayodhya Darshan Package",
    "Kashi Vishwanath Tour",
    "Char Dham Yatra",
    "Luxury Car Rental Kanpur",
    "Wedding Car Rental",
    "Tempo Traveller Booking",
    "Force Urbania Rental"
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Yaduvanshi Tours & Travels — Wander Beyond Ordinary",
    description: "Unveil India's Soul. We craft earthy-luxury, cinematic travel experiences across India's royal destinations.",
    images: ["/images/logo.png"],
    type: "website",
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
      <body className="min-h-full flex flex-col bg-[#0C1519] text-[#D8CFC7] font-sans overflow-x-hidden max-w-full">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Chatbot />
        <FloatingWidgets />
      </body>
    </html>
  );
}
