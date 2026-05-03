import { redirect } from "next/navigation";
import type { Locale } from "@/types/domain";

export const locales: Locale[] = ["en", "vi"];
export const defaultLocale: Locale = "en";

export function isLocale(input: string): input is Locale {
  return locales.includes(input as Locale);
}

export function ensureLocale(input: string): Locale {
  if (!isLocale(input)) {
    redirect(`/${defaultLocale}`);
  }
  return input;
}
