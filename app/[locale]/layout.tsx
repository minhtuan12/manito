import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GoToTopButton } from "@/components/GoToTopButton";
import { PromoChrome } from "@/components/PromoChrome";
import { ensureLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { TranslationProvider } from "@/lib/useTranslation";
import { Box } from "@mui/material";

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
      <PromoChrome locale={locale} />
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        pathWithoutLocale=""
      />
      <Box pt={{ xs: 10, md: 13 }}>
        {children}
      </Box>
      <SiteFooter locale={locale} />
      <GoToTopButton />
    </TranslationProvider>
  );
}
