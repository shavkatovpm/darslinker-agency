"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { stats } from "@/lib/constants";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-gold py-20 md:py-24">
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #232324 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-primary/70 sm:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
