"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "#services" },
  { label: "Projetos", href: "#projects" },
  { label: "Sobre", href: "#about" },
  { label: "Contato", href: "#contact" },
];

export default function Menu() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [open, setOpen] = useState(false);

  // ESC fecha
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // trava scroll quando abrir
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // anima quando o menu montar
  useLayoutEffect(() => {
    if (!open) return;
    if (!overlayRef.current || !panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set(panelRef.current, { x: 40, autoAlpha: 0 });

      const items = panelRef.current!.querySelectorAll("[data-menu-item]");

      tl.current = gsap
        .timeline()
        .to(overlayRef.current, { autoAlpha: 1, duration: 0.18, ease: "power2.out" })
        .to(panelRef.current, { x: 0, autoAlpha: 1, duration: 0.28, ease: "power3.out" }, 0)
        .fromTo(
          items,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.22, ease: "power3.out", stagger: 0.05 },
          0.06
        );
    });

    return () => {
      tl.current?.kill();
      tl.current = null;
      ctx.revert();
    };
  }, [open]);

  function closeMenu() {
    if (!tl.current) return setOpen(false);
    tl.current.eventCallback("onReverseComplete", () => setOpen(false));
    tl.current.reverse();
  }

  return (
    <>
      {/* ===== Desktop ===== */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 uppercase text-sm tracking-wider text-white hover:text-white/30 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* ===== Mobile Button (hamburger) ===== */}
      <button
        aria-label="Abrir menu"
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center p-2 rounded-lg
                   text-white hover:bg-white/10 transition"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 17h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Renderiza só quando open = true (evita aparecer no F5) */}
      {open && (
        <>
          {/* ===== Overlay ===== */}
          <div
            ref={overlayRef}
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* ===== Mobile Menu ===== */}
          <aside
            ref={panelRef}
            className="fixed top-0 right-0 z-50 h-dvh w-[85%] max-w-sm
                       bg-[#0b0b0b] border-l border-white/10"
          >
            {/* Top bar com X */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <img className="w-[100px]" src="/elev-logo.png" alt="" />

              <button
                aria-label="Fechar menu"
                onClick={closeMenu}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18 6L6 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col p-6 gap-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-menu-item
                  onClick={closeMenu}
                  className="text-lg text-white/80 hover:text-white transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
