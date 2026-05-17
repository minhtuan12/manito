import Image from "next/image";
import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import type { Locale } from "@/types/domain";
import type { StorefrontProduct } from "@/lib/catalog";
import type { ReturnTypeGetDictionary } from "@/lib/types-local";
import { stripHtml } from "@/lib/richText";

type ProductCardProps = {
  product: StorefrontProduct;
  locale: Locale;
  dictionary: ReturnTypeGetDictionary;
};

export function ProductCard({ product, locale, dictionary }: ProductCardProps) {
  const shortDescription = stripHtml(product.description[locale]);

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      <Box sx={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden" }}>
        <Image src={product.images?.[0]} alt={product.title[locale]} fill style={{ objectFit: "cover" }} />
      </Box>
      <Stack spacing={0.8}>
        <Typography variant="h6" sx={{ fontFamily: "Optima, serif" }}>
          {product.title[locale]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortDescription}
        </Typography>
        <Typography variant="body2">
          {dictionary.common.price}: ${product.priceUsd}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button component={Link} href={`/${locale}/products/${product.slug}`} variant="outlined" size="small">
            {dictionary.common.readMore}
          </Button>
          <Button variant="contained" size="small">
            {dictionary.common.addToCart}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
