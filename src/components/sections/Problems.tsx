"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AlertTriangle, DollarSign, BarChart3 } from "lucide-react";

const problems = [
  {
    icon: DollarSign,
    title: "Reklama pulisiz ketadi",
    description:
      "Yangi o'quvchi topish uchun har oy reklama to'laysiz, lekin natija kafolatlanmaydi. Pul ketadi, mijoz kelmaydi.",
    color: "from-red-500/20 to-red-500/5",
    iconColor: "text-red-400",
    borderColor: "border-red-500/20",
  },
  {
    icon: AlertTriangle,
    title: "Hamma narsa tarqoq",
    description:
      "Jadval, to'lov, davomat — hammasi boshqa-boshqa joyda. Excel, daftar, Telegram — boshingiz qotib ketadi.",
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20",
  },
  {
    icon: BarChart3,
    title: "Raqobatda orqadasiz",
    description:
      "Professional ko'rinish yo'q — websitesiz va tizimsizsiz. Raqobatchilar oldinga ketmoqda.",
    color: "from-orange-500/20 to-orange-500/5",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/20",
  },
];

export function Problems() {
  return (
    <SectionWrapper dark>
      <SectionHeading
        title="Bunga tanish bo'lsa..."
        subtitle="Ko'pchilik ta'lim bizneslari shu muammolarga duch keladi"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {problems.map((problem, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className={`group relative overflow-hidden rounded-2xl border ${problem.borderColor} bg-gradient-to-b ${problem.color} p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-black/20`}
          >
            {/* Icon */}
            <div
              className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/80 ${problem.iconColor}`}
            >
              <problem.icon size={24} />
            </div>

            {/* Content */}
            <h3 className="mb-3 text-xl font-bold text-foreground">
              {problem.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {problem.description}
            </p>

            {/* Decorative line */}
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-gold/40 via-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
