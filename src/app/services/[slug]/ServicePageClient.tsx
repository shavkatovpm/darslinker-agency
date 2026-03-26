"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

type Service = {
  slug: string;
  title: string;
  heroTitle: string;
  heroDesc: string;
  problems: string[];
  solution: string;
  features: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
};

export function ServicePageClient({ service }: { service: Service }) {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center overflow-hidden bg-primary pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-sm text-gold"
          >
            <Sparkles size={14} />
            <span>{service.title}</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {service.heroTitle}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted"
          >
            {service.heroDesc}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-8">
            <Button href="/contact" size="lg">
              Bepul konsultatsiya
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Problems */}
      <SectionWrapper dark>
        <SectionHeading title="Bunga tanish bo'lsa..." />
        <div className="mx-auto max-w-2xl space-y-4">
          {service.problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex items-start gap-4 rounded-xl border border-red-500/10 bg-red-500/5 p-5"
            >
              <AlertCircle
                size={22}
                className="mt-0.5 shrink-0 text-red-400"
              />
              <p className="text-sm leading-relaxed text-foreground/80">
                {problem}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Solution */}
      <SectionWrapper>
        <SectionHeading
          title="Bizning yechimimiz"
          subtitle={service.solution}
        />
      </SectionWrapper>

      {/* Features */}
      <SectionWrapper dark>
        <SectionHeading title="Imkoniyatlar" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group rounded-2xl border border-border/50 bg-primary/50 p-7 transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary">
                <CheckCircle2 size={22} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper>
        <SectionHeading
          title="Ko'p beriladigan savollar"
          subtitle="Eng ko'p so'raladigan savollarga javoblar"
        />
        <FAQ items={service.faq} />
      </SectionWrapper>

      {/* CTA */}
      <section className="relative overflow-hidden bg-card py-24">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative mx-auto max-w-3xl px-4 text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-extrabold text-foreground sm:text-4xl"
          >
            Tayyor boshlashga?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg text-muted"
          >
            Bepul demo yoki maslahat olish uchun bog&apos;laning
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8">
            <Button href="/contact" size="lg">
              Demo olish
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
