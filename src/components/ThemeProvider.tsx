"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "cobalt" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "cobalt",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("cobalt");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sp-theme") as ThemeMode | null;
    if (saved && (saved === "cobalt" || saved === "dark")) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "cobalt" ? "dark" : "cobalt";
    setTheme(nextTheme);
    localStorage.setItem("sp-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
