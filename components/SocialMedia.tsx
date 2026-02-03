"use client";

import { FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function SocialMedia() {
  return (
    <section className="hidden bg-foreground w-full overflow-x-hidden lg:block">
      <div className="maxW flex justify-between">
        <article className="flex gap-10 py-2">
          <p className="text-background flex items-center gap-1 text-sm">
            <FaPhoneAlt />
            (00) 10000-0000
          </p>

          <p className="text-background flex items-center gap-1 text-sm">
            <MdEmail />
            seuemail@dominio.com
          </p>

          <p className="text-background flex items-center gap-1 text-sm">
            <FaLocationDot />
            Avenida Exemplo, 1234 - Cidade, Estado
          </p>
        </article>

        {/* esse fica na MESMA posição, mas o fundo estica até o final */}
        <article
          className="
            relative text-electric-blue bg-white flex items-center py-2 gap-4 px-6
            after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-full
            after:w-screen after:bg-white
          "
        >
          <a className="text-2xl" href=""><FaInstagram /></a>
          <a className="text-2xl" href=""><FaInstagram /></a>
          <a className="text-2xl" href=""><FaInstagram /></a>
        </article>
      </div>
    </section>
  );
}
