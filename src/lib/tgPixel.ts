/**
 * Telegram Ads pixel.
 *
 * Skript ikkita buyruqni qo'llab-quvvatlaydi (telegram.org/js/pixel.js dan):
 *   tgp('init', '<pixel_id>')       — sahifa ko'rilishi
 *   tgp('event', '<nom>', {params}) — maxsus hodisa (konversiya)
 *
 * Reklamadan kelgan klikning `tgclid` parametri skript tomonidan URL'dan
 * o'qib olinib, cookie va localStorage'ga saqlanadi — har bir hodisaga
 * avtomatik biriktiriladi, ya'ni biz tomondan qo'shimcha ish talab qilmaydi.
 */

export const TG_PIXEL_ID = "gfXWUtaS";

/**
 * Konversiya hodisasining ID'si — Telegram Ads kabineti bergan qiymat.
 * Diqqat: bu yerga hodisaning ko'rinadigan nomi emas, aynan shu ID yoziladi.
 */
export const TG_LEAD_EVENT_ID = "gfXWUtaS-FxuqLyB6";

/** Telegram bergan bootstrap snippet — o'zgartirilmagan, faqat ID o'zgaruvchiga olingan */
export const tgPixelSnippet = `(function(t,l,g,r,m){t[g]||(g=t[g]=function(){g.run?g.run.apply(g,arguments):g.queue.push(arguments)},g.queue=[],t=l.createElement(r),t.async=!0,t.src=m,l=l.getElementsByTagName(r)[0],l.parentNode.insertBefore(t,l))})(window,document,'tgp','script','https://telegram.org/js/pixel.js');tgp('init','${TG_PIXEL_ID}');`;

declare global {
  interface Window {
    tgp?: (...args: unknown[]) => void;
  }
}

/** Ariza muvaffaqiyatli yuborilganda chaqiriladi */
export function trackLead() {
  try {
    window.tgp?.("event", TG_LEAD_EVENT_ID);
  } catch {
    // Pixel bloklangan bo'lsa ariza yuborilishiga to'sqinlik qilmasin
  }
}
