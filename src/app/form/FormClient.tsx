"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Globe,
  GraduationCap,
  Package,
  Phone,
  PhoneCall,
  Rocket,
  Send,
  Store,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  getVisibleQuestions,
  type Answers,
  type FormQuestion,
} from "@/lib/formQuestions";
import { siteConfig } from "@/lib/constants";

/** Forma to'ldirgan mijozlar bevosita support bilan yozishadi (kanal emas) */
const supportTelegram = "https://t.me/darslinker_support";

/** Har bir savolning o'z ikonkasi — emoji o'rniga bir uslubdagi lucide ikonlar */
const questionIcons: Record<string, LucideIcon> = {
  category: Compass,
  edu_type: GraduationCap,
  edu_scale_tutor: Users,
  edu_scale_center: Users,
  edu_pain: AlertCircle,
  edu_services: Wrench,
  retail_channel: Store,
  retail_scale: Package,
  retail_pain: AlertCircle,
  retail_services: Wrench,
  service_type: Briefcase,
  service_scale: CalendarCheck,
  service_pain: AlertCircle,
  service_services: Wrench,
  other_type: Rocket,
  other_scale: Users,
  other_pain: AlertCircle,
  other_services: Wrench,
  presence: Globe,
  budget: Wallet,
  timeline: Clock,
};

/** Sarlavha ustidagi ikonka — oltin rangli yumshoq badge */
function StepIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="mb-[clamp(0.4rem,1.2vh,0.85rem)] inline-flex items-center justify-center rounded-xl border border-gold/25 bg-gold/[0.08] p-[clamp(0.4rem,1.1vh,0.65rem)] text-gold shadow-[0_0_24px_rgba(255,199,0,0.10)]">
      <Icon
        strokeWidth={1.75}
        className="h-[clamp(1.05rem,2.4vh,1.6rem)] w-[clamp(1.05rem,2.4vh,1.6rem)]"
      />
    </div>
  );
}

/**
 * O'lchamlar ekran balandligiga bog'langan (vh) — kichik telefonda siqiladi,
 * katta ekranda kattalashadi. Maqsad: scroll qilmasdan bitta ekranga sig'ishi.
 */
const sizing = {
  title: "text-[clamp(1.05rem,3vh,2rem)] font-bold leading-snug tracking-tight",
  subtitle: "text-[clamp(0.75rem,1.65vh,1rem)] text-muted",
  option: "px-[clamp(0.85rem,2.5vw,1.35rem)] py-[clamp(0.55rem,1.8vh,1.1rem)]",
  optionText: "text-[clamp(0.8rem,1.8vh,1.1rem)]",
  optionGap: "gap-[clamp(0.375rem,1.15vh,0.75rem)]",
  label: "text-[clamp(0.72rem,1.5vh,0.9rem)] font-medium text-foreground",
  // Diqqat: input matni 16px dan kichik bo'lsa iOS Safari fokusda avtomatik zoom qiladi.
  // Shuning uchun clamp minimumi aynan 1rem (16px).
  input: "px-4 py-[clamp(0.5rem,1.55vh,0.9rem)] text-[clamp(1rem,1.8vh,1.1rem)]",
  fieldGap: "gap-[clamp(0.45rem,1.35vh,1rem)]",
  headGap: "mb-[clamp(0.7rem,2vh,1.5rem)]",
};

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
  const question =
    currentStep === questions.length ? null : questions[currentStep];
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
    if (loading) return; // takroriy yuborishdan himoya
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

  const inputClass = `w-full rounded-xl border border-white/[0.08] bg-white/[0.04] ${sizing.input} text-foreground placeholder:text-muted/50 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20`;

  // ─────────────────────── Yakuniy ekran ───────────────────────
  if (submitted) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex w-full max-w-lg flex-col items-center rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] px-5 py-[clamp(1.5rem,5vh,3rem)] text-center"
        >
          <div className="mb-4 flex h-[clamp(3rem,7vh,4rem)] w-[clamp(3rem,7vh,4rem)] items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2
              className="h-1/2 w-1/2 text-emerald-400"
              strokeWidth={2}
            />
          </div>
          <h1 className={`mb-2 ${sizing.title} text-foreground`}>
            Arizangiz qabul qilindi!
          </h1>
          <p className={`max-w-sm ${sizing.subtitle}`}>
            Javoblaringizni ko&apos;rib chiqamiz va 24 soat ichida siz bilan
            bog&apos;lanib, mos yechim hamda taxminiy narxni aytamiz.
          </p>
          <div className="mt-[clamp(1rem,3vh,2rem)] flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
            <a
              href={supportTelegram}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] ${sizing.input} text-muted transition-all duration-300 hover:border-gold/30 hover:text-gold`}
            >
              <Send size={15} />
              Telegramda yozish
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className={`flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] ${sizing.input} text-muted transition-all duration-300 hover:border-gold/30 hover:text-gold`}
            >
              <Phone size={15} />
              {siteConfig.phone}
            </a>
          </div>
        </motion.div>
      </main>
    );
  }

  // ─────────────────────── Anketa ───────────────────────
  return (
    <main className="flex min-h-[100dvh] flex-col px-4 py-[clamp(0.75rem,2.5vh,2rem)] sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
        {/* Progress */}
        <div className="shrink-0">
          <div className="mb-2 flex items-center justify-between text-[clamp(0.7rem,1.5vh,0.875rem)] text-muted">
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

        {/* Savol / kontakt — ekran markazida */}
        <div className="flex flex-1 flex-col justify-center py-[clamp(0.75rem,2.5vh,2.5rem)]">
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
                  <div className={sizing.headGap}>
                    <StepIcon icon={questionIcons[question.id] ?? Compass} />
                    <h1 className={`${sizing.title} text-foreground`}>
                      {question.title}
                    </h1>
                    {question.subtitle && (
                      <p className={`mt-1 ${sizing.subtitle}`}>
                        {question.subtitle}
                      </p>
                    )}
                  </div>

                  <div className={`flex flex-col ${sizing.optionGap}`}>
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
                          className={`flex w-full items-center justify-between gap-3 rounded-xl border text-left transition-all duration-200 ${sizing.option} ${
                            selected
                              ? "border-gold/60 bg-gold/[0.08] text-foreground"
                              : "border-white/[0.08] bg-white/[0.04] text-muted"
                          } ${
                            blocked
                              ? "cursor-not-allowed opacity-40"
                              : "cursor-pointer hover:border-gold/30 hover:text-foreground"
                          }`}
                        >
                          <span className={sizing.optionText}>
                            {option.label}
                          </span>
                          <span
                            className={`flex h-[clamp(1.05rem,2.2vh,1.35rem)] w-[clamp(1.05rem,2.2vh,1.35rem)] shrink-0 items-center justify-center rounded-full border transition-colors ${
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
                    <div className="mt-[clamp(0.75rem,2vh,1.5rem)]">
                      <Button type="button" className="w-full" onClick={goNext}>
                        {multiHasSelection ? "Davom etish" : "O'tkazib yuborish"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={sizing.headGap}>
                    <StepIcon icon={PhoneCall} />
                    <h1 className={`${sizing.title} text-foreground`}>
                      Deyarli tayyor! Aloqa uchun ma&apos;lumot
                    </h1>
                    <p className={`mt-1 ${sizing.subtitle}`}>
                      Javoblaringiz asosida tayyor taklif bilan
                      bog&apos;lanamiz.
                    </p>
                  </div>

                  <div className={`flex flex-col ${sizing.fieldGap}`}>
                    <div>
                      <label
                        htmlFor="form-name"
                        className={`mb-1 block ${sizing.label}`}
                      >
                        Ismingiz *
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        required
                        placeholder="Ismingizni kiriting"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="form-phone"
                        className={`mb-1 block ${sizing.label}`}
                      >
                        Telefon raqamingiz *
                      </label>
                      <div className="flex rounded-xl border border-white/[0.08] transition-colors focus-within:border-gold/50 focus-within:ring-1 focus-within:ring-gold/20">
                        <span className="flex items-center rounded-l-xl border-r border-white/[0.08] bg-white/[0.06] px-3 text-[clamp(0.9rem,1.7vh,1rem)] text-muted">
                          +998
                        </span>
                        <input
                          type="tel"
                          id="form-phone"
                          name="phone"
                          required
                          inputMode="numeric"
                          maxLength={12}
                          placeholder="95 800 59 99"
                          onInput={(e) => {
                            const input = e.currentTarget;
                            let val = input.value.replace(/\D/g, "").slice(0, 9);
                            if (val.length > 2)
                              val = val.slice(0, 2) + " " + val.slice(2);
                            if (val.length > 6)
                              val = val.slice(0, 6) + " " + val.slice(6);
                            input.value = val;
                          }}
                          className={`w-full rounded-r-xl bg-white/[0.04] ${sizing.input} text-foreground placeholder:text-muted/50 focus:outline-none`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="form-center"
                        className={`mb-1 block ${sizing.label}`}
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
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="form-telegram"
                        className={`mb-1 block ${sizing.label}`}
                      >
                        Telegram username
                      </label>
                      <input
                        type="text"
                        id="form-telegram"
                        name="telegram"
                        placeholder="@username"
                        className={inputClass}
                      />
                    </div>
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
                    <p
                      className="mt-2 text-[clamp(0.72rem,1.5vh,0.875rem)] text-red-400"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <div className="mt-[clamp(0.75rem,2vh,1.5rem)]">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Yuborilmoqda..." : "Arizani yuborish"}
                    </Button>
                  </div>

                  <p className="mt-2 text-center text-[clamp(0.65rem,1.35vh,0.75rem)] text-muted/70">
                    Ma&apos;lumotlaringiz uchinchi shaxslarga berilmaydi.
                  </p>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
