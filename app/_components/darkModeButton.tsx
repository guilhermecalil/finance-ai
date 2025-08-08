"use client";

import { Button } from "@/app/_components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`flex items-center gap-2 ${className ?? ""}`}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="block select-none whitespace-nowrap text-sm md:hidden">
        {resolvedTheme === "dark" ? "Modo Claro" : "Modo Escuro"}
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
