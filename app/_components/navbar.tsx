"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between border-b border-solid px-6 py-4">
      {/* LADO ESQUERDO */}
      <div className="flex items-center gap-6">
        <Image src="/logo.svg" width={165} height={50} alt="MoneyVision logo" />

        {/* LINKS - VISÍVEIS APENAS NO DESKTOP */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname === "/transactions"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Transações
          </Link>
          <Link
            href="/subscription"
            className={
              pathname === "/subscription"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Assinatura
          </Link>
        </div>
      </div>

      {/* BOTÃO DE USUÁRIO (VISÍVEL APENAS NO DESKTOP) */}
      <div className="hidden md:block">
        <UserButton showName />
      </div>

      {/* BOTÃO MENU HAMBÚRGUER - MOBILE */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            {/* LOGO */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/logo.svg"
                width={150}
                height={30}
                alt="Finance AI logo"
              />
            </div>

            {/* LINKS NO MENU LATERAL */}
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className={
                  pathname === "/"
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }
              >
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className={
                  pathname === "/transactions"
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }
              >
                Transações
              </Link>
              <Link
                href="/subscription"
                className={
                  pathname === "/subscription"
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }
              >
                Assinatura
              </Link>
            </div>

            {/* BOTÃO DE USUÁRIO DENTRO DO MENU */}
            <div className="mt-6 border-t pt-4">
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonPopoverCard: { pointerEvents: "initial" },
                  },
                }}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
