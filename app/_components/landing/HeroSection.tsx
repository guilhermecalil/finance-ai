"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { AnimatedCounter } from "@/app/_components/landing/AnimatedCounter";
import { Badge } from "@/app/_components/ui/badge";
import heroDashboard from "@/public/Finance-cuate.svg";
import { Variants } from "framer-motion";
import { GlowButton } from "./GlowButton";

export default function HeroSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  const floatAnim: Variants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        delay: 0.4,
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="bg-gradient-hero relative flex min-h-screen items-center justify-center"
    >
      <div className="bg-gradient-glow absolute inset-0 opacity-30"></div>

      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate={controls}
            className="space-y-8"
          >
            <Badge className="animate-pulse-glow border-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-white">
              🚀 Junte-se a quem está revolucionando as finanças
            </Badge>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Transforme suas{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 z-0 rounded-lg bg-background/90 px-1 backdrop-blur-sm"></span>
                <span className="relative z-10 bg-gradient-to-r from-primary to-primary/40 bg-clip-text font-extrabold text-transparent">
                  finanças pessoais
                </span>
              </span>{" "}
              com inteligência artificial
            </h1>

            <p className="text-xl leading-relaxed text-muted-foreground">
              Pare de perder dinheiro por falta de controle. Nossa IA analisa
              seus gastos, identifica oportunidades de economia e cria
              estratégias personalizadas para você alcançar a liberdade
              financeira.
            </p>

            {/* Estatísticas */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate={controls}
              className="grid grid-cols-3 gap-4 py-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary md:text-3xl">
                  <AnimatedCounter end={87} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground">Economia média</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary md:text-3xl">
                  R$ <AnimatedCounter end={2500} />
                </div>
                <p className="text-sm text-muted-foreground">Economia mensal</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary md:text-3xl">
                  <AnimatedCounter end={30} /> dias
                </div>
                <p className="text-sm text-muted-foreground">
                  Para ver resultados
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={slideUp}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link href="/login">
                <GlowButton className="w-full sm:w-auto">
                  Começar gratuitamente →
                </GlowButton>
              </Link>
              <Link href="/login">
                <GlowButton variant="secondary" className="w-full sm:w-auto">
                  Ver demonstração
                </GlowButton>
              </Link>
            </motion.div>

            {/* Avisos finais */}
            <motion.p
              variants={slideUp}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.8 }}
              className="text-center text-sm text-muted-foreground sm:text-left"
            >
              ✅ Grátis por 30 dias • ✅ Cancele quando quiser
            </motion.p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={floatAnim}
            initial="hidden"
            animate={controls}
            className="relative hidden lg:block"
          >
            <div className="shadow-glow relative ml-auto max-w-[530px] overflow-hidden rounded-2xl">
              <Image
                src={heroDashboard}
                alt="Dashboard MoneyVision"
                className="h-auto w-[100%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>

            <div className="animate-pulse-glow absolute -right-4 -top-4 rounded-full bg-green-500 px-4 py-2 text-white shadow-lg">
              +R$ 1.247 economizados
            </div>
            <div className="animate-pulse-glow absolute -bottom-4 left-60 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-lg">
              💡 3 dicas da IA
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
