"use client";

import { useState, useEffect } from "react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div className={ready ? "page-ready" : "page-loading"}>
      {children}
    </div>
  );
}
