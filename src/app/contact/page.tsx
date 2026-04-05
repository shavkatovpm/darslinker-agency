import { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Darslinker Agency bilan bog'laning. Bepul konsultatsiya oling.",
  openGraph: {
    title: "Kontakt — Darslinker Agency",
    description: "Darslinker Agency bilan bog'laning. Bepul konsultatsiya oling.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt — Darslinker Agency",
    description: "Darslinker Agency bilan bog'laning. Bepul konsultatsiya oling.",
  },
  alternates: {
    canonical: "https://darslinker.agency/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
