"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { CheckCircle } from "lucide-react";

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

export function PricingSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <section id="pricing" className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants} custom={0}>
            <Badge className="mb-4 bg-primary/10 text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground">
              Preços transparentes
            </Badge>
          </motion.div>

          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            variants={itemVariants}
            custom={100}
          >
            Escolha o plano perfeito para você
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground"
            variants={itemVariants}
            custom={200}
          >
            Comece grátis e escale conforme seus resultados
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Plano Starter */}
          <motion.div variants={itemVariants} custom={0} key="plan-starter">
            <Card className="pricing-card relative flex h-full flex-col p-6">
              <div className="mb-6 flex-grow">
                <h3 className="text-lg font-bold">Starter</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">Grátis</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Para começar
                </p>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Até 50 transações/mês
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Dashboard básico
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Suporte por email
                  </li>
                </ul>
              </div>

              <Link href="/login" className="mt-auto block">
                <Button className="btn-secondary w-full transition-colors duration-500 ease-in-out hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
                  Começar Grátis
                </Button>
              </Link>
            </Card>
          </motion.div>

          {/* Plano Essencial */}
          <motion.div variants={itemVariants} custom={200} key="plan-essencial">
            <Card className="pricing-card relative flex h-full flex-col border-primary/50 p-6">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 transform bg-primary text-primary-foreground">
                Mais Popular
              </Badge>

              <div className="mb-6 flex-grow">
                <h3 className="text-lg font-bold">Essencial</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">R$ 19,90</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Para uso pessoal
                </p>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Transações ilimitadas
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Relatórios com IA
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Alertas personalizados
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Suporte prioritário
                  </li>
                </ul>
              </div>

              <Link href="/login" className="mt-auto block">
                <Button className="btn-secondary w-full transition-colors duration-500 ease-in-out hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
                  Assinar Agora
                </Button>
              </Link>
            </Card>
          </motion.div>

          {/* Plano Premium */}
          <motion.div variants={itemVariants} custom={400} key="plan-premium">
            <Card className="pricing-card relative flex h-full flex-col p-6">
              <div className="mb-6 flex-grow">
                <h3 className="text-lg font-bold">Premium</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">R$ 39,90</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Para profissionais
                </p>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Tudo do Essencial
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Chatbot WhatsApp
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    IA avançada
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Recursos beta
                  </li>
                </ul>
              </div>

              <Link href="/login" className="mt-auto block">
                <Button className="btn-secondary w-full transition-colors duration-500 ease-in-out hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
                  Assinar Premium
                </Button>
              </Link>
            </Card>
          </motion.div>

          {/* Plano Elite */}
          <motion.div variants={itemVariants} custom={600} key="plan-elite">
            <Card className="pricing-card-featured relative flex h-full flex-col p-6">
              <div className="mb-6 flex-grow">
                <h3 className="text-lg font-bold">Elite</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">R$ 79,90</span>
                  <span className="text-primary-foreground/80">/mês</span>
                </div>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Para empresas
                </p>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-300" />
                    Tudo do Premium
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-300" />
                    Consultoria pessoal
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-300" />
                    Suporte VIP 24/7
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-300" />
                    API personalizada
                  </li>
                </ul>
              </div>

              <Link href="/login" className="mt-auto block">
                <Button className="btn-secondary w-full transition-colors duration-500 ease-in-out hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
                  Assinar Elite
                </Button>
              </Link>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
          custom={800}
          initial="hidden"
          animate={controls}
        >
          <p className="text-muted-foreground">
            💳 Aceitamos todos os cartões • 🔒 Pagamento 100% seguro • 📞
            Suporte em português
          </p>
        </motion.div>
      </div>
    </section>
  );
}
