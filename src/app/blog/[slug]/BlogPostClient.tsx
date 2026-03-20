"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  const processInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.*?)\*\*|\*(.*?)\*|\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      if (match[1]) {
        parts.push(
          <strong key={match.index} className="font-semibold text-foreground">
            {match[1]}
          </strong>
        );
      } else if (match[2]) {
        parts.push(
          <em key={match.index} className="italic">
            {match[2]}
          </em>
        );
      } else if (match[3] && match[4]) {
        parts.push(
          <Link
            key={match.index}
            href={match[4]}
            className="font-medium text-gold underline decoration-gold/30 underline-offset-4 transition-colors hover:text-gold/80"
          >
            {match[3]}
          </Link>
        );
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="my-6 space-y-3 pl-6"
        >
          {listItems.map((item, i) => (
            <li
              key={i}
              className="relative text-muted before:absolute before:-left-5 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-gold"
            >
              {processInline(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
    inList = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={i}
          className="mt-10 mb-4 text-xl font-bold text-foreground"
        >
          {processInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={i}
          className="mt-12 mb-5 text-2xl font-bold text-foreground"
        >
          {processInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      inList = true;
      listItems.push(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      inList = true;
      listItems.push(line.replace(/^\d+\.\s/, ""));
    } else if (line === "---") {
      flushList();
      elements.push(
        <hr key={i} className="my-10 border-border/50" />
      );
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={i} className="my-5 text-base leading-relaxed text-muted">
          {processInline(line)}
        </p>
      );
    }
  }
  flushList();

  return elements;
}

export function BlogPostClient({ post }: { post: BlogPost }) {
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
          className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={fadeInUp}>
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
            >
              <ArrowLeft size={16} />
              Blogga qaytish
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              {post.category}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-extrabold leading-[1.2] tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            {post.title}
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="mt-6 flex items-center gap-6 text-sm text-muted"
          >
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString("uz-UZ", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="bg-card py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
        >
          <article className="prose-custom">
            {renderMarkdown(post.content)}
          </article>

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center sm:p-12">
            <h3 className="mb-3 text-xl font-bold text-foreground">
              Biznesingizni o&apos;stirishga tayyormisiz?
            </h3>
            <p className="mb-6 text-sm text-muted">
              Bepul konsultatsiya oling — sizga eng mos yechimni taklif
              etamiz
            </p>
            <Button href="/kontakt">
              Bog&apos;lanish
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
