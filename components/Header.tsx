import Navbar from "./subc/Navbar";

export default function Header() {
  return (
    <>
      <section className="bg-electric-blue py-4">
        <div className="maxW flex justify-between">
          <div>
            <a className="font-title text-3xl tracking-wider font-bold" href="/">
              <img className="w-[180px]" src="/elev-logo.png" alt="" />
            </a>
          </div>

          <Navbar />
        </div>
      </section>
    </>
  );
}