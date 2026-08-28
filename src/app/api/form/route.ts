import { NextRequest, NextResponse } from "next/server";
import {
  formQuestions,
  getSelectedServices,
  scoreOf,
  shortLabelOf,
  shortTitleOf,
  visibleOf,
  type Answers,
} from "@/lib/formQuestions";
import { getAdQuestions } from "@/lib/adQuestions";
import { getAdTheme } from "@/lib/adThemes";
import { checkPhone } from "@/lib/phoneCheck";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
const SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

type Payload = {
  answers?: Answers;
  name?: string;
  phone?: string;
  center?: string;
  telegram?: string;
  source?: string;
  /** Reklama kreativi: "1".."5". Bo'lmasa — umumiy /form anketasi */
  creative?: string;
};

export async function POST(req: NextRequest) {
  try {
    const {
      answers = {},
      name,
      phone,
      center,
      telegram,
      source,
      creative,
    }: Payload = await req.json();

    const digits = (phone || "").replace(/\D/g, "");

    if (!name?.trim() || digits.length !== 9) {
      return NextResponse.json(
        { error: "Ism yoki telefon raqam noto'g'ri" },
        { status: 400 }
      );
    }

    // Kreativ landingidan kelgan bo'lsa — o'sha kreativning anketasi
    const adQuestions = creative ? getAdQuestions(creative) : undefined;
    const theme = creative ? getAdTheme(creative) : undefined;
    const questions = adQuestions ?? formQuestions;

    const lead = scoreOf(questions, answers);
    const percent =
      lead.maxScore > 0 ? Math.round((lead.score / lead.maxScore) * 100) : 0;

    // Faqat shu mijozga ko'rsatilgan savollar xabarga tushadi
    const answerLines = visibleOf(questions, answers).map((q) => {
      const answer = answers[q.id];
      const label = `<b>${escapeHtml(shortTitleOf(q))}:</b>`;

      if (Array.isArray(answer)) {
        if (answer.length === 0) return `${label} —`;
        if (answer.length === 1) {
          return `${label} ${escapeHtml(shortLabelOf(questions, q.id, answer[0]))}`;
        }
        const items = answer
          .map((v) => `     • ${escapeHtml(shortLabelOf(questions, q.id, v))}`)
          .join("\n");
        return `${label}\n${items}`;
      }

      return `${label} ${
        answer ? escapeHtml(shortLabelOf(questions, q.id, answer)) : "—"
      }`;
    });

    const divider = "━━━━━━━━━━━━━━━";

    // Soxta raqam serverda qayta tekshiriladi — brauzerdagi natijaga ishonilmaydi
    const phoneVerdict = checkPhone(digits);

    const headline =
      phoneVerdict.level === "fake"
        ? `🚩 <b>FAKE RAQAM</b> — ${escapeHtml(phoneVerdict.reason ?? "")}`
        : phoneVerdict.level === "suspicious"
          ? `⚠️ <b>SHUBHALI RAQAM</b> — ${escapeHtml(phoneVerdict.reason ?? "")}\n${lead.emoji} <b>${lead.label}</b>  ·  ${percent}% (${lead.score}/${lead.maxScore})`
          : `${lead.emoji} <b>${lead.label}</b>  ·  ${percent}% (${lead.score}/${lead.maxScore})`;

    const text = [
      headline,
      theme ? `🎯 <b>${escapeHtml(theme.label)}</b>` : null,
      ``,
      `👤 <b>${escapeHtml(name.trim())}</b>`,
      `📞 <code>+998 ${formatPhone(digits)}</code>`,
      telegram?.trim() ? `✈️ ${escapeHtml(normalizeUsername(telegram))}` : null,
      center?.trim() ? `🏢 ${escapeHtml(center.trim())}` : null,
      ``,
      divider,
      ...answerLines,
      divider,
      ``,
      `📊 <i>Manba: ${escapeHtml(source || "noma'lum")}</i>`,
      `🕐 <i>${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}</i>`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
          link_preview_options: { is_disabled: true },
        }),
      }
    );

    if (!telegramRes.ok) {
      console.error("Telegram API error:", await telegramRes.text());
      return NextResponse.json({ error: "Xabar yuborilmadi" }, { status: 500 });
    }

    // Google Sheets — ixtiyoriy, xatosi arizani buzmasligi kerak
    if (SHEETS_URL) {
      const serviceQuestion = visibleOf(questions, answers).find((q) =>
        q.id.endsWith("_services")
      );
      const services = getSelectedServices(answers)
        .map(
          (v) => serviceQuestion?.options.find((o) => o.value === v)?.label ?? v
        )
        .join(", ");

      await fetch(SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: `998${digits}`,
          center: center?.trim() || "",
          service: services,
          message: `${theme ? theme.label + " — " : ""}${lead.label} ${percent}% — ${answerLines
            .join(" | ")
            .replace(/<\/?b>/g, "")
            .replace(/\n\s+•\s*/g, " ")}`,
        }),
      }).catch((err) => console.error("Google Sheets error:", err));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Form route error:", err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}

function formatPhone(digits: string): string {
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
    5,
    7
  )} ${digits.slice(7, 9)}`;
}

function normalizeUsername(value: string): string {
  const trimmed = value.trim();
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
