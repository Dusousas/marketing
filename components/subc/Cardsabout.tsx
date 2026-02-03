"use client";

export default function Cardsabout() {
  return (
    <article className="px-[2%] mt-20">
      <div className="relative bg-foreground rounded-xl py-20 px-6 lg:px-10 overflow-hidden">
        {/* EFEITO AMBER NO BG PRINCIPAL */}

        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(circle_at_90%_110%,rgba(255,201,71,.12),transparent_20%)]
          "
        />

        {/* CONTEÚDO */}
        <div className="relative z-30">
          <h2 className="font-title text-5xl text-center text-white">
            Lorem ipsum dolor sit amet.
          </h2>

          {/* GRID */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-4 flex justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-[1200px]">
                {/* CARD 1 */}
                <div className="bg-white/10 rounded-xl p-6 flex flex-col gap-6">
                  <img
                    src="/test.webp"
                    alt="Social Media Marketing"
                    className="rounded-xl object-cover h-56 w-full"
                  />
                  <div className="text-white">
                    <h3 className="font-title text-2xl mb-3">
                      Social Media Marketing
                    </h3>
                    <p className="opacity-80">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </p>
                  </div>
                </div>

                {/* CARD 2 — DESTAQUE */}
                <div className="bg-electric-blue/90 rounded-xl p-6 flex flex-col items-center justify-center gap-6">
                  <div className="text-white">
                    <h3 className="font-title text-2xl mb-3">
                      Content Marketing
                    </h3>
                    <p className="opacity-90">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </p>
                  </div>
                  <img
                    src="/test.webp"
                    alt="Content Marketing"
                    className="rounded-xl object-cover h-56 w-full"
                  />
                </div>

                {/* CARD 3 */}
                <div className="bg-white/10 rounded-xl p-6 flex flex-col gap-6">
                  <img
                    src="/test.webp"
                    alt="Email Marketing"
                    className="rounded-xl object-cover h-56 w-full"
                  />
                  <div className="text-white">
                    <h3 className="font-title text-2xl mb-3">
                      Email Marketing
                    </h3>
                    <p className="opacity-80">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
