"use client";

import React from "react";
import Solutions from "./Solutions";

export default function Hero() {
  return (
    <>
      <section className="py-20">
        <div className="max flex flex-col items-center gap-10">
          <article className="text-center">
            <h1 className="font-sans uppercase">
              Marketig & produção Audiovisual
            </h1>
            <h2 className="font-title text-5xl mt-2">
              Criamos histórias que vendem
            </h2>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ex
              vitae non voluptatem saepe, nostrum obcaecati tenetur aut!
            </p>
          </article>

          <article className="w-1/2">
            <Solutions />
          </article>
        </div>
      </section>
    </>
  );
}
