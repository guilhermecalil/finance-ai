"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { BarChart2, CheckCircle2, Cpu, UserPlus } from "lucide-react";

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    icon: <UserPlus className="h-6 w-6 text-primary" />,
    title: "Cadastro rápido",
    description:
      "Crie sua conta em poucos passos e comece a usar imediatamente.",
  },
  {
    icon: <Cpu className="h-6 w-6 text-primary" />,
    title: "Integração automática",
    description:
      "Conecte suas contas e importe seus dados financeiros com segurança.",
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-primary" />,
    title: "Análise inteligente",
    description: "Receba recomendações personalizadas com base no seu perfil.",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
    title: "Acompanhe resultados",
    description: "Monitore seu progresso e alcance suas metas financeiras.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
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

export default function HowItWorksSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <section id="operation" className="bg-muted/10 py-20" ref={ref}>
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          custom={0}
        >
          Como funciona o MoneyVision
        </motion.h2>

        <motion.p
          className="mx-auto mt-3 max-w-xl text-muted-foreground"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          custom={100}
        >
          Uma solução simples e eficaz para gerenciar suas finanças.
        </motion.p>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index * 200}
              className="transition-shadow hover:shadow-lg"
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-3 flex justify-center">{step.icon}</div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
