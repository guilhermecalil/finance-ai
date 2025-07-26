"use client";

import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { Chrome, LogInIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";
import { Label } from "../_components/ui/label";

const rotatingTexts = [
  "Controle seu orçamento de maneira inteligente.",
  "Receba insights poderosos para decisões financeiras.",
  "Transforme sua gestão financeira com IA.",
  "Economize mais e gaste melhor todos os dias.",
  "Tenha controle total das suas finanças na palma da mão.",
  "Planeje seu futuro financeiro com segurança e inteligência.",
  "Relatórios claros para decisões mais assertivas.",
  "Sua jornada financeira começa aqui.",
];

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (typing) {
      if (displayedText.length < rotatingTexts[textIndex].length) {
        timeout = setTimeout(() => {
          setDisplayedText(
            rotatingTexts[textIndex].slice(0, displayedText.length + 1),
          );
        }, 100);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50);
      } else {
        setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, typing, textIndex]);

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/" });
  }

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (regPassword !== regConfirmPassword) {
      alert("As senhas não conferem.");
      return;
    }

    alert("Cadastro simulado! Implemente o backend.");
    setRegEmail("");
    setRegPassword("");
    setRegConfirmPassword("");
    setIsRegistering(false);
  }

  if (status === "loading") {
    return <p className="mt-20 text-center">Carregando...</p>;
  }

  // Variants para animação do formulário
  const formVariants: Variants = {
    hidden: (custom) => ({
      opacity: 0,
      x: custom > 0 ? 50 : -50,
      scale: 0.95,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: (custom) => ({
      opacity: 0,
      x: custom < 0 ? 50 : -50,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  // Direção da animação para alternar sentido da entrada/saída
  // Quando isRegistering true, form entra da direita (x=50), senão da esquerda (x=-50)
  const direction = isRegistering ? 1 : -1;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md rounded-lg border border-muted p-8 shadow-md">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/logo.svg"
            width={173}
            height={39}
            alt="Logo Finance AI"
          />
        </div>

        <h1 className="mb-4 text-center text-4xl font-bold">
          {isRegistering ? "Criar Conta" : "Bem-vindo"}
        </h1>

        {!isRegistering && (
          <p className="mb-6 min-h-[56px] text-center font-mono text-lg text-muted-foreground">
            {displayedText}
            <motion.span
              className="inline-block"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              |
            </motion.span>
          </p>
        )}

        <AnimatePresence mode="wait" initial={false} custom={direction}>
          {isRegistering ? (
            <motion.form
              key="register"
              custom={direction}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleRegisterSubmit}
              className="space-y-6"
            >
              <div>
                <Label
                  htmlFor="regEmail"
                  className="mb-1 block text-sm font-medium"
                >
                  Email
                </Label>
                <Input
                  id="regEmail"
                  type="email"
                  placeholder="Digite seu email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="regPassword"
                  className="mb-1 block text-sm font-medium"
                >
                  Senha
                </Label>
                <Input
                  id="regPassword"
                  type="password"
                  placeholder="Digite sua senha"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="regConfirmPassword"
                  className="mb-1 block text-sm font-medium"
                >
                  Confirme a senha
                </Label>
                <Input
                  id="regConfirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Criar Conta
              </Button>

              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="text-sm text-muted-foreground">ou</span>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  type="button"
                >
                  <Chrome className="h-5 w-5" />
                  Criar conta com Google
                </Button>
              </div>

              <p className="mt-4 text-center text-sm text-muted-foreground">
                Já tem conta?{" "}
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="font-medium text-primary hover:underline"
                >
                  Faça login
                </button>
              </p>
            </motion.form>
          ) : (
            <motion.form
              key="login"
              custom={direction}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.35 }}
              onSubmit={handleLoginSubmit}
              className="space-y-6"
            >
              <div>
                <Label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium"
                >
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="flex w-full items-center justify-center"
              >
                <LogInIcon className="mr-2 h-5 w-5" />
                Entrar
              </Button>

              <Button
                variant="outline"
                className="flex w-full items-center justify-center gap-2"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                type="button"
              >
                <Chrome className="h-5 w-5" />
                Entrar com Google
              </Button>

              <p className="mt-4 text-center text-sm text-muted-foreground">
                Não tem conta?{" "}
                <button
                  type="button"
                  onClick={() => setIsRegistering(true)}
                  className="font-medium text-primary hover:underline"
                >
                  Crie uma agora
                </button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
