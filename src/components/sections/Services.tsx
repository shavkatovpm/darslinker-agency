"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Globe, Database, Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Website ishlab chiqish",
    price: "$250",
    desc: "Konversiya qiladigan professional website. Mobile-first dizayn, SEO optimizatsiya, tez yuklanish.",
    features: [
      "Responsive dizayn",
      "SEO optimizatsiya",
      "Kontakt forma integratsiya",
      "Admin panel",
    ],
    href: "/services/website",
  },
  {
    icon: Database,
    title: "CRM/ERP tizim",
    price: "$650",
    desc: "O'quvchi, to'lov, jadval, davomat — barchasi bir tizimda. Biznesingizni avtomatlashtiring.",
    features: [
      "O'quvchi bazasi",
      "To'lov monitoring",
      "Dars jadvali",
      "Hisobotlar va statistika",
    ],
    href: "/services/crm",
  },
  {
    icon: Search,
    title: "Google SEO",
    price: "$250",
    desc: "Google'da birinchi sahifaga chiqing. Doimiy organik mijozlar oqimi, reklama xarajatlarisiz.",
    features: [
      "Kalit so'z tahlili",
      "On-page SEO",
      "Kontent strategiya",
      "Oylik hisobot",
    ],
    href: "/services/seo",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Services() {
  return (
    <SectionWrapper id="services">
      <div className="mx-auto max-w-3xl text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
        >
          Xizmatlarimiz
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-muted text-base sm:text-lg"
        >
          To&apos;g&apos;ri strategiya, barqaror natija
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-5 sm:gap-6 md:grid-cols-3"
      >
        {services.map((service) => (
          <motion.div key={service.title} variants={cardVariants} className={service.title === "CRM/ERP tizim" ? "-order-1 md:order-none" : ""}>
            <Link
              href={service.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8 transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-gold/[0.04] hover:-translate-y-1"
            >

              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary">
                <service.icon size={24} />
              </div>

              {/* Title + Price */}
              <h3 className="text-xl font-bold text-foreground mb-1">
                {service.title}
              </h3>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-gold">
                  {service.price}
                </span>
                <span className="text-sm text-muted">dan</span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted mb-6">
                {service.desc}
              </p>

              {/* Features */}
              <ul className="mb-6 flex-1 space-y-2.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground/80">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-emerald-400">
                        <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-semibold text-gold transition-all duration-300 group-hover:gap-3">
                <span>Batafsil</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
