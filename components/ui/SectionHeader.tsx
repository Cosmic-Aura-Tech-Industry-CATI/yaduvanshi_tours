const BRASS = "#CF9D7B";
const GOLD = "#E8B96A";

interface SectionHeaderProps {
  script?: string;
  heading: string;
  sub?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeader({ script, heading, sub, center = false }: SectionHeaderProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {script && (
        <p className="font-script text-2xl mb-1" style={{ color: BRASS }}>
          {script}
        </p>
      )}
      <h2
        className="font-display font-bold text-3xl md:text-4xl text-glow-gold"
        style={{ color: GOLD }}
      >
        {heading}
      </h2>
      {/* Brass glow rule */}
      <div className={`flex items-center gap-2 mt-3 ${center ? "justify-center" : ""}`}>
        <div className="w-8 h-px" style={{ background: `linear-gradient(to right, ${BRASS}, transparent)` }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: BRASS, boxShadow: `0 0 6px ${BRASS}60` }} />
        <div className="w-8 h-px" style={{ background: `linear-gradient(to left, ${BRASS}, transparent)` }} />
      </div>
      {sub && (
        <p
          className="mt-4 max-w-xl text-base leading-relaxed text-[#D8CFC7]/60"
        >
          {sub}
        </p>
      )}
    </div>
  );
}
