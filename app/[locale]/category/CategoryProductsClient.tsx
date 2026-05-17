"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Box, Button, Checkbox, Grid2, Typography } from "@mui/material";
import { SlidersHorizontal } from "lucide-react";
import CardItem from "@/components/CardItem";
import type { Locale } from "@/types/domain";
import type { StorefrontProduct } from "@/lib/catalog";
import { useTranslation } from "@/lib/useTranslation";
import { useStorefront } from "@/components/storefront/StorefrontContext";

const sortBy = ["popular", "newest", "priceAsc", "priceDesc", "nameAsc", "nameDesc"];

type CategoryProductsClientProps = {
  locale: Locale;
  categoryPath: string;
  categoryTitle: string;
  initialProducts: StorefrontProduct[];
  initialSizes: string[];
};

export function CategoryProductsClient({
  locale,
  categoryPath,
  categoryTitle,
  initialProducts,
  initialSizes,
}: CategoryProductsClientProps) {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [sizes, setSizes] = useState(initialSizes);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslation();
  const { formatPrice } = useStorefront();

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("categoryPath", categoryPath);
    params.set("sort", sort);
    for (const size of selectedSizes) {
      params.append("size", size);
    }
    return params.toString();
  }, [categoryPath, selectedSizes, sort]);

  useEffect(() => {
    let cancelled = false;

    startTransition(() => {
      fetch(`/api/products?${queryString}`)
        .then((response) => response.json())
        .then((data) => {
          if (cancelled) {
            return;
          }
          setProducts(data.items ?? []);
          setSizes(data.filters?.sizes ?? []);
        })
        .catch(() => {
          if (!cancelled) {
            setProducts([]);
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [queryString]);

  const toggleSize = (size: string) => {
    setSelectedSizes((current) =>
      current.includes(size)
        ? current.filter((item) => item !== size)
        : [...current, size],
    );
  };

  return (
    <>
      <Grid2
        alignItems="center"
        gap={0.5}
        display="flex"
        sx={{ cursor: "pointer" }}
        onClick={() => setOpenFilter(!openFilter)}
      >
        <SlidersHorizontal size={16} />
        <Typography fontWeight={800} fontSize={26}>{t("filter.common")}</Typography>
      </Grid2>
      <Grid2
        sx={{
          background: "#fff",
          overflow: "hidden",
          transform: openFilter ? "translateY(0)" : "translateY(-8px)",
          opacity: openFilter ? 1 : 0,
          maxHeight: openFilter ? "480px" : "0px",
          visibility: openFilter ? "visible" : "hidden",
          pointerEvents: openFilter ? "auto" : "none",
          transition: "transform 280ms ease, opacity 280ms ease, max-height 280ms ease, visibility 280ms ease",
        }}
        py={3.5}
        px={3.5}
        mt={3}
        mb={{ xs: 4, xl: 0 }}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        width="100%"
        gap={4}
      >
        <Box display="flex" flexDirection="column" gap={2} minWidth={1 / 3}>
          <Typography sx={{ textTransform: "uppercase" }} fontWeight={800} fontSize={20}>{t("filter.sortBy")}</Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {sortBy.map((item) => (
              <Button
                key={item}
                onClick={() => setSort(item)}
                sx={{
                  justifyContent: "flex-start",
                  p: 0,
                  color: sort === item ? "#111" : "#7A7D81",
                  fontWeight: sort === item ? 900 : 400,
                  textTransform: "capitalize",
                  fontSize: 18,
                }}
              >
                {t(`filter.${item}`)}
              </Button>
            ))}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap={2} minWidth={1 / 3}>
          <Typography sx={{ textTransform: "uppercase" }} fontWeight={800} fontSize={20}>{t("filter.size")}</Typography>
          <Box display="flex" flexWrap="wrap" gap={1.5}>
            {sizes.map((size) => (
              <Button
                key={size}
                onClick={() => toggleSize(size)}
                sx={{
                  minWidth: 52,
                  borderRadius: 0,
                  border: "1px solid #d7d4c8",
                  bgcolor: selectedSizes.includes(size) ? "#d7d4c8" : "#fff",
                  color: "#111",
                }}
              >
                <Typography fontSize={14} variant="subtitle1">{size}</Typography>
              </Button>
            ))}
          </Box>
        </Box>
      </Grid2>
      <Grid2
        position="relative"
        container
        spacing={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={{ xs: 2, xl: 5 }}
        mt={5}
        sx={{ opacity: isPending ? 0.55 : 1, transition: "opacity 180ms ease" }}
      >
        <Typography
          pt={2}
          color="#7A7D81"
          fontWeight={600}
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
          {categoryTitle}
        </Typography>
        <Grid2 container size={12} mt={2}>
          {products.map((product) => (
            <Grid2 key={product._id} size={{ xs: 12, sm: 6, md: 3 }} display="flex" flexDirection="column" alignItems="center">
              <CardItem
                coverImage={product.images[0]}
                href={`/${locale}/products/${product.slug}`}
                title={product.title[locale]}
                isNew={product.isNew}
                wishlistProductSlug={product.slug}
                locale={locale}
              />
              <Typography mt={2} mb={0.5} color="#7A7D81" fontWeight={900} fontSize={20}>
                {product.title[locale]}
              </Typography>
              <Typography color="#7A7D81" fontWeight={400} fontSize={16} variant="subtitle1">
                {formatPrice(product.priceUsd)}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
    </>
  );
}
