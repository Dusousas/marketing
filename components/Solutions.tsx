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

  const rafRef = useRef<number | null>(null);

  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);

  // 👇 não usar state pra rotação (evita re-render e tremedeira)
  const rotateYRef = useRef(0);

  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Ajustes
  const speed = 0.15;
  const friction = 0.93;
  const maxVel = 6;

  // raio do cilindro (desktop intocado!)
  const radius = 420; // desktop
  const radiusMobile = 360; // mobile mais espaçado

  useEffect(() => {
    // ✅ detecta mobile sem ficar lendo window.innerWidth no render
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();

    // Safari antigo não tem addEventListener no MediaQueryList
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      const z = isMobile ? radiusMobile : radius;

      // auto rotate
      if (!paused && !draggingRef.current) {
        rotateYRef.current += speed;
      }

      // inércia
      if (!draggingRef.current && Math.abs(velocityRef.current) > 0.01) {
        rotateYRef.current += velocityRef.current;
        velocityRef.current *= friction;
      }

      // ✅ aplica transform direto no elemento (sem setState por frame)
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateZ(-${z}px) rotateY(${rotateYRef.current}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, isMobile]);

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

    // gira com o dedo/mouse (sem re-render)
    rotateYRef.current += dx * 0.25;

    // velocidade pra inércia
    const v = dx * 0.12;
    velocityRef.current = Math.max(-maxVel, Math.min(maxVel, v));
  }

  function onPointerUp() {
    draggingRef.current = false;
  }

  const n = items.length;
  const theta = 360 / n;
  const z = isMobile ? radiusMobile : radius;

  return (
    <section className="w-full overflow-hidden">
      <div className="relative w-full">
        {/* SCENE */}
        <div
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
            ref={carouselRef}
            className="
              relative
              w-[220px] h-[300px] md:w-[320px] md:h-[420px]
              [transform-style:preserve-3d]
              transition-transform duration-75
              [will-change:transform]
            "
            // define um transform inicial (o RAF assume depois)
            style={{ transform: `translateZ(-${z}px) rotateY(0deg)` }}
          >
            {items.map((item, i) => {
              const angle = i * theta;

              return (
                <div
                  key={item.title + i}
                  className="
                    absolute inset-0
                    [transform-style:preserve-3d]
                    [backface-visibility:hidden]
                    [will-change:transform]
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
        hover:scale-[1.02] transition-transform duration-300
        bg-black
        [backface-visibility:hidden]
        [transform:translateZ(0)]
      "
    >
      <Image
        src={item.img}
        alt={item.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 220px, 320px"
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
