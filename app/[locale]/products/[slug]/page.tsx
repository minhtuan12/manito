import { notFound } from "next/navigation";
import { ensureLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import ProductDetail from "./ProductDetail";
import Recommendation from "./Recommendation";
import {
  getStorefrontCategoryAncestorsBySlug,
  getStorefrontProductBySlug,
  getStorefrontProducts,
} from "@/lib/storefront-data";

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);
  const product = await getStorefrontProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [categoryAncestors, allProducts] = await Promise.all([
    getStorefrontCategoryAncestorsBySlug(product.categorySlug),
    getStorefrontProducts(),
  ]);
  const recommendationProducts = allProducts
    .filter(
      (item) =>
        item.categorySlug === product.categorySlug &&
        item.slug !== product.slug,
    )
    .slice(0, 10);

  return (
    <>
      <ProductDetail
        dictionary={dictionary}
        product={product}
        categoryAncestors={categoryAncestors}
        locale={locale}
      />
      <Recommendation
        dictionary={dictionary}
        locale={locale}
        recommendationProducts={recommendationProducts}
      />
    </>
  );
}
