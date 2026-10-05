"use client";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("@/components/Chatbot").then((mod) => mod.Chatbot), { ssr: false });
const FloatingWidgets = dynamic(() => import("@/components/FloatingWidgets").then((mod) => mod.FloatingWidgets), { ssr: false });

export function ClientWidgets() {
  return (
    <>
      <Chatbot />
      <FloatingWidgets />
    </>
  );
}
