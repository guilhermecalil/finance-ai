import { ReactNode } from "react";
import { Button } from "../ui/button";

interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}

export function GlowButton({
  children,
  variant = "primary",
  onClick,
  className = "",
}: GlowButtonProps) {
  const baseClasses = `
    relative overflow-hidden group transition-all duration-300 ease-in-out shadow-md
    h-14 px-6 text-base sm:text-lg font-semibold rounded-xl
  `;

  const variantClasses =
    variant === "primary"
      ? `
        bg-primary text-white
        hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]
      `
      : "bg-muted text-foreground border border-border hover:border-primary";

  const glowClasses =
    variant === "primary"
      ? "from-accent/0 via-accent/40 to-accent/0"
      : "from-purple-400/0 via-purple-300/30 to-purple-400/0";

  return (
    <Button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <div
        className={`absolute inset-0 translate-x-[-100%] transform bg-gradient-to-r ${glowClasses} transition-transform duration-700 ease-in-out group-hover:translate-x-[100%]`}
      ></div>
    </Button>
  );
}
