import { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/constants";
import { ServicePageClient } from "./ServicePageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} — Ta'lim biznesi uchun`,
    description: service.heroDesc,
    openGraph: {
      type: "website",
      title: `${service.title} — Darslinker Agency`,
      description: service.heroDesc,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — Darslinker Agency`,
      description: service.heroDesc,
    },
    alternates: {
      canonical: `https://darslinker.agency/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.heroDesc,
    provider: {
      "@type": "Organization",
      name: "Darslinker Agency",
      url: "https://darslinker.agency",
    },
    url: `https://darslinker.agency/services/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: "https://darslinker.agency" },
      { "@type": "ListItem", position: 2, name: "Xizmatlar", item: "https://darslinker.agency/#services" },
      { "@type": "ListItem", position: 3, name: service.title, item: `https://darslinker.agency/services/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicePageClient service={service} />
    </>
  );
}
