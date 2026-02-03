"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Footer() {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    gsap.set(lineRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });
  }, []);

  const onEnter = () => {
    if (!lineRef.current || !linkRef.current) return;

    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(linkRef.current, {
      color: "#ffffff",
      duration: 0.25,
    });
  };

  const onLeave = () => {
    if (!lineRef.current || !linkRef.current) return;

    gsap.to(lineRef.current, {
      scaleX: 0,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(linkRef.current, {
      color: "rgba(255,255,255,0.55)",
      duration: 0.25,
    });
  };

  return (
    <footer className="bg-electric-blue">
      <section className="py-3">
        <p className="text-center pb-1 text-white">
          Todos os direitos reservados
        </p>
        <div className="maxW flex items-center justify-center">
          <a
            ref={linkRef}
            href="https://www.agenciayouon.com/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative text-[11px] font-medium tracking-wide text-white/60 transition-colors select-none"
            aria-label="Desenvolvido por YouOn"
          >
            Desenvolvido por <span className="text-white/80">YouOn</span>
            <span
              ref={lineRef}
              className="absolute left-0 -bottom-[2px] h-[1px] w-full bg-white/70"
            />
          </a>
        </div>
      </section>
    </footer>
  );
}
