import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GoToTopButton } from "@/components/GoToTopButton";
import { ensureLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { TranslationProvider } from "@/lib/useTranslation";
import { siteContent } from "@/data/site-content";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);

  return (
    <TranslationProvider locale={locale} dictionary={dictionary}>
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        brand={siteContent.brand[locale]}
        pathWithoutLocale=""
      />
      {children}
      <SiteFooter tagline={siteContent.footerTagline[locale]} locale={locale} />
      <GoToTopButton />
    </TranslationProvider>
  );
}
