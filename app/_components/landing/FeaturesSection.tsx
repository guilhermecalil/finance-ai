"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Brain, CheckCircle, Shield, TrendingUp } from "lucide-react";
import { FloatingCard } from "./FloatingCard"; // Ajuste o caminho conforme seu projeto

import iconAI from "@/public/icon-ai.jpg";
import iconGrowth from "@/public/icon-growth.jpg";
import iconSecurity from "@/public/icon-security.jpg";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom / 1000 },
  }),
};

export function FeaturesSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <section id="features" className="bg-secondary/30 py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants} custom={0}>
            <Badge className="mb-4 bg-primary/10 text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground">
              Por que MoneyVision?
            </Badge>
          </motion.div>

          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            variants={itemVariants}
            custom={100}
          >
            A evolução do controle financeiro
          </motion.h2>

          <motion.p
            className="mx-auto max-w-2xl text-xl text-muted-foreground"
            variants={itemVariants}
            custom={200}
          >
            Tecnologia de ponta combinada com insights personalizados para
            revolucionar sua vida financeira
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants} custom={0} key="float1">
            <FloatingCard delay={0}>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                <Image
                  src={iconGrowth}
                  alt="Crescimento"
                  className="h-8 w-8 rounded-lg"
                />
              </div>
              <h3 className="mb-4 text-xl font-bold">
                Crescimento Inteligente
              </h3>
              <p className="mb-4 text-muted-foreground">
                Nossa IA identifica padrões de gastos e sugere investimentos
                personalizados para acelerar seu crescimento patrimonial.
              </p>
              <div className="flex items-center text-sm text-primary">
                <TrendingUp className="mr-2 h-4 w-4" />
                Média de 87% de economia
              </div>
            </FloatingCard>
          </motion.div>

          <motion.div variants={itemVariants} custom={200} key="float2">
            <FloatingCard delay={200}>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                <Image
                  src={iconAI}
                  alt="Inteligência Artificial"
                  className="h-8 w-8 rounded-lg"
                />
              </div>
              <h3 className="mb-4 text-xl font-bold">IA Avançada</h3>
              <p className="mb-4 text-muted-foreground">
                Algoritmos de machine learning analisam milhões de transações
                para oferecer insights únicos sobre seu comportamento
                financeiro.
              </p>
              <div className="flex items-center text-sm text-primary">
                <Brain className="mr-2 h-4 w-4" />
                Relatórios personalizados
              </div>
            </FloatingCard>
          </motion.div>

          <motion.div variants={itemVariants} custom={400} key="float3">
            <FloatingCard delay={400}>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                <Image
                  src={iconSecurity}
                  alt="Inovação Contínua"
                  className="h-8 w-8 rounded-lg"
                />
              </div>
              <h3 className="mb-4 text-xl font-bold">Inovação Contínua</h3>
              <p className="mb-4 text-muted-foreground">
                Estamos sempre atualizando e aprimorando o MoneyVision para
                garantir a melhor experiência e novas funcionalidades para você.
              </p>
              <div className="flex items-center text-sm text-primary">
                <Shield className="mr-2 h-4 w-4" />
                Atualizações frequentes baseadas no feedback
              </div>
            </FloatingCard>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 grid items-stretch gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            variants={itemVariants}
            custom={0}
            key="card1"
            className="h-full"
          >
            <Card className="bg-gradient-card flex h-full flex-col border-border/50 p-8">
              <h3 className="mb-4 text-2xl font-bold">
                Resultados Comprovados
              </h3>
              <div className="flex-grow space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Redução média de 40% nos gastos desnecessários</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Aumento de 60% na taxa de poupança</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Objetivos financeiros alcançados 3x mais rápido</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            custom={200}
            key="card2"
            className="h-full"
          >
            <Card className="bg-gradient-primary flex h-full flex-col justify-between p-8 text-foreground">
              <div>
                <h3 className="mb-4 text-2xl font-bold">
                  Desbloqueie seu Potencial
                </h3>
                <p className="mb-6">
                  Junte-se a milhares de usuários que já transformaram suas
                  vidas financeiras com nossa plataforma.
                </p>
              </div>
              <Link href="/login">
                <Button className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
                  Começar Agora →
                </Button>
              </Link>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
