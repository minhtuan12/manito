import { Box, Grid2 as Grid, Typography } from "@mui/material";
import type { Locale, Product } from "@/types/domain";
import type { ReturnTypeGetDictionary } from "@/lib/types-local";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import WomenMainImage from "@/assets/images/manitosilk-sweetie.jpg";
import WomenSubImage from "@/assets/images/manitosilk-sweetie-new-600x731.jpg";
import MenMainImage from "@/assets/images/manitosilk-new-tropical.jpg";
import MenSubImage from "@/assets/images/manitosilk-new-tropical-BLUE-600x731.jpg";
import AccessMainImage from "@/assets/images/Bestie-Gift-Box-600x731.webp";
import AccessSubImage from "@/assets/images/manitosilk-summer-fruit.jpg";
import BeddingMainImage from "@/assets/images/manitosilk-bedding-new.jpg";
import BeddingSubImage from "@/assets/images/manitosilk-bedding-new-catogary-600x731.jpg";
import KidMainImage from "@/assets/images/MANITO-Kids2.webp";
import KidSubImage from "@/assets/images/Bestie-Gift-Box-600x731.webp";

type FeaturedProductsProps = {
  locale: Locale;
  products: Product[];
  dictionary: ReturnTypeGetDictionary;
};

function FeaturedCard({
  locale,
  mainImage,
  subImage,
  cat,
  isReverse = false,
}: {
  locale: string;
  mainImage: StaticImageData;
  subImage: StaticImageData;
  cat: string;
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
          style={{ width: "100%", height: "100%", marginBottom: 20 }}
        />
        <Link
          href={"#"}
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
          {locale === 'en' ? "VIEW ALL" : "XEM TẤT CẢ"}
        </Link>
      </Grid>
      <Box flex={1} position="relative">
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
  dictionary,
}: FeaturedProductsProps) {
  return (
    <Box
      sx={{ backgroundColor: "#f2f0e1" }}
      display="flex"
      flexDirection={{ xs: "column" }}
      minHeight={{ xs: "auto", md: 600 }}
      gap={{ xs: 3, md: 0 }}
    >
      <FeaturedCard
        locale={locale}
        cat={locale === 'en' ? "WOMEN" : "NỮ"}
        mainImage={WomenMainImage}
        subImage={WomenSubImage}
      />
      <FeaturedCard
        locale={locale}
        isReverse
        cat={locale === 'en' ? "MEN" : "NAM"}
        mainImage={MenMainImage}
        subImage={MenSubImage}
      />
      <FeaturedCard
        locale={locale}
        cat={locale === 'en' ? "ACCESSORIES" : "PHỤ KIỆN"}
        mainImage={AccessSubImage}
        subImage={AccessMainImage}
      />
      <FeaturedCard
        locale={locale}
        isReverse
        cat={locale === 'en' ? "BEDDING" : "BỘ ĐỒ GIƯỜNG"}
        mainImage={BeddingMainImage}
        subImage={BeddingSubImage}
      />
      <FeaturedCard
        locale={locale}
        cat={locale === 'en' ? "KIDS" : "TRẺ EM"}
        mainImage={KidMainImage}
        subImage={KidSubImage}
      />
    </Box>
  );
}
