"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Send } from "lucide-react";
import {
  visibleOf,
  type Answers,
  type FormQuestion,
} from "@/lib/formQuestions";
import { getAdQuestions, plannedSteps } from "@/lib/adQuestions";
import { themeVars, type AdTheme } from "@/lib/adThemes";
import { trackLead } from "@/lib/tgPixel";
import { CreativeArt } from "./CreativeArt";

const supportTelegram = "https://t.me/darslinker_support";

/** Kreativdagi aksent so'z — har bir kreativda o'z ko'rinishi bor */
function AccentWord({ theme }: { theme: AdTheme }) {
  const word = theme.titleAccent;

  if (theme.accentStyle === "pill") {
    return (
      <span className="mt-1 inline-block rounded-2xl bg-[var(--ad-accent)] px-[0.4em] py-[0.05em] text-[var(--ad-on-accent)]">
        {word}
      </span>
    );
  }
  if (theme.accentStyle === "glow") {
    return (
      <span className="text-[var(--ad-accent)] [text-shadow:0_0_40px_var(--ad-glow)]">
        {word}
      </span>
    );
  }
  if (theme.accentStyle === "script") {
    return (
      <span className="font-serif text-[0.85em] italic text-[var(--ad-accent)]">
        {word}
      </span>
    );
  }
  return <span className="text-[var(--ad-accent)]">{word}</span>;
}

export function AdFormClient({ theme }: { theme: AdTheme }) {
  // Savollar shu yerda olinadi: ular ichida `showIf` funksiyalari bor va
  // server komponentidan prop sifatida uzatilmaydi (serializatsiya qilinmaydi)
  const allQuestions = useMemo(
    () => getAdQuestions(theme.slug) ?? [],
    [theme.slug]
  );

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState(theme.source);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reklama manbasi: kreativ kodi + kampaniya parametrlari
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = [
      params.get("utm_source"),
      params.get("utm_medium"),
      params.get("utm_campaign"),
    ]
      .filter(Boolean)
      .join(" / ");
    setSource(utm ? `${theme.source} · ${utm}` : theme.source);
  }, [theme.source]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const questions = useMemo(
    () => visibleOf(allQuestions, answers),
    [allQuestions, answers]
  );
  const totalSteps = Math.max(questions.length + 1, plannedSteps(theme.slug));
  const currentStep = Math.min(step, questions.length);
  const question =
    currentStep === questions.length ? null : questions[currentStep];
  const progress = Math.round((currentStep / totalSteps) * 100);

  function goNext() {
    setStep((s) => s + 1);
  }

  function goBack() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (currentStep === 0) {
      setStarted(false);
      return;
    }
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
  const limitReached =
    question?.type === "multi" &&
    question.maxSelect !== undefined &&
    selectedCount >= question.maxSelect;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError(null);

    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("_hp_field") as HTMLInputElement).value;
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
          creative: theme.slug,
          answers,
          name: (form.elements.namedItem("name") as HTMLInputElement).value,
          phone,
          telegram: (form.elements.namedItem("telegram") as HTMLInputElement).value,
          source,
        }),
      });
      if (!res.ok) throw new Error();
      trackLead();
      setSubmitted(true);
    } catch {
      setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  }

  const shell =
    "relative flex min-h-[100dvh] flex-col overflow-hidden bg-[var(--ad-bg)] text-[var(--ad-text)]";
  const glow =
    "pointer-events-none absolute -top-[20vh] right-[-15vw] h-[70vh] w-[70vh] rounded-full blur-3xl";
  const inputClass =
    "w-full rounded-xl border border-[var(--ad-border)] bg-[var(--ad-surface)] px-4 py-[clamp(0.6rem,1.7vh,1rem)] text-[clamp(1rem,1.95vh,1.15rem)] text-[var(--ad-text)] outline-none transition-colors placeholder:opacity-40 focus:border-[var(--ad-accent)]";
  const accentButton =
    "flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--ad-accent)] px-6 py-[clamp(0.75rem,2.2vh,1.15rem)] text-[clamp(0.95rem,2vh,1.15rem)] font-semibold text-[var(--ad-on-accent)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60";

  /* ─────────────────── Yakuniy ekran ─────────────────── */
  if (submitted) {
    return (
      <main style={themeVars(theme)} className={`${shell} items-center justify-center px-4 py-8`}>
        <div className={glow} style={{ background: "var(--ad-glow)" }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex w-full max-w-lg flex-col items-center rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-surface)] px-6 py-[clamp(1.75rem,5vh,3rem)] text-center"
        >
          <div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "var(--ad-accent-soft)" }}
          >
            <CheckCircle2 className="h-7 w-7 text-[var(--ad-accent)]" strokeWidth={2} />
          </div>
          <h1 className="mb-2 text-[clamp(1.25rem,3.4vh,2rem)] font-bold">
            Arizangiz qabul qilindi!
          </h1>
          <p className="max-w-md text-[clamp(0.95rem,2vh,1.2rem)] leading-relaxed text-[var(--ad-muted)]">
            Tez orada siz bilan <span className="font-semibold text-[var(--ad-text)]">Darslinker</span> jamoasi
            nomidan bog&apos;lanamiz. Savolingiz bo&apos;lsa, Telegram orqali
            yozib qo&apos;yishingiz mumkin.
          </p>
          <div className="mt-6 w-full sm:w-auto">
            <a
              href={supportTelegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--ad-accent)] px-10 py-3.5 text-[clamp(0.95rem,2vh,1.1rem)] font-semibold text-[var(--ad-on-accent)] transition-transform hover:scale-[1.02]"
            >
              <Send size={17} />
              Telegramda yozish
            </a>
          </div>
        </motion.div>
      </main>
    );
  }

  /* ─────────────────── Hook ekrani ─────────────────── */
  if (!started) {
    return (
      <main style={themeVars(theme)} className={`${shell} px-5 pb-10 sm:px-8`}>
        <CreativeArt theme={theme} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-start pt-6 pb-[40vh] md:justify-center md:pt-0 md:pb-0"
        >
          <div className="md:max-w-[50%]">
            {theme.eyebrow && (
              <p className="mb-3 text-[clamp(0.85rem,1.9vh,1.05rem)] font-bold uppercase tracking-[0.2em] text-[var(--ad-muted)]">
                {theme.eyebrow}
              </p>
            )}

            <h1 className="text-[clamp(2rem,6.2vh,3.6rem)] font-extrabold leading-[1.06] tracking-tight">
              {theme.titleLead} <AccentWord theme={theme} />
              {theme.titleTail ? <> {theme.titleTail}</> : null}
            </h1>

            <div className="mt-6 h-[3px] w-20 rounded-full bg-[var(--ad-accent)]" />

            <p className="mt-6 max-w-md text-[clamp(1.05rem,2.3vh,1.3rem)] leading-relaxed text-[var(--ad-muted)]">
              {theme.subtitle}
            </p>

            <button
              type="button"
              onClick={() => setStarted(true)}
              className={`${accentButton} mt-8 sm:w-auto sm:px-12`}
            >
              Boshlash
              <ArrowRight size={20} />
            </button>

            <p className="mt-4 text-[clamp(0.9rem,1.9vh,1.05rem)] text-[var(--ad-muted)]">
              {totalSteps} ta savol · bir daqiqa · bepul konsultatsiya
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  /* ─────────────────── Anketa ─────────────────── */
  return (
    <main style={themeVars(theme)} className={`${shell} px-4 py-[clamp(0.5rem,2vh,1.75rem)] sm:px-6`}>
      <CreativeArt theme={theme} compact />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col md:mx-0 md:ml-[5vw] md:max-w-xl">
        <div className="shrink-0">
          <div className="mb-2 flex items-center justify-between text-[clamp(0.75rem,1.6vh,0.95rem)] text-[var(--ad-muted)]">
            <button
              type="button"
              onClick={goBack}
              className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-[var(--ad-accent)]"
            >
              <ArrowLeft size={15} />
              Orqaga
            </button>
            <span className="font-medium">
              {currentStep + 1} / {totalSteps}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--ad-accent-soft)" }}>
            <motion.div
              className="h-full rounded-full bg-[var(--ad-accent)]"
              initial={false}
              animate={{ width: `${Math.max(progress, 6)}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-start pt-[clamp(0.75rem,2.5vh,2rem)] pb-[clamp(0.5rem,1.5vh,1.5rem)]">
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
                  <div className="mb-[clamp(0.6rem,1.8vh,1.35rem)]">
                    <h2 className="text-[clamp(1.15rem,3.2vh,2.1rem)] font-bold leading-snug tracking-tight">
                      {question.title}
                    </h2>
                    {question.subtitle && (
                      <p className="mt-1 text-[clamp(0.95rem,2vh,1.2rem)] text-[var(--ad-muted)]">
                        {question.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-[clamp(0.35rem,1.15vh,0.8rem)]">
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
                          style={
                            selected
                              ? { background: "var(--ad-accent-soft)", borderColor: "var(--ad-accent)" }
                              : { background: "var(--ad-surface)" }
                          }
                          className={`flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--ad-border)] px-[clamp(0.9rem,2.5vw,1.5rem)] py-[clamp(0.6rem,2.2vh,1.25rem)] text-left text-[clamp(0.95rem,2.4vh,1.3rem)] transition-all duration-200 ${
                            blocked
                              ? "cursor-not-allowed opacity-40"
                              : "cursor-pointer hover:border-[var(--ad-accent)]"
                          }`}
                        >
                          <span>{option.label}</span>
                          <span
                            className="flex h-[clamp(1.15rem,2.5vh,1.6rem)] w-[clamp(1.15rem,2.5vh,1.6rem)] shrink-0 items-center justify-center rounded-full border transition-colors"
                            style={
                              selected
                                ? {
                                    background: "var(--ad-accent)",
                                    borderColor: "var(--ad-accent)",
                                    color: "var(--ad-on-accent)",
                                  }
                                : { borderColor: "var(--ad-border)" }
                            }
                          >
                            {selected && <Check size={12} strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {question.type === "multi" && (
                    <button type="button" onClick={goNext} className={`${accentButton} mt-[clamp(0.75rem,2vh,1.5rem)]`}>
                      {selectedCount > 0 ? "Davom etish" : "O'tkazib yuborish"}
                    </button>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-[clamp(0.6rem,1.8vh,1.35rem)]">
                    <h2 className="text-[clamp(1.15rem,3.2vh,2.1rem)] font-bold leading-snug tracking-tight">
                      Deyarli tayyor! Aloqa uchun ma&apos;lumot
                    </h2>
                    <p className="mt-1 text-[clamp(0.95rem,2vh,1.2rem)] text-[var(--ad-muted)]">
                      Javoblaringiz asosida tayyor taklif bilan bog&apos;lanamiz.
                    </p>
                  </div>

                  <div className="flex flex-col gap-[clamp(0.4rem,1.3vh,1rem)]">
                    <div>
                      <label htmlFor="ad-name" className="mb-1 block text-[clamp(0.75rem,1.6vh,0.95rem)] font-medium">
                        Ismingiz *
                      </label>
                      <input type="text" id="ad-name" name="name" required placeholder="Ismingizni kiriting" className={inputClass} />
                    </div>

                    <div>
                      <label htmlFor="ad-phone" className="mb-1 block text-[clamp(0.75rem,1.6vh,0.95rem)] font-medium">
                        Telefon raqamingiz *
                      </label>
                      <div className="flex overflow-hidden rounded-xl border border-[var(--ad-border)] focus-within:border-[var(--ad-accent)]">
                        <span
                          className="flex items-center border-r border-[var(--ad-border)] px-3 text-[clamp(0.9rem,1.7vh,1rem)] text-[var(--ad-muted)]"
                          style={{ background: "var(--ad-accent-soft)" }}
                        >
                          +998
                        </span>
                        <input
                          type="tel"
                          id="ad-phone"
                          name="phone"
                          required
                          inputMode="numeric"
                          maxLength={12}
                          placeholder="95 800 59 99"
                          onInput={(e) => {
                            const input = e.currentTarget;
                            let val = input.value.replace(/\D/g, "").slice(0, 9);
                            if (val.length > 2) val = val.slice(0, 2) + " " + val.slice(2);
                            if (val.length > 6) val = val.slice(0, 6) + " " + val.slice(6);
                            input.value = val;
                          }}
                          className="w-full bg-[var(--ad-surface)] px-4 py-[clamp(0.6rem,1.7vh,1rem)] text-[clamp(1rem,1.95vh,1.15rem)] text-[var(--ad-text)] outline-none placeholder:opacity-40"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ad-telegram" className="mb-1 block text-[clamp(0.75rem,1.6vh,0.95rem)] font-medium">
                        Telegram username
                      </label>
                      <input type="text" id="ad-telegram" name="telegram" placeholder="@username" className={inputClass} />
                    </div>
                  </div>

                  <div className="hidden" aria-hidden="true">
                    <input type="text" name="_hp_field" tabIndex={-1} autoComplete="off" />
                  </div>

                  {error && (
                    <p className="mt-2 text-[clamp(0.72rem,1.5vh,0.875rem)] text-red-500" role="alert">
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={loading} className={`${accentButton} mt-[clamp(0.75rem,2vh,1.5rem)]`}>
                    {loading ? "Yuborilmoqda..." : "Arizani yuborish"}
                  </button>

                  <p className="mt-2 text-center text-[clamp(0.65rem,1.35vh,0.75rem)] text-[var(--ad-muted)] opacity-70">
                    Ma&apos;lumotlaringiz uchinchi shaxslarga berilmaydi
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
