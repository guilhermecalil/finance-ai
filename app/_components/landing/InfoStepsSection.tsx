"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    title: "Crie sua conta rápida e fácil",
    description: "Comece sem burocracia e com poucos cliques.",
  },
  {
    title: "Personalize seu perfil financeiro",
    description: "Adapte o MoneyVision para sua realidade e objetivos.",
  },
  {
    title: "Receba insights inteligentes",
    description: "Nossa IA analisa seus dados para recomendações únicas.",
  },
];

export default function InfoStepsSection() {
  const controls = useAnimation();
  // Trigger animar apenas 1 vez quando entrar na viewport
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="mb-6 text-3xl font-bold text-foreground sm:text-4xl"
        >
          Comece sua jornada financeira com o MoneyVision
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.3 },
            },
          }}
          className="mx-auto mb-12 max-w-xl text-lg text-foreground/90"
        >
          Uma solução moderna e inteligente para você gerenciar suas finanças
          com facilidade e segurança.
        </motion.p>

        <div className="mx-auto flex max-w-4xl flex-col gap-8 sm:flex-row sm:justify-center">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              className="flex-1 rounded-lg border border-border bg-background p-6 shadow-lg"
            >
              <h3 className="mb-2 text-xl font-semibold text-primary">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
