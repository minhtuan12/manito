import type { ReactNode } from "react";
import { Container } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { AdminNav } from "@/components/AdminNav";

type AdminLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <AdminNav locale={locale} dictionary={dictionary} />
      {children}
    </Container>
  );
}
