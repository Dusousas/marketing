"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaPenNib,
  FaPalette,
  FaPlay,
  FaCube,
  FaMagic,
  FaCamera,
  FaImages,
  FaChartLine,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  title: string;
  icon: React.ElementType;
  top: string;
  bottom: string;
  card: string;
  h: string;
};

const ITEMS: Item[] = [
  {
    title: "Branding",
    icon: FaPenNib,
    top: "from-[#ffc947]/70",
    bottom: "to-[#ffc947]/10",
    card: "bg-[#ffc947]/80",
    h: "h-[450px]",
  },
  {
    title: "Design",
    icon: FaPalette,
    top: "from-[#ffc947]/60",
    bottom: "to-[#ffc947]/5",
    card: "bg-[#ffc947]/70",
    h: "h-[400px]",
  },
  {
    title: "Vídeo",
    icon: FaPlay,
    top: "from-[#ff39c4]/60",
    bottom: "to-[#ff39c4]/5",
    card: "bg-[#ff39c4]/70",
    h: "h-[350px]",
  },
  {
    title: "3D",
    icon: FaCube,
    top: "from-[#ff39c4]/50",
    bottom: "to-[#ff39c4]/5",
    card: "bg-[#ff39c4]/60",
    h: "h-[300px]",
  },
  {
    title: "VFX",
    icon: FaMagic,
    top: "from-[#ff39c4]/55",
    bottom: "to-[#ff39c4]/5",
    card: "bg-[#ff39c4]/65",
    h: "h-[300px]",
  },
  {
    title: "Fotografia",
    icon: FaCamera,
    top: "from-[#3b7bff]/60",
    bottom: "to-[#3b7bff]/5",
    card: "bg-[#3b7bff]/70",
    h: "h-[350px]",
  },
  {
    title: "Pós\nprodução",
    icon: FaImages,
    top: "from-[#3b7bff]/55",
    bottom: "to-[#3b7bff]/5",
    card: "bg-[#3b7bff]/65",
    h: "h-[400px]",
  },
  {
    title: "Business",
    icon: FaChartLine,
    top: "from-[#ffc947]/65",
    bottom: "to-[#ffc947]/5",
    card: "bg-[#ffc947]/75",
    h: "h-[450px]",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // refs só pro layout desktop (pilares)
  const pillarsRef = useRef<HTMLDivElement[]>([]);
  const cardsTopRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const pillars = pillarsRef.current.filter(Boolean);
      const cardsTop = cardsTopRef.current.filter(Boolean);

      if (!pillars.length) return;

      // Estado inicial: pilares "crescem" da base
      gsap.set(pillars, {
        transformOrigin: "50% 100%",
        scaleY: 0,
        opacity: 1,
        willChange: "transform",
        force3D: true,
      });

      // Card do topo entra depois
      gsap.set(cardsTop, {
        y: 14,
        opacity: 0,
        willChange: "transform, opacity",
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(pillars, {
        scaleY: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
      });

      tl.to(
        cardsTop,
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
          stagger: 0.08,
        },
        "-=0.35"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = useMemo(() => ITEMS, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background flex flex-col items-center pb-20 px-6"
    >
      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -top-40
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[420px]
          bg-[#ffc947]/40
          blur-[150px]
          rounded-full
          z-0
        "
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Título */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-wide font-title text-center max-w-4xl mb-10 md:mb-12">
          Diversas áreas de conhecimento
          <br />
          para ampliar seu repertório.
        </h1>

        {/* ========================= */}
        {/* MOBILE: grid de quadradinhos */}
        {/* ========================= */}
        <div className="md:hidden w-full max-w-md">
          <div className="grid grid-cols-2 gap-4">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`
                    rounded-2xl
                    bg-gradient-to-b ${item.top} ${item.bottom}
                    p-4
                    aspect-square
                    relative
                    overflow-hidden
                    ring-1 ring-black/5
                    active:scale-[0.98]
                    transition-transform
                  `}
                >
                  <div
                    className={`
                      ${item.card}
                      rounded-xl
                      p-4
                      h-full
                      flex flex-col items-start justify-between
                      shadow-sm
                    `}
                  >
                    <div className="w-10 h-10 bg-gray-800/90 rounded-full flex items-center justify-center">
                      <Icon className="text-white text-lg" />
                    </div>

                    <h3 className="text-foreground font-semibold text-base leading-tight whitespace-pre-line">
                      {item.title}
                    </h3>
                  </div>

                  {/* brilho discreto */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/35 to-transparent" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================= */}
        {/* DESKTOP: pilares originais */}
        {/* ========================= */}
        <div className="hidden md:flex relative mt-10 items-end justify-center gap-4 max-w-7xl w-full">
          {items.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) pillarsRef.current[idx] = el;
                }}
                className={`
                  ${item.h}
                  w-full max-w-[140px]
                  bg-gradient-to-b ${item.top} ${item.bottom}
                  rounded-2xl
                  relative
                  transition-transform duration-300 hover:scale-105
                `}
              >
                <div
                  ref={(el) => {
                    if (el) cardsTopRef.current[idx] = el;
                  }}
                  className={`
                    ${item.card}
                    absolute top-0 left-0 right-0
                    mx-3 mt-3
                    rounded-xl
                    p-4
                    flex flex-col items-start gap-2
                    shadow-md
                  `}
                >
                  <div className="w-10 h-10 bg-gray-800/90 rounded-full flex items-center justify-center mb-1">
                    <Icon className="text-white text-lg" />
                  </div>

                  <h3 className="text-foreground font-semibold text-base leading-tight whitespace-pre-line">
                    {item.title}
                  </h3>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/40 to-transparent rounded-b-2xl" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
