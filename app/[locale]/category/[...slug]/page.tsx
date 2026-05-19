import { notFound } from "next/navigation";
import { Box, Grid2 } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  getStorefrontCategoryAncestorsBySlug,
  getStorefrontProductsForCategoryPath,
} from "@/lib/storefront-data";
import { CategoryProductsClient } from "../CategoryProductsClient";
import { getAvailableSizes } from "@/lib/product-filters";

type CategoryPageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = ensureLocale(localeParam);
  const { category, products } = await getStorefrontProductsForCategoryPath(slug);

  if (!category) {
    notFound();
  }

  const ancestors = await getStorefrontCategoryAncestorsBySlug(category.slug);

  return (
    <>
      <Box position={'relative'} width={'100%'} minHeight={{ xs: 200, md: 750 }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Image src={category.banner} fill style={{ position: 'absolute' }} alt={category.slug} />
      </Box>
      <Grid2 px={{ xs: 4, md: 10, xl: 22 }} pt={5}>
        <Breadcrumb
          items={[
            { href: `/${locale}`, label: locale === "en" ? "Home" : "Trang chủ" },
            ...ancestors.map((item) => ({
              href: `/${locale}/category/${item.path}`,
              label: item.title[locale],
            })),
          ]}
        />
        <CategoryProductsClient
          locale={locale}
          categoryPath={slug.join("/")}
          categoryTitle={category.title[locale]}
          initialProducts={products}
          initialSizes={getAvailableSizes(products)}
        />
      </Grid2>
    </>
  );
}
