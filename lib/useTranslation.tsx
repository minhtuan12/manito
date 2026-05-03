"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/types/domain";

type TranslationContextValue = {
  locale: Locale;
  dictionary: Dictionary;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

type TranslationProviderProps = {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
};

export function TranslationProvider({ locale, dictionary, children }: TranslationProviderProps) {
  return (
    <TranslationContext.Provider value={{ locale, dictionary }}>
      {children}
    </TranslationContext.Provider>
  );
}

type NestedStringKey<T> = T extends object
  ? {
      [K in Extract<keyof T, string>]: T[K] extends string
        ? K
        : T[K] extends object
          ? `${K}.${NestedStringKey<T[K]>}`
          : never;
    }[Extract<keyof T, string>]
  : never;

function getByPath(obj: unknown, path: string): string {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  if (typeof value === "string") {
    return value;
  }

  return path;
}

export function useTranslation() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }

  const { locale, dictionary } = context;

  return {
    locale,
    dictionary,
    t: <K extends NestedStringKey<Dictionary>>(key: K) => getByPath(dictionary, key)
  };
}
