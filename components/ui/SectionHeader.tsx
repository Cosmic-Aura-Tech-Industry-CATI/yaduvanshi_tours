const GOLD = "#C9A84C";

interface SectionHeaderProps {
  script?: string;
  heading: string;
  sub?: string;
  center?: boolean;
  light?: boolean;     // text on dark bg
}

export function SectionHeader({ script, heading, sub, center = false, light = false }: SectionHeaderProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {script && (
        <p className="font-script text-2xl mb-1" style={{ color: GOLD }}>
          {script}
        </p>
      )}
      <h2
        className="font-display font-bold text-3xl md:text-4xl"
        style={{ color: light ? "#ffffff" : "#111827" }}
      >
        {heading}
      </h2>
      {/* Gold rule */}
      <div className={`flex items-center gap-2 mt-3 ${center ? "justify-center" : ""}`}>
        <div className="w-8 h-px" style={{ background: GOLD }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
        <div className="w-8 h-px" style={{ background: GOLD }} />
      </div>
      {sub && (
        <p
          className="mt-4 max-w-xl text-base leading-relaxed"
          style={{ color: light ? "rgba(255,255,255,0.6)" : "#6b7280" }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
