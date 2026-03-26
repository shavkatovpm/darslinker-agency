"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import {
  DollarSign,
  AlertTriangle,
  BarChart3,
  Globe,
  Database,
  Search,
  ArrowRight,
  X,
  Check,
} from "lucide-react";
import Link from "next/link";

const items = [
  {
    problem: {
      icon: DollarSign,
      title: "Reklama pulisiz ketadi",
      desc: "Har oy reklama to'laysiz, lekin natija kafolatlanmaydi",
    },
    solution: {
      icon: Search,
      title: "SEO",
      desc: "Google'da topga chiqing, doimiy organik mijozlar oling",
      href: "/xizmatlar/seo",
    },
  },
  {
    problem: {
      icon: AlertTriangle,
      title: "Hamma narsa tarqoq",
      desc: "Jadval, to'lov, davomat — boshqa-boshqa joyda, bosh qotadi",
    },
    solution: {
      icon: Database,
      title: "CRM/ERP tizim",
      desc: "O'quvchi, to'lov, jadval — barchasi bir tizimda",
      href: "/xizmatlar/crm",
    },
  },
  {
    problem: {
      icon: BarChart3,
      title: "Raqobatda orqadasiz",
      desc: "Professional ko'rinish yo'q, websitesiz raqobatchilardan orqada",
    },
    solution: {
      icon: Globe,
      title: "Website yaratish",
      desc: "Konversiya qiladigan professional website",
      href: "/xizmatlar/website",
    },
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function ProblemsAndSolutions() {
  return (
    <SectionWrapper id="xizmatlar">
      <div className="mx-auto max-w-3xl text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
        >
          Muammoni bilamiz.{" "}
          <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
            Yechimni beramiz.
          </span>
        </motion.h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-4 sm:space-y-5"
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
          >
            {/* Mobile: bitta karta ichida muammo + yechim */}
            <div className="md:hidden">
              <Link
                href={item.solution.href}
                className="group/card relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.07]"
              >
                {/* Muammo */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                    <X size={14} className="text-red-400" />
                  </div>
                  <p className="text-sm text-muted line-through decoration-red-400/40">
                    {item.problem.desc}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-3 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border/50" />
                  <ArrowRight size={14} className="text-gold rotate-90" />
                  <div className="h-px flex-1 bg-border/50" />
                </div>

                {/* Yechim */}
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                    <Check size={14} className="text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-foreground">
                      {item.solution.title}
                    </span>
                    <span className="text-sm text-gold"> — </span>
                    <span className="text-sm text-muted">
                      {item.solution.desc}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop: chapda muammo, o'q, o'ngda yechim */}
            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
              {/* Muammo */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.07]">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    <item.problem.icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <X size={14} className="text-red-400 shrink-0" />
                      <h3 className="text-lg font-bold text-foreground">
                        {item.problem.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.problem.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* O'q */}
              <div className="flex items-center justify-center mx-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <ArrowRight size={18} />
                </div>
              </div>

              {/* Yechim */}
              <Link
                href={item.solution.href}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-gold/[0.04]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary">
                    <item.solution.icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Check size={14} className="text-emerald-400 shrink-0" />
                      <h3 className="text-lg font-bold text-foreground">
                        {item.solution.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.solution.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
