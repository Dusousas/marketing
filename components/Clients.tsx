"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Item = { src: string; alt?: string };

function getWaapiDuration(isMobile: boolean) {
  return isMobile ? 1.0 : 0.7; // entrada mais lenta no mobile
}

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

  // desktop (baralho)
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // mobile (slider)
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 768px)",
        mobile: "(max-width: 767px)",
      },
      (context) => {
        const isMobile = context.conditions?.mobile ?? false;
        const wrap = wrapRef.current!;

        // =========================
        // DESKTOP: baralho + hover
        // =========================
        if (!isMobile) {
          const cards = cardsRef.current.filter(Boolean);
          if (!cards.length) return;

          const n = cards.length;
          const mid = (n - 1) / 2;

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

          // estado inicial: entra da direita
          gsap.set(cards, {
            opacity: 0,
            scale: 0.96,
            x: () => window.innerWidth * 0.6 + Math.random() * 120,
            y: () => (Math.random() - 0.5) * 180,
            rotate: () => 40 + Math.random() * 40,
          });

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

          const duration = getWaapiDuration(false);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrap,
              start: "top 75%",
              once: true,
            },
          });

          tl.to(cards, {
            opacity: 1,
            duration: 0.14,
            stagger: 0.05,
            ease: "power2.out",
          });

          tl.to(
            cards,
            {
              x: (i) => Number(cards[i].dataset.baseX),
              y: (i) => Number(cards[i].dataset.baseY),
              rotate: (i) => Number(cards[i].dataset.baseR),
              scale: 1,
              duration,
              stagger: { each: 0.07, from: "start" },
              ease: "expo.out",
              onStart: () => {
                cards.forEach((c) =>
                  gsap.set(c, { zIndex: Number(c.dataset.baseZ) })
                );
              },
            },
            "-=0.02"
          );

          // hover
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

          const leaveWrap = () => resetAll();
          wrap.addEventListener("pointerleave", leaveWrap);

          return () => {
            wrap.removeEventListener("pointerleave", leaveWrap);
            cards.forEach((c) => (c as any).__cleanup__?.());
          };
        }

        // =========================
        // MOBILE: slider horizontal
        // =========================
        const track = trackRef.current;
        if (!track) return;

        // entrada suave do slider (mais lenta)
        gsap.set(track.children, {
          opacity: 0,
          y: 18,
          scale: 0.98,
          willChange: "transform, opacity",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top 80%",
            once: true,
          },
        });

        tl.to(track.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
        });

        // no mobile não tem hover (touch)
        return;
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="px-[2%] pb-20">
      <div className="bg-foreground rounded-xl py-14 md:py-20 overflow-hidden">
        <header className="px-5 md:px-8 pb-6 md:pb-8 flex flex-col items-center justify-between gap-4 lg:flex-row">
          <h2 className="text-background font-title text-3xl sm:text-4xl md:text-5xl tracking-wider">
            Nosso portfolio
          </h2>

          <button className="text-background/90 font-cta border uppercase border-background/40 px-3 py-2 md:px-4 rounded-md hover:bg-background/10 transition text-sm md:text-base whitespace-nowrap">
            Ver todos →
          </button>
        </header>

        <div className="relative px-5 md:px-8">
          <div
            ref={wrapRef}
            className="relative flex items-center justify-center select-none"
          >
            {/* ========================= */}
            {/* MOBILE: slider */}
            {/* ========================= */}
            <div className="md:hidden w-full">
              <div
                ref={trackRef}
                className="
                  flex gap-4
                  overflow-x-auto
                  snap-x snap-mandatory
                  scroll-smooth
                  pb-3
                  [-ms-overflow-style:none]
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                {items.map((it, idx) => (
                  <div
                    key={idx}
                    className="
                      snap-center
                      min-w-[78%]
                      sm:min-w-[60%]
                      h-[320px]
                      rounded-xl overflow-hidden
                      shadow-2xl
                      bg-black/10
                      ring-1 ring-background/10
                      flex-shrink-0
                    "
                  >
                    <img
                      src={it.src}
                      alt={it.alt ?? ""}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 pointer-events-none" />
                  </div>
                ))}
              </div>

            </div>

            {/* ========================= */}
            {/* DESKTOP: baralho */}
            {/* ========================= */}
            <div className="hidden md:flex relative h-[360px] md:h-[420px] w-full items-center justify-center">
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
      </div>
    </section>
  );
}
