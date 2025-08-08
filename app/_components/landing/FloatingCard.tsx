// FloatingCard.tsx
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variants?: Variants;
  custom?: number; // para delay customizado no variants
}

export function FloatingCard({
  children,
  delay = 0,
  className = "",
  variants,
  custom,
}: FloatingCardProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      custom={custom ?? delay}
      className={className}
      style={{ animationFillMode: "forwards" }}
    >
      <div className="feature-card bg-gradient-card interactive-glow rounded-2xl border border-border/50 p-8 shadow-card">
        {children}
      </div>
    </motion.div>
  );
}
