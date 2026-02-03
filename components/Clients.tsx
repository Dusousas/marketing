"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Item = { src: string; alt?: string };

export default function Clients() {
  const items: Item[] = useMemo(
    () => [
      { src: "/1.webp", alt: "Projeto 1" },
      { src: "/2.jpg", alt: "Projeto 2" },
      { src: "/1.webp", alt: "Projeto 3" },
      { src: "/2.jpg", alt: "Projeto 4" },
      { src: "/1.webp", alt: "Projeto 5" },
      { src: "/2.jpg", alt: "Projeto 6" },
    ],
    []
  );

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;

    const ctx = gsap.context(() => {
      const wrap = wrapRef.current!;
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      const n = cards.length;
      const mid = (n - 1) / 2;

      // =========================
      // 1) Estado base (baralho)
      // =========================
      cards.forEach((card, i) => {
        const offset = i - mid;

        const base = {
          x: offset * 120,
          y: Math.abs(offset) * 6,
          r: offset * 7,
          z: i,
        };

        card.dataset.baseX = String(base.x);
        card.dataset.baseY = String(base.y);
        card.dataset.baseR = String(base.r);
        card.dataset.baseZ = String(base.z);

        gsap.set(card, {
          x: base.x,
          y: base.y,
          rotate: base.r,
          scale: 1,
          opacity: 1,
          zIndex: base.z,
          transformOrigin: "50% 85%",
          force3D: true,
          willChange: "transform",
        });
      });

      // =========================================
      // 2) Estado inicial (entra da direita)
      // =========================================
      // (seta depois do base para salvar os datasets, mas visualmente fica "fora" antes do scroll)
      gsap.set(cards, {
        opacity: 0,
        scale: 0.96,
        x: () => window.innerWidth * 0.6 + Math.random() * 120, // fora da tela à direita
        y: () => (Math.random() - 0.5) * 180, // variação vertical
        rotate: () => 40 + Math.random() * 40, // rotação de arremesso
      });

      // =========================
      // Helpers (hover clean)
      // =========================
      const resetAll = () => {
        cards.forEach((card) => {
          gsap.killTweensOf(card);

          gsap.to(card, {
            x: Number(card.dataset.baseX),
            y: Number(card.dataset.baseY),
            rotate: Number(card.dataset.baseR),
            scale: 1,
            duration: 0.28,
            ease: "power3.out",
            onStart: () => {
              gsap.set(card, { zIndex: Number(card.dataset.baseZ) });
            },
          });
        });
      };

      const focusCard = (target: HTMLDivElement) => {
        // primeiro: volta todo mundo pro estado base
        cards.forEach((card) => {
          gsap.killTweensOf(card);
          gsap.to(card, {
            x: Number(card.dataset.baseX),
            y: Number(card.dataset.baseY),
            rotate: Number(card.dataset.baseR),
            scale: 1,
            duration: 0.22,
            ease: "power3.out",
            onStart: () => {
              gsap.set(card, { zIndex: Number(card.dataset.baseZ) });
            },
          });
        });

        // depois: sobe o target e joga por cima
        gsap.killTweensOf(target);
        gsap.set(target, { zIndex: 999 });

        gsap.to(target, {
          y: -26,
          rotate: 0,
          scale: 1.06,
          duration: 0.22,
          ease: "power3.out",
        });
      };

      // =========================
      // 3) Entrada via ScrollTrigger
      // =========================
      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: wrap,
          start: "top 75%",
          once: true,
        },
      });

      // aparece rápido
      tl.to(cards, {
        opacity: 1,
        duration: 0.12,
        stagger: 0.05,
        ease: "power2.out",
      });

      // arremesso → encaixe no baralho
      tl.to(
        cards,
        {
          x: (i) => Number(cards[i].dataset.baseX),
          y: (i) => Number(cards[i].dataset.baseY),
          rotate: (i) => Number(cards[i].dataset.baseR),
          scale: 1,
          duration: 0.7,
          stagger: {
            each: 0.07,
            from: "start",
          },
          ease: "expo.out",
          onStart: () => {
            cards.forEach((c) =>
              gsap.set(c, { zIndex: Number(c.dataset.baseZ) })
            );
          },
        },
        "-=0.02"
      );

      // =========================
      // 4) Eventos de hover
      // =========================
      cards.forEach((card) => {
        const enter = () => focusCard(card);
        const leave = () => resetAll();

        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointerleave", leave);

        (card as any).__cleanup__ = () => {
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointerleave", leave);
        };
      });

      // se sair do container, reseta
      const leaveWrap = () => resetAll();
      wrap.addEventListener("pointerleave", leaveWrap);

      return () => {
        wrap.removeEventListener("pointerleave", leaveWrap);
        cards.forEach((c) => (c as any).__cleanup__?.());
      };
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-[2%] pb-20">
      <div className="bg-foreground rounded-xl py-20 overflow-hidden">
        <header className="px-8 pb-8 flex items-center justify-between">
          <h2 className="text-background font-title text-5xl tracking-wider">
            Nosso portfolio
          </h2>

          <button className="text-background/90 font-cta border uppercase border-background/40 px-4 py-2 rounded-md hover:bg-background/10 transition">
            Ver todos os projetos →
          </button>
        </header>

        <div className="relative px-8">
          <div
            ref={wrapRef}
            className="relative h-[360px] md:h-[420px] flex items-center justify-center select-none"
          >
            {items.map((it, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  if (el) cardsRef.current[idx] = el;
                }}
                className="
                  absolute
                  w-[220px] h-[300px]
                  md:w-[260px] md:h-[360px]
                  rounded-xl overflow-hidden
                  shadow-2xl
                  cursor-pointer
                  bg-black/10
                  ring-1 ring-background/10
                  will-change-transform
                "
              >
                <img
                  src={it.src}
                  alt={it.alt ?? ""}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
