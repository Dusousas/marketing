"use client";

import React from "react";
import Form from "./subc/Form";
import Depoimentos from "./subc/Depoimentos";

export default function Contact() {
  return (
    <>
      <section className="pt-10 pb-20 relative">
        <div
          aria-hidden
          className="
          pointer-events-none
          absolute left-1/2 top-[80px]
          h-[190px] w-[900px]
          -translate-x-1/2
          rounded-full
          blur-[80px]
          opacity-40
        "
          style={{
            background:
              "linear-gradient(90deg, var(--electric-blue), var(--pink-neon), var(--soft-amber))",
          }}
        />
        <div className="absolute bottom-0 right-[-140px] h-[560px] w-[500px] bg-soft-amber/25 blur-[140px]" />

        <div className="maxW relative z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mx-auto tracking-wide font-title text-center max-w-4xl">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </h1>
          <p className="mt-4 lg:max-w-3xl opacity-80 mx-auto text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ex
            vitae non voluptatem saepe, nostrum obcaecati tenetur aut!
          </p>

          <div className="flex flex-col  items-center justify-center lg:mt-20 lg:gap-20 lg:flex-row">
            <article className="lg:w-1/2">
              <Form />
            </article>

            <article className="rounded-xl lg:w-1/2">
                <Depoimentos />
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
