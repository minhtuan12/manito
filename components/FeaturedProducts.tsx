import { Box, Grid2 as Grid, Typography } from "@mui/material";
import type { Locale } from "@/types/domain";
import type { StorefrontCategory, StorefrontProduct } from "@/lib/catalog";
import type { ReturnTypeGetDictionary } from "@/lib/types-local";
import Image from "next/image";
import Link from "next/link";

type FeaturedProductsProps = {
  locale: Locale;
  products: StorefrontProduct[];
  categories: StorefrontCategory[];
  dictionary: ReturnTypeGetDictionary;
};

function FeaturedCard({
  locale,
  mainImage,
  subImage,
  cat,
  href,
  isReverse = false,
}: {
  locale: string;
  mainImage: string;
  subImage: string;
  cat: string;
  href: string;
  isReverse?: boolean;
}) {
  return (
    <Box
      display={"flex"}
      flexDirection={isReverse ? "row-reverse" : "row"}
      width={"100%"}
      alignItems="stretch"
    >
      <Grid
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        flex={1}
        width={1 / 2}
        maxWidth={1 / 2}
        alignItems={"center"}
        justifyContent={"center"}
        px={9}
        py={6}
        boxSizing={"border-box"}
      >
        <Typography fontSize={22} color="#555656" mb={2.5}>
          {cat}
        </Typography>
        <Image
          src={subImage}
          alt={cat}
          width={600}
          height={731}
          style={{ width: "100%", height: "100%", marginBottom: 20 }}
        />
        <Link
          href={href}
          style={{
            paddingInline: 40,
            fontSize: 14,
            fontWeight: 600,
            color: "#555656",
            border: "1px solid #555656",
            padding: "8px 16px",
            textDecoration: "none",
          }}
        >
          {locale === "en" ? "VIEW ALL" : "XEM TẤT CẢ"}
        </Link>
      </Grid>
      <Box flex={1} position="relative" minHeight={500}>
        <Image
          src={mainImage}
          alt={cat}
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
}

export function FeaturedProducts({
  locale,
  products,
  categories,
  dictionary,
}: FeaturedProductsProps) {
  const sections = categories
    .map((category) => {
      const categoryProducts = products.filter((product) =>
        product.categoryPath === category.path ||
        product.categoryPath.startsWith(`${category.path}/`),
      );

      const mainImage = categoryProducts[0]?.primaryImage ?? category.banner;
      const subImage = categoryProducts[1]?.primaryImage ?? category.coverImage;

      return {
        id: category.id,
        href: `/${locale}/category/${category.path}`,
        label: category.title[locale],
        mainImage,
        subImage,
      };
    })
    .filter((section) => !!section.mainImage && !!section.subImage);

  return (
    <Box
      sx={{ backgroundColor: "#f2f0e1" }}
      display="flex"
      flexDirection={{ xs: "column" }}
      minHeight={{ xs: "auto", md: 600 }}
      gap={{ xs: 3, md: 0 }}
    >
      {sections.map((section, index) => (
        <FeaturedCard
          key={section.id}
          locale={locale}
          cat={section.label}
          href={section.href}
          mainImage={section.mainImage}
          subImage={section.subImage}
          isReverse={index % 2 === 1}
        />
      ))}
    </Box>
  );
}
