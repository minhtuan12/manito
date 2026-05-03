import { notFound } from "next/navigation";
import { ensureLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductDetail from "./ProductDetail";

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);
  const product = products.find((item) => item.slug === slug);
  const category = categories.find(
    (item) => item.slug === product?.categorySlug,
  );

  if (!product) {
    notFound();
  }

  return (
    <ProductDetail
      dictionary={dictionary}
      product={product}
      category={category}
      locale={locale}
    />
  );
}
