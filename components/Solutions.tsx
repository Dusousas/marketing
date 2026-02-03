"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Item = {
  title: string;
  subtitle?: string;
  img: string;
};

const ITEMS: Item[] = [
  { title: "Marketing Digital", subtitle: "Estratégia & presença", img: "/solutions/marketing.jpg" },
  { title: "Tráfego Pago", subtitle: "Meta • Google • TikTok", img: "/solutions/traffic.jpg" },
  { title: "Gestão de Redes", subtitle: "Conteúdo que vende", img: "/solutions/social.jpg" },
  { title: "Branding", subtitle: "Posicionamento", img: "/solutions/branding.jpg" },
  { title: "Sites & Landing Pages", subtitle: "Alta conversão", img: "/solutions/web.jpg" },
  { title: "SEO", subtitle: "Orgânico", img: "/solutions/seo.jpg" },
  { title: "Produção Audiovisual", subtitle: "Reels & Ads", img: "/solutions/video.jpg" },
  { title: "Automação & CRM", subtitle: "Funil", img: "/solutions/crm.jpg" },
];

export default function Solutions3D() {
  const items = useMemo(() => ITEMS, []);

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);

  const [paused, setPaused] = useState(false);
  const [rotateY, setRotateY] = useState(0);

  // Ajustes (você pode mexer)
  const speed = 0.15; // rotação automática (graus por frame aprox)
  const friction = 0.93; // “inércia” do arrasto
  const maxVel = 6;

  useEffect(() => {
    const tick = () => {
      setRotateY((prev) => {
        // auto rotate quando não está pausado e não está arrastando
        let next = prev;
        if (!paused && !draggingRef.current) {
          next = prev + speed;
        }

        // inércia após soltar (e também durante arrasto, suaviza)
        if (!draggingRef.current && Math.abs(velocityRef.current) > 0.01) {
          next = next + velocityRef.current;
          velocityRef.current *= friction;
        }

        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused]);

  function onPointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    // arrastar gira o carrossel
    setRotateY((r) => r + dx * 0.25);

    // guarda velocidade (pra inércia)
    const v = dx * 0.12;
    velocityRef.current = Math.max(-maxVel, Math.min(maxVel, v));
  }

  function onPointerUp() {
    draggingRef.current = false;
  }

  const n = items.length;
  const theta = 360 / n;

  // raio do cilindro (quanto maior, mais “aberto”)
  const radius = 420; // desktop
  const radiusMobile = 280;

  return (
    <section className="w-full py-16overflow-hidden">

      <div className="relative w-full">


        {/* SCENE */}
        <div
          ref={sceneRef}
          className="
            relative mx-auto
            h-[420px] md:h-[520px]
            w-full
            flex items-center justify-center
            select-none
            [perspective:1200px]
          "
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* CAROUSEL */}
          <div
            className="
              relative
              w-[260px] h-[340px] md:w-[320px] md:h-[420px]
              [transform-style:preserve-3d]
              transition-transform duration-75
            "
            style={{
              transform: `translateZ(-${
                typeof window !== "undefined" && window.innerWidth < 768 ? radiusMobile : radius
              }px) rotateY(${rotateY}deg)`,
            }}
          >
            {items.map((item, i) => {
              const angle = i * theta;
              const z = typeof window !== "undefined" && window.innerWidth < 768 ? radiusMobile : radius;

              return (
                <div
                  key={item.title + i}
                  className="
                    absolute inset-0
                    [transform-style:preserve-3d]
                  "
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${z}px)`,
                  }}
                >
                  <Card item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ item }: { item: Item }) {
  return (
    <div
      className="
        relative w-full h-full
        rounded-[28px] overflow-hidden
        shadow-[0_20px_60px_rgba(0,0,0,.25)]
        hover:scale-[1.02] transition-transform duration-300
        bg-black
      "
    >
      <Image
        src={item.img}
        alt={item.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 260px, 320px"
        priority={false}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white font-semibold text-lg leading-tight">{item.title}</p>
        {item.subtitle ? <p className="text-white/80 text-sm mt-1">{item.subtitle}</p> : null}
      </div>
    </div>
  );
}
