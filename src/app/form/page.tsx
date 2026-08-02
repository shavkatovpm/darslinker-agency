import type { Metadata } from "next";
import Script from "next/script";
import { FormClient } from "./FormClient";
import { tgPixelSnippet } from "@/lib/tgPixel";

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
  return (
    <>
      <FormClient />
      <Script
        id="telegram-ads-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: tgPixelSnippet }}
      />
    </>
  );
}
