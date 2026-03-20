"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { portfolioItems } from "@/lib/constants";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";

export function PortfolioPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center overflow-hidden bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
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
            <span>Bizning ishlarimiz</span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Hamkor brendlar
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-lg text-muted"
          >
            Biz bilan ishlagan ta&apos;lim brendlari
          </motion.p>
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      <SectionWrapper dark>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <motion.a
              key={index}
              variants={fadeInUp}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-primary/50 p-12 transition-all duration-500 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1"
            >
              {/* Placeholder logo */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gold/10 text-3xl font-bold text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary">
                {item.name.charAt(0)}
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {item.name}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-gold">
                <span>Saytga o&apos;tish</span>
                <ExternalLink size={14} />
              </div>
            </motion.a>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary py-24">
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
            Keyingi loyiha sizniki bo&apos;lsin
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg text-muted"
          >
            Biznesingiz uchun professional IT yechim yaratamiz
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8">
            <Button href="/kontakt" size="lg">
              Loyihani boshlash
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
