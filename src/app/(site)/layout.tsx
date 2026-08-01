import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";

/**
 * Saytning umumiy ko'rinishi — navbar va footer.
 * `/form` bu guruhdan tashqarida, shuning uchun u toza ekranda ochiladi.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen flex-1">{children}</main>
      <Footer />
    </PageWrapper>
  );
}
