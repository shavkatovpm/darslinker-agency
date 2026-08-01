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
    ...(service.packages && service.packages.length > 0
      ? {
          offers: service.packages.map((pkg) => ({
            "@type": "Offer",
            name: pkg.name,
            price: pkg.priceValue,
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: pkg.priceValue,
              priceCurrency: "USD",
              unitText: pkg.priceUnit === "monthly" ? "MONTH" : "ONE_TIME",
            },
            description: pkg.features.join("; "),
            availability: "https://schema.org/InStock",
            url: `https://darslinker.agency/services/${slug}`,
          })),
        }
      : {}),
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

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${service.title} — Darslinker Agency bilan ishlash jarayoni`,
    description: service.heroDesc,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Bog'laning",
        text: "Bepul konsultatsiya orqali ehtiyojlaringizni muhokama qilamiz va aniq taklif tayyorlaymiz.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Biz ishlaymiz",
        text: "Darslinker Agency jamoasi loyihangizni professional darajada amalga oshiradi — har bir bosqichda siz bilan aloqada bo'lamiz.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Natija oling",
        text: "Tayyor mahsulotni siz qabul qilasiz va to'liq qo'llab-quvvatlash bilan ishga tushiramiz.",
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ServicePageClient service={service} />
    </>
  );
}
