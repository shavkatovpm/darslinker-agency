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
  Shield,
  Clock,
  Zap,
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
          <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-gold/3 blur-[100px]" />
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

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button href="/contact" size="lg">
              Bepul konsultatsiya
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted"
          >
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-400" />
              Bepul konsultatsiya
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-gold" />
              24 soat ichida javob
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={14} className="text-blue-400" />
              10+ tayyor loyiha
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Problems */}
      <SectionWrapper dark>
        <SectionHeading
          title="Tanish muammolarmi?"
          subtitle="Ko'pchilik ta'lim bizneslari shu muammolarga duch keladi"
        />
        <div className="mx-auto max-w-2xl space-y-4">
          {service.problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex items-start gap-4 rounded-xl border border-red-500/10 bg-red-500/5 p-5"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                <AlertCircle size={16} className="text-red-400" />
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                {problem}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transition to solution */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-12 flex max-w-2xl flex-col items-center"
        >
          <div className="h-10 w-px bg-gradient-to-b from-red-500/30 to-gold/50" />
          <div className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
            <ArrowRight
              size={18}
              className="rotate-90 text-gold"
            />
          </div>
        </motion.div>

        {/* Solution — inline right after problems */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto mt-8 max-w-2xl"
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-gold/20 bg-gold/5 p-6 sm:p-8"
          >
            <div className="mb-3 flex items-center gap-2 text-gold">
              <CheckCircle2 size={20} />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Bizning yechim
              </span>
            </div>
            <p className="text-base leading-relaxed text-foreground/90">
              {service.solution}
            </p>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* Features */}
      <SectionWrapper>
        <SectionHeading
          title="Nimalar kiradi?"
          subtitle="Siz oladigan natija va imkoniyatlar"
          light
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-sm font-bold text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary">
                {String(index + 1).padStart(2, "0")}
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

      {/* Process */}
      <SectionWrapper dark>
        <SectionHeading
          title="Qanday ishlaydi?"
          subtitle="Oddiy 3 qadam — siz faqat birinchisini qilasiz"
        />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Bog'laning",
              desc: "Bepul konsultatsiya orqali ehtiyojlaringizni muhokama qilamiz",
            },
            {
              step: "02",
              title: "Biz ishlaymiz",
              desc: "Jamoa sizning loyihangizni professional darajada amalga oshiradi",
            },
            {
              step: "03",
              title: "Natija oling",
              desc: "Tayyor mahsulot + to'liq qo'llab-quvvatlash bilan topshiramiz",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative rounded-2xl border border-border/30 bg-white/[0.03] p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-lg font-extrabold text-gold">
                {item.step}
              </div>
              <h3 className="mb-2 text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {item.desc}
              </p>
              {index < 2 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-gold/30 md:block">
                  <ArrowRight size={20} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Mid CTA */}
      <section className="relative overflow-hidden bg-gold py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative mx-auto max-w-3xl px-4 text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-extrabold text-primary sm:text-3xl"
          >
            Hali ikkilanayapsizmi?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-3 text-base text-primary/70"
          >
            Birinchi konsultatsiya bepul. Hech qanday majburiyat yo&apos;q.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-6">
            <Button href="/contact" size="lg" className="!bg-primary !text-gold hover:!bg-primary/90">
              Bepul maslahat olish
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ */}
      <SectionWrapper>
        <SectionHeading
          title="Ko'p beriladigan savollar"
          subtitle="Javob topilmasa — biz bilan bog'laning"
          light
        />
        <FAQ items={service.faq} />
      </SectionWrapper>

      {/* Final CTA */}
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
            Bugun bog&apos;laning — ertaga natijaga qadam qo&apos;ying
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button href="/contact" size="lg">
              Ariza qoldirish
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-sm text-muted/60"
          >
            Bepul konsultatsiya · Majburiyatsiz · 24 soat ichida javob
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
