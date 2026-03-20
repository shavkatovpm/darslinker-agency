"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-primary">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mx-auto max-w-lg px-4 text-center"
      >
        <motion.div
          variants={fadeInUp}
          className="mb-6 text-8xl font-extrabold bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent"
        >
          404
        </motion.div>
        <motion.h1
          variants={fadeInUp}
          className="mb-4 text-2xl font-bold text-foreground"
        >
          Sahifa topilmadi
        </motion.h1>
        <motion.p variants={fadeInUp} className="mb-8 text-muted">
          Kechirasiz, siz izlayotgan sahifa mavjud emas yoki
          ko&apos;chirilgan.
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Button href="/">
            <ArrowLeft size={18} className="mr-2" />
            Bosh sahifaga qaytish
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
