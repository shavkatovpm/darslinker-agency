"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";
import { Send, Phone, CheckCircle2 } from "lucide-react";

const serviceOptions = [
  { value: "website", label: "Website ishlab chiqish" },
  { value: "crm", label: "CRM/ERP tizim" },
  { value: "seo", label: "SEO xizmati" },
  { value: "other", label: "Boshqa" },
];

export function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      center: (form.elements.namedItem("center") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      hp: (form.elements.namedItem("_hp_field") as HTMLInputElement).value,
    };

    if (data.hp) {
      setLoading(false);
      setSubmitted(true);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      alert("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="pt-24 pb-8 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Chap — sarlavha + kontakt */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Ariza qoldiring
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-2 sm:mt-5 max-w-md text-sm sm:text-lg text-muted"
            >
              O&apos;quv markazingiz uchun to&apos;g&apos;ri yechimni birgalikda topamiz.
            </motion.p>

            {/* Kontakt linklar — faqat desktop */}
            <motion.div variants={fadeInUp} className="mt-8 hidden lg:flex flex-wrap gap-3">
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-muted transition-all duration-300 hover:border-gold/30 hover:text-gold"
              >
                <Send size={14} />
                <span>Telegram</span>
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-muted transition-all duration-300 hover:border-gold/30 hover:text-gold"
              >
                <Phone size={14} />
                <span>{siteConfig.phone}</span>
              </a>
            </motion.div>

            {/* Qadamlar — faqat desktop */}
            <motion.div variants={fadeInUp} className="mt-10 lg:mt-24 space-y-6 lg:space-y-7 hidden lg:block">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold text-xl font-bold">1</div>
                <span className="text-xl text-foreground">Ariza qoldirasiz</span>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold text-xl font-bold">2</div>
                <span className="text-xl text-foreground">Tahlil qilamiz</span>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold text-xl font-bold">3</div>
                <span className="text-xl text-foreground">Yechim beramiz</span>
              </div>
            </motion.div>
          </motion.div>

          {/* O'ng — forma */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-12 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-foreground">
                  Arizangiz qabul qilindi!
                </h3>
                <p className="text-muted">
                  Tez orada siz bilan bog&apos;lanamiz
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 sm:p-8 space-y-3 sm:space-y-5"
              >
                <motion.div variants={fadeInUp}>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-foreground">
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    placeholder="Ismingizni kiriting"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-foreground placeholder:text-muted/50 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-foreground">
                    Telefon raqamingiz
                  </label>
                  <div className="flex rounded-xl border border-white/[0.08] transition-colors focus-within:border-gold/50 focus-within:ring-1 focus-within:ring-gold/20">
                    <span className="flex items-center rounded-l-xl bg-white/[0.06] px-4 text-sm text-muted border-r border-white/[0.08]">+998</span>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      required
                      maxLength={12}
                      placeholder="77 305 47 55"
                      onInput={(e) => {
                        const input = e.currentTarget;
                        let val = input.value.replace(/\D/g, "");
                        if (val.length > 2) val = val.slice(0, 2) + " " + val.slice(2);
                        if (val.length > 6) val = val.slice(0, 6) + " " + val.slice(6);
                        if (val.length > 9) val = val.slice(0, 9) + " " + val.slice(9);
                        input.value = val;
                      }}
                      className="w-full rounded-r-xl bg-white/[0.04] px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="contact-center" className="mb-2 block text-sm font-medium text-foreground">
                    O&apos;quv markazi nomi
                  </label>
                  <input
                    type="text"
                    id="contact-center"
                    name="center"
                    placeholder="Masalan: Najot Ta'lim"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-foreground placeholder:text-muted/50 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="contact-service" className="mb-2 block text-sm font-medium text-foreground">
                    Xizmat turi
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    required
                    className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 pr-10 text-foreground transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239a9a9a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                  >
                    <option value="" className="bg-[#2d2d2e]">Tanlang...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#2d2d2e]">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-foreground">
                    Xabaringiz
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    placeholder="Rejalaringiz haqida qisqacha yozing..."
                    className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-foreground placeholder:text-muted/50 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
                  />
                </motion.div>

                <div className="hidden" aria-hidden="true">
                  <input type="text" name="_hp_field" tabIndex={-1} autoComplete="off" />
                </div>

                <motion.div variants={fadeInUp}>
                  <Button type="submit" size="lg" className="w-full">
                    {loading ? "Yuborilmoqda..." : "Yuborish"}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
