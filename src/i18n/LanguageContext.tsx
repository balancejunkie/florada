"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translations, type Locale, type Translations } from "./translations";

type LanguageContextType = {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "pt",
  t: translations.pt,
  toggleLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && (saved === "pt" || saved === "en")) {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = () => {
    const next = locale === "pt" ? "en" : "pt";
    setLocale(next);
    localStorage.setItem("locale", next);
  };

  return (
    <LanguageContext.Provider
      value={{ locale, t: translations[locale], toggleLocale }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
