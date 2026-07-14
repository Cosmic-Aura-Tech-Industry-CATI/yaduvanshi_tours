import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { FloatingWidgets } from "@/components/FloatingWidgets";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yaduvanshi Tours & Travels",
  description: "Crafting unforgettable journeys across India since 2010. Travel with comfort, safety & trust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-[#1A1A1A]">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Chatbot />
        <FloatingWidgets />
      </body>
    </html>
  );
}

