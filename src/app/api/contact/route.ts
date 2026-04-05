import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function POST(req: NextRequest) {
  try {
    const { name, phone, center, service, message } = await req.json();

    if (!name || !phone || !service) {
      return NextResponse.json({ error: "Majburiy maydonlar to'ldirilmagan" }, { status: 400 });
    }

    const serviceLabels: Record<string, string> = {
      website: "Website ishlab chiqish",
      crm: "CRM/ERP tizim",
      seo: "SEO xizmati",
      other: "Boshqa",
    };

    const text = [
      `📩 <b>Yangi ariza!</b>`,
      ``,
      `👤 <b>Ism:</b> ${escapeHtml(name)}`,
      `📞 <b>Telefon:</b> +998 ${escapeHtml(phone)}`,
      center ? `🏢 <b>Markaz:</b> ${escapeHtml(center)}` : null,
      `🛠 <b>Xizmat:</b> ${serviceLabels[service] || escapeHtml(service)}`,
      message ? `\n💬 <b>Xabar:</b>\n${escapeHtml(message)}` : null,
      ``,
      `🕐 ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}`,
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram API error:", err);
      return NextResponse.json({ error: "Xabar yuborilmadi" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
