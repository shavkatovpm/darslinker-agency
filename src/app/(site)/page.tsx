import { Hero } from "@/components/sections/Hero";
import { ProblemsAndSolutions } from "@/components/sections/ProblemsAndSolutions";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="relative bg-gradient-to-b from-[#232324] via-[#1a1a1b] to-[#000000]">
      <Hero />
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#232324] to-transparent z-10 pointer-events-none" />
        <ProblemsAndSolutions />
      </div>
      <Services />
      <Stats />
      <CTA />
    </div>
  );
}
