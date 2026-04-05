import type { Metadata } from "next";
import { Inter, Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://darslinker.agency"),
  title: {
    default: "Darslinker Agency — Ta'lim biznesi uchun IT yechimlar",
    template: "%s | Darslinker Agency",
  },
  description:
    "O'zbekistondagi ta'lim markazlari va xususiy o'qituvchilar uchun website yaratish, CRM/ERP tizimlar va SEO xizmatlari",
  keywords: [
    "ta'lim markazi website",
    "CRM/ERP tizim",
    "SEO xizmati",
    "o'qituvchi website",
    "darslinker",
    "ta'lim markazi CRM",
    "o'quv markazi uchun sayt",
    "ta'lim biznesi IT",
  ],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://darslinker.agency",
    siteName: "Darslinker Agency",
    title: "Darslinker Agency — Ta'lim biznesi uchun IT yechimlar",
    description:
      "O'zbekistondagi ta'lim markazlari va xususiy o'qituvchilar uchun website yaratish, CRM/ERP tizimlar va SEO xizmatlari",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darslinker Agency — Ta'lim biznesi uchun IT yechimlar",
    description:
      "O'zbekistondagi ta'lim markazlari va xususiy o'qituvchilar uchun website yaratish, CRM/ERP tizimlar va SEO xizmatlari",
  },
  alternates: {
    canonical: "https://darslinker.agency",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} ${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="Darslinker Agency Blog" href="/feed.xml" />
      </head>
      <body className="min-h-full flex flex-col bg-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Darslinker Agency",
              url: "https://darslinker.agency",
              logo: "https://darslinker.agency/icon.svg",
              description:
                "O'zbekistondagi ta'lim markazlari va xususiy o'qituvchilar uchun IT va marketing xizmatlari",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+998-77-305-47-55",
                contactType: "customer service",
                availableLanguage: ["uz", "ru"],
              },
              sameAs: [
                "https://t.me/DarslinkerAgency",
                "https://instagram.com/darslinker.agency",
                "https://linkedin.com/company/darslinker",
              ],
            }),
          }}
        />
        <PageWrapper>
          <Navbar />
          <main className="min-h-screen flex-1">{children}</main>
          <Footer />
        </PageWrapper>
      </body>
    </html>
  );
}
