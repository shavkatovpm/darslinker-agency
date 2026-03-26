"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  UserPlus,
  CreditCard,
  CalendarCheck,
  TrendingUp,
  Bell,
  Users,
  Send,
  Layers,
} from "lucide-react";

const notifications = [
  {
    icon: UserPlus,
    text: "Yangi o'quvchi ro'yxatdan o'tdi",
    detail: "Aziza - Ingliz tili kursi",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: CreditCard,
    text: "To'lov qabul qilindi",
    detail: "500,000 so'm - Matematika",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  {
    icon: CalendarCheck,
    text: "Ertangi darsga yozildi",
    detail: "12 o'quvchi - 09:00, B guruh",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: TrendingUp,
    text: "Websitedan yangi murojaat",
    detail: "Sardor - Amaliyot kursi bo'yicha",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Users,
    text: "Yangi o'quvchi qo'shildi",
    detail: "Jasur - IELTS tayyorlov",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Bell,
    text: "Darslinkerdan yangi ariza",
    detail: "11 ta o'quvchi kursga yozildi",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

function NotificationStack({ started }: { started: boolean }) {
  const [visible, setVisible] = useState<number[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!started) return;
    setVisible([0]);
    setCounter(1);
  }, [started]);

  useEffect(() => {
    if (counter === 0) return;
    const interval = setInterval(() => {
      setCounter((prev) => {
        const next = prev % notifications.length;
        setVisible((v) => [next, ...v].slice(0, 3));
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className="relative w-full h-[76px] mb-3 sm:h-[90px] sm:mx-auto sm:max-w-[420px] sm:mb-6">
      <AnimatePresence mode="popLayout">
        {visible.map((notifIndex, stackIndex) => {
          const notif = notifications[notifIndex];
          const Icon = notif.icon;

          return (
            <motion.div
              key={`${notifIndex}-${counter - stackIndex}`}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: stackIndex === 0 ? 1 : 0,
                y: 0,
                scale: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                layout: { duration: 0.3 },
              }}
              className={`absolute inset-x-0 rounded-2xl border border-white/15 px-4 py-5 sm:px-6 sm:py-4 shadow-2xl shadow-black/30 ${stackIndex === 0 ? "" : "bg-[#2a2a2b]"}`}
              style={{ zIndex: 10 - stackIndex, willChange: "transform, opacity", ...(stackIndex === 0 ? { background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.08) 100%)" } : {}) }}
            >
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div
                  className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl ${notif.bg} ${notif.color}`}
                >
                  <Icon size={18} className="sm:hidden" />
                  <Icon size={22} className="hidden sm:block" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] sm:text-[15px] font-semibold text-foreground">
                    {notif.text}
                  </p>
                  <p className="text-xs sm:text-sm text-muted">{notif.detail}</p>
                </div>
                <span className="shrink-0 text-[9px] sm:text-[10px] text-muted/50">
                  hozir
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

const features = [
  "Professional sayt",
  "CRM va ERP tizim",
  "Google'da birinchi",
];


function HeroFeatures({ show }: { show: boolean }) {
  const [index, setIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      // Logo va text bir vaqtda
      setSpinning(true);
      setIndex((prev) => (prev + 1) % features.length);
      setTimeout(() => setSpinning(false), 600);
    }, 4000);
    return () => clearInterval(interval);
  }, [show]);

  const layerData = [
    { left: 0, opacity: 0.2, delay: 0.08 },
    { left: 6.75, opacity: 0.5, delay: 0.04 },
    { left: 13.5, opacity: 1, delay: 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={show ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center"
    >
      <div className="relative flex items-center justify-center gap-5">
        <div className="shrink-0 relative" style={{ width: 45, height: 45 }}>
          {layerData.map((layer, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={spinning ? { rotate: [45, 135, 45] } : { rotate: 45 }}
              transition={spinning ? { duration: 0.5, delay: layer.delay, ease: "easeInOut" } : { duration: 0 }}
              style={{
                width: 31.5, height: 31.5, borderRadius: 6.75,
                background: "#f5f5f5",
                top: "50%", marginTop: -15.75,
                left: layer.left,
                opacity: layer.opacity,
              }}
            />
          ))}
        </div>
        <div className="w-[220px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="block text-2xl font-bold text-foreground whitespace-nowrap"
            >
              {features[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const [showRest, setShowRest] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRest(true);
    }, 950);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let lastY = 0;
    let rafId = 0;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - lastY) < 1) return;
        lastY = y;

        const section = sectionRef.current;
        if (!section) return;

        const sectionHeight = section.offsetHeight;
        const progress = Math.max(0, Math.min(1, y / sectionHeight));

        const bgSpeed = isMobile ? 25 : 35;
        const contentSpeed = isMobile ? 10 : 15;

        if (bgRef.current) {
          bgRef.current.style.transform = `translate3d(0, ${progress * bgSpeed}%, 0)`;
        }
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${progress * contentSpeed}%, 0)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-start sm:justify-center overflow-hidden pt-32 sm:pt-0 pb-[8vh]">
      {/* Background image — parallax */}
      <div ref={bgRef} className="absolute inset-x-0 will-change-transform" style={{ top: "-25%", bottom: "-25%", height: "150%", transition: "transform 0.2s ease-out" }}>
        <Image src="/hero-bg.jpg" alt="" fill className="object-cover object-center" priority sizes="100vw" quality={50} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-[#232324]" />
      </div>

      <div ref={contentRef} className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform" style={{ transition: "transform 0.15s linear" }}>
        {/* Mobile: bitta parent container — text, cards, buttons */}
        <div className="md:hidden w-full max-w-full flex flex-col min-h-[calc(100vh-8rem)]">
          {/* Text card */}
          <div className="w-full rounded-2xl border border-white/15 px-4 py-5 overflow-hidden shadow-lg shadow-black/30" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.08) 100%)" }}>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              className="font-extrabold leading-[1.3] tracking-tight text-foreground text-[1.35rem]"
            >
              Ta&apos;lim yo&apos;nalishlarini rivojlantirish uchun{" "}
              <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent text-[1.1rem]">
                raqamli yechimlar beramiz
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={showRest ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-subtitle mt-3 text-xs leading-relaxed text-foreground/70">
                O&apos;quv markazingiz siz uchun ishlasin
              </p>
            </motion.div>
          </div>

          {/* Notification cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showRest ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-3"
          >
            <NotificationStack started={showRest} />
          </motion.div>

          {/* Logo + almashuvchi text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showRest ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 flex items-center justify-center"
          >
            <HeroFeatures show={showRest} />
          </motion.div>

          {/* Buttons — pastda */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showRest ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-16"
          >
            <div className="flex flex-row gap-3">
              <Button href="/kontakt" variant="outline" size="default" className="flex-1 text-sm !border-white/15 hover:!border-white/50 !bg-[rgba(255,255,255,0.1)] !text-white !py-3.5 transition-colors duration-300">
                <Send size={14} className="mr-1.5" />
                Bog&apos;lanish
              </Button>
              <Button href="/#xizmatlar" variant="outline" size="default" className="flex-1 text-sm !border-white/15 hover:!border-white/50 !bg-[rgba(255,255,255,0.1)] !text-white !py-3.5 transition-colors duration-300">
                <Layers size={14} className="mr-1.5" />
                Xizmatlar
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Desktop: V6 L-shape layout */}
        <div className="hidden md:flex gap-8 max-w-7xl mx-auto">
          {/* Chap — glass card: heading + subtitle + buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex-[3] rounded-[2rem] border border-white/15 px-10 py-10 shadow-2xl shadow-black/20"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.08) 100%)" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              className="font-extrabold leading-[1.1] tracking-tight text-foreground text-[3.8rem]"
            >
              Ta&apos;lim yo&apos;nalishlarini rivojlantirish uchun{" "}
              <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent text-[3.1rem]">
                raqamli yechimlar beramiz
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={showRest ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-subtitle mt-5 text-lg leading-relaxed text-foreground/60">
                O&apos;quv markazingiz siz uchun ishlasin
              </p>
              <div className="mt-8 flex gap-4">
                <Button href="/kontakt" variant="outline" size="default" className={`px-6 py-4 text-base !border-white/15 hover:!border-white/50 !bg-[rgba(255,255,255,0.08)] !text-white transition-colors duration-300`}>
                  <Send size={16} className="mr-2" /> Bog&apos;lanish
                </Button>
                <Button href="/#xizmatlar" variant="outline" size="default" className={`px-6 py-4 text-base !border-white/15 hover:!border-white/50 !bg-[rgba(255,255,255,0.08)] !text-white transition-colors duration-300`}>
                  <Layers size={16} className="mr-2" /> Xizmatlar
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* O'ng — notification + logo ustma-ust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showRest ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-[2] flex flex-col gap-5 justify-center"
          >
            <div className="rounded-2xl border border-white/15 p-6 shadow-xl shadow-black/20 flex-1 flex flex-col justify-center" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.08) 100%)" }}>
              <p className="text-base font-semibold text-foreground/70 mb-4">Siz oladigan natijalar:</p>
              <div className="w-full">
                <NotificationStack started={showRest} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 p-6 shadow-xl shadow-black/20 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.08) 100%)" }}>
              <HeroFeatures show={showRest} />
            </div>
          </motion.div>
        </div>
      </div>


      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
}
