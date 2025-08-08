"use client";

import { Button } from "@/app/_components/ui/button";
import { motion, useAnimation, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function CallToActionSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <section className="bg-muted/10 py-20 text-foreground" ref={ref}>
      <motion.div
        className="container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2
          className="mb-4 text-3xl font-bold md:text-4xl"
          variants={itemVariants}
        >
          Sua liberdade financeira começa hoje
        </motion.h2>

        <motion.p
          className="mx-auto mb-8 max-w-2xl text-xl opacity-90"
          variants={itemVariants}
        >
          Junte-se a milhares de pessoas que já descobriram o poder de controlar
          suas finanças com inteligência artificial
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          <Link href="/login" passHref>
            <Button className="rounded-xl bg-primary px-8 py-8 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
              Começar Grátis Agora →
            </Button>
          </Link>

          <p className="text-sm opacity-80">
            Sem compromisso • Cancele quando quiser
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
