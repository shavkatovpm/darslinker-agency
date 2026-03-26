import { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Darslinker Agency bilan bog'laning. Bepul konsultatsiya oling.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
