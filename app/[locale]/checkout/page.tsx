import { ensureLocale } from "@/lib/i18n";
import { CheckoutPageClient } from "@/components/storefront/CartViews";

type CheckoutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);

  return <CheckoutPageClient locale={locale} />;
}
