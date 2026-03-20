import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Darslinker Agency — Ta'lim biznesi uchun IT yechimlar",
    template: "%s | Darslinker Agency",
  },
  description:
    "O'zbekistondagi ta'lim markazlari va xususiy o'qituvchilar uchun website yaratish, CRM tizimlar va SEO xizmatlari",
  keywords: [
    "ta'lim markazi website",
    "CRM tizim",
    "SEO xizmati",
    "o'qituvchi website",
    "darslinker",
  ],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://darslinker.agency",
    siteName: "Darslinker Agency",
    title: "Darslinker Agency — Ta'lim biznesi uchun IT yechimlar",
    description:
      "O'zbekistondagi ta'lim markazlari va xususiy o'qituvchilar uchun website yaratish, CRM tizimlar va SEO xizmatlari",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-primary">
        <PageWrapper>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PageWrapper>
      </body>
    </html>
  );
}
