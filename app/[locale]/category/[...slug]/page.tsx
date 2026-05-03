import { notFound } from "next/navigation";
import { Grid2 as Grid, Grid2, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { SectionTitle } from "@/components/SectionTitle";
import Image from "next/image";
import Filter from "../Filter";
import CardItem from "@/components/CardItem";
import { Breadcrumb } from "@/components/Breadcrumb";

type CategoryPageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = ensureLocale(localeParam);
  const categorySlug = slug[slug.length - 1];
  const category = categories.find((item) => item.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const filtered = products.filter((item) => item.categorySlug === category.slug);

  return (
    <>
      <SectionTitle title={category.title[locale]} subtitle={category.description[locale]} />
      <Image src={category.banner} style={{ width: "100%", height: "auto" }} alt={category.slug} />
      <Grid2 px={2} pt={5}>
        <Breadcrumb
          items={[
            { href: `/${locale}`, label: locale === "en" ? "Home" : "Trang chủ" },
            { label: category.title[locale] },
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
            {filtered.map((product) => (
              <Grid
                key={product.id}
                size={{ xs: 12, sm: 6, md: 3 }}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <CardItem
                  coverImage={product.image}
                  href={`/${locale}/products/${product.slug}`}
                  title={product.title[locale]}
                />
                <Typography mt={2} mb={0.5} color="#7A7D81" fontWeight={600} fontSize={16}>
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

