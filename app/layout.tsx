import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins, Cinzel } from "next/font/google";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const Chatbot = dynamic(() => import("@/components/Chatbot").then((mod) => mod.Chatbot));
const FloatingWidgets = dynamic(() => import("@/components/FloatingWidgets").then((mod) => mod.FloatingWidgets));

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yaduvanshitours.com"),
  title: "Yaduvanshi Tours & Travels — Wander Beyond Ordinary",
  description: "Unveil India's Soul. We craft earthy-luxury, cinematic travel experiences across India's royal destinations.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Yaduvanshi Tours & Travels — Wander Beyond Ordinary",
    description: "Unveil India's Soul. We craft earthy-luxury, cinematic travel experiences across India's royal destinations.",
    images: ["/images/logo.png"],
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
      className={`${cormorant.variable} ${poppins.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0C1519] text-[#D8CFC7]">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Chatbot />
        <FloatingWidgets />
      </body>
    </html>
  );
}
