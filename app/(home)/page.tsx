"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScrollToTop from "../_components/ScrollToTop";
import TestimonialsCarousel from "../_components/TestimonialsSection";
import { Badge } from "../_components/ui/badge";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const htmlEl = document.documentElement;
    if (darkMode) {
      htmlEl.classList.add("dark");
    } else {
      htmlEl.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <main
      className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors duration-700 ease-in-out"
      aria-label="Página principal MoneyVision"
    >
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-[hsl(var(--background)/0.6)] backdrop-blur-md transition-colors duration-700 ease-in-out dark:bg-[hsl(var(--background)/0.85)]">
        <div className="container mx-auto flex items-center justify-between px-4 py-5 md:px-0">
          <Image
            src="/logo.svg"
            alt="MoneyVision logo"
            width={165}
            height={50}
            priority
            className="select-none"
          />

          {/* Menu desktop */}
          <nav className="hidden items-center gap-6 font-medium text-[hsl(var(--secondary-foreground))] md:flex">
            <Link
              href="/login"
              className="transition hover:text-[hsl(var(--primary))]"
              onClick={() => setMenuOpen(false)}
            >
              Entrar
            </Link>
            <Link
              href="/login"
              className="transition hover:text-[hsl(var(--primary))]"
              onClick={() => setMenuOpen(false)}
            >
              Criar Conta
            </Link>
            <button
              aria-label="Alternar modo escuro"
              onClick={() => {
                toggleDarkMode();
                setMenuOpen(false);
              }}
              className="ml-4 rounded-md border border-[hsl(var(--primary))] px-3 py-1 text-[hsl(var(--primary))] transition hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
              title="Alternar modo escuro"
              type="button"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </nav>

          {/* Menu hamburguer mobile */}
          <button
            aria-label="Abrir menu"
            className="inline-flex items-center rounded-md border border-[hsl(var(--primary))] px-3 py-1 text-[hsl(var(--primary))] transition hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] md:hidden"
            onClick={toggleMenu}
            type="button"
          >
            <svg
              className={`h-6 w-6 transition-transform duration-300 ${
                menuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu móvel dropdown */}
        {menuOpen && (
          <nav className="mx-auto max-w-md border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-6 py-4 text-center font-medium text-[hsl(var(--secondary-foreground))] md:hidden">
            <Link
              href="/login"
              className="block py-2 hover:text-[hsl(var(--primary))]"
              onClick={() => setMenuOpen(false)}
            >
              Entrar
            </Link>
            <Link
              href="/login"
              className="block py-2 hover:text-[hsl(var(--primary))]"
              onClick={() => setMenuOpen(false)}
            >
              Criar Conta
            </Link>
            <button
              aria-label="Alternar modo escuro"
              onClick={() => {
                toggleDarkMode();
                setMenuOpen(false);
              }}
              className="mt-2 w-full rounded-md border border-[hsl(var(--primary))] px-3 py-1 text-[hsl(var(--primary))] transition hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
              type="button"
            >
              {darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
            </button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-12 px-4 py-20 md:flex-row md:items-center md:justify-around md:gap-16"
        aria-label="Seção principal"
      >
        <div
          className="animate-fade-slide-left flex max-w-lg flex-col items-center space-y-8 text-center opacity-0 md:flex-1 md:items-start md:text-left"
          style={{
            animationDelay: "0.2s",
            animationFillMode: "forwards",
            animationPlayState: animate ? "running" : "paused",
          }}
        >
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-[hsl(var(--primary))]">
            Controle suas finanças com inteligência
          </h1>
          <p className="text-lg leading-relaxed text-[hsl(var(--secondary-foreground))]">
            Organize suas transações, acompanhe seus gastos e receba relatórios
            inteligentes para tomar decisões financeiras mais acertadas.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start">
            <Link
              href="/login"
              className="rounded-md bg-[hsl(var(--primary))] px-6 py-3 font-semibold text-[hsl(var(--primary-foreground))] transition hover:brightness-110"
            >
              Comece agora
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-[hsl(var(--primary))] px-6 py-3 font-semibold text-[hsl(var(--primary))] transition hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
            >
              Já tenho conta
            </Link>
          </div>
        </div>

        <div
          className="animate-fade-slide-right hidden w-full max-w-lg opacity-0 md:block md:flex-1 md:self-center"
          style={{
            animationDelay: "0.4s",
            animationFillMode: "forwards",
            animationPlayState: animate ? "running" : "paused",
          }}
        >
          <Image
            src="/Finance-cuate.svg"
            alt="Controle financeiro"
            width={600}
            height={450}
            className="max-h-[450px] rounded-lg object-contain shadow-lg"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        className="bg-[hsl(var(--secondary))] py-16"
        aria-label="Seção de recursos"
      >
        <div className="container mx-auto px-4 md:px-0">
          <h2
            className="mb-12 text-center text-3xl font-bold text-[hsl(var(--primary-foreground))] opacity-0"
            style={{
              animationDelay: "0.6s",
              animationFillMode: "forwards",
              animationPlayState: animate ? "running" : "paused",
              animationName: "fadeIn",
              animationDuration: "0.7s",
              animationTimingFunction: "ease",
            }}
          >
            Por que escolher o MoneyVision?
          </h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
            <FeatureCard
              title="Transações Ilimitadas"
              description="Registre quantas transações quiser, sem limitações para controle total."
              delay={0.8}
              animate={animate}
            />
            <FeatureCard
              title="Relatórios Inteligentes"
              description="Receba análises detalhadas com inteligência artificial para melhorar suas finanças."
              delay={1}
              animate={animate}
            />
            <FeatureCard
              title="Alertas Personalizados"
              description="Seja notificado sobre gastos e metas para manter seu orçamento sob controle."
              delay={1.2}
              animate={animate}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="container mx-auto px-4 py-20 md:px-0"
        aria-label="Seção de planos e preços"
      >
        <h2
          className="mb-12 text-center text-3xl font-bold text-[hsl(var(--primary))] opacity-0"
          style={{
            animationDelay: "1.4s",
            animationFillMode: "forwards",
            animationPlayState: animate ? "running" : "paused",
            animationName: "fadeIn",
            animationDuration: "0.7s",
            animationTimingFunction: "ease",
          }}
        >
          Escolha seu plano
        </h2>

        {/* Grid 2x2 para 4 cards */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Linha 1 */}
          <PricingCard
            title="Básico"
            price="Grátis"
            features={[
              "Até 10 transações/mês",
              "Dashboard financeiro",
              "Sem relatórios avançados",
              "Suporte padrão",
            ]}
            highlighted={false}
            delay={1.6}
            animate={animate}
          />
          <PricingCard
            title="Essencial"
            price="R$19,90/mês"
            features={[
              "Transações ilimitadas",
              "Relatórios financeiros",
              "Alertas personalizados",
              "Suporte prioritário",
            ]}
            highlighted={true}
            delay={1.8}
            animate={animate}
          />
          {/* Linha 2 */}
          <PricingCard
            title="Premium"
            price="R$39,90/mês"
            features={[
              "Tudo do Essencial",
              "Chatbot via WhatsApp",
              "Relatórios com IA",
              "Acesso antecipado a recursos",
            ]}
            highlighted={false}
            delay={2}
            animate={animate}
          />
          <PricingCard
            title="Elite"
            price="R$79,90/mês"
            features={[
              "Tudo do Premium",
              "IA Avançada para relatórios",
              "Consultoria financeira personalizada",
              "Suporte VIP 24/7",
            ]}
            highlighted={false}
            delay={2.2}
            animate={animate}
          />
        </div>
      </section>

      <TestimonialsCarousel />

      {/* Call to Action Section */}
      <section
        className="container mx-auto px-4 py-20 text-center md:px-0"
        aria-label="Seção de chamada para ação"
      >
        <h2
          className="mb-6 text-4xl font-bold text-[hsl(var(--primary))] opacity-0"
          style={{
            animationDelay: "3.2s",
            animationFillMode: "forwards",
            animationPlayState: animate ? "running" : "paused",
            animationName: "fadeIn",
            animationDuration: "0.7s",
            animationTimingFunction: "ease",
          }}
        >
          Pronto para transformar suas finanças?
        </h2>
        <p
          className="mx-auto mb-8 max-w-xl text-lg text-[hsl(var(--secondary-foreground))] opacity-0"
          style={{
            animationDelay: "3.4s",
            animationFillMode: "forwards",
            animationPlayState: animate ? "running" : "paused",
            animationName: "fadeIn",
            animationDuration: "0.7s",
            animationTimingFunction: "ease",
          }}
        >
          Comece agora mesmo a controlar seus gastos, otimizar seu orçamento e
          atingir seus objetivos financeiros.
        </p>
        <Link
          href="/login"
          className="inline-block rounded-md bg-[hsl(var(--primary))] px-10 py-4 font-semibold text-[hsl(var(--primary-foreground))] opacity-0 transition hover:brightness-110"
          style={{
            animationDelay: "3.6s",
            animationFillMode: "forwards",
            animationPlayState: animate ? "running" : "paused",
            animationName: "fadeIn",
            animationDuration: "0.7s",
            animationTimingFunction: "ease",
          }}
        >
          Criar minha conta grátis
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
        &copy; {new Date().getFullYear()} MoneyVision. Todos os direitos
        reservados.
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeSlideLeft {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeSlideRight {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.7s ease forwards;
        }
        .animate-fade-slide-left {
          animation: fadeSlideLeft 0.7s ease forwards;
        }
        .animate-fade-slide-right {
          animation: fadeSlideRight 0.7s ease forwards;
        }

        /* Centraliza o badge "Plano Recomendado" */
        .highlight-badge {
          display: inline-block;
          margin: 0 auto 1.5rem auto;
          padding: 0.25rem 1rem;
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          border-radius: 9999px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.5);
          text-align: center;
          width: max-content;
          user-select: none;
        }
      `}</style>
      <ScrollToTop />
    </main>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  delay?: number;
  animate?: boolean;
}
function FeatureCard({
  title,
  description,
  delay = 0,
  animate = false,
}: FeatureCardProps) {
  return (
    <div
      className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6 opacity-0 shadow-md"
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: "forwards",
        animationPlayState: animate ? "running" : "paused",
        animationName: "fadeIn",
        animationDuration: "0.7s",
        animationTimingFunction: "ease",
      }}
    >
      <h4 className="mb-2 text-xl font-semibold text-[hsl(var(--primary))]">
        {title}
      </h4>
      <p className="text-[hsl(var(--secondary-foreground))]">{description}</p>
    </div>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  delay?: number;
  animate?: boolean;
}
function PricingCard({
  title,
  price,
  features,
  highlighted,
  delay = 0,
  animate = false,
}: PricingCardProps) {
  return (
    <div
      className={`flex max-w-md flex-col rounded-xl border p-6 opacity-0 shadow-lg transition-transform duration-300 ease-in-out ${
        highlighted
          ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 shadow-[0_10px_25px_-5px_rgba(34,197,94,0.4)]"
          : "border-[hsl(var(--border))] bg-[hsl(var(--background))]"
      } hover:scale-[1.05]`}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: "forwards",
        animationPlayState: animate ? "running" : "paused",
        animationName: "fadeIn",
        animationDuration: "0.7s",
        animationTimingFunction: "ease",
      }}
    >
      {highlighted && (
        <div className="highlight-badge mb-2" aria-label="Plano Recomendado">
          <Badge>Plano Recomendado</Badge>
        </div>
      )}
      <h3 className="mb-4 text-2xl font-bold text-[hsl(var(--primary-foreground))]">
        {title}
      </h3>
      <p className="mb-6 text-3xl font-extrabold text-[hsl(var(--primary))]">
        {price}
      </p>
      <ul className="mb-6 list-disc space-y-1 pl-6 text-[hsl(var(--secondary-foreground))]">
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <button
        className={`rounded-md py-3 font-semibold transition ${
          highlighted
            ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:brightness-110"
            : "border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
        }`}
        type="button"
      >
        Assinar
      </button>
    </div>
  );
}
