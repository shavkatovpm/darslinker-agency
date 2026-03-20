import { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/blog";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ta'lim biznesi uchun foydali maqolalar: website, CRM, SEO va marketing bo'yicha maslahatlar",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return <BlogPageClient posts={posts} categories={categories} />;
}
