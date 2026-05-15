import { notFound } from "next/navigation";
import { Box, Grid2 as Grid, Grid2, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { SectionTitle } from "@/components/SectionTitle";
import Image from "next/image";
import Filter from "../Filter";
import CardItem from "@/components/CardItem";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  getStorefrontCategoryAncestorsBySlug,
  getStorefrontProductsForCategoryPath,
} from "@/lib/storefront-data";

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
      <SectionTitle title={category.title[locale]} subtitle={category.description[locale]} />
      <Box position={'relative'} width={'100%'} minHeight={700} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Image src={category.banner} fill style={{ position: 'absolute' }} alt={category.slug} />
      </Box>
      <Grid2 px={22} pt={5}>
        <Breadcrumb
          items={[
            { href: `/${locale}`, label: locale === "en" ? "Home" : "Trang chủ" },
            ...ancestors.map((item) => ({
              href: `/${locale}/category/${item.path}`,
              label: item.title[locale],
            })),
          ]}
        />
        <Filter />
        <Grid
          position="relative"
          container
          spacing={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={5}
        >
          <Typography
            pt={3}
            color="#7A7D81"
            fontWeight={400}
            fontSize={30}
            letterSpacing={4}
            sx={{
              "&:before": {
                content: '""',
                width: "60px",
                height: "2px",
                backgroundColor: "#7A7D81",
                position: "absolute",
                top: 0,
                left: "50%",
                marginLeft: "-30px",
                zIndex: 1,
              },
            }}
          >
            {category.title[locale]}
          </Typography>
          <Grid2 container size={12} mt={2}>
            {products.map((product) => (
              <Grid
                key={product._id}
                size={{ xs: 12, sm: 6, md: 3 }}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <CardItem
                  coverImage={product?.images[0]}
                  href={`/${locale}/products/${product?.slug}`}
                  title={product?.title[locale]}
                  isNew={product?.isNew}
                />
                <Typography mt={2} mb={0.5} color="#7A7D81" fontWeight={900} fontSize={20}>
                  {product.title[locale]}
                </Typography>
                <Typography color="#7A7D81" fontWeight={400} fontSize={16} variant="subtitle1">
                  ${product.priceUsd}
                </Typography>
              </Grid>
            ))}
          </Grid2>
        </Grid>
      </Grid2>
    </>
  );
}
