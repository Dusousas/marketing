export default function Form() {
  return (
    <>
      <form
        className="
          bg-foreground/90
          backdrop-blur-xl
          py-10 px-8
          rounded-xl
          shadow-2xl
          border-l-2
          border-white
        "
        action=""
      >
        <h2 className="font-title tracking-widest text-3xl font-bold text-white mb-1">
          Entre em contato
        </h2>

        <p className="text-white/80 mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iste
          atque quam quaerat eum aut.
        </p>

        <div className="flex flex-col gap-y-4">
          <input
            placeholder="Seu nome"
            className="
              border-b border-white/40
              bg-transparent
              outline-none
              p-2
              text-white
              placeholder:text-white/60
              focus:border-white
              transition
            "
            type="text"
          />

          <input
            placeholder="Seu email"
            className="
              border-b border-white/40
              bg-transparent
              outline-none
              p-2
              text-white
              placeholder:text-white/60
              focus:border-white
              transition
            "
            type="email"
          />

          <input
            placeholder="Telefone"
            className="
              border-b border-white/40
              bg-transparent
              outline-none
              p-2
              text-white
              placeholder:text-white/60
              focus:border-white
              transition
            "
            type="text"
          />

          <input
            placeholder="Assunto"
            className="
              border-b border-white/40
              bg-transparent
              outline-none
              p-2
              text-white
              placeholder:text-white/60
              focus:border-white
              transition
            "
            type="text"
          />

          <textarea
            placeholder="Sua mensagem"
            className="
              border-b border-white/40
              bg-transparent
              resize-none
              outline-none
              p-2
              text-white
              placeholder:text-white/60
              focus:border-white
              transition
            "
            rows={4}
          />
        </div>

        <div className="flex mt-6">
          <button
            type="submit"
            className="
              bg-white
              text-foreground
              cursor-pointer
              px-12 py-4
              uppercase
              rounded-xl
              tracking-wider
              font-semibold
              hover:bg-white/90
              transition
            "
          >
            Enviar
          </button>
        </div>
      </form>
    </>
  );
}
