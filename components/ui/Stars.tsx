import { motion } from "motion/react";
import { Star } from "lucide-react";

interface StarsProps {
  rating: number;
  animate?: boolean;
  size?: number;
}

export function Stars({ rating, animate = false, size = 13 }: StarsProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div key={i}
          initial={animate ? { scale: 0, opacity: 0 } : undefined}
          animate={animate ? { scale: 1, opacity: 1 } : undefined}
          transition={animate ? { delay: i * 0.05, type: "spring", stiffness: 500, damping: 20 } : undefined}
        >
          <Star
            size={size}
            className={
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        </motion.div>
      ))}
    </div>
  );
}
