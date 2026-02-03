import About from "@/components/About";
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import Line from "@/components/Line";
import Services from "@/components/Services";
import SocialMedia from "@/components/SocialMedia";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Clients />
      <Line />
    </>
  );
}
