"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <nav className="flex items-center justify-between border-b border-solid px-6 py-4">
      {/* LADO ESQUERDO */}
      <div className="flex items-center gap-6">
        <Image src="/logo.svg" width={165} height={50} alt="MoneyVision logo" />

        {/* LINKS - VISÍVEIS APENAS NO DESKTOP */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/dashboard"
            className={
              pathname === "/dashboard"
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

      {/* USUÁRIO (DESKTOP) */}
      <div className="hidden items-center gap-3 md:flex">
        {user && (
          <>
            <Image
              src={user.image || "/placeholder.png"}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm">{user.name}</span>
            <Button variant="ghost" onClick={() => signOut()}>
              Sair
            </Button>
          </>
        )}
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
            <div className="mb-6 flex justify-center">
              <Image src="/logo.svg" width={150} height={30} alt="Logo" />
            </div>

            {/* LINKS NO MENU LATERAL */}
            <div className="flex flex-col gap-4">
              <Link
                href="/dashboard"
                className={
                  pathname === "/dashboard"
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

            {/* USUÁRIO NO MENU */}
            {user && (
              <div className="mt-6 flex items-center gap-3 border-t pt-4">
                <Image
                  src={user.image || "/placeholder.png"}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm">{user.name}</span>
                  <Button variant="link" size="sm" onClick={() => signOut()}>
                    Sair
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
