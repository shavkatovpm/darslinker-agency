import { Metadata } from "next";
import { PortfolioPageClient } from "./PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Darslinker Agency tomonidan yaratilgan loyihalar va hamkor brendlar",
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
