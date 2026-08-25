/**
 * Telegram Ads uchun lead-kvalifikatsiya formasi.
 *
 * Savollar bir-biriga bog'langan: birinchi savolda tanlangan biznes kategoriyasi
 * keyingi savollarni belgilaydi (`showIf`). Ta'lim yo'nalishida esa savol yana
 * ichkariga shoxlanadi — repetitor va o'quv markaz uchun miqyos savollari boshqacha.
 *
 * Bu fayl ham client (UI), ham server (Telegram xabari) tomonda ishlatiladi —
 * shuning uchun bu yerda "use client" yo'q va faqat sof data + toza funksiyalar bor.
 */

export type Answers = Record<string, string | string[]>;

export type FormOption = {
  value: string;
  label: string;
  /** Lead sifatini baholash uchun ball (0-3) */
  score: number;
};

export type FormQuestion = {
  id: string;
  title: string;
  /** Telegram xabari va jadval uchun qisqa yorliq (uzun sarlavha o'rniga) */
  short?: string;
  subtitle?: string;
  type: "single" | "multi";
  options: FormOption[];
  /** Faqat multi uchun: maksimal nechta variant tanlash mumkin */
  maxSelect?: number;
  /** Savol qachon ko'rsatiladi. Berilmasa — doim ko'rsatiladi. */
  showIf?: (answers: Answers) => boolean;
};

/** Bitta tanlovli javob berilgan qiymatlardan biriga tengmi? */
const is = (answers: Answers, id: string, ...values: string[]) =>
  typeof answers[id] === "string" && values.includes(answers[id] as string);

/** Har bir kategoriyaning o'z xizmatlar savoli bor — javoblarni birlashtiramiz */
const SERVICE_QUESTION_IDS = [
  "edu_services",
  "retail_services",
  "service_services",
  "other_services",
];

export function getSelectedServices(answers: Answers): string[] {
  return SERVICE_QUESTION_IDS.flatMap((id) =>
    Array.isArray(answers[id]) ? (answers[id] as string[]) : []
  );
}

/** Sayt bilan bog'liq xizmat tanlangan bo'lsa — onlayn ko'rinish haqida so'raymiz */
const wantsWebPresence = (answers: Answers) =>
  getSelectedServices(answers).some((s) =>
    ["website", "shop", "webapp", "seo", "unknown"].includes(s)
  );

export const formQuestions: FormQuestion[] = [
  // ─────────── 1. Kategoriya — butun anketani belgilaydi ───────────
  {
    id: "category",
    title: "Biznesingiz qaysi sohada?",
    subtitle: "Keyingi savollar tanlovingizga moslashadi",
    type: "single",
    options: [
      { value: "edu", label: "Ta'lim — o'quv markaz, repetitor, kurs", score: 3 },
      { value: "retail", label: "Savdo — do'kon, onlayn savdo, ulgurji", score: 2 },
      {
        value: "service",
        label: "Xizmat — klinika, salon, restoran, servis",
        score: 2,
      },
      {
        value: "other",
        label: "Boshqa — IT, ishlab chiqarish, korporativ",
        score: 2,
      },
    ],
  },

  // ─────────────────────── TA'LIM tarmog'i ───────────────────────
  {
    id: "edu_type",
    title: "Ta'lim yo'nalishingiz aniqroq qaysi biri?",
    type: "single",
    showIf: (a) => is(a, "category", "edu"),
    options: [
      { value: "center", label: "O'quv markaz — o'z binosi bor", score: 3 },
      { value: "network", label: "Filiallari bor markaz tarmog'i", score: 3 },
      { value: "tutor", label: "Xususiy repetitor / o'qituvchi", score: 1 },
      { value: "online", label: "Onlayn kurs / platforma", score: 2 },
    ],
  },
  {
    id: "edu_scale_tutor",
    title: "Hozir nechta o'quvchingiz bor?",
    subtitle: "Taxminiy son yetarli",
    type: "single",
    showIf: (a) => is(a, "edu_type", "tutor"),
    options: [
      { value: "0-10", label: "10 tagacha", score: 0 },
      { value: "10-30", label: "10 – 30 ta", score: 1 },
      { value: "30-60", label: "30 – 60 ta", score: 2 },
      { value: "60+", label: "60 tadan ko'p", score: 3 },
    ],
  },
  {
    id: "edu_scale_center",
    title: "Hozir nechta o'quvchingiz bor?",
    subtitle: "Taxminiy son yetarli",
    type: "single",
    showIf: (a) => is(a, "edu_type", "center", "network", "online"),
    options: [
      { value: "0-50", label: "50 tagacha", score: 0 },
      { value: "50-150", label: "50 – 150 ta", score: 1 },
      { value: "150-400", label: "150 – 400 ta", score: 2 },
      { value: "400+", label: "400 tadan ko'p", score: 3 },
    ],
  },
  {
    id: "edu_pain",
    title: "Hozirgi eng katta muammoingiz nima?",
    subtitle: "3 tagacha tanlashingiz mumkin",
    type: "multi",
    maxSelect: 3,
    showIf: (a) => is(a, "category", "edu"),
    options: [
      { value: "leads", label: "Yangi o'quvchi kam keladi", score: 3 },
      { value: "manual", label: "Hisob-kitob qo'lda — daftar, Excel", score: 3 },
      { value: "presence", label: "Onlayn ko'rinishimiz yo'q yoki zaif", score: 3 },
      { value: "retention", label: "O'quvchilar ketib qolyapti", score: 2 },
      { value: "scale", label: "Kengaymoqchiman — filial yoki onlayn", score: 3 },
    ],
  },
  {
    id: "edu_services",
    title: "Sizga qaysi yechim kerak?",
    subtitle: "Bir nechtasini tanlashingiz mumkin",
    type: "multi",
    showIf: (a) => is(a, "category", "edu"),
    options: [
      { value: "website", label: "Website / landing sahifa", score: 2 },
      {
        value: "crm",
        label: "CRM — o'quvchi, to'lov, davomat nazorati",
        score: 3,
      },
      { value: "bot", label: "Telegram bot — ariza va eslatmalar", score: 2 },
      { value: "seo", label: "SEO — Google'dan o'quvchi oqimi", score: 2 },
      { value: "ads", label: "Reklama va SMM", score: 2 },
      { value: "unknown", label: "Bilmayman — maslahat kerak", score: 1 },
    ],
  },

  // ─────────────────────── SAVDO tarmog'i ───────────────────────
  {
    id: "retail_channel",
    title: "Hozir asosan qayerda sotasiz?",
    type: "single",
    showIf: (a) => is(a, "category", "retail"),
    options: [
      { value: "offline", label: "Faqat offline do'kon", score: 2 },
      { value: "social", label: "Instagram / Telegram orqali", score: 2 },
      { value: "marketplace", label: "Marketplace — Uzum, Wildberries", score: 2 },
      { value: "site", label: "O'z onlayn do'konim bor", score: 3 },
      { value: "b2b", label: "Ulgurji / B2B — do'konlarga sotaman", score: 3 },
    ],
  },
  {
    id: "retail_scale",
    title: "Oyiga taxminan nechta buyurtma?",
    type: "single",
    showIf: (a) => is(a, "category", "retail"),
    options: [
      { value: "0-50", label: "50 tagacha", score: 0 },
      { value: "50-200", label: "50 – 200 ta", score: 1 },
      { value: "200-1000", label: "200 – 1000 ta", score: 2 },
      { value: "1000+", label: "1000 tadan ko'p", score: 3 },
    ],
  },
  {
    id: "retail_pain",
    title: "Hozirgi eng katta muammoingiz nima?",
    subtitle: "3 tagacha tanlashingiz mumkin",
    type: "multi",
    maxSelect: 3,
    showIf: (a) => is(a, "category", "retail"),
    options: [
      { value: "orders", label: "Buyurtmalar qo'lda yoziladi, chalkashadi", score: 3 },
      { value: "sales", label: "Sotuv kam — mijoz oqimi yo'q", score: 3 },
      { value: "noshop", label: "Onlayn do'konim yo'q", score: 3 },
      { value: "stock", label: "Ombor va hisobot nazorati yo'q", score: 3 },
      { value: "brand", label: "Brend ko'rinishi zaif", score: 2 },
    ],
  },
  {
    id: "retail_services",
    title: "Sizga qaysi yechim kerak?",
    subtitle: "Bir nechtasini tanlashingiz mumkin",
    type: "multi",
    showIf: (a) => is(a, "category", "retail"),
    options: [
      { value: "shop", label: "Onlayn do'kon — e-commerce sayt", score: 3 },
      { value: "website", label: "Website / landing sahifa", score: 2 },
      { value: "crm", label: "CRM — buyurtma va mijozlar bazasi", score: 3 },
      { value: "bot", label: "Telegram bot — buyurtma qabul qilish", score: 2 },
      { value: "seo", label: "SEO — Google'dan xaridor", score: 2 },
      { value: "ads", label: "Reklama va SMM", score: 2 },
      { value: "unknown", label: "Bilmayman — maslahat kerak", score: 1 },
    ],
  },

  // ────────────────────── XIZMAT tarmog'i ──────────────────────
  {
    id: "service_type",
    title: "Qaysi sohada xizmat ko'rsatasiz?",
    type: "single",
    showIf: (a) => is(a, "category", "service"),
    options: [
      { value: "clinic", label: "Klinika / stomatologiya / tibbiyot", score: 3 },
      { value: "beauty", label: "Go'zallik saloni / barbershop", score: 2 },
      { value: "food", label: "Restoran / kafe", score: 2 },
      { value: "repair", label: "Servis / ta'mirlash / qurilish", score: 2 },
      { value: "prof", label: "Yuridik / konsalting / boshqa xizmat", score: 2 },
    ],
  },
  {
    id: "service_scale",
    title: "Oyiga taxminan nechta mijoz qabul qilasiz?",
    type: "single",
    showIf: (a) => is(a, "category", "service"),
    options: [
      { value: "0-50", label: "50 tagacha", score: 0 },
      { value: "50-200", label: "50 – 200 ta", score: 1 },
      { value: "200-500", label: "200 – 500 ta", score: 2 },
      { value: "500+", label: "500 tadan ko'p", score: 3 },
    ],
  },
  {
    id: "service_pain",
    title: "Hozirgi eng katta muammoingiz nima?",
    subtitle: "3 tagacha tanlashingiz mumkin",
    type: "multi",
    maxSelect: 3,
    showIf: (a) => is(a, "category", "service"),
    options: [
      { value: "booking", label: "Yozilish telefon orqali, qo'lda", score: 3 },
      { value: "clients", label: "Yangi mijoz kam keladi", score: 3 },
      { value: "presence", label: "Saytim yo'q — faqat Instagram", score: 3 },
      { value: "base", label: "Mijozlar bazasi yig'ilmayapti", score: 3 },
      { value: "staff", label: "Xodim va jadval nazorati qiyin", score: 2 },
    ],
  },
  {
    id: "service_services",
    title: "Sizga qaysi yechim kerak?",
    subtitle: "Bir nechtasini tanlashingiz mumkin",
    type: "multi",
    showIf: (a) => is(a, "category", "service"),
    options: [
      { value: "website", label: "Website / landing sahifa", score: 2 },
      { value: "booking", label: "Onlayn yozilish tizimi", score: 3 },
      { value: "crm", label: "CRM — mijozlar bazasi va tarixi", score: 3 },
      { value: "bot", label: "Telegram bot — yozilish va eslatma", score: 2 },
      { value: "seo", label: "SEO — Google'dan mijoz", score: 2 },
      { value: "ads", label: "Reklama va SMM", score: 2 },
      { value: "unknown", label: "Bilmayman — maslahat kerak", score: 1 },
    ],
  },

  // ─────────────────────── BOSHQA tarmog'i ───────────────────────
  {
    id: "other_type",
    title: "Faoliyatingiz qaysi biriga yaqin?",
    type: "single",
    showIf: (a) => is(a, "category", "other"),
    options: [
      { value: "it", label: "IT / startup / SaaS", score: 2 },
      { value: "prod", label: "Ishlab chiqarish", score: 3 },
      { value: "corp", label: "Korporativ / yirik kompaniya", score: 3 },
      { value: "org", label: "Davlat yoki nodavlat tashkilot", score: 2 },
      { value: "personal", label: "Shaxsiy brend / blogger", score: 1 },
    ],
  },
  {
    id: "other_scale",
    title: "Jamoangiz hajmi qanday?",
    type: "single",
    showIf: (a) => is(a, "category", "other"),
    options: [
      { value: "1-3", label: "1 – 3 kishi", score: 0 },
      { value: "4-10", label: "4 – 10 kishi", score: 1 },
      { value: "11-50", label: "11 – 50 kishi", score: 2 },
      { value: "50+", label: "50 dan ko'p", score: 3 },
    ],
  },
  {
    id: "other_pain",
    title: "Hozirgi eng katta muammoingiz nima?",
    subtitle: "3 tagacha tanlashingiz mumkin",
    type: "multi",
    maxSelect: 3,
    showIf: (a) => is(a, "category", "other"),
    options: [
      { value: "presence", label: "Onlayn ko'rinish / sayt yo'q", score: 3 },
      { value: "leads", label: "Mijoz oqimi kam", score: 3 },
      { value: "manual", label: "Ichki jarayonlar qo'lda boshqariladi", score: 3 },
      { value: "product", label: "Mahsulot / platforma ishlab chiqish kerak", score: 3 },
      { value: "brand", label: "Brend va dizayn yangilanishi kerak", score: 2 },
    ],
  },
  {
    id: "other_services",
    title: "Sizga qaysi yechim kerak?",
    subtitle: "Bir nechtasini tanlashingiz mumkin",
    type: "multi",
    showIf: (a) => is(a, "category", "other"),
    options: [
      { value: "website", label: "Korporativ website / landing", score: 2 },
      { value: "webapp", label: "Web-ilova yoki platforma", score: 3 },
      { value: "crm", label: "CRM / ERP — ichki jarayonlar", score: 3 },
      { value: "bot", label: "Telegram bot / avtomatlashtirish", score: 2 },
      { value: "seo", label: "SEO — Google'dan mijoz", score: 2 },
      { value: "ads", label: "Reklama va SMM", score: 2 },
      { value: "unknown", label: "Bilmayman — maslahat kerak", score: 1 },
    ],
  },

  // ─────────── Umumiy yakuniy savollar (hamma tarmoq uchun) ───────────
  {
    id: "presence",
    title: "Hozir websitengiz bormi?",
    type: "single",
    showIf: wantsWebPresence,
    options: [
      { value: "none", label: "Yo'q, umuman yo'q", score: 3 },
      { value: "old", label: "Bor, lekin eskirgan / ishlamaydi", score: 3 },
      { value: "social", label: "Faqat Instagram / Telegram sahifa", score: 2 },
      { value: "works", label: "Bor va yaxshi ishlaydi", score: 1 },
    ],
  },
  {
    id: "timeline",
    title: "Qachon boshlamoqchisiz?",
    type: "single",
    options: [
      { value: "now", label: "Shu hafta / imkon qadar tez", score: 3 },
      { value: "month", label: "1 oy ichida", score: 2 },
      { value: "quarter", label: "1 – 3 oy ichida", score: 1 },
      { value: "research", label: "Hozircha faqat o'rganyapman", score: 0 },
    ],
  },
];

/**
 * Anketaning to'liq uzunligi: kategoriya + yo'nalish + miqyos + muammolar +
 * yechim + sayt holati + muddat = 7 savol, ustiga kontakt qadami.
 *
 * Progress ko'rsatkichi shu songa tayanadi. Aks holda boshida faqat shartsiz
 * savollar ko'rinib, "1 / 3" chiqadi va javob berilgani sari son sakrab ketadi.
 */
export const PLANNED_STEPS = 8;

/** Joriy javoblarga mos keladigan savollar ro'yxati */
export function getVisibleQuestions(answers: Answers): FormQuestion[] {
  return formQuestions.filter((q) => !q.showIf || q.showIf(answers));
}

export type LeadTemperature = {
  label: string;
  /** Telegram xabaridagi harorat belgisi: 🔥 / 🌤 / ❄️ */
  emoji: string;
  score: number;
  maxScore: number;
};

/**
 * Lead "haroratini" hisoblaydi.
 * Ball faqat ko'rsatilgan savollar bo'yicha — shuning uchun turli kategoriyalar
 * bir xil shkalada solishtiriladi (foizga nisbatan).
 */
export function scoreAnswers(answers: Answers): LeadTemperature {
  const visible = getVisibleQuestions(answers);

  let score = 0;
  let maxScore = 0;

  for (const q of visible) {
    maxScore += Math.max(...q.options.map((o) => o.score));

    const answer = answers[q.id];
    if (!answer) continue;

    if (Array.isArray(answer)) {
      // Multi-select: eng qimmatli tanlov hisobga olinadi
      const scores = answer
        .map((v) => q.options.find((o) => o.value === v)?.score ?? 0)
        .sort((a, b) => b - a);
      score += scores[0] ?? 0;
    } else {
      score += q.options.find((o) => o.value === answer)?.score ?? 0;
    }
  }

  const ratio = maxScore > 0 ? score / maxScore : 0;
  if (ratio >= 0.7) return { label: "ISSIQ LEAD", emoji: "🔥", score, maxScore };
  if (ratio >= 0.45) return { label: "ILIQ LEAD", emoji: "🌤", score, maxScore };
  return { label: "SOVUQ LEAD", emoji: "❄️", score, maxScore };
}

/** Javob qiymatini o'qiladigan matnga aylantiradi */
export function labelFor(questionId: string, value: string): string {
  const q = formQuestions.find((item) => item.id === questionId);
  return q?.options.find((o) => o.value === value)?.label ?? value;
}

/**
 * Telegram xabari uchun qisqa yorliqlar.
 * Savol matnlari to'liq holda juda uzun — botda ustun ko'rinishida chiqishi kerak.
 */
const SHORT_TITLES: Record<string, string> = {
  category: "Soha",
  edu_type: "Yo'nalish",
  edu_scale_tutor: "O'quvchilar",
  edu_scale_center: "O'quvchilar",
  edu_pain: "Muammolar",
  edu_services: "Kerakli yechim",
  retail_channel: "Savdo kanali",
  retail_scale: "Buyurtma / oy",
  retail_pain: "Muammolar",
  retail_services: "Kerakli yechim",
  service_type: "Yo'nalish",
  service_scale: "Mijoz / oy",
  service_pain: "Muammolar",
  service_services: "Kerakli yechim",
  other_type: "Yo'nalish",
  other_scale: "Jamoa",
  other_pain: "Muammolar",
  other_services: "Kerakli yechim",
  presence: "Sayt holati",
  timeline: "Muddat",
};

export function shortTitle(questionId: string): string {
  return SHORT_TITLES[questionId] ?? questionId;
}

/**
 * Javob matnini qisqartiradi: "Savdo — do'kon, onlayn savdo" → "Savdo".
 * Tire (—) dan keyingi izoh botda keraksiz joy egallaydi.
 */
export function shortLabelFor(questionId: string, value: string): string {
  return labelFor(questionId, value).split(" — ")[0].trim();
}

/* ─────────── Ixtiyoriy savollar ro'yxati bilan ishlaydigan funksiyalar ───────────
   Reklama kreativlarining o'z anketalari bor (src/lib/adQuestions.ts), shuning uchun
   mantiq global ro'yxatga bog'lanmagan holda ham ishlashi kerak. */

/** Berilgan ro'yxatdan javoblarga mos savollarni ajratadi */
export function visibleOf(
  questions: FormQuestion[],
  answers: Answers
): FormQuestion[] {
  return questions.filter((q) => !q.showIf || q.showIf(answers));
}

/** Berilgan ro'yxat bo'yicha lead haroratini hisoblaydi */
export function scoreOf(
  questions: FormQuestion[],
  answers: Answers
): LeadTemperature {
  const visible = visibleOf(questions, answers);

  let score = 0;
  let maxScore = 0;

  for (const q of visible) {
    maxScore += Math.max(...q.options.map((o) => o.score));

    const answer = answers[q.id];
    if (!answer) continue;

    if (Array.isArray(answer)) {
      const scores = answer
        .map((v) => q.options.find((o) => o.value === v)?.score ?? 0)
        .sort((a, b) => b - a);
      score += scores[0] ?? 0;
    } else {
      score += q.options.find((o) => o.value === answer)?.score ?? 0;
    }
  }

  const ratio = maxScore > 0 ? score / maxScore : 0;
  if (ratio >= 0.7) return { label: "ISSIQ LEAD", emoji: "🔥", score, maxScore };
  if (ratio >= 0.45) return { label: "ILIQ LEAD", emoji: "🌤", score, maxScore };
  return { label: "SOVUQ LEAD", emoji: "❄️", score, maxScore };
}

/** Javob qiymatini matnga aylantiradi, tiredan keyingi izohni tashlab */
export function shortLabelOf(
  questions: FormQuestion[],
  questionId: string,
  value: string
): string {
  const q = questions.find((item) => item.id === questionId);
  const label = q?.options.find((o) => o.value === value)?.label ?? value;
  return label.split(" — ")[0].trim();
}

/** Savolning qisqa yorlig'i: o'z maydoni → global jadval → sarlavha */
export function shortTitleOf(question: FormQuestion): string {
  return question.short ?? SHORT_TITLES[question.id] ?? question.title;
}
