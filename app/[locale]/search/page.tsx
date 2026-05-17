import { ensureLocale } from "@/lib/i18n";
import { getStorefrontProducts } from "@/lib/storefront-data";
import { SearchPageClient } from "./SearchPageClient";

type SearchPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SearchPage({ params }: SearchPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const products = await getStorefrontProducts();

  return <SearchPageClient locale={locale} products={products} />;
}
