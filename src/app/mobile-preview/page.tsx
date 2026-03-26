"use client";

import { useState } from "react";
import { Send, Layers, ArrowDown, ChevronRight } from "lucide-react";

const glass = "border border-white/15 shadow-lg shadow-black/30";
const glassBg = "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.08) 100%)";

function Notif() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 shrink-0 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs font-bold">+1</div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">Yangi o&apos;quvchi ro&apos;yxatdan o&apos;tdi</p>
        <p className="text-xs text-muted truncate">Aziza - Ingliz tili kursi</p>
      </div>
    </div>
  );
}

/* ============ V1 — Gradient Sections ============ */
/* Har bir element orasida gradient divider, vertikal ritmli */
function V1() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center px-4 space-y-0">
      {/* Text */}
      <div className="pb-5">
        <h1 className="text-[1.8rem] font-black leading-[1.08] tracking-tight text-foreground" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
          Ta&apos;lim yo&apos;nalishlari uchun
        </h1>
        <p className="text-[1.5rem] font-black leading-[1.08] tracking-tight" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
          <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
            raqamli yechimlar taklif qilamiz
          </span>
        </p>
        <p className="mt-2 text-xs text-foreground/50 leading-relaxed">
          O&apos;quv markazingiz uchun natijali tizim ishlab chiqamiz
        </p>
      </div>
      {/* Gold divider */}
      <div className="h-px bg-gradient-to-r from-gold/50 via-gold/20 to-transparent mb-5" />
      {/* Notification */}
      <div className={`rounded-2xl ${glass} px-4 py-3`} style={{ background: glassBg }}>
        <Notif />
      </div>
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-5" />
      {/* Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-primary bg-gold">
          <Send size={15} /> Bog&apos;lanish
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold text-white border border-white/15" style={{ background: "rgba(255,255,255,0.08)" }}>
          <Layers size={15} /> Xizmatlar
        </button>
      </div>
    </div>
  );
}

/* ============ V2 — Two Column Bottom ============ */
/* Text tepada full width, pastda 2 ustun: chapda notification, o'ngda buttons vertical */
function V2() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center px-3 space-y-5">
      {/* Text */}
      <div className="px-1">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-1 text-[10px] font-semibold text-gold mb-3">
          <div className="h-1.5 w-1.5 rounded-full bg-gold" />
          Darslinker
        </div>
        <h1 className="text-[1.7rem] font-black leading-[1.08] tracking-tight text-foreground" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
          Ta&apos;lim yo&apos;nalishlari uchun
        </h1>
        <p className="text-[1.4rem] font-black leading-[1.08] tracking-tight" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
          <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
            raqamli yechimlar taklif qilamiz
          </span>
        </p>
        <p className="mt-2 text-xs text-foreground/50">
          O&apos;quv markazingiz uchun natijali tizim ishlab chiqamiz
        </p>
      </div>

      {/* 2 column: notification + buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* Chapda — notification */}
        <div className={`rounded-2xl ${glass} px-3 py-3 flex items-center`} style={{ background: glassBg }}>
          <div className="flex flex-col items-center text-center w-full gap-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs font-bold">+1</div>
            <p className="text-[11px] font-semibold text-foreground leading-tight">Yangi o&apos;quvchi</p>
            <p className="text-[10px] text-muted">Aziza</p>
          </div>
        </div>
        {/* O'ngda — buttons stacked */}
        <div className="flex flex-col gap-2.5">
          <button className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl text-sm font-bold text-primary bg-gold">
            <Send size={14} /> Bog&apos;lanish
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl text-sm font-semibold text-white border border-white/15" style={{ background: "rgba(255,255,255,0.08)" }}>
            <Layers size={14} /> Xizmatlar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ V3 — Magazine ============ */
/* Chapda vertikal gold chiziq, text katta, card o'ngda pastda */
function V3() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center px-4">
      <div className="flex gap-4">
        {/* Gold vertikal chiziq */}
        <div className="w-1 shrink-0 rounded-full bg-gradient-to-b from-gold via-gold/50 to-transparent" />
        <div className="space-y-5">
          <div>
            <p className="text-[10px] font-bold text-gold tracking-[0.2em] uppercase mb-3">Ta&apos;lim uchun IT yechimlar</p>
            <h1 className="text-[1.7rem] font-black leading-[1.1] tracking-tight text-foreground" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
              Ta&apos;lim yo&apos;nalishlari uchun
            </h1>
            <p className="text-[1.4rem] font-black leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
              <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
                raqamli yechimlar taklif qilamiz
              </span>
            </p>
            <p className="mt-3 text-xs text-foreground/60 leading-relaxed">
              O&apos;quv markazingiz uchun natijali tizim ishlab chiqamiz
            </p>
          </div>

          <div className={`rounded-xl ${glass} px-4 py-3`} style={{ background: glassBg }}>
            <Notif />
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-semibold text-primary bg-gold">
              <Send size={13} /> Bog&apos;lanish
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-semibold text-white border border-white/15" style={{ background: "rgba(255,255,255,0.08)" }}>
              <Layers size={13} /> Xizmatlar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ V4 — Hero Pill ============ */
/* Tepada kichik pill badge, katta text, notification va buttons pastda horizontal scroll */
function V4() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center px-4 space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold text-gold mb-4">
          <div className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Darslinker Agency
        </div>
        <h1 className="text-[1.9rem] font-black leading-[1.08] tracking-tight text-foreground" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
          Ta&apos;lim yo&apos;nalishlari uchun{" "}
          <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
            raqamli yechimlar
          </span>{" "}
          taklif qilamiz
        </h1>
        <p className="mt-3 text-sm text-foreground/50 leading-relaxed">
          O&apos;quv markazingiz uchun natijali tizim ishlab chiqamiz
        </p>
      </div>

      <div className={`rounded-2xl ${glass} px-4 py-3`} style={{ background: glassBg }}>
        <Notif />
      </div>

      <div className="space-y-2.5">
        <button className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold text-primary bg-gold">
          <Send size={16} /> Bog&apos;lanish
        </button>
        <button className="w-full flex items-center justify-between rounded-2xl py-4 px-5 text-sm font-semibold text-foreground/80 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
          <span className="flex items-center gap-2"><Layers size={16} /> Xizmatlarni ko&apos;rish</span>
          <ChevronRight size={16} className="text-foreground/30" />
        </button>
      </div>
    </div>
  );
}

/* ============ V5 — Overlap ============ */
/* Katta text, notification card overlap qilib turadi, buttons pastda */
function V5() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center px-2">
      <div className="w-full space-y-4">
        <div className={`w-full rounded-2xl ${glass} px-4 py-5 overflow-hidden`} style={{ background: glassBg }}>
          <h1 className="font-extrabold leading-[1.2] tracking-tight text-foreground text-xl" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
            Ta&apos;lim yo&apos;nalishlari uchun
          </h1>
          <p className="font-extrabold leading-[1.2] tracking-wide text-lg" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
            <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
              raqamli yechimlar taklif qilamiz
            </span>
          </p>
          <p className="font-subtitle mt-3 text-xs leading-relaxed text-foreground/70">
            O&apos;quv markazingiz uchun natijali tizim ishlab chiqamiz
          </p>
        </div>

        <div className={`w-full rounded-2xl ${glass} px-4 py-3.5`} style={{ background: glassBg }}>
          <Notif />
        </div>

        <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3.5 text-sm font-bold text-primary bg-gold">
          <Send size={14} /> Bog&apos;lanish
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3.5 text-sm font-semibold text-white border border-white/15" style={{ background: "rgba(255,255,255,0.08)" }}>
          <Layers size={14} /> Xizmatlar
        </button>
        </div>
      </div>
    </div>
  );
}

const variants = [
  { name: "V1", desc: "Gradient — text, gold chiziq, card, buttons", comp: V1 },
  { name: "V2", desc: "Two Column — text tepada, pastda 2 ustun grid", comp: V2 },
  { name: "V3", desc: "Magazine — chapda gold chiziq, minimal", comp: V3 },
  { name: "V4", desc: "Hero Pill — badge + bitta oqimli text + katta buttons", comp: V4 },
  { name: "V5", desc: "Overlap — text card ustiga notification overlap", comp: V5 },
];

export default function MobilePreview() {
  const [active, setActive] = useState(0);
  const Comp = variants[active].comp;

  return (
    <div className="min-h-screen bg-[#232324]">
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-3 py-3">
        <div className="flex gap-1.5 overflow-x-auto">
          {variants.map((v, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer transition-all ${
                active === i ? "bg-gold text-primary" : "text-muted hover:text-foreground"
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-muted mt-1">{variants[active].desc}</p>
      </div>

      <Comp />
    </div>
  );
}
