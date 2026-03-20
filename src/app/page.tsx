import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <Services />
      <Stats />
      <CTA />
    </>
  );
}
