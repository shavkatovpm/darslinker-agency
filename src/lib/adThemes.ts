/**
 * Telegram Ads kreativlari uchun dizayn temalari.
 *
 * Har bir kreativ (`ads photo/` papkasidagi rasm) o'z landing formasiga ega:
 * `/form/1` … `/form/5`. Ranglar rasmlardan piksel bo'yicha olingan, sarlavha
 * matni ham kreativdagi hook bilan bir xil — mijoz reklamani bosganda
 * "boshqa saytga tushib qoldim" degan his bo'lmasligi uchun.
 *
 * Ranglar CSS o'zgaruvchilari orqali beriladi, chunki Tailwind class'lari
 * ish vaqtida dinamik bo'la olmaydi (skanner statik matnni o'qiydi).
 */

export type AdThemeColors = {
  /** Sahifa foni */
  bg: string;
  /** Fon ustidagi yumshoq gradient dog'i */
  glow: string;
  /** Variant tugmalari va inputlar foni */
  surface: string;
  /** Ramkalar */
  border: string;
  /** Asosiy matn */
  text: string;
  /** Ikkinchi darajali matn */
  muted: string;
  /** Kreativning aksent rangi */
  accent: string;
  /** Aksentning shaffof varianti — tanlangan holat foni */
  accentSoft: string;
  /** Aksent ustidagi matn rangi */
  onAccent: string;
};

export type AdTheme = {
  /** URL segmenti: /form/<slug> */
  slug: string;
  /** Telegram xabarida ko'rinadigan nom — qaysi kreativdan kelgani */
  label: string;
  /** Manba sifatida yoziladigan qisqa kod */
  source: string;
  mode: "light" | "dark";
  colors: AdThemeColors;
  /** Sarlavha ustidagi kichik yozuv (ba'zi kreativlarda bor) */
  eyebrow?: string;
  /** Sarlavha: aksent so'zdan oldingi qism */
  titleLead: string;
  /** Aksent rangdagi so'z — kreativdagi asosiy urg'u */
  titleAccent: string;
  /** Aksent so'zdan keyingi qism */
  titleTail?: string;
  /** Sarlavha ostidagi izoh */
  subtitle: string;
  /**
   * Aksent so'z qanday ko'rinishda:
   *  pill      — to'ldirilgan yumaloq fon (ad1)
   *  glow      — nur taratuvchi matn, to'q fonda (ad2)
   *  plain     — shunchaki aksent rangdagi matn (ad3, ad4)
   *  script    — qiya, qo'lyozma uslubidagi matn (ad5)
   */
  accentStyle: "pill" | "glow" | "plain" | "script";
  /**
   * Kreativdagi grafika — SVG ko'rinishida takrorlanadi:
   *  rank    — qidiruv natijalari ro'yxati, bittasi ajratilgan + o'suvchi ustunlar
   *  podium  — brauzer oynasi va 7-5-3-1 pog'onalari
   *  top10   — qidiruv paneli va "TOP 10" doirasi
   *  ai      — savolli qidiruv paneli, lupa va uchqun
   */
  art: "rank" | "podium" | "top10" | "ai";
};

export const adThemes: AdTheme[] = [
  {
    slug: "1",
    label: "Kreativ 1 — TOP-10 (marjon)",
    source: "ads_creative_1",
    mode: "light",
    colors: {
      bg: "#FEFCFB",
      glow: "rgba(241, 103, 74, 0.10)",
      surface: "#FFFFFF",
      border: "rgba(35, 35, 35, 0.10)",
      text: "#232323",
      muted: "#6B6B6B",
      accent: "#F1674A",
      accentSoft: "rgba(241, 103, 74, 0.10)",
      onAccent: "#FFFFFF",
    },
    titleLead: "O'quv markazingizni",
    titleAccent: "TOP-10",
    titleTail: "talikka olib chiqamiz",
    subtitle: "Bir necha savolga javob bering — markazingiz uchun aniq reja tayyorlab beramiz",
    accentStyle: "pill",
    art: "rank",
  },
  {
    slug: "2",
    label: "Kreativ 2 — Qidiruv (to'q + oltin)",
    source: "ads_creative_2",
    mode: "dark",
    colors: {
      bg: "#181A1E",
      glow: "rgba(244, 183, 91, 0.16)",
      surface: "rgba(255, 255, 255, 0.04)",
      border: "rgba(255, 255, 255, 0.10)",
      text: "#FFFFFF",
      muted: "#9A9A9A",
      accent: "#F4B75B",
      accentSoft: "rgba(244, 183, 91, 0.12)",
      onAccent: "#0B0C0E",
    },
    titleLead: "O'quv",
    titleAccent: "markazingizni",
    subtitle: "qidiruvda yuqoriga olib chiqamiz",
    accentStyle: "glow",
    art: "rank",
  },
  {
    slug: "3",
    label: "Kreativ 3 — Sayt TOP-10 (ko'k)",
    source: "ads_creative_3",
    mode: "light",
    colors: {
      bg: "#F6F5F8",
      glow: "rgba(95, 110, 200, 0.12)",
      surface: "#FFFFFF",
      border: "rgba(11, 18, 32, 0.10)",
      text: "#0B1220",
      muted: "#5C6473",
      accent: "#4557B8",
      accentSoft: "rgba(69, 87, 184, 0.09)",
      onAccent: "#FFFFFF",
    },
    titleLead: "Saytingizni",
    titleAccent: "TOP-10",
    titleTail: "talikka olib chiqamiz",
    subtitle: "Bir necha savolga javob bering — saytingiz uchun aniq reja tayyorlab beramiz",
    accentStyle: "plain",
    art: "podium",
  },
  {
    slug: "4",
    label: "Kreativ 4 — Sayt qidiruvda (bejeviy)",
    source: "ads_creative_4",
    mode: "light",
    colors: {
      bg: "#F3EDE9",
      glow: "rgba(200, 159, 102, 0.16)",
      surface: "#FFFFFF",
      border: "rgba(29, 29, 29, 0.10)",
      text: "#1D1D1D",
      muted: "#6E655C",
      accent: "#C89F66",
      accentSoft: "rgba(200, 159, 102, 0.14)",
      onAccent: "#FFFFFF",
    },
    titleLead: "Saytingizni",
    titleAccent: "qidiruvda",
    titleTail: "yuqoriga olib chiqamiz",
    subtitle: "Bir necha savolga javob bering — Google'dan mijoz oqimini yo'lga qo'yamiz",
    accentStyle: "plain",
    art: "top10",
  },
  {
    slug: "5",
    label: "Kreativ 5 — Sun'iy intellekt (bronza)",
    source: "ads_creative_5",
    mode: "light",
    colors: {
      bg: "#F1EBE4",
      glow: "rgba(187, 144, 83, 0.14)",
      surface: "#FFFFFF",
      border: "rgba(34, 32, 26, 0.10)",
      text: "#22201A",
      muted: "#6C665C",
      accent: "#BB9053",
      accentSoft: "rgba(187, 144, 83, 0.12)",
      onAccent: "#FFFFFF",
    },
    eyebrow: "BIZNESINGIZNI",
    titleLead: "sun'iy intellekt",
    titleAccent: "taniydimi?",
    subtitle: "ChatGPT sizni tavsiya qiladimi? Tekshiramiz va tuzatamiz",
    accentStyle: "script",
    art: "ai",
  },
];

export function getAdTheme(slug: string): AdTheme | undefined {
  return adThemes.find((theme) => theme.slug === slug);
}

/** Temani CSS o'zgaruvchilariga aylantiradi — wrapper elementga beriladi */
export function themeVars(theme: AdTheme): React.CSSProperties {
  const c = theme.colors;
  return {
    "--ad-bg": c.bg,
    "--ad-glow": c.glow,
    "--ad-surface": c.surface,
    "--ad-border": c.border,
    "--ad-text": c.text,
    "--ad-muted": c.muted,
    "--ad-accent": c.accent,
    "--ad-accent-soft": c.accentSoft,
    "--ad-on-accent": c.onAccent,
  } as React.CSSProperties;
}
