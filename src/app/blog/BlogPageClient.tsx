"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Clock, Calendar, ArrowUpRight, Sparkles } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

type Props = {
  posts: BlogPost[];
  categories: string[];
};

export function BlogPageClient({ posts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("Barchasi");

  const filtered =
    activeCategory === "Barchasi"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
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
            <span>Foydali maqolalar</span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Blog
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-lg text-muted"
          >
            Ta&apos;lim biznesi uchun foydali maslahatlar va qo&apos;llanmalar
          </motion.p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                variants={fadeInUp}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gold text-primary shadow-lg shadow-gold/20"
                    : "border border-border/50 text-muted hover:border-gold/30 hover:text-foreground"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Posts Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((post) => (
              <motion.div key={post.slug} variants={fadeInUp}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-primary/50 transition-all duration-500 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1"
                >
                  {/* Category badge */}
                  <div className="p-7 pb-0">
                    <span className="inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-7 pt-4">
                    <h2 className="mb-3 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-gold">
                      {post.title}
                    </h2>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted/60">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(post.date).toLocaleDateString("uz-UZ", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-muted transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted">
              Bu kategoriyada hozircha maqola yo&apos;q
            </div>
          )}
        </div>
      </section>
    </>
  );
}
