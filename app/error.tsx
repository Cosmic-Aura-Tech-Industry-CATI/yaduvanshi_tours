"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#0C1519] text-[#D8CFC7]">
      <h2 className="text-2xl font-bold text-[#E8B96A] mb-4">Something went wrong!</h2>
      <p className="text-sm opacity-80 mb-6 max-w-md">{error?.message || "An unexpected error occurred while loading this page."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#E8B96A] text-[#0C1519] hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}
