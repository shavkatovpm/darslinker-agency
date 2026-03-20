"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const serviceOptions = [
  { value: "website", label: "Website yaratish" },
  { value: "crm", label: "CRM tizim" },
  { value: "seo", label: "SEO xizmati" },
  { value: "other", label: "Boshqa" },
];

export function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // TODO: Telegram bot integratsiyasi keyinroq qo'shiladi
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setSubmitted(true);
  }

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
            <span>Bepul konsultatsiya</span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Bog&apos;laning
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-lg text-muted"
          >
            Biznesingiz uchun eng mos yechimni birga topamiz
          </motion.p>
        </motion.div>
      </section>

      {/* Form + Contact Info */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-3"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-12 text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-foreground">
                    Xabaringiz qabul qilindi!
                  </h3>
                  <p className="text-muted">
                    Tez orada siz bilan bog&apos;lanamiz
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={fadeInUp}>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Ismingiz
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Ismingizni kiriting"
                      className="w-full rounded-xl border border-border/50 bg-primary/50 px-5 py-4 text-foreground placeholder:text-muted/50 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Telefon raqamingiz
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="+998 90 123 45 67"
                      className="w-full rounded-xl border border-border/50 bg-primary/50 px-5 py-4 text-foreground placeholder:text-muted/50 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label
                      htmlFor="service"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Xizmat turi
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full rounded-xl border border-border/50 bg-primary/50 px-5 py-4 text-foreground transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
                    >
                      <option value="">Tanlang...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Xabaringiz
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Loyihangiz haqida qisqacha yozing..."
                      className="w-full resize-none rounded-xl border border-border/50 bg-primary/50 px-5 py-4 text-foreground placeholder:text-muted/50 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
                    />
                  </motion.div>

                  {/* Honeypot */}
                  <div className="hidden">
                    <input type="text" name="website" tabIndex={-1} />
                  </div>

                  <motion.div variants={fadeInUp}>
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      {loading ? "Yuborilmoqda..." : "Yuborish"}
                    </Button>
                  </motion.div>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6 lg:col-span-2"
            >
              <motion.div variants={fadeInUp}>
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  Boshqa yo&apos;llar
                </h3>
              </motion.div>

              {/* Telegram */}
              <motion.a
                variants={fadeInUp}
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border/50 bg-primary/50 p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary">
                  <Send size={22} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Telegram</div>
                  <div className="text-sm text-muted">
                    Tez javob — Telegram orqali
                  </div>
                </div>
              </motion.a>

              {/* Phone */}
              <motion.a
                variants={fadeInUp}
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 rounded-xl border border-border/50 bg-primary/50 p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Telefon</div>
                  <div className="text-sm text-muted">{siteConfig.phone}</div>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                variants={fadeInUp}
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-4 rounded-xl border border-border/50 bg-primary/50 p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <div className="text-sm text-muted">{siteConfig.email}</div>
                </div>
              </motion.a>

              {/* Address */}
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-4 rounded-xl border border-border/50 bg-primary/50 p-5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Manzil</div>
                  <div className="text-sm text-muted">
                    Toshkent, O&apos;zbekiston
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
