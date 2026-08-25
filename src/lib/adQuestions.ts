/**
 * Reklama kreativlariga moslashtirilgan anketalar.
 *
 * Savollar qisqa va tushunarli: bitta savol — bitta fikr, javob variantlari
 * 2-4 so'zdan oshmaydi. Izoh talab qiladigan uzun variantlar yo'q.
 *
 * Uchta to'plam beshta kreativga taqsimlanadi:
 *   edu  → 1, 2  (o'quv markaz / repetitor)
 *   site → 3, 4  (istalgan biznes, sayt va qidiruv)
 *   ai   → 5     (sun'iy intellekt biznesni taniydimi)
 */

import type { Answers, FormQuestion } from "./formQuestions";

const timeline: FormQuestion = {
  id: "timeline",
  short: "Muddat",
  title: "Qachon boshlamoqchisiz?",
  type: "single",
  options: [
    { value: "now", label: "Shu hafta", score: 3 },
    { value: "month", label: "Bir oy ichida", score: 2 },
    { value: "quarter", label: "Bir-uch oy ichida", score: 1 },
    { value: "research", label: "Hozircha o'rganyapman", score: 0 },
  ],
};

/* ───────────────────────── O'QUV MARKAZ (1, 2) ───────────────────────── */

const eduQuestions: FormQuestion[] = [
  {
    id: "edu_type",
    short: "Kim",
    title: "Sizda qanday ta'lim muassasasi?",
    type: "single",
    options: [
      { value: "center", label: "O'quv markaz", score: 3 },
      { value: "network", label: "Filiallari bor markaz", score: 3 },
      { value: "tutor", label: "Repetitor", score: 1 },
      { value: "online", label: "Onlayn kurs", score: 2 },
    ],
  },
  {
    id: "edu_scale_tutor",
    short: "O'quvchilar",
    title: "Nechta o'quvchingiz bor?",
    type: "single",
    showIf: (a: Answers) => a.edu_type === "tutor",
    options: [
      { value: "0-10", label: "10 tagacha", score: 0 },
      { value: "10-30", label: "10 dan 30 tagacha", score: 1 },
      { value: "30-60", label: "30 dan 60 tagacha", score: 2 },
      { value: "60+", label: "60 dan ko'p", score: 3 },
    ],
  },
  {
    id: "edu_scale_center",
    short: "O'quvchilar",
    title: "Nechta o'quvchingiz bor?",
    type: "single",
    showIf: (a: Answers) =>
      a.edu_type === "center" ||
      a.edu_type === "network" ||
      a.edu_type === "online",
    options: [
      { value: "0-50", label: "50 tagacha", score: 0 },
      { value: "50-150", label: "50 dan 150 tagacha", score: 1 },
      { value: "150-400", label: "150 dan 400 tagacha", score: 2 },
      { value: "400+", label: "400 dan ko'p", score: 3 },
    ],
  },
  {
    id: "edu_site",
    short: "Sayt",
    title: "Saytingiz bormi?",
    type: "single",
    options: [
      { value: "none", label: "Yo'q", score: 3 },
      { value: "social", label: "Faqat Instagram va Telegram", score: 3 },
      { value: "old", label: "Bor, lekin eskirgan", score: 3 },
      { value: "invisible", label: "Bor, lekin Google'da chiqmaydi", score: 3 },
      { value: "works", label: "Bor va Google'da chiqadi", score: 1 },
    ],
  },
  {
    id: "edu_area",
    short: "Hudud",
    title: "Qayerdan o'quvchi kutyapsiz?",
    type: "single",
    options: [
      { value: "tashkent", label: "Toshkent", score: 3 },
      { value: "region", label: "Viloyat markazi", score: 2 },
      { value: "district", label: "Tuman yoki kichik shahar", score: 2 },
      { value: "online", label: "Butun O'zbekiston", score: 3 },
    ],
  },
  {
    id: "edu_goal",
    short: "Maqsad",
    title: "Sizga nima kerak?",
    subtitle: "Ikkitagacha tanlang",
    type: "multi",
    maxSelect: 2,
    options: [
      { value: "leads", label: "Ko'proq o'quvchi", score: 3 },
      { value: "brand", label: "Markaz taniqli bo'lsin", score: 2 },
      { value: "beat", label: "Raqobatchidan yuqori chiqish", score: 3 },
      { value: "sell", label: "Onlayn kurs sotish", score: 2 },
      { value: "unknown", label: "Maslahat kerak", score: 1 },
    ],
  },
  timeline,
];

/* ───────────────────────── SAYT / QIDIRUV (3, 4) ───────────────────────── */

const siteQuestions: FormQuestion[] = [
  {
    id: "business",
    short: "Soha",
    title: "Biznesingiz qaysi sohada?",
    type: "single",
    options: [
      { value: "retail", label: "Savdo", score: 2 },
      { value: "service", label: "Xizmat ko'rsatish", score: 3 },
      { value: "edu", label: "Ta'lim", score: 3 },
      { value: "b2b", label: "Ishlab chiqarish", score: 3 },
      { value: "other", label: "Boshqa", score: 2 },
    ],
  },
  {
    id: "site_state",
    short: "Sayt",
    title: "Saytingiz bormi?",
    type: "single",
    options: [
      { value: "none", label: "Yo'q", score: 3 },
      { value: "social", label: "Faqat Instagram va Telegram", score: 3 },
      { value: "old", label: "Bor, lekin eskirgan", score: 3 },
      { value: "invisible", label: "Bor, lekin Google'da chiqmaydi", score: 3 },
      { value: "works", label: "Bor va Google'da chiqadi", score: 1 },
    ],
  },
  {
    id: "traffic",
    short: "Mijoz manbasi",
    title: "Mijozlar hozir qayerdan keladi?",
    type: "single",
    options: [
      { value: "social", label: "Instagram va Telegram", score: 2 },
      { value: "word", label: "Tanishlar orqali", score: 3 },
      { value: "search", label: "Google qidiruvidan", score: 1 },
      { value: "ads", label: "Reklamadan", score: 2 },
      { value: "none", label: "Deyarli kelmayapti", score: 3 },
    ],
  },
  {
    id: "competitors",
    short: "Raqobatchilar",
    title: "Raqobatchilaringiz Google'da chiqadimi?",
    type: "single",
    options: [
      { value: "always", label: "Ha, doim yuqorida", score: 3 },
      { value: "some", label: "Ba'zilari chiqadi", score: 2 },
      { value: "no", label: "Yo'q", score: 2 },
      { value: "unknown", label: "Bilmayman", score: 2 },
    ],
  },
  {
    id: "site_goal",
    short: "Maqsad",
    title: "Sizga nima kerak?",
    subtitle: "Ikkitagacha tanlang",
    type: "multi",
    maxSelect: 2,
    options: [
      { value: "leads", label: "Ko'proq mijoz", score: 3 },
      { value: "trust", label: "Ishonchli ko'rinish", score: 2 },
      { value: "beat", label: "Raqobatchidan yuqori chiqish", score: 3 },
      { value: "expand", label: "Yangi hududga chiqish", score: 3 },
      { value: "unknown", label: "Maslahat kerak", score: 1 },
    ],
  },
  timeline,
];

/* ─────────────────────── SUN'IY INTELLEKT (5) ─────────────────────── */

const aiQuestions: FormQuestion[] = [
  {
    id: "business",
    short: "Soha",
    title: "Biznesingiz qaysi sohada?",
    type: "single",
    options: [
      { value: "retail", label: "Savdo", score: 2 },
      { value: "service", label: "Xizmat ko'rsatish", score: 3 },
      { value: "edu", label: "Ta'lim", score: 3 },
      { value: "b2b", label: "Ishlab chiqarish", score: 3 },
      { value: "other", label: "Boshqa", score: 2 },
    ],
  },
  {
    id: "ai_check",
    short: "AI sinovi",
    title: "ChatGPT'dan biznesingizni so'raganmisiz?",
    type: "single",
    options: [
      { value: "found", label: "Ha, to'g'ri aytdi", score: 2 },
      { value: "notfound", label: "Ha, topa olmadi", score: 3 },
      { value: "wrong", label: "Ha, noto'g'ri aytdi", score: 3 },
      { value: "never", label: "Sinab ko'rmaganman", score: 3 },
    ],
  },
  {
    id: "ai_site",
    short: "Sayt",
    title: "Saytingiz bormi?",
    type: "single",
    options: [
      { value: "none", label: "Yo'q", score: 3 },
      { value: "social", label: "Faqat Instagram va Telegram", score: 3 },
      { value: "old", label: "Bor, lekin eskirgan", score: 3 },
      { value: "works", label: "Bor va yaxshi ishlaydi", score: 2 },
    ],
  },
  {
    id: "ai_content",
    short: "Kontent",
    title: "Internetda siz haqingizda material bormi?",
    subtitle: "Maqola, blog, katalog, yangilik",
    type: "single",
    options: [
      { value: "regular", label: "Ha, muntazam chiqamiz", score: 2 },
      { value: "rare", label: "Ba'zan", score: 3 },
      { value: "none", label: "Yo'q", score: 3 },
    ],
  },
  {
    id: "ai_goal",
    short: "Maqsad",
    title: "Sizga nima kerak?",
    subtitle: "Ikkitagacha tanlang",
    type: "multi",
    maxSelect: 2,
    options: [
      { value: "ai", label: "ChatGPT bizni tavsiya qilsin", score: 3 },
      { value: "google", label: "Google'da yuqori chiqaylik", score: 3 },
      { value: "beat", label: "Raqobatchidan oldin ko'rinaylik", score: 3 },
      { value: "fix", label: "Noto'g'ri ma'lumot tuzatilsin", score: 3 },
      { value: "unknown", label: "Maslahat kerak", score: 1 },
    ],
  },
  timeline,
];

/** Kreativ → anketa to'plami */
const setByCreative: Record<string, FormQuestion[]> = {
  "1": eduQuestions,
  "2": eduQuestions,
  "3": siteQuestions,
  "4": siteQuestions,
  "5": aiQuestions,
};

export function getAdQuestions(creative: string): FormQuestion[] | undefined {
  return setByCreative[creative];
}

/**
 * Anketaning to'liq uzunligi — progress hisoblagichi uchun.
 * Shartli savollardan bir vaqtda faqat bittasi ko'rinadi, shuning uchun
 * ular bitta qadam deb sanaladi. Ustiga kontakt qadami qo'shiladi.
 */
export function plannedSteps(creative: string): number {
  const questions = getAdQuestions(creative);
  if (!questions) return 1;

  const conditional = questions.filter((q) => q.showIf).length;
  const shown = questions.length - Math.max(conditional - 1, 0);
  return shown + 1;
}
