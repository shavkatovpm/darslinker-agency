"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";
import { ArrowRight, Send, Phone } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[150px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          Biznesingizni o&apos;stirishga{" "}
          <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
            tayyormisiz?
          </span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-6 max-w-xl text-lg text-muted"
        >
          Bepul konsultatsiya oling. Biznesingizni tahlil qilamiz va eng
          mos yechimni taklif etamiz.
        </motion.p>

        <motion.div
          variants={fadeIn}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="/kontakt" size="lg">
            Hoziroq bog&apos;laning
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </motion.div>

        {/* Contact info */}
        <motion.div
          variants={fadeIn}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted"
        >
          <a
            href={siteConfig.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-gold"
          >
            <Send size={16} />
            <span>Telegram</span>
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 transition-colors hover:text-gold"
          >
            <Phone size={16} />
            <span>{siteConfig.phone}</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
