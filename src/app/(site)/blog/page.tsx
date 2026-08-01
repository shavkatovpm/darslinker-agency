import { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/blog";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ta'lim biznesi uchun foydali maqolalar: website, CRM, SEO va marketing bo'yicha maslahatlar",
  openGraph: {
    title: "Blog — Darslinker Agency",
    description:
      "Ta'lim biznesi uchun foydali maqolalar: website, CRM, SEO va marketing bo'yicha maslahatlar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Darslinker Agency",
    description:
      "Ta'lim biznesi uchun foydali maqolalar: website, CRM, SEO va marketing bo'yicha maslahatlar",
  },
  alternates: {
    canonical: "https://darslinker.agency/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return <BlogPageClient posts={posts} categories={categories} />;
}
