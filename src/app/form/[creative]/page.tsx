import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { adThemes, getAdTheme } from "@/lib/adThemes";
import { getAdQuestions } from "@/lib/adQuestions";
import { tgPixelSnippet } from "@/lib/tgPixel";
import { AdFormClient } from "./AdFormClient";

type Props = {
  params: Promise<{ creative: string }>;
};

export async function generateStaticParams() {
  return adThemes.map((theme) => ({ creative: theme.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { creative } = await params;
  const theme = getAdTheme(creative);
  if (!theme) return {};

  const title = [theme.titleLead, theme.titleAccent, theme.titleTail]
    .filter(Boolean)
    .join(" ");

  return {
    title,
    description: theme.subtitle,
    // Reklama landing sahifalari qidiruvda indekslanmasligi kerak
    robots: { index: false, follow: false },
    openGraph: { title, description: theme.subtitle },
  };
}

export default async function AdFormPage({ params }: Props) {
  const { creative } = await params;
  const theme = getAdTheme(creative);
  const questions = getAdQuestions(creative);

  if (!theme || !questions) notFound();

  return (
    <>
      <AdFormClient theme={theme} />
      <Script
        id="telegram-ads-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: tgPixelSnippet }}
      />
    </>
  );
}
