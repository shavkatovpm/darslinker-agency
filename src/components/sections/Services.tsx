"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/constants";
import { Globe, Database, Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const serviceIcons = {
  website: Globe,
  crm: Database,
  seo: Search,
};

export function Services() {
  return (
    <SectionWrapper id="xizmatlar">
      <SectionHeading
        title="Biz nima qilamiz"
        subtitle="Ta'lim biznesingiz uchun zarur bo'lgan barcha IT yechimlar"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => {
          const Icon =
            serviceIcons[service.slug as keyof typeof serviceIcons];
          return (
            <motion.div key={service.slug} variants={fadeInUp}>
              <Link
                href={`/xizmatlar/${service.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary">
                  <Icon size={26} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
                  {service.shortDesc}
                </p>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm font-semibold text-gold transition-all duration-300 group-hover:gap-3">
                  <span>Batafsil</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>

                {/* Hover glow */}
                <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gold/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
