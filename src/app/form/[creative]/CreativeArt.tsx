"use client";

import Image from "next/image";
import type { AdTheme } from "@/lib/adThemes";

/**
 * Kreativning o'z grafikasi — to'liq panel ko'rinishida.
 *
 * Telefonda pastda, kompyuterda o'ng tomonda joylashadi.
 *
 * Rasm konteynerni chetdan chetgacha to'ldiradi (object-cover), shuning uchun
 * uning chekkasi maketning chegarasiga to'g'ri keladi. Ilgari rasm "suzib"
 * turgani uchun foni sahifa foniga to'g'ri kelmay, chekkasi bilinib qolardi —
 * endi mos kelish masalasi umuman yo'q.
 *
 * Chap tomonda matnga o'tishda yumshoq gradient bor: rasm asta-sekin sahifa
 * fonига singib ketadi.
 */

const art: Record<string, string> = {
  "1": "/ads/art-1.webp",
  "2": "/ads/art-2.webp",
  "3": "/ads/art-3.webp",
  "4": "/ads/art-4.webp",
  "5": "/ads/art-5.webp",
};

export function CreativeArt({
  theme,
  compact = false,
}: {
  theme: AdTheme;
  /** Anketa bosqichi: telefonda yashiriladi, savollarga joy qoladi */
  compact?: boolean;
}) {
  const src = art[theme.slug];
  if (!src) return null;

  return (
    <div
      className={`pointer-events-none absolute select-none md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-[46vw] lg:w-[44vw] ${
        compact ? "hidden md:block" : "inset-x-0 bottom-0 h-[42vh]"
      }`}
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, 46vw"
        className="object-cover object-bottom md:object-center"
      />

      {/* rasmni sahifa foniga singdiruvchi o'tish */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, var(--ad-bg) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, var(--ad-bg) 0%, transparent 32%)",
        }}
      />
    </div>
  );
}
