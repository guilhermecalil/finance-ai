"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Verifica localStorage na carga da página
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="#top">
          <Image
            src="/logo.svg"
            alt="MoneyVision logo"
            width={165}
            height={50}
            priority
            className="select-none"
          />
        </Link>
        {/* Menu Desktop */}
        <nav className="hidden items-center space-x-6 md:flex">
          <a
            href="#features"
            className="transition-smooth text-muted-foreground hover:text-primary"
          >
            Recursos
          </a>
          <a
            href="#pricing"
            className="transition-smooth text-muted-foreground hover:text-primary"
          >
            Preços
          </a>
          <a
            href="#operation"
            className="transition-smooth text-muted-foreground hover:text-primary"
          >
            Como funciona?
          </a>
          <Link
            href="/login"
            className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-transform duration-300 hover:scale-105 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
          >
            Entrar
          </Link>

          {/* Botão Toggle Tema */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Dark Mode"
            onClick={toggleTheme}
            title="Alternar modo claro/escuro"
            className="hover:border hover:border-primary hover:bg-transparent"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </Button>
        </nav>

        {/* Menu Mobile com Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] p-6">
            <div className="mb-6 flex items-center justify-between">
              <Image
                src="/logo.svg"
                alt="MoneyVision logo"
                width={120}
                height={40}
                className="select-none"
              />
              <SheetClose />
            </div>

            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-lg text-muted-foreground transition hover:text-primary"
              >
                Recursos
              </a>
              <a
                href="#pricing"
                className="text-lg text-muted-foreground transition hover:text-primary"
              >
                Preços
              </a>
              <a
                href="#operation"
                className="text-lg text-muted-foreground transition hover:text-primary"
              >
                Como funciona?
              </a>
              <Link href="/login">
                <Button className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
                  Entrar
                </Button>
              </Link>

              {/* Botão toggle tema no menu mobile */}
              <Button
                variant="outline"
                onClick={toggleTheme}
                className="mt-4 text-foreground hover:border hover:border-primary hover:bg-transparent hover:text-primary dark:hover:text-primary-foreground"
                aria-label="Alternar modo claro/escuro"
              >
                {isDark ? (
                  <>
                    <Sun className="h-5 w-5 text-yellow-400" />
                    Claro
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 text-gray-700" />
                    Escuro
                  </>
                )}
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
