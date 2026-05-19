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
import { Box } from "@mui/material";

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
    <Box mt={{ xs: -10, md: -13 }}>
      <HeroSection locale={locale} />
      <CategoryGrid
        locale={locale}
        products={products}
        dictionary={dictionary}
      />
      <FeaturedProducts
        locale={locale}
        products={products}
        categories={categories}
        dictionary={dictionary}
      />
      <DiscoverMoreSection locale={locale} />
    </Box>
  );
}
