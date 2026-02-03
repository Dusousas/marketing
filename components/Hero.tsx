"use client";

import React from "react";
import Solutions from "./Solutions";

export default function Hero() {
  return (
    <>
      <section className="">
        <div className="maxW flex items-center gap-10">

          <article className="lg:w-1/2">
            <h1 className="font-sans uppercase">Marketig & produção Audiovisual</h1>
            <h2 className="font-title text-5xl mt-2">Criamos histórias que vendem</h2>
            <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ex vitae non voluptatem saepe, nostrum obcaecati tenetur aut!</p>
          </article>

          <article>
            <img src="/test1.png" alt="" />
          </article>

        </div>

        <Solutions />
      </section>
    </>
  );
}
