import type { Metadata } from "next";
import { FormClient } from "./FormClient";

export const metadata: Metadata = {
  title: "Bepul konsultatsiya uchun ariza",
  description:
    "Bir necha savolga javob bering — biznesingizga mos yechim va taxminiy narxni tayyorlab, siz bilan bog'lanamiz.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://darslinker.agency/form",
  },
};

export default function FormPage() {
  return <FormClient />;
}
