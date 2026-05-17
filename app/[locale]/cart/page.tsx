import { ensureLocale } from "@/lib/i18n";
import { CartPageClient } from "@/components/storefront/CartViews";

type CartPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CartPage({ params }: CartPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);

  return <CartPageClient locale={locale} />;
}
