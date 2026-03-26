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
    <div className="relative mx-auto h-[75px] sm:h-[90px] w-full max-w-[340px] sm:max-w-[420px]">
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
                opacity: stackIndex === 0 ? 1 : stackIndex === 1 ? 0.25 : 0.08,
                y: stackIndex * 6,
                scale: 1 - stackIndex * 0.05,
              }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                layout: { duration: 0.3 },
              }}
              className="absolute inset-x-0 rounded-xl sm:rounded-2xl border border-white/[0.12] bg-[#2a2a2b]/95 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4 shadow-2xl shadow-black/20"
              style={{ zIndex: 10 - stackIndex, willChange: "transform, opacity" }}
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

export function HeroV1() {
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
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) { ticking = false; return; }

        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));

        if (bgRef.current) {
          bgRef.current.style.transform = `translate3d(0, ${progress * 37}%, 0)`;
        }
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${progress * 15}%, 0)`;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-[8vh]">
      {/* Background image — parallax */}
      <div ref={bgRef} className="absolute inset-x-0 will-change-transform" style={{ top: "-15%", bottom: "-15%", height: "130%" }}>
        <Image src="/hero-bg.jpg" alt="" fill className="object-cover object-center" priority sizes="100vw" quality={50} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-[#232324]" />
      </div>

      <div ref={contentRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform">
        <div className="mx-auto max-w-4xl text-center">
          {/* Notification Stack — tighter margin */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showRest ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 sm:mb-6"
          >
            <NotificationStack started={showRest} />
          </motion.div>

          {/* Main heading — 3D flip */}
          <div style={{ perspective: "1000px" }}>
            <motion.h1
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              style={{ transformOrigin: "center bottom", willChange: "transform, opacity", fontFamily: "var(--font-manrope), sans-serif" }}
              className="whitespace-nowrap font-extrabold leading-[1.2] tracking-tight text-foreground text-[clamp(1.6rem,7.5vw,4.5rem)]"
            >
              Ta&apos;lim yo&apos;nalishlari uchun
            </motion.h1>
            <motion.p
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              style={{ transformOrigin: "center top", willChange: "transform, opacity", fontFamily: "var(--font-manrope), sans-serif" }}
              className="whitespace-nowrap font-extrabold leading-[1.2] tracking-wide text-[clamp(1.1rem,5.2vw,3.32rem)]"
            >
              <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
                raqamli yechimlar taklif qilamiz
              </span>
            </motion.p>
          </div>

          {/* Subtitle + buttons — tighter spacing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showRest ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-subtitle mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl">
              O&apos;quv markazingiz uchun natijali tizim ishlab chiqamiz
            </p>

            <div className="mt-6 flex flex-row items-center justify-center gap-3 sm:gap-4">
              <Button href="/kontakt" variant="outline" size="default" className="w-[105px] px-3 py-2 text-xs sm:w-[240px] sm:px-6 sm:py-4 sm:text-base">
                Bog&apos;lanish
              </Button>
              <Button href="/#xizmatlar" variant="outline" size="default" className="w-[105px] px-3 py-2 text-xs sm:w-[240px] sm:px-6 sm:py-4 sm:text-base">
                Xizmatlar
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
}
