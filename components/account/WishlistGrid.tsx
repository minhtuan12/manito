"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import type { Locale } from "@/types/domain";
import type { StorefrontProduct } from "@/lib/catalog";
import { useStorefront } from "@/components/storefront/StorefrontContext";

export function WishlistGrid({
  locale,
  initialProducts,
  dictionary,
}: {
  locale: Locale;
  initialProducts: StorefrontProduct[];
  dictionary: Record<string, string>;
}) {
  const [items, setItems] = useState(initialProducts);
  const { formatPrice } = useStorefront();

  const handleRemove = async (productSlug: string) => {
    const response = await fetch(`/api/wishlist?productSlug=${encodeURIComponent(productSlug)}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return;
    }

    setItems((current) => current.filter((item) => item.slug !== productSlug));
  };

  if (items.length === 0) {
    return (
      <Typography color="#666">
        {dictionary.empty}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2.5}>
      {items.map((item) => (
        <Grid key={item.slug} size={{ xs: 12, md: 4 }}>
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Button onClick={() => handleRemove(item.slug)} sx={{ color: "#111111", p: 0, minWidth: 0 }}>
                {dictionary.remove}
              </Button>
              {item.isNew ? (
                <Box px={1} py={0.25} bgcolor="#f5f5f5" fontSize={12} fontWeight={700}>
                  {dictionary.new}
                </Box>
              ) : null}
            </Stack>
            <Box
              component={Link}
              href={`/${locale}/products/${item.slug}`}
              position="relative"
              sx={{
                display: "block",
                aspectRatio: "0.72 / 1",
                backgroundColor: "#f3f1ed",
              }}
            >
              <Image src={item.images?.[0]} alt={item.title[locale]} fill style={{ objectFit: "cover" }} />
            </Box>
            <Typography
              component={Link}
              href={`/${locale}/products/${item.slug}`}
              sx={{
                color: "#111111",
                textDecoration: "none",
                textAlign: "center",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {item.title[locale]}
            </Typography>
            <Typography textAlign="center" color="#7a7d81">
              {formatPrice(item.priceUsd)}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
