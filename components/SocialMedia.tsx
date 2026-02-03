"use client";

import { FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function SocialMedia() {
  return (
    <>
      <section className="bg-foreground">
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

          <article className="text-white bg-electric-blue flex items-center py-2 gap-4 px-6">
            <FaInstagram />
            <FaInstagram />
            <FaInstagram />
          </article>
        </div>
      </section>
    </>
  );
}
