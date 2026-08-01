"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, CheckCircle2, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  getVisibleQuestions,
  type Answers,
  type FormQuestion,
} from "@/lib/formQuestions";
import { siteConfig } from "@/lib/constants";

/** Forma orqali kelgan mijozlar uchun alohida raqam (Telegram Ads oqimi) */
const formPhone = "+998 95 800 59 99";

export function FormClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState("");
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reklama manbasini aniqlash (utm_source=telegram_ads va h.k.)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = [
      params.get("utm_source"),
      params.get("utm_medium"),
      params.get("utm_campaign"),
    ]
      .filter(Boolean)
      .join(" / ");
    setSource(utm || document.referrer || "to'g'ridan-to'g'ri");
  }, []);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  // Ko'rinadigan savollar javoblarga qarab o'zgaradi (branching)
  const questions = useMemo(() => getVisibleQuestions(answers), [answers]);
  const totalSteps = questions.length + 1; // savollar + kontakt qadami

  // Oldingi javob o'zgarganda ro'yxat qisqarishi mumkin — qadamni chegarada ushlaymiz
  const currentStep = Math.min(step, questions.length);
  const question = currentStep === questions.length ? null : questions[currentStep];
  const progress = Math.round((currentStep / totalSteps) * 100);

  function goNext() {
    setStep((s) => s + 1);
  }

  function goBack() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setStep(Math.max(currentStep - 1, 0));
  }

  function selectSingle(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(goNext, 280);
  }

  function toggleMulti(target: FormQuestion, value: string) {
    setAnswers((prev) => {
      const current = Array.isArray(prev[target.id])
        ? (prev[target.id] as string[])
        : [];

      if (current.includes(value)) {
        return { ...prev, [target.id]: current.filter((v) => v !== value) };
      }
      // Limitga yetgan bo'lsa — yangi tanlov qabul qilinmaydi
      if (target.maxSelect && current.length >= target.maxSelect) return prev;

      return { ...prev, [target.id]: [...current, value] };
    });
  }

  function isSelected(questionId: string, value: string) {
    const answer = answers[questionId];
    return Array.isArray(answer) ? answer.includes(value) : answer === value;
  }

  const selectedCount =
    question && Array.isArray(answers[question.id])
      ? (answers[question.id] as string[]).length
      : 0;
  const multiHasSelection = question?.type === "multi" && selectedCount > 0;
  const limitReached =
    question?.type === "multi" &&
    question.maxSelect !== undefined &&
    selectedCount >= question.maxSelect;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("_hp_field") as HTMLInputElement)
      .value;
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    const phone = (
      form.elements.namedItem("phone") as HTMLInputElement
    ).value.replace(/\D/g, "");

    if (phone.length !== 9) {
      setError("Telefon raqamni to'liq kiriting (9 ta raqam)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          name: (form.elements.namedItem("name") as HTMLInputElement).value,
          phone,
          center: (form.elements.namedItem("center") as HTMLInputElement).value,
          telegram: (form.elements.namedItem("telegram") as HTMLInputElement)
            .value,
          source,
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="pt-24 pb-16 md:py-32">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 text-center sm:p-12"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 size={32} className="text-emerald-400" />
            </div>
            <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Arizangiz qabul qilindi!
            </h1>
            <p className="max-w-md text-muted">
              Javoblaringizni ko&apos;rib chiqamiz va 24 soat ichida siz bilan
              bog&apos;lanib, mos yechim hamda taxminiy narxni aytamiz.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm text-muted transition-all duration-300 hover:border-gold/30 hover:text-gold"
              >
                <Send size={15} />
                Telegram kanalimiz
              </a>
              <a
                href={`tel:${formPhone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm text-muted transition-all duration-300 hover:border-gold/30 hover:text-gold"
              >
                <Phone size={15} />
                {formPhone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 md:py-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm text-muted">
            <button
              type="button"
              onClick={goBack}
              disabled={currentStep === 0}
              className="flex items-center gap-1.5 transition-colors hover:text-gold disabled:pointer-events-none disabled:opacity-0"
            >
              <ArrowLeft size={15} />
              Orqaga
            </button>
            <span className="font-medium">
              {currentStep + 1} / {totalSteps}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gold"
              initial={false}
              animate={{ width: `${Math.max(progress, 6)}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question ? question.id : "contact"}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {question ? (
              <div>
                <div className="mb-1 text-2xl">{question.emoji}</div>
                <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {question.title}
                </h1>
                {question.subtitle && (
                  <p className="mt-2 text-sm text-muted sm:text-base">
                    {question.subtitle}
                  </p>
                )}

                <div className="mt-6 space-y-3">
                  {question.options.map((option) => {
                    const selected = isSelected(question.id, option.value);
                    const blocked = !selected && limitReached;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={blocked}
                        onClick={() =>
                          question.type === "single"
                            ? selectSingle(question.id, option.value)
                            : toggleMulti(question, option.value)
                        }
                        className={`flex w-full items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left transition-all duration-200 ${
                          selected
                            ? "border-gold/60 bg-gold/[0.08] text-foreground"
                            : "border-white/[0.08] bg-white/[0.04] text-muted"
                        } ${
                          blocked
                            ? "cursor-not-allowed opacity-40"
                            : "cursor-pointer hover:border-gold/30 hover:text-foreground"
                        }`}
                      >
                        <span className="text-sm sm:text-base">
                          {option.label}
                        </span>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            selected
                              ? "border-gold bg-gold text-primary"
                              : "border-white/20"
                          }`}
                        >
                          {selected && <Check size={12} strokeWidth={3} />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {question.type === "multi" && (
                  <div className="mt-6">
                    <Button
                      type="button"
                      size="lg"
                      className="w-full"
                      onClick={goNext}
                    >
                      {multiHasSelection ? "Davom etish" : "O'tkazib yuborish"}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-1 text-2xl">📞</div>
                <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Deyarli tayyor! Aloqa uchun ma&apos;lumot
                </h1>
                <p className="!mt-2 text-sm text-muted sm:text-base">
                  Javoblaringiz asosida tayyor taklif bilan bog&apos;lanamiz.
                </p>

                <div className="!mt-6">
                  <label
                    htmlFor="form-name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Ismingiz *
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    required
                    placeholder="Ismingizni kiriting"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-foreground placeholder:text-muted/50 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="form-phone"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Telefon raqamingiz *
                  </label>
                  <div className="flex rounded-xl border border-white/[0.08] transition-colors focus-within:border-gold/50 focus-within:ring-1 focus-within:ring-gold/20">
                    <span className="flex items-center rounded-l-xl border-r border-white/[0.08] bg-white/[0.06] px-4 text-sm text-muted">
                      +998
                    </span>
                    <input
                      type="tel"
                      id="form-phone"
                      name="phone"
                      required
                      inputMode="numeric"
                      maxLength={12}
                      placeholder="77 488 82 80"
                      onInput={(e) => {
                        const input = e.currentTarget;
                        let val = input.value.replace(/\D/g, "").slice(0, 9);
                        if (val.length > 2)
                          val = val.slice(0, 2) + " " + val.slice(2);
                        if (val.length > 6)
                          val = val.slice(0, 6) + " " + val.slice(6);
                        if (val.length > 9)
                          val = val.slice(0, 9) + " " + val.slice(9);
                        input.value = val;
                      }}
                      className="w-full rounded-r-xl bg-white/[0.04] px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="form-center"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    {answers.category === "edu"
                      ? "O'quv markaz / brend nomi"
                      : "Kompaniya / brend nomi"}
                  </label>
                  <input
                    type="text"
                    id="form-center"
                    name="center"
                    placeholder={
                      answers.category === "edu"
                        ? "Masalan: Najot Ta'lim"
                        : "Masalan: Korzinka"
                    }
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-foreground placeholder:text-muted/50 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="form-telegram"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Telegram username
                  </label>
                  <input
                    type="text"
                    id="form-telegram"
                    name="telegram"
                    placeholder="@username"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-foreground placeholder:text-muted/50 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
                  />
                </div>

                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="_hp_field"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}

                <div className="!mt-6">
                  <Button type="submit" size="lg" className="w-full">
                    {loading ? "Yuborilmoqda..." : "Arizani yuborish"}
                  </Button>
                </div>

                <p className="!mt-3 text-center text-xs text-muted/70">
                  Ma&apos;lumotlaringiz uchinchi shaxslarga berilmaydi.
                </p>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
