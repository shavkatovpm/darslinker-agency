export const siteConfig = {
  name: "Darslinker Agency",
  description:
    "O'zbekistondagi ta'lim markazlari va xususiy o'qituvchilar uchun IT va marketing xizmatlari",
  url: "https://darslinker.agency",
  phone: "+998 77 305 47 55",
  telegram: "https://t.me/DarslinkerAgency",
  instagram: "https://instagram.com/darslinker.agency",
  linkedin: "https://linkedin.com/company/darslinker",
  email: "info@darslinker.agency",
};

export const navLinks = [
  { label: "Xizmatlar", href: "/#services" },
  { label: "Aloqa", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export const services = [
  {
    slug: "website",
    title: "Website ishlab chiqish",
    shortDesc: "Konversiya qiladigan professional website",
    heroTitle: "Ta'lim markazingizning websitesi yo'qmi yoki eskirganmi?",
    heroDesc:
      "Zamonaviy, tez va mobil-qulay website bilan mijozlar sizni topadi va ishonadi.",
    problems: [
      "Websitengiz yo'q — potensial mijozlar sizni topa olmaydi",
      "Eskirgan dizayn — tashrif buyuruvchilar ishonch bildirmaydi",
      "Mobil qurilmalarda to'g'ri ko'rinmaydi",
      "Raqobatchilaringiz allaqachon zamonaviy websitega ega",
    ],
    solution:
      "Biz sizga tez, zamonaviy va SEO-optimallashtirilgan website yaratamiz. Har bir sahifa konversiyaga yo'naltirilgan — tashrif buyuruvchilar mijozlarga aylanadi.",
    features: [
      {
        title: "Mobile-first dizayn",
        desc: "Barcha qurilmalarda mukammal ko'rinish",
      },
      {
        title: "Tez yuklash",
        desc: "Tez yuklanish uchun optimallashtirilgan",
      },
      {
        title: "SEO optimizatsiya",
        desc: "Google'da yuqori o'rinlarga chiqish",
      },
      {
        title: "Konversiya fokus",
        desc: "Har sahifa mijoz olishga yo'naltirilgan",
      },
      {
        title: "Admin panel",
        desc: "Kontentni o'zingiz boshqaring",
      },
      {
        title: "Analitika",
        desc: "Tashriflar va konversiyalarni kuzating",
      },
    ],
    sections: [
      {
        title: "Ta'lim markazi uchun website nima uchun kerak?",
        body: "Bugungi kunda ota-onalar farzandlari uchun o'quv markaz izlashni Google'dan boshlaydi. Agar sizning websitengiz bo'lmasa yoki eskirgan bo'lsa — siz bu mijozlarni raqobatchilaringizga berib yuboryapsiz. Professional website 24/7 ishlaydigan sotuvchi vazifasini bajaradi: tunda ham, dam olish kunlari ham yangi mijozlarni jalb qiladi. Websitesi bor ta'lim markaz professional va ishonchli ko'rinadi — bu esa ota-onalar uchun muhim omil.",
      },
      {
        title: "Qanday website yaratamiz?",
        body: "Biz oddiy vizitka sayt emas, konversiyaga yo'naltirilgan website yaratamiz. Har bir sahifa aniq maqsadga ega: tashrif buyuruvchini ariza qoldirishga yoki qo'ng'iroq qilishga undash. Sayt mobil qurilmalarda mukammal ishlaydi — chunki tashrif buyuruvchilarning katta qismi telefondan kiradi. Yuklash tezligi 1 soniyadan kam — 3 soniyadan ortiq kutgan odam shunchaki ketib qoladi.",
      },
      {
        title: "Website va CRM — birga kuchliroq",
        body: "Website faqat chiroyli sahifa emas — u biznesingizning raqamli asosi. Websitedan kelgan arizalar to'g'ridan-to'g'ri CRM tizimiga tushishi mumkin. Shunda hech bir mijoz yo'qolmaydi, har biriga o'z vaqtida javob beriladi. Darslinker Agency'da biz websiteni alohida emas, butun raqamli ekotizim sifatida loyihalashtiramiz.",
        link: { text: "CRM/ERP tizim haqida batafsil", href: "/services/crm" },
      },
    ],
    faq: [
      {
        q: "Website qancha vaqtda tayyor bo'ladi?",
        a: "Oddiy landing page 5-7 kun, ko'p sahifali website 2-3 hafta ichida tayyor bo'ladi.",
      },
      {
        q: "Website narxi qancha?",
        a: "Narx loyihaning murakkabligiga bog'liq. Bepul konsultatsiya orqali aniq narxni bilib olishingiz mumkin.",
      },
      {
        q: "Websiteni o'zim yangilay olamanmi?",
        a: "Ha, biz admin panel bilan birga taqdim etamiz. Siz kontentni mustaqil ravishda yangilaysiz.",
      },
      {
        q: "Hosting va domenga yordam berasizmi?",
        a: "Albatta, biz domen tanlash va hosting sozlashda to'liq yordam beramiz.",
      },
      {
        q: "Keyinchalik qo'shimcha funksiya qo'shish mumkinmi?",
        a: "Ha, website kengaytiriladigan arxitekturada quriladi. Istalgan vaqtda yangi funksiyalar qo'shiladi.",
      },
      {
        q: "SEO ham kirganmi?",
        a: "Ha, asosiy SEO optimizatsiya websitega kiritilgan — to'g'ri HTML struktura, meta teglar va sayt tezligi. Chuqurroq SEO uchun alohida xizmatimiz bor.",
      },
      {
        q: "Websiteni kim ishlab chiqadi?",
        a: "Darslinker Agency jamoasi — ta'lim sohasiga ixtisoslashgan dasturchilar va dizaynerlar.",
      },
    ],
  },
  {
    slug: "crm",
    title: "CRM/ERP tizim",
    shortDesc: "O'quvchi, to'lov, jadval — barchasi bir tizimda",
    heroTitle: "Hali ham Excel yoki daftarda o'quvchi bazasini yuritasizmi?",
    heroDesc:
      "Barcha ma'lumotlarni bitta tizimga yig'ing. Vaqtingizni tejang, xatolarni kamaytiring.",
    problems: [
      "O'quvchilar ro'yxati Excel, daftar va telefonlar orasida tarqoq",
      "To'lovlarni kuzatish qiyin — kim to'lagan, kim to'lamagan",
      "Jadval tuzish va dars vaqtlarini boshqarish murakkab",
      "O'quvchi ketib qolsa — sababini bilmaysiz",
    ],
    solution:
      "Bizning CRM/ERP tizimmiz barcha ma'lumotlarni bir joyga yig'adi. O'quvchi ro'yxati, to'lovlar, jadval, davomat — hammasi bitta platformada.",
    features: [
      {
        title: "O'quvchi bazasi",
        desc: "Barcha o'quvchilar bir joyda, izlash oson",
      },
      {
        title: "To'lov kuzatuv",
        desc: "Avtomatik eslatmalar va to'lov tarixi",
      },
      {
        title: "Jadval boshqaruvi",
        desc: "Dars vaqtlari va xonalar boshqaruvi",
      },
      {
        title: "Davomat tizimi",
        desc: "QR-kod yoki bir tugma bilan davomat",
      },
      {
        title: "Hisobotlar",
        desc: "Moliyaviy va o'quv hisobotlari",
      },
      {
        title: "Telegram bildirishnoma",
        desc: "Muhim hodisalar haqida xabar",
      },
    ],
    sections: [
      {
        title: "CRM tizimi o'quv markazga qanday yordam beradi?",
        body: "O'quv markaz o'sgani sari ma'muriy ish ham oshadi: to'lovlar, davomat, jadvallar, yangi o'quvchilar. CRM tizimi bularning hammasini avtomatlashtiradi. Administrator kuniga 2-3 soat sarflaydigan ishlarni tizim bir necha daqiqada bajaradi. To'lov muddati yaqinlashganda ota-onalarga Telegram orqali avtomatik eslatma ketadi. O'quvchi ketma-ket kelmasa — tizim sizga signal beradi.",
      },
      {
        title: "Excel'dan CRM'ga o'tish qiyinmi?",
        body: "Yo'q. Mavjud Excel bazangiz CRM'ga import qilinadi. Biz jamoangizni o'rgatamiz va birinchi 1-2 hafta parallel ishlashni tavsiya qilamiz — xavfsizlik uchun. Hech qanday ma'lumot yo'qolmaydi. O'tish jarayoni odatda 1-2 hafta ichida tugaydi va siz darhol farqni sezasiz: vaqt tejamkorligi, kamroq xatolar, aniq hisobotlar.",
      },
      {
        title: "Website bilan birgalikda — to'liq ekotizim",
        body: "CRM tizimi alohida ishlashi mumkin, lekin professional website bilan birgalikda u yanada kuchliroq. Websitedan kelgan arizalar to'g'ridan-to'g'ri CRM'ga tushadi — hech bir lead yo'qolmaydi. Darslinker Agency'da biz aynan shu yondashuvni qo'llaymiz: website + CRM = yopiq ekotizim. Natijada siz faqat bitta paneldan barcha jarayonlarni boshqarasiz.",
        link: { text: "Website xizmati haqida batafsil", href: "/services/website" },
      },
    ],
    faq: [
      {
        q: "CRM/ERP tizim qancha turadi?",
        a: "Narx o'quvchilar soni va kerakli funksiyalarga bog'liq. Bepul konsultatsiyada aniq narxni aytamiz.",
      },
      {
        q: "Mavjud o'quvchi bazasini import qilsa bo'ladimi?",
        a: "Ha, Excel yoki boshqa formatdagi ma'lumotlarni tizimga oson import qilish mumkin.",
      },
      {
        q: "Mobil telefondan foydalanish mumkinmi?",
        a: "Ha, tizim to'liq responsive — telefon, planshet va kompyuterda ishlaydi.",
      },
      {
        q: "Ma'lumotlar xavfsizmi?",
        a: "Ha, barcha ma'lumotlar shifrlangan serverda saqlanadi va faqat siz kirishingiz mumkin.",
      },
      {
        q: "Nechta foydalanuvchi ishlashi mumkin?",
        a: "Bir nechta foydalanuvchi — o'qituvchilar, administratorlar va boshqaruvchilar bir vaqtda ishlashi mumkin.",
      },
      {
        q: "Telegram bilan integratsiya bormi?",
        a: "Ha. To'lov eslatmasi, davomat ma'lumoti, dars o'zgarishi — barchasi ota-onalarga Telegram bot orqali avtomatik yuboriladi.",
      },
      {
        q: "CRM tizimini kim ishlab chiqadi?",
        a: "Darslinker Agency jamoasi har bir o'quv markaz uchun individual CRM tizimini noldan ishlab chiqadi va joriy qiladi.",
      },
    ],
  },
  {
    slug: "seo",
    title: "SEO xizmati",
    shortDesc: "Google'da topga chiqing, doimiy organik mijozlar",
    heroTitle: "Reklama to'xtasa, mijozlar ham to'xtaydimi?",
    heroDesc:
      "SEO bilan Google'dan doimiy, bepul mijoz oqimi yarating. Reklama budjetini kamaytiring.",
    problems: [
      "Google'da qidirsangiz, raqobatchilar birinchi chiqadi",
      "Faqat reklamaga bog'liksiz — to'lov to'xtasa, mijoz ham to'xtaydi",
      "Websitengiz bor, lekin undan mijoz kelmaydi",
      "Qaysi kalit so'zlar kerakligini bilmaysiz",
    ],
    solution:
      "Biz sizning websitengizni Google'da yuqori o'rinlarga chiqaramiz. Texnik optimizatsiya, kontent strategiya va backlink — hammasi bir xizmatda.",
    features: [
      {
        title: "Kalit so'z tahlili",
        desc: "Maqsadli auditoriya izlaydigan so'zlar",
      },
      {
        title: "Texnik SEO",
        desc: "Sayt tezligi, struktura, indexlash",
      },
      {
        title: "Kontent strategiya",
        desc: "SEO-optimallashtirilgan blog maqolalari",
      },
      {
        title: "Local SEO",
        desc: "Google Maps va mahalliy qidiruvda ko'rinish",
      },
      {
        title: "Backlink building",
        desc: "Sifatli tashqi havolalar olish",
      },
      {
        title: "Oylik hisobot",
        desc: "Natijalar va o'sish ko'rsatkichlari",
      },
    ],
    sections: [
      {
        title: "SEO nima va u ta'lim biznesiga qanday yordam beradi?",
        body: "SEO — bu websitengizni Google qidiruv natijalarida yuqori o'rinlarga chiqarish jarayoni. \"Toshkentda ingliz tili kursi\" yoki \"yaqinimdagi matematika repetitor\" deb qidirgan odam sizning saytingizni ko'radi va murojaat qiladi. Reklamadan farqi — SEO bir marta investitsiya qilsangiz, uzoq muddatda doimiy natija beradi. Reklama to'xtatilsa trafik ham to'xtaydi, SEO esa ishlashda davom etadi.",
      },
      {
        title: "Qanday natija kutish mumkin?",
        body: "SEO — tezkor natija emas. Odatda dastlabki o'zgarishlar 2-3 oyda ko'rinadi, barqaror natijalar 4-6 oyda shakllanadi. Lekin bu vaqt o'tgach siz doimiy, bepul trafik olasiz — reklama budjetisiz. Biz har oy sizga hisobot taqdim etamiz: qaysi kalit so'zlarda o'sish bor, qancha yangi tashrif buyuruvchi keldi, konversiya qanday. Shaffof jarayon — siz har doim natijani ko'rasiz.",
      },
      {
        title: "SEO va website — ajralmas juftlik",
        body: "SEO faqat websitengiz bo'lgandagina ishlaydi. Agar websitengiz eskirgan, sekin yoki mobil qurilmalarda noto'g'ri ko'rinsa — SEO natija bermaydi. Shu sababdan Darslinker Agency'da biz avval websiteni tekshiramiz va kerak bo'lsa texnik jihatlarni tuzatamiz, keyin SEO strategiyasini boshlaymiz. Natijada siz Google'dan kelgan har bir tashrif buyuruvchini mijozga aylantirasiz.",
        link: { text: "Website xizmati haqida batafsil", href: "/services/website" },
      },
    ],
    faq: [
      {
        q: "SEO natijasi qachon ko'rinadi?",
        a: "Odatda 2-3 oy ichida dastlabki natijalar ko'rinadi. Barqaror natijalar 4-6 oyda shakllanadi.",
      },
      {
        q: "SEO va reklama farqi nima?",
        a: "Reklama to'xtatilsa trafik ham to'xtaydi. SEO esa bir marta investitsiya — uzoq muddatda doimiy bepul trafik beradi.",
      },
      {
        q: "Qaysi kalit so'zlarga e'tibor berasiz?",
        a: "Sizning soha va joylashuvingizga mos, mijozlar izlaydigan kalit so'zlarni tahlil qilib tanlaymiz.",
      },
      {
        q: "SEO xizmati narxi qancha?",
        a: "Narx loyihaning ko'lamiga bog'liq. Bepul audit orqali aniq taklifni tayyorlaymiz.",
      },
      {
        q: "O'zim SEO qila olamanmi?",
        a: "Asosiy bilimlarni o'rgatamiz, lekin professional natija uchun mutaxassis kerak. Biz sizga vaqt va xarajatni tejashda yordam beramiz.",
      },
      {
        q: "Websitesiz SEO qilsa bo'ladimi?",
        a: "Yo'q. SEO faqat websitengiz bo'lganda ishlaydi. Avval website kerak, keyin SEO strategiyasi qo'llaniladi.",
      },
      {
        q: "SEO xizmatini kim ko'rsatadi?",
        a: "Darslinker Agency jamoasi — ta'lim sohasiga ixtisoslashgan SEO mutaxassislari. Biz har oy hisobot va natijalarni shaffof ko'rsatamiz.",
      },
    ],
  },
];

export const stats = [
  { value: "10+", label: "Loyihalar" },
  { value: "10+", label: "Mamnun mijozlar" },
  { value: "2+", label: "Yillik tajriba" },
  { value: "24/7", label: "Qo'llab-quvvatlash" },
];

