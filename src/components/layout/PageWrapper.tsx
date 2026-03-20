"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 0.1s ease",
      }}
    >
      {children}
    </div>
  );
}
