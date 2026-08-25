/**
 * Darslinker Agency — arizalarni Google Sheets'ga yozish.
 *
 * O'RNATISH:
 *  1. Google Sheets'da yangi jadval oching
 *  2. Kengaytmalar (Extensions) → Apps Script
 *  3. Bor kodni o'chirib, shu faylni to'liq nusxalang
 *  4. Deploy → New deployment → turi: Web app
 *       - Execute as:      Me
 *       - Who has access:  Anyone            ← muhim, aks holda 405 qaytadi
 *  5. Berilgan URL'ni nusxalab, dasturchiga bering (GOOGLE_SHEETS_URL)
 *
 * ESLATMA: kodni o'zgartirsangiz, har safar "Deploy → Manage deployments →
 * (qalam) → Version: New version" qilish kerak. Aks holda eski versiya ishlaydi.
 *
 * Ikki xil ariza ikki xil varaqqa tushadi:
 *   /form     → "Form" varag'i     (anketa javoblari bilan)
 *   /contact  → "Kontakt" varag'i  (oddiy aloqa formasi)
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheetName = data.type === "form" ? "Form" : "Kontakt";
    delete data.type;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

    var keys = Object.keys(data);

    // Varaq bo'sh bo'lsa — sarlavhalarni yozamiz
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(keys);
      sheet.getRange(1, 1, 1, keys.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var headers = sheet
      .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1))
      .getValues()[0];

    // Yangi maydon paydo bo'lsa — oxiriga ustun qo'shamiz
    keys.forEach(function (key) {
      if (headers.indexOf(key) === -1) {
        headers.push(key);
        sheet.getRange(1, headers.length).setValue(key).setFontWeight("bold");
      }
    });

    var row = headers.map(function (header) {
      var value = data[header];
      return value === undefined || value === null ? "" : value;
    });

    sheet.appendRow(row);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Deployment tirikligini brauzerdan tekshirish uchun */
function doGet() {
  return json({ ok: true, status: "ishlayapti" });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
