"use client";

import { useMemo, useState } from "react";
import { Box, Grid2, InputBase, Typography } from "@mui/material";
import { Search } from "lucide-react";
import type { Locale } from "@/types/domain";
import type { StorefrontProduct } from "@/lib/catalog";
import CardItem from "@/components/CardItem";
import { useStorefront } from "@/components/storefront/StorefrontContext";

export function SearchPageClient({
  locale,
  products,
}: {
  locale: Locale;
  products: StorefrontProduct[];
}) {
  const [query, setQuery] = useState("");
  const { formatPrice } = useStorefront();

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return products.slice(0, 12);
    }
    return products.filter((product) =>
      `${product.title.en} ${product.title.vi} ${product.slug}`.toLowerCase().includes(normalized),
    );
  }, [products, query]);

  return (
    <Box bgcolor="#f5f5f5" minHeight="100vh" pt={{ xs: 18, md: 20 }} px={{ xs: 2, md: 10, xl: 24 }} pb={8}>
      <Box maxWidth={640} mx="auto" display="flex" alignItems="center" bgcolor="#fff" borderBottom="1px solid #111" px={1.5}>
        <InputBase
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={locale === "en" ? "Search for products" : "Tìm kiếm sản phẩm"}
          sx={{ flex: 1, height: 40, fontSize: 14 }}
          autoFocus
        />
        <Search size={20} color="#5d6670" />
      </Box>
      <Box borderTop="1px solid #cfcfcf" mt={3} pt={4}>
        <Typography fontSize={28} fontWeight={900} mb={2}>
          {locale === "en" ? 'Featured Products' : "Sản phẩm nổi bật"}
        </Typography>
        <Grid2 container spacing={2}>
          {visibleProducts.map((product) => (
            <Grid2 key={product._id} size={{ xs: 12, sm: 6, md: 3 }}>
              <CardItem
                coverImage={product.images[0]}
                href={`/${locale}/products/${product.slug}`}
                title={product.title[locale]}
                isNew={product.isNew}
                wishlistProductSlug={product.slug}
                locale={locale}
              />
              <Typography mt={1.5} textAlign="center" color="#111" fontSize={19} fontWeight={900}>
                {product.title[locale]}
              </Typography>
              <Typography textAlign="center" color="#555" fontSize={16} variant="subtitle1">
                {formatPrice(product.priceUsd)}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
}
