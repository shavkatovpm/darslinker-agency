"use client";

import { useState } from "react";

const variants = [
  {
    name: "A: Hammasi full width",
    desc: "Text card, notification card, buttonlar — barchasi ekran kengligida",
  },
  {
    name: "B: Barchasi 340px",
    desc: "Hammasi bir xil kenglik — 340px, markazda",
  },
  {
    name: "C: Buttons text card ichida",
    desc: "Buttonlar text card ning ichida — pastki qismida",
  },
  {
    name: "D: Hammasi chapda, bir chiziqda",
    desc: "Text, card, buttonlar — barchasi chapdan tekislangan",
  },
];

function VariantA() {
  return (
    <div className="w-full space-y-4 px-2">
      {/* Text card */}
      <div className="w-full rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-5">
        <p className="font-extrabold text-xl text-foreground">Ta&apos;lim yo&apos;nalishlari uchun</p>
        <p className="font-extrabold text-lg text-gold">raqamli yechimlar taklif qilamiz</p>
        <p className="mt-2 text-xs text-foreground/70">O&apos;quv markazingiz uchun natijali tizim ishlab chiqamiz</p>
      </div>
      {/* Notification card */}
      <div className="w-full rounded-xl border border-white/[0.12] bg-[#2a2a2b]/95 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10" />
          <div>
            <p className="text-sm font-semibold text-foreground">Yangi o&apos;quvchi ro&apos;yxatdan o&apos;tdi</p>
            <p className="text-xs text-muted">Aziza - Ingliz tili kursi</p>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl border-2 border-gold/40 py-3 text-center text-sm text-gold">Bog&apos;lanish</div>
        <div className="flex-1 rounded-xl border-2 border-gold/40 py-3 text-center text-sm text-gold">Xizmatlar</div>
      </div>
    </div>
  );
}

function VariantB() {
  return (
    <div className="mx-auto w-[340px] space-y-4">
      <div className="w-full rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-5">
        <p className="font-extrabold text-xl text-foreground">Ta&apos;lim yo&apos;nalishlari uchun</p>
        <p className="font-extrabold text-lg text-gold">raqamli yechimlar taklif qilamiz</p>
        <p className="mt-2 text-xs text-foreground/70">O&apos;quv markazingiz uchun natijali tizim ishlab chiqamiz</p>
      </div>
      <div className="w-full rounded-xl border border-white/[0.12] bg-[#2a2a2b]/95 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10" />
          <div>
            <p className="text-sm font-semibold text-foreground">Yangi o&apos;quvchi ro&apos;yxatdan o&apos;tdi</p>
            <p className="text-xs text-muted">Aziza - Ingliz tili kursi</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl border-2 border-gold/40 py-3 text-center text-sm text-gold">Bog&apos;lanish</div>
        <div className="flex-1 rounded-xl border-2 border-gold/40 py-3 text-center text-sm text-gold">Xizmatlar</div>
      </div>
    </div>
  );
}

function VariantC() {
  return (
    <div className="mx-auto space-y-4 px-2">
      <div className="w-full rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-5">
        <p className="font-extrabold text-xl text-foreground">Ta&apos;lim yo&apos;nalishlari uchun</p>
        <p className="font-extrabold text-lg text-gold">raqamli yechimlar taklif qilamiz</p>
        <p className="mt-2 text-xs text-foreground/70">O&apos;quv markazingiz uchun natijali tizim ishlab chiqamiz</p>
        <div className="mt-4 flex gap-3">
          <div className="flex-1 rounded-xl border-2 border-gold/40 py-3 text-center text-sm text-gold">Bog&apos;lanish</div>
          <div className="flex-1 rounded-xl border-2 border-gold/40 py-3 text-center text-sm text-gold">Xizmatlar</div>
        </div>
      </div>
      <div className="w-full rounded-xl border border-white/[0.12] bg-[#2a2a2b]/95 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10" />
          <div>
            <p className="text-sm font-semibold text-foreground">Yangi o&apos;quvchi ro&apos;yxatdan o&apos;tdi</p>
            <p className="text-xs text-muted">Aziza - Ingliz tili kursi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VariantD() {
  return (
    <div className="w-full space-y-4 px-4">
      <div>
        <p className="font-extrabold text-xl text-foreground">Ta&apos;lim yo&apos;nalishlari uchun</p>
        <p className="font-extrabold text-lg text-gold">raqamli yechimlar taklif qilamiz</p>
        <p className="mt-2 text-xs text-foreground/70">O&apos;quv markazingiz uchun natijali tizim ishlab chiqamiz</p>
      </div>
      <div className="w-full rounded-xl border border-white/[0.12] bg-[#2a2a2b]/95 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10" />
          <div>
            <p className="text-sm font-semibold text-foreground">Yangi o&apos;quvchi ro&apos;yxatdan o&apos;tdi</p>
            <p className="text-xs text-muted">Aziza - Ingliz tili kursi</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl border-2 border-gold/40 py-3 text-center text-sm text-gold">Bog&apos;lanish</div>
        <div className="flex-1 rounded-xl border-2 border-gold/40 py-3 text-center text-sm text-gold">Xizmatlar</div>
      </div>
    </div>
  );
}

const comps = [VariantA, VariantB, VariantC, VariantD];

export default function BtnTest() {
  const [active, setActive] = useState(0);
  const Comp = comps[active];

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center pt-20 px-4">
      <div className="flex gap-2 mb-10">
        {variants.map((v, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-3 py-2 rounded-lg text-xs font-medium cursor-pointer ${active === i ? "bg-gold text-primary" : "bg-card text-muted"}`}
          >
            {v.name}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted mb-6">{variants[active].desc}</p>
      <div className="w-full max-w-[400px]">
        <Comp />
      </div>
    </div>
  );
}
