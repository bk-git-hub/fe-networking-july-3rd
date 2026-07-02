"use client";

import { createContext, useContext, useRef } from "react";
import { usePathname } from "next/navigation";

const LessonActivationContext = createContext("initial");

export function useLessonActivationKey() {
  return useContext(LessonActivationContext);
}

export function LessonContentShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const activationRef = useRef({ pathname, count: 0 });

  if (activationRef.current.pathname !== pathname) {
    activationRef.current = {
      pathname,
      count: activationRef.current.count + 1,
    };
  }

  const activationKey = `${pathname}:${activationRef.current.count}`;

  return (
    <LessonActivationContext.Provider value={activationKey}>
      <section className="lesson-content" key={activationKey}>
        {children}
      </section>
    </LessonActivationContext.Provider>
  );
}
