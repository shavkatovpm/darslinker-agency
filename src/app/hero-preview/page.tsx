"use client";

import { useState } from "react";
import { HeroV1 } from "@/components/sections/hero-variants/HeroV1";
import { HeroV2 } from "@/components/sections/hero-variants/HeroV2";
import { HeroV3 } from "@/components/sections/hero-variants/HeroV3";
import { HeroV4 } from "@/components/sections/hero-variants/HeroV4";
import { HeroV5 } from "@/components/sections/hero-variants/HeroV5";

const variants = [
  { name: "V1 — Markazda (tighter)", component: HeroV1 },
  { name: "V2 — Chapga tekislangan", component: HeroV2 },
  { name: "V3 — Split layout", component: HeroV3 },
  { name: "V4 — Cardlar pastda", component: HeroV4 },
  { name: "V5 — Minimal", component: HeroV5 },
];

export default function HeroPreview() {
  const [active, setActive] = useState(0);
  const ActiveHero = variants[active].component;

  return (
    <div>
      {/* Selector */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex gap-2 rounded-2xl bg-black/80 backdrop-blur-md p-2 border border-white/10">
        {variants.map((v, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              active === i
                ? "bg-gold text-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>

      {/* Active Hero */}
      <ActiveHero />
    </div>
  );
}
