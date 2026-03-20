"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  UserPlus,
  CreditCard,
  CalendarCheck,
  TrendingUp,
  Bell,
  Users,
  Search,
  Globe,
  Zap,
} from "lucide-react";

const notifications = [
  {
    icon: UserPlus,
    text: "Yangi o'quvchi ro'yxatdan o'tdi",
    detail: "Aziza - Ingliz tili kursi",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/5",
  },
  {
    icon: CreditCard,
    text: "To'lov qabul qilindi",
    detail: "500,000 so'm - Matematika",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
    glow: "shadow-gold/5",
  },
  {
    icon: CalendarCheck,
    text: "Ertangi darsga yozildi",
    detail: "12 o'quvchi - 09:00, B guruh",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/5",
  },
  {
    icon: TrendingUp,
    text: "Websitedan yangi murojaat",
    detail: "Sardor - Amaliyot kursi bo'yicha",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/5",
  },
  {
    icon: Users,
    text: "Guruhga yangi o'quvchi qo'shildi",
    detail: "Jasur - IELTS tayyorlov",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/5",
  },
  {
    icon: Bell,
    text: "Darslinkerdan orqali arizalardan",
    detail: "11 ta o'quvchi kursga yozildi",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/5",
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
    <div className="relative mx-auto mb-10 h-[90px] w-full max-w-[420px]">
      <AnimatePresence mode="popLayout">
        {visible.map((notifIndex, stackIndex) => {
          const notif = notifications[notifIndex];
          const Icon = notif.icon;

          return (
            <motion.div
              key={`${notifIndex}-${counter - stackIndex}`}
              layout
              initial={{ opacity: 0, y: -30, scale: 0.8, filter: "blur(4px)" }}
              animate={{
                opacity: stackIndex === 0 ? 1 : stackIndex === 1 ? 0.4 : 0.15,
                y: stackIndex * 6,
                scale: 1 - stackIndex * 0.05,
                filter: "blur(0px)",
              }}
              exit={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(4px)" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                layout: { duration: 0.4 },
              }}
              className={`absolute inset-x-0 rounded-2xl border ${notif.border} bg-card/90 backdrop-blur-xl px-6 py-4 shadow-xl ${notif.glow}`}
              style={{ zIndex: 10 - stackIndex }}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${notif.bg} ${notif.color}`}
                >
                  <Icon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-foreground">
                    {notif.text}
                  </p>
                  <p className="text-sm text-muted">{notif.detail}</p>
                </div>
                <span className="shrink-0 text-[10px] text-muted/50">
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

  useEffect(() => {
    // Heading 0.5s da ko'rinadi, keyin 1.5s kutib qolgan elementlar
    const timer = setTimeout(() => {
      setShowRest(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gold/3 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,199,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,199,0,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Notification Stack — heading tepasida */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showRest ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NotificationStack started={showRest} />
          </motion.div>

          {/* Main heading — birinchi bo'lib ko'rinadi */}
          <motion.h1
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl font-extrabold leading-[1.2] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            O&apos;quv markazingiz
            <br />
            <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
              siz uchun ishlasin
            </span>
          </motion.h1>

          {/* Qolgan barcha elementlar — 1.5s da birdaniga */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showRest ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Ta&apos;lim bizneslari uchun natija beradigan IT tizimlar quramiz
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/kontakt" variant="outline" size="lg" className="w-[240px]">
                Bog&apos;lanish
              </Button>
              <Button href="/#xizmatlar" variant="outline" size="lg" className="w-[240px]">
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
