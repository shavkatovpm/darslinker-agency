/**
 * Telefon raqamining haqiqiyligini baholash.
 *
 * Raqam hech qachon bloklanmaydi — faqat belgilanadi. Chunki noto'g'ri
 * "fake" deb hisoblangan haqiqiy mijozni yo'qotish, bitta soxta arizani
 * qabul qilishdan qimmatroq.
 *
 * Bir xil mantiq ham brauzerda (ogohlantirish ko'rsatish uchun), ham serverda
 * (Telegram xabarini belgilash uchun) ishlatiladi. Serverdagi tekshiruv
 * asosiy — brauzerdagi qiymatga ishonib bo'lmaydi.
 */

export type PhoneVerdict = {
  level: "ok" | "suspicious" | "fake";
  /** Nima uchun shubhali — Telegram xabarida ko'rsatiladi */
  reason?: string;
};

/** O'zbekistondagi amaldagi operator va shahar kodlari */
const KNOWN_CODES = [
  "20", "33", "50", "55", "71", "77", "78",
  "88", "90", "91", "93", "94", "95", "97", "98", "99",
];

/** Raqamlar ketma-ket o'sib yoki kamayib boradimi (123456, 987654) */
function isSequence(digits: string): boolean {
  if (digits.length < 5) return false;
  const step = Number(digits[1]) - Number(digits[0]);
  if (step !== 1 && step !== -1) return false;
  for (let i = 2; i < digits.length; i++) {
    if (Number(digits[i]) - Number(digits[i - 1]) !== step) return false;
  }
  return true;
}

/**
 * Qisqa blok takrorlanadimi: 1212121, 123123123.
 * Uzunlik blokka bo'linmasa ham ishlaydi — oxirgi blok yarim bo'lishi mumkin.
 */
function isRepeatedBlock(digits: string): boolean {
  for (const size of [2, 3]) {
    if (digits.length < size * 2) continue;
    const block = digits.slice(0, size);
    if (block.split("").every((c) => c === block[0])) continue;

    let same = true;
    for (let i = size; i < digits.length; i++) {
      if (digits[i] !== block[i % size]) {
        same = false;
        break;
      }
    }
    if (same) return true;
  }
  return false;
}

/**
 * @param digits — faqat raqamlar, kodsiz: 9 xona (masalan "958005999")
 */
export function checkPhone(digits: string): PhoneVerdict {
  if (digits.length !== 9) {
    return { level: "fake", reason: "raqam to'liq emas" };
  }

  const code = digits.slice(0, 2);
  const rest = digits.slice(2);
  const unique = new Set(digits).size;

  // ─── Aniq soxta ───
  if (unique === 1) {
    return { level: "fake", reason: "barcha raqamlar bir xil" };
  }
  if (isSequence(digits)) {
    return { level: "fake", reason: "raqamlar ketma-ket" };
  }
  if (!KNOWN_CODES.includes(code)) {
    return { level: "fake", reason: `"${code}" — bunday operator kodi yo'q` };
  }
  if (new Set(rest).size === 1) {
    return { level: "fake", reason: "koddan keyingi hamma raqam bir xil" };
  }

  // ─── Shubhali ───
  if (isSequence(rest)) {
    return { level: "suspicious", reason: "koddan keyin ketma-ketlik" };
  }
  if (isRepeatedBlock(rest)) {
    return { level: "suspicious", reason: "raqam bloki takrorlanadi" };
  }
  if (unique === 2) {
    return { level: "suspicious", reason: "atigi ikki xil raqam ishlatilgan" };
  }

  return { level: "ok" };
}
