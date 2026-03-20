"use client";

import { LogoAnimated } from "@/components/ui/LogoAnimated";

export function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary">
      <LogoAnimated size={80} />
    </div>
  );
}
