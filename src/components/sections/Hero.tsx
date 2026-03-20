"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
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
    text: "Darslinkerdan orqali arizalardan",
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
    <div className="relative mx-auto mb-10 h-[75px] sm:h-[90px] w-full max-w-[340px] sm:max-w-[420px]">
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
                opacity: stackIndex === 0 ? 1 : stackIndex === 1 ? 0.4 : 0.15,
                y: stackIndex * 6,
                scale: 1 - stackIndex * 0.05,
              }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                layout: { duration: 0.3 },
              }}
              className={`absolute inset-x-0 rounded-xl sm:rounded-2xl border ${notif.border} bg-card px-4 py-3 sm:px-6 sm:py-4 shadow-lg`}
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

export function Hero() {
  const [showRest, setShowRest] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRest(true);
    }, 950);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} className="relative flex flex-col items-center justify-center overflow-hidden bg-primary pt-16 pb-24" style={{ minHeight: "100svh" }}>
      {/* Background image — parallax */}
      <motion.div className="absolute inset-0" style={isMobile ? {} : { y: bgY }}>
        <img src="/hero-bg.jpg" alt="" className={`w-full object-cover ${isMobile ? "h-full" : "h-[120%]"}`} />
        <div className="absolute inset-0 bg-primary/90" />
      </motion.div>

      <motion.div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={isMobile ? {} : { y: contentY, opacity: contentOpacity }}>
        <div className="mx-auto max-w-4xl text-center">
          {/* Notification Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showRest ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
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
              style={{ transformOrigin: "center bottom", willChange: "transform, opacity" }}
              className="text-4xl font-extrabold leading-[1.2] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              O&apos;quv markazingiz
            </motion.h1>
            <motion.p
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              style={{ transformOrigin: "center top", willChange: "transform, opacity" }}
              className="text-4xl font-extrabold leading-[1.2] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
                siz uchun ishlasin
              </span>
            </motion.p>
          </div>

          {/* Qolgan elementlar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showRest ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl">
              Ta&apos;lim bizneslari uchun natija{" "}
              <br className="sm:hidden" />
              beradigan IT tizimlar quramiz
            </p>

            <div className="mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4">
              <Button href="/kontakt" variant="outline" size="default" className="w-[105px] px-3 py-2 text-xs sm:w-[240px] sm:px-6 sm:py-4 sm:text-base">
                Bog&apos;lanish
              </Button>
              <Button href="/#xizmatlar" variant="outline" size="default" className="w-[105px] px-3 py-2 text-xs sm:w-[240px] sm:px-6 sm:py-4 sm:text-base">
                Xizmatlar
              </Button>
            </div>

          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
}
