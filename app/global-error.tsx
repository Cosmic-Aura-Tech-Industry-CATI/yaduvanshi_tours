"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0C1519", color: "#D8CFC7", fontFamily: "sans-serif", padding: "2rem", textAlign: "center" }}>
        <h2 style={{ color: "#E8B96A", fontSize: "1.5rem", marginBottom: "1rem" }}>Something went wrong!</h2>
        <p style={{ opacity: 0.8, marginBottom: "1.5rem" }}>{error?.message || "An unexpected error occurred."}</p>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: "#E8B96A",
            color: "#0C1519",
            border: "none",
            borderRadius: "9999px",
            padding: "0.5rem 1.5rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
