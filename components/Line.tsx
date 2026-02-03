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

              <h2 className="marqueeTitle font-title font-semibold text-7xl lg:text-9xl">
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

              <h2 className="marqueeTitle font-title font-semibold text-7xl lg:text-9xl">
                {s.label}
              </h2>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}
