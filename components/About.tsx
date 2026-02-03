import Cardsabout from "./subc/Cardsabout";

export default function About() {
  return (
    <section className="relative pt-20 pb-20 overflow-hidden">
        <img className="hidden absolute z-[50] w-[200px] top-50 lg:block" src="/arrow.png" alt="" />
      {/* LIStra arco-íris (fina e discreta) */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute left-1/2 top-[140px]
          h-[90px] w-[900px]
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

      {/* CONTEÚDO */}
      <div className="relative z-10">
        <div className="maxW">
          <h2 className="font-title text-5xl mt-2 text-center">
            Lorem ipsum dolor sit amet.
          </h2>

          <p className="mt-4 lg:max-w-3xl opacity-80 mx-auto text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ex
            vitae non voluptatem saepe, nostrum obcaecati tenetur aut!
          </p>
        </div>

        {/* Cards ficam totalmente limpos */}
        <div className="relative z-20">
          <Cardsabout />
        </div>
      </div>
    </section>
  );
}
