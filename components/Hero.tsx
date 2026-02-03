"use client";

import React from "react";
import Solutions from "./Solutions";

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden bg-[#fbfaf8]">
      {/* GLOWS (fundo) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* azul */}
        <div className="absolute -top-104 left-1/2 h-[520px] w-[1020px] -translate-x-1/2 rounded-full bg-electric-blue/15 blur-[120px]" />

        {/* âmbar */}
        <div className="absolute -bottom-28 right-[-140px] h-[560px] w-[560px] rounded-full bg-soft-amber/25 blur-[140px]" />

        {/* leve “vignette” pra dar contraste */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_55%,rgba(0,0,0,.05)_100%)]" />
      </div>

      {/* Conteúdo */}
      <div className="relative max flex flex-col items-center gap-10">
        <article className="text-center">
          <h1 className="font-sans uppercase opacity-80">
            Marketig & produção Audiovisual
          </h1>

          <h2 className="font-title text-6xl mt-2">
            Criamos histórias que vendem
          </h2>

          <p className="mt-4 lg:max-w-3xl opacity-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ex
            vitae non voluptatem saepe, nostrum obcaecati tenetur aut!
          </p>

          <div className="flex justify-center mt-6">
            <a
              className="
                font-cta uppercase
                bg-electric-blue text-white
                px-5 py-2 rounded-xl
                shadow-[0_18px_50px_rgba(59,123,255,.35)]
                hover:shadow-[0_22px_70px_rgba(59,123,255,.45)]
                transition
              "
              href=""
            >
              Entre em contato
            </a>
          </div>
        </article>

        <article className="w-full lg:w-1/2">
          <Solutions />
        </article>
      </div>
    </section>
  );
}
