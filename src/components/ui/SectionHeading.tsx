"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
};

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-14 ${centered ? "text-center" : ""}`}>
      <motion.h2
        variants={fadeInUp}
        className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-primary" : "text-foreground"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className={`mt-4 max-w-2xl text-lg ${centered ? "mx-auto" : ""} ${
            light ? "text-primary/70" : "text-muted"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
