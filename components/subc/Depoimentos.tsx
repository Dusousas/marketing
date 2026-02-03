import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const testimonialsData = [
  {
    id: 1,
    name: "Ana Souza",
    role: "Designer",
    content:
      "O design ficou incrível! Exatamente o que eu precisava para o meu portfólio.",
  },
  {
    id: 2,
    name: "Carlos Lima",
    role: "Dev Fullstack",
    content: "A integração foi perfeita. Código limpo e muito bem estruturado.",
  },
  {
    id: 3,
    name: "Beatriz M.",
    role: "CEO Tech",
    content:
      "Atendimento rápido e eficiente. Resolveram meu problema em minutos.",
  },
  {
    id: 4,
    name: "João P.",
    role: "Marketing",
    content: "As conversões aumentaram drasticamente após a implementação.",
  },
];

export default function DepoimentosFull() {
  const [activeIndex, setActiveIndex] = useState(0);
 const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  useEffect(() => {
    const total = testimonialsData.length;

    testimonialsData.forEach((_, i) => {
      const position = (i - activeIndex + total) % total;
      const card = cardsRef.current[i];

      if (position === 0) {
        // --- CARTA DA FRENTE (ATIVA) ---
        // Opacidade 0.95 (leve transparência)
        gsap.to(card, {
          duration: 0.6,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 0.95, // <--- AQUI: Leve transparência
          zIndex: 10,
          boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
          ease: "back.out(1.2)",
        });
      } else if (position === 1) {
        // --- SEGUNDA CARTA (Atrás) ---
        // Opacidade 0.6 (bem mais transparente)
        gsap.to(card, {
          duration: 0.6,
          x: 15,
          y: 10,
          rotation: 4,
          scale: 0.98,
          opacity: 0.6, // <--- AQUI: Mais transparente
          zIndex: 5,
          boxShadow: "-5px 5px 15px rgba(0,0,0,0.1)",
          ease: "power2.out",
        });
      } else if (position === total - 1) {
        // --- CARTA DO FUNDO ---
        // Opacidade 0.5 (quase fantasma)
        gsap.to(card, {
          duration: 0.6,
          x: -10,
          y: 15,
          rotation: -3,
          scale: 0.95,
          opacity: 0.5, // <--- AQUI: Bastante transparente
          zIndex: 1,
          boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
          ease: "power2.out",
        });
      } else {
        // --- CARTAS ESCONDIDAS ---
        gsap.to(card, {
          duration: 0.4,
          rotation: Math.random() * 2 - 1,
          scale: 0.9,
          zIndex: 0,
          opacity: 0, // Invisível
        });
      }
    });
  }, [activeIndex]);

  return (
    <section className="w-full flex justify-center py-20">
      <div
        className="relative w-[340px] h-[400px] cursor-pointer group perspective-1000  lg:w-[400px] lg:h-[400px]"
        onClick={handleNext}
      >
        {testimonialsData.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            // Adicionei 'backdrop-blur-sm' para criar o efeito de vidro
            // Mudei bg-foreground/90 para bg-black/80 ou similar para controlar melhor a base
            className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-xl p-8 flex flex-col justify-between border border-white/10"
            style={{ transformOrigin: "bottom right" }}
          >
            <div>
              <h3 className="text-white text-4xl font-black mb-2 opacity-50">
                "
              </h3>
              {/* Adicionei drop-shadow no texto para leitura mesmo com transparência */}
              <p className="text-white text-xl font-medium leading-relaxed drop-shadow-md">
                {item.content}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-6 border-t border-white/20 pt-6">
              <div className="w-12 h-12 bg-white/10 rounded-full overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.name}&backgroundColor=000000&textColor=`}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-white drop-shadow-sm">
                  {item.name}
                </p>
                <p className="text-xs text-white/70 uppercase tracking-wide">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
