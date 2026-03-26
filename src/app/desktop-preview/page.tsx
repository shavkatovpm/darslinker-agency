"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import {
  Send,
  Layers,
  UserPlus,
  CreditCard,
  CalendarCheck,
  TrendingUp,
  Bell,
  Users,
} from "lucide-react";

const notifications = [
  { icon: UserPlus, text: "Yangi o'quvchi ro'yxatdan o'tdi", detail: "Aziza - Ingliz tili kursi", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: CreditCard, text: "To'lov qabul qilindi", detail: "500,000 so'm - Matematika", color: "text-gold", bg: "bg-gold/10" },
  { icon: CalendarCheck, text: "Ertangi darsga yozildi", detail: "12 o'quvchi - 09:00, B guruh", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: TrendingUp, text: "Websitedan yangi murojaat", detail: "Sardor - Amaliyot kursi bo'yicha", color: "text-purple-400", bg: "bg-purple-500/10" },
  { icon: Users, text: "Yangi o'quvchi qo'shildi", detail: "Jasur - IELTS tayyorlov", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: Bell, text: "Darslinkerdan yangi ariza", detail: "11 ta o'quvchi kursga yozildi", color: "text-amber-400", bg: "bg-amber-500/10" },
];

const featureTexts = ["Professional sayt", "CRM va ERP tizim", "Google'da birinchi"];
const glassBg = "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.08) 100%)";
const glassBorder = "border border-white/15";
const glassBtn = "!border-white/15 !bg-[rgba(255,255,255,0.1)] !text-white";

function NotifCard({ n }: { n: typeof notifications[0] }) {
  const Icon = n.icon;
  return (
    <div className={`rounded-2xl ${glassBorder} px-6 py-4 shadow-xl shadow-black/20`} style={{ background: glassBg }}>
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${n.bg} ${n.color}`}><Icon size={24} /></div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-foreground">{n.text}</p>
          <p className="text-sm text-muted">{n.detail}</p>
        </div>
        <span className="text-[10px] text-muted/50">hozir</span>
      </div>
    </div>
  );
}

function AnimNotif() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(p => (p+1) % notifications.length), 3000); return () => clearInterval(t); }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
        <NotifCard n={notifications[i]} />
      </motion.div>
    </AnimatePresence>
  );
}

function LT({ size = 50, tc = "text-xl" }: { size?: number; tc?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(p => (p+1) % featureTexts.length), 4000); return () => clearInterval(t); }, []);
  return (
    <div className="flex items-center gap-4">
      <Logo size={size} animate color="#f5f5f5" />
      <div className="overflow-hidden w-[250px]">
        <AnimatePresence mode="wait">
          <motion.span key={i} initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ duration: 0.25 }}
            className={`block font-bold text-foreground whitespace-nowrap ${tc}`}>{featureTexts[i]}</motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

const H1 = ({ cls = "text-6xl" }: { cls?: string }) => (
  <h1 className={`font-extrabold leading-[1.05] tracking-tight text-foreground ${cls}`} style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
    Ta&apos;lim yo&apos;nalishlari uchun
  </h1>
);
const H2 = ({ cls = "text-5xl" }: { cls?: string }) => (
  <p className={`font-extrabold leading-[1.08] tracking-tight ${cls}`} style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
    <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">raqamli yechimlar taklif qilamiz</span>
  </p>
);
const Sub = ({ cls = "text-xl" }: { cls?: string }) => (
  <p className={`text-foreground/60 leading-relaxed ${cls}`}>O&apos;quv markazingiz uchun natijali tizim ishlab chiqamiz</p>
);
const Btns = ({ col = false }: { col?: boolean }) => (
  <div className={`flex gap-4 ${col ? "flex-col" : ""}`}>
    <Button href="/contact" variant="outline" size="default" className={`px-6 py-4 text-base ${glassBtn}`}><Send size={16} className="mr-2" /> Bog&apos;lanish</Button>
    <Button href="/#services" variant="outline" size="default" className={`px-6 py-4 text-base ${glassBtn}`}><Layers size={16} className="mr-2" /> Xizmatlar</Button>
  </div>
);

/* === V1 — Wide Glass with sidebar notif === */
function V1() {
  return (
    <div className="min-h-screen flex items-center justify-center px-10 py-16">
      <div className="max-w-7xl w-full flex gap-6 items-stretch">
        <div className={`flex-[3] rounded-[2rem] ${glassBorder} px-12 py-12 flex flex-col justify-center shadow-2xl shadow-black/30`} style={{ background: glassBg }}>
          <H1 cls="text-[4.5rem]" />
          <H2 cls="text-[3.2rem] mt-2" />
          <div className="mt-6"><Sub /></div>
          <div className="mt-10 flex items-center gap-8">
            <Btns />
            <div className="h-10 w-px bg-white/10" />
            <LT size={40} tc="text-lg" />
          </div>
        </div>
        <div className={`w-[340px] shrink-0 rounded-[2rem] ${glassBorder} p-6 flex flex-col justify-center gap-4 shadow-2xl shadow-black/30`} style={{ background: "rgba(255,255,255,0.04)" }}>
          {[0,1,2].map(i => <NotifCard key={i} n={notifications[i]} />)}
        </div>
      </div>
    </div>
  );
}

/* === V2 — Horizontal Flow === */
function V2() {
  return (
    <div className="min-h-screen flex items-center px-16 py-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6"><Logo size={32} animate color="#f5f5f5" /><span className="text-sm text-foreground/40 font-medium">Darslinker Agency</span></div>
        <div className="flex items-end justify-between gap-16">
          <div className="flex-1">
            <H1 cls="text-[4.8rem]" />
            <H2 cls="text-[3.4rem] mt-2" />
            <div className="mt-5"><Sub cls="text-lg max-w-xl" /></div>
          </div>
          <div className="w-[400px] shrink-0 space-y-4">
            <AnimNotif />
            <LT size={40} tc="text-lg" />
          </div>
        </div>
        <div className="mt-12 flex items-center gap-6">
          <Btns />
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
      </div>
    </div>
  );
}

/* === V3 — Compact Centered Glass === */
function V3() {
  return (
    <div className="min-h-screen flex items-center justify-center px-16 py-16">
      <div className={`max-w-4xl w-full rounded-[2rem] ${glassBorder} px-14 py-12 shadow-2xl shadow-black/30`} style={{ background: glassBg }}>
        <div className="text-center">
          <div className="flex justify-center mb-6"><LT size={40} tc="text-lg" /></div>
          <H1 cls="text-[4rem]" />
          <H2 cls="text-[2.8rem] mt-1" />
          <div className="mt-4"><Sub /></div>
        </div>
        <div className="mt-8 flex items-center gap-6 justify-between">
          <Btns />
          <div className="flex-1 max-w-[380px]"><AnimNotif /></div>
        </div>
      </div>
    </div>
  );
}

/* === V4 — Full Glass Overlay (YOQQAN) === */
function V4() {
  return (
    <div className="min-h-screen flex items-center justify-center px-16 py-16">
      <div className={`max-w-5xl w-full rounded-[2rem] ${glassBorder} p-12 shadow-2xl shadow-black/30`} style={{ background: glassBg }}>
        <div className="flex items-center gap-3 mb-8"><Logo size={36} animate color="#f5f5f5" /><span className="text-sm font-medium text-foreground/50">Darslinker Agency</span></div>
        <H1 cls="text-[4.5rem]" />
        <H2 cls="text-[3.2rem] mt-1" />
        <div className="mt-5"><Sub /></div>
        <div className="mt-10 flex items-center justify-between gap-8">
          <Btns />
          <div className="max-w-[400px] flex-1"><AnimNotif /></div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
          <LT size={45} tc="text-xl" />
        </div>
      </div>
    </div>
  );
}

/* === V5 — Layered Cards === */
function V5() {
  return (
    <div className="min-h-screen flex items-center justify-center px-12 py-16">
      <div className="max-w-5xl w-full space-y-5">
        {/* Top card — heading */}
        <div className={`rounded-[2rem] ${glassBorder} px-12 py-10 shadow-xl shadow-black/20`} style={{ background: glassBg }}>
          <div className="flex items-center gap-3 mb-4"><Logo size={32} animate color="#f5f5f5" /><span className="text-sm text-foreground/40">Darslinker Agency</span></div>
          <H1 cls="text-[4rem]" />
          <H2 cls="text-[2.8rem] mt-1" />
          <div className="mt-4"><Sub cls="text-lg" /></div>
        </div>
        {/* Bottom row — 3 cards */}
        <div className="flex gap-5">
          <div className={`flex-1 rounded-2xl ${glassBorder} p-6 shadow-xl shadow-black/20 flex items-center`} style={{ background: glassBg }}>
            <Btns col />
          </div>
          <div className={`flex-[2] rounded-2xl ${glassBorder} p-6 shadow-xl shadow-black/20`} style={{ background: glassBg }}>
            <AnimNotif />
          </div>
          <div className={`flex-1 rounded-2xl ${glassBorder} p-6 shadow-xl shadow-black/20 flex items-center justify-center`} style={{ background: glassBg }}>
            <LT size={45} tc="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* === V6 — L-shape Layout === */
function V6() {
  return (
    <div className="min-h-screen flex items-center px-16 py-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex gap-8">
          {/* Chap katta */}
          <div className={`flex-[3] rounded-[2rem] ${glassBorder} px-10 py-10 shadow-2xl shadow-black/20`} style={{ background: glassBg }}>
            <H1 cls="text-[4rem]" />
            <H2 cls="text-[2.8rem] mt-2" />
            <div className="mt-5"><Sub cls="text-lg" /></div>
            <div className="mt-8"><Btns /></div>
          </div>
          {/* O'ng ustun */}
          <div className="flex-[2] flex flex-col gap-5">
            <div className={`rounded-2xl ${glassBorder} p-6 shadow-xl shadow-black/20 flex-1 flex items-center`} style={{ background: glassBg }}>
              <div className="w-full"><AnimNotif /></div>
            </div>
            <div className={`rounded-2xl ${glassBorder} p-6 shadow-xl shadow-black/20 flex items-center justify-center`} style={{ background: glassBg }}>
              <LT size={50} tc="text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === V7 — Dashboard Style === */
function V7() {
  return (
    <div className="min-h-screen flex items-center justify-center px-12 py-12">
      <div className={`max-w-6xl w-full rounded-[2rem] ${glassBorder} overflow-hidden shadow-2xl shadow-black/30`} style={{ background: glassBg }}>
        {/* Header bar */}
        <div className="px-10 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3"><Logo size={28} animate color="#f5f5f5" /><span className="text-sm text-foreground/50 font-medium">Darslinker Agency</span></div>
          <LT size={32} tc="text-base" />
        </div>
        {/* Content */}
        <div className="px-10 py-10">
          <H1 cls="text-[4rem]" />
          <H2 cls="text-[2.8rem] mt-1" />
          <div className="mt-4"><Sub cls="text-lg" /></div>
        </div>
        {/* Footer bar */}
        <div className="px-10 py-5 border-t border-white/10 flex items-center justify-between gap-6">
          <Btns />
          <div className="flex-1 max-w-[400px]"><AnimNotif /></div>
        </div>
      </div>
    </div>
  );
}

/* === V8 — Magazine Spread === */
function V8() {
  return (
    <div className="min-h-screen flex items-center px-16 py-16">
      <div className="max-w-7xl mx-auto w-full flex gap-12 items-center">
        {/* Chap — kontent */}
        <div className="flex-[3]">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[3px] w-16 bg-gold rounded-full" />
            <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase">Darslinker Agency</span>
          </div>
          <H1 cls="text-[4.5rem]" />
          <H2 cls="text-[3.2rem] mt-2" />
          <div className="mt-6"><Sub cls="text-lg max-w-lg" /></div>
          <div className="mt-10"><Btns /></div>
        </div>
        {/* O'ng — glass card ichida notification + logo */}
        <div className="flex-[2]">
          <div className={`rounded-[2rem] ${glassBorder} p-8 shadow-2xl shadow-black/30 space-y-6`} style={{ background: glassBg }}>
            <AnimNotif />
            <div className="h-px bg-white/10" />
            <div className="flex justify-center"><LT size={45} tc="text-xl" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const variants = [
  { name: "V1", desc: "Wide Glass + sidebar notifications", comp: V1 },
  { name: "V2", desc: "Horizontal Flow — heading chap, notif o'ng", comp: V2 },
  { name: "V3", desc: "Compact Centered Glass", comp: V3 },
  { name: "V4", desc: "Full Glass Overlay ⭐", comp: V4 },
  { name: "V5", desc: "Layered Cards — heading + 3 pastki card", comp: V5 },
  { name: "V6", desc: "L-shape — chap glass + o'ng ustun", comp: V6 },
  { name: "V7", desc: "Dashboard — header, content, footer bars", comp: V7 },
  { name: "V8", desc: "Magazine — chap text, o'ng glass card", comp: V8 },
];

export default function DesktopPreview() {
  const [active, setActive] = useState(3);
  const Comp = variants[active].comp;
  return (
    <div className="min-h-screen bg-[#232324] relative">
      <div className="absolute inset-0 z-0">
        <Image src="/hero-bg.jpg" alt="" fill className="object-cover" quality={50} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-[#232324]" />
      </div>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex gap-1.5 rounded-2xl bg-black/80 backdrop-blur-md p-2 border border-white/10">
        {variants.map((v, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer transition-all ${active === i ? "bg-gold text-primary" : "text-muted hover:text-foreground"}`}>
            {v.name}
          </button>
        ))}
      </div>
      <p className="fixed top-[48px] left-1/2 -translate-x-1/2 z-[100] text-[11px] text-muted/60">{variants[active].desc}</p>
      <div className="relative z-10"><Comp /></div>
    </div>
  );
}
