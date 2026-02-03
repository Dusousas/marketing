"use client";

import React from "react";
import Solutions from "./Solutions";

export default function Hero() {
  return (
    <section className="relative pt-20 overflow-hidden bg-background">
      {/* GLOWS (fundo) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* azul */}
        <div className="absolute -top-104 left-1/2 h-[520px] w-[1020px] -translate-x-1/2 rounded-full bg-electric-blue/25 blur-[120px]" />

        {/* âmbar */}
        <div className="absolute bottom-40 right-[-140px] h-[560px] w-[500px] bg-soft-amber/25 blur-[140px]" />


      </div>

      {/* Conteúdo */}
      <div className="relative flex flex-col items-center gap-10">
        <article className="text-center">
          <h1 className="font-sans uppercase opacity-80">
            Marketig & produção Audiovisual
          </h1>

          <h2 className="font-title text-7xl mt-2">
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

                transition
              "
              href=""
            >
              Entre em contato
            </a>
          </div>
        </article>

        <article className="w-full">
          <Solutions />
        </article>
      </div>
    </section>
  );
}
