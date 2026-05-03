import { StaticImageData } from "next/image";

export type Locale = "en" | "vi";

export type LocalizedText = {
  en: string;
  vi: string;
};

export type Category = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  coverImage: StaticImageData;
  banner: StaticImageData;
};

export type Product = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  details: LocalizedText;
  categorySlug: string;
  priceUsd: number;
  image: StaticImageData;
  colors: StaticImageData[]
};

export type SiteContent = {
  brand: LocalizedText;
  heroTitle: LocalizedText;
  heroSubtitle: LocalizedText;
  heroCtaPrimary: LocalizedText;
  heroCtaSecondary: LocalizedText;
  footerTagline: LocalizedText;
};
