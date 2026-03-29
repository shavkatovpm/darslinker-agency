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
  { label: "Portfolio", href: "/portfolio" },
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
        desc: "1 soniyadan kam vaqtda yuklanadi",
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
        a: "Cheklovsiz — o'qituvchilar, administratorlar va boshqaruvchilar bir vaqtda ishlaydi.",
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
    faq: [
      {
        q: "SEO natijasi qachon ko'rinadi?",
        a: "Odatda 2-3 oy ichida dastlabki natijalar ko'rinadi. To'liq effekt 4-6 oyda seziladi.",
      },
      {
        q: "SEO va reklama farqi nima?",
        a: "Reklama to'xtatilsa mijoz ham to'xtaydi. SEO esa bir marta investitsiya — uzoq muddatda doimiy bepul trafik beradi.",
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
    ],
  },
];

export const stats = [
  { value: "10+", label: "Loyihalar" },
  { value: "10+", label: "Mamnun mijozlar" },
  { value: "2+", label: "Yillik tajriba" },
  { value: "24/7", label: "Qo'llab-quvvatlash" },
];

export const portfolioItems = [
  {
    name: "EduCenter",
    logo: "/portfolio/educenter.svg",
    url: "#",
  },
  {
    name: "MasterClass UZ",
    logo: "/portfolio/masterclass.svg",
    url: "#",
  },
  {
    name: "SmartEdu",
    logo: "/portfolio/smartedu.svg",
    url: "#",
  },
  {
    name: "TutorPro",
    logo: "/portfolio/tutorpro.svg",
    url: "#",
  },
  {
    name: "LinguaHub",
    logo: "/portfolio/linguahub.svg",
    url: "#",
  },
  {
    name: "MathGenius",
    logo: "/portfolio/mathgenius.svg",
    url: "#",
  },
];
