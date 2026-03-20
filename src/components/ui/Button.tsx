"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  size?: "default" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-gold text-primary hover:bg-gold-hover shadow-[0_0_20px_rgba(255,199,0,0.15)] hover:shadow-[0_0_30px_rgba(255,199,0,0.3)]",
    outline:
      "border-2 border-gold/40 text-gold hover:border-gold hover:bg-gold/5",
  };

  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.98 }}>
        <Link href={href} className={combinedClass}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClass}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}
