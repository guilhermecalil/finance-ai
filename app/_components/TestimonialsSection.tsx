"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface TestimonialProps {
  name: string;
  text: string;
  delay?: number;
  animate?: boolean;
}
function Testimonial({
  name,
  text,
  delay = 0,
  animate = false,
}: TestimonialProps) {
  return (
    <blockquote
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
      <p className="mb-4 text-lg leading-relaxed text-[hsl(var(--secondary-foreground))]">
        {text}
      </p>
      <footer className="text-right font-semibold text-[hsl(var(--primary))]">
        — {name}
      </footer>
    </blockquote>
  );
}

export default function TestimonialsCarousel() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const testimonials = [
    {
      name: "Ana Souza",
      text: "MoneyVision mudou minha forma de lidar com meu dinheiro. Agora controlo tudo com facilidade e confiança.",
    },
    {
      name: "Carlos Pereira",
      text: "Os relatórios inteligentes são incríveis! Já tomei decisões que me ajudaram a economizar bastante.",
    },
    {
      name: "Mariana Silva",
      text: "O atendimento é rápido e os alertas personalizados realmente fazem a diferença.",
    },
    {
      name: "João Almeida",
      text: "A plataforma é fácil de usar e me ajudou a organizar minhas finanças em poucos dias.",
    },
    {
      name: "Fernanda Lima",
      text: "Recomendo para quem quer ter controle financeiro sem complicação.",
    },
    // Adicione mais depoimentos aqui...
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    arrows: false,
  };

  return (
    <section
      className="bg-[hsl(var(--secondary))] py-16"
      aria-label="Seção de depoimentos"
    >
      <div className="container mx-auto px-4 md:px-0">
        <h2
          className="mb-12 text-center text-3xl font-bold text-[hsl(var(--primary-foreground))] opacity-0"
          style={{
            animationDelay: "1s",
            animationFillMode: "forwards",
            animationPlayState: animate ? "running" : "paused",
            animationName: "fadeIn",
            animationDuration: "0.7s",
            animationTimingFunction: "ease",
          }}
        >
          O que nossos clientes dizem
        </h2>

        <Slider {...settings} className="mx-auto max-w-5xl">
          {testimonials.map(({ name, text }, i) => (
            <div key={i} className="px-4">
              <Testimonial name={name} text={text} delay={0} animate={true} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
