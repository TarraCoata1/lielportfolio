import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "he" | "en";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  dir: "rtl" | "ltr";
  t: <T>(map: { he: T; en: T }) => T;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("he");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "he" || saved === "en") setLocaleState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = locale === "he" ? "rtl" : "ltr";
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") localStorage.setItem("locale", l);
  };

  const value: Ctx = {
    locale,
    setLocale,
    dir: locale === "he" ? "rtl" : "ltr",
    t: (map) => map[locale],
  };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const c = useContext(I18nContext);
  if (!c) throw new Error("useI18n must be inside I18nProvider");
  return c;
}
