import { HeroSection } from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoryGrid } from "@/components/CategoryGrid";
import { DiscoverMoreSection } from "@/components/DiscoverMoreSection";
import { ensureLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { siteContent } from "@/data/site-content";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);

  return (
    <>
      <HeroSection
        locale={locale}
        title={siteContent.heroTitle[locale]}
        subtitle={siteContent.heroSubtitle[locale]}
        ctaPrimary={siteContent.heroCtaPrimary[locale]}
        ctaSecondary={siteContent.heroCtaSecondary[locale]}
      />
      <CategoryGrid locale={locale} categories={categories} dictionary={dictionary} />
      <FeaturedProducts locale={locale} products={products} dictionary={dictionary} />
      <DiscoverMoreSection locale={locale} />
    </>
  );
}
