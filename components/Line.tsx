"use client";

import React, { useMemo } from "react";

const COLORS = ["--pink-neon", "--electric-blue", "--soft-amber"] as const;

type Stat = {
  number: string;
  label: string;
  colorVar: (typeof COLORS)[number];
};

function pickColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Line() {
  const base = useMemo(
    () => [
      { number: "731", label: "Clientes" },
      { number: "100", label: "Projetos" },
      { number: "10", label: "Profissionais" },
      { number: "10", label: "Vídeos Criados" },
      { number: "24/7", label: "Atendimento" },
      { number: "5.0", label: "Avaliação" },
      { number: "+", label: "Performance" },
      { number: "∞", label: "Criatividade" },
    ],
    []
  );

  const line1 = useMemo<Stat[]>(() => {
    return shuffle(
      Array.from({ length: 3 }, () => base).flat()
    ).map((s) => ({ ...s, colorVar: pickColor() }));
  }, [base]);

  const line2 = useMemo<Stat[]>(() => {
    return shuffle(
      Array.from({ length: 3 }, () => base).flat()
    ).map((s) => ({ ...s, colorVar: pickColor() }));
  }, [base]);

  const loop1 = useMemo(() => [...line1, ...line1], [line1]);
  const loop2 = useMemo(() => [...line2, ...line2], [line2]);

  return (
    <section className="pb-20">
      {/* Linha 1 */}
      <div className="marqueeWrap">
        <div className="marqueeTrack marqueeTrack--left">
          {loop1.map((s, i) => (
            <div
              key={`l1-${i}`}
              className="marqueeItem"
              style={
                {
                  ["--c" as any]: `var(${s.colorVar})`,
                } as React.CSSProperties
              }
            >
              {/* 👉 CONTROLE DE TAMANHO AQUI */}
              <p className="marqueeNum text-electric-blue font-semibold text-2xl">
                {s.number}
              </p>

              <h2 className="marqueeTitle font-title font-semibold text-9xl">
                {s.label}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Linha 2 */}
      <div className="marqueeWrap marqueeWrap--second">
        <div className="marqueeTrack marqueeTrack--right">
          {loop2.map((s, i) => (
            <div
              key={`l2-${i}`}
              className="marqueeItem"
              style={
                {
                  ["--c" as any]: `var(${s.colorVar})`,
                } as React.CSSProperties
              }
            >
              {/* 👉 CONTROLE DE TAMANHO AQUI */}
              <p className="marqueeNum text-electric-blue font-semibold text-2xl">
                {s.number}
              </p>

              <h2 className="marqueeTitle font-title font-semibold text-9xl">
                {s.label}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* CSS só de animação / efeito */}
      <style>{`
        .marqueeWrap{
          width: 100%;
          overflow: hidden;
          position: relative;

          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .marqueeWrap--second{
          margin-top: 18px;
          opacity: .95;
        }

        .marqueeTrack{
          display: flex;
          width: max-content;
          gap: 40px;
          padding-right: 40px;
          will-change: transform;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .marqueeWrap:hover .marqueeTrack{
          animation-play-state: paused;
        }

        .marqueeTrack--left{
          animation: marqueeLeft 90s linear infinite;
        }

        .marqueeTrack--right{
          animation: marqueeRight 100s linear infinite;
        }

        @keyframes marqueeLeft{
          from{ transform: translateX(0); }
          to{ transform: translateX(-50%); }
        }

        @keyframes marqueeRight{
          from{ transform: translateX(-50%); }
          to{ transform: translateX(0); }
        }

        .marqueeItem{
          display: flex;
          align-items: flex-start;
          gap: 12px;
          user-select: none;
          cursor: pointer;
          transition: transform .25s ease;
        }

        .marqueeItem:hover{
          transform: scale(1.02);
        }

        .marqueeNum{
          margin-top: 8px;
          transition: color .25s ease;
        }

        .marqueeTitle{
          line-height: 1;
          transition: color .25s ease, text-shadow .25s ease;
        }

        .marqueeItem:hover .marqueeNum,
        .marqueeItem:hover .marqueeTitle{
          color: var(--c);
        }

 

        @media (max-width: 640px){
          .marqueeTrack--left{ animation-duration: 34s; }
          .marqueeTrack--right{ animation-duration: 38s; }
          .marqueeWrap--second{ margin-top: 14px; }
        }

        @media (prefers-reduced-motion: reduce){
          .marqueeTrack{
            animation: none !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </section>
  );
}
