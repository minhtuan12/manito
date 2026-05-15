import { HeroSection } from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoryGrid } from "@/components/CategoryGrid";
import { DiscoverMoreSection } from "@/components/DiscoverMoreSection";
import { ensureLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import {
  getStorefrontCategories,
  getStorefrontProducts,
} from "@/lib/storefront-data";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);
  const [products, categories] = await Promise.all([
    getStorefrontProducts(),
    getStorefrontCategories(),
  ]);

  return (
    <>
      <HeroSection locale={locale} />
      <CategoryGrid
        locale={locale}
        categories={categories}
        dictionary={dictionary}
      />
      <FeaturedProducts
        locale={locale}
        products={products}
        categories={categories}
        dictionary={dictionary}
      />
      <DiscoverMoreSection locale={locale} />
    </>
  );
}
