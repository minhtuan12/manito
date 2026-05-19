"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import type { Locale } from "@/types/domain";
import type { StorefrontCategory, StorefrontProduct } from "@/lib/catalog";
import type { ReturnTypeGetDictionary } from "@/lib/types-local";
import { Heart } from "lucide-react";
import CardItem from "./CardItem";

type CategoryGridProps = {
  locale: Locale;
  products: StorefrontProduct[];
  dictionary: ReturnTypeGetDictionary;
};

export function CategoryGrid({ locale, products }: CategoryGridProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const pages = useMemo(
    () => Array.from({ length: pageCount }, (_, index) => index),
    [pageCount],
  );

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const recalculate = () => {
      const firstCard = el.querySelector<HTMLElement>(
        "[data-category-card='true']",
      );
      if (!firstCard) return;

      const nextCard = firstCard.nextElementSibling as HTMLElement | null;
      const gap = nextCard
        ? Math.max(
          nextCard.offsetLeft -
          firstCard.offsetLeft -
          firstCard.offsetWidth,
          0,
        )
        : 16;
      const width = firstCard.offsetWidth + gap;

      const visible = Math.max(1, Math.round(el.clientWidth / width));
      const computedPages = Math.max(
        1,
        Math.ceil(products.length / visible),
      );
      setPageCount(computedPages);
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      if (computedPages <= 1 || maxScroll === 0) {
        setCurrentPage(0);
      } else {
        const ratio = el.scrollLeft / maxScroll;
        setCurrentPage(
          Math.min(
            computedPages - 1,
            Math.max(0, Math.round(ratio * (computedPages - 1))),
          ),
        );
      }
    };

    const onScroll = () => {
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      if (pageCount <= 1 || maxScroll === 0) {
        setCurrentPage(0);
        return;
      }
      const ratio = el.scrollLeft / maxScroll;
      const page = Math.round(ratio * (pageCount - 1));
      setCurrentPage(Math.min(Math.max(page, 0), pageCount - 1));
    };

    recalculate();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recalculate);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recalculate);
    };
  }, [products.length, pageCount]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = sliderRef.current;
    if (!el) return;

    setIsDragging(true);
    setStartX(event.clientX);
    setStartScrollLeft(el.scrollLeft);
    el.setPointerCapture(event.pointerId);
    el.style.scrollSnapType = "none";
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const el = sliderRef.current;
    if (!el) return;

    const distance = event.clientX - startX;
    el.scrollLeft = startScrollLeft - distance;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = sliderRef.current;
    if (!el) return;

    setIsDragging(false);
    el.releasePointerCapture(event.pointerId);
    el.style.scrollSnapType = "x mandatory";

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    if (pageCount <= 1 || maxScroll === 0) return;
    const ratio = el.scrollLeft / maxScroll;
    const targetPage = Math.min(
      pageCount - 1,
      Math.max(0, Math.round(ratio * (pageCount - 1))),
    );
    const targetLeft = (targetPage / (pageCount - 1)) * maxScroll;
    el.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  const goToPage = (page: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    if (pageCount <= 1 || maxScroll === 0) return;
    const targetLeft = (page / (pageCount - 1)) * maxScroll;
    el.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  return (
    <Box
      sx={{ backgroundColor: "#f2f0e1" }}
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      pt={11.25}
      pb={6.5}
      minHeight={{ xs: "auto", md: 600 }}
      gap={{ xs: 3, md: 0 }}
    >
      <Grid
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ pb: { xs: 3, md: 6 }, pt: { xs: 0, md: 6 }, px: { xs: 2, md: 4, xl: 20 }, flexShrink: 0 }}
      >
        <Typography
          mb={3}
          color="#555656"
          fontSize={30}
          lineHeight="40px"
          textAlign='center'
        >
          {locale === "en"
            ? "SPRING/SUMMER 2026"
            : "MÙA XUÂN/HÈ 2026"}
        </Typography>
        <Typography
          mb={2}
          fontSize={20}
          lineHeight="28px"
          color="#555656"
          fontWeight={500}
        >
          {locale === "en" ? "New Arrivals" : "Các sản phẩm mới"}
        </Typography>
        <Typography fontSize={18} lineHeight="26px" color="#555656" fontWeight={500}>
          Midsummer Dreams, Silky Nights
        </Typography>
      </Grid>

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        pr={3}
        pl={{ xs: 3, md: 0 }}
      >
        <Box
          ref={sliderRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            height: "100%",
            pb: 1.5,
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            cursor: isDragging ? "grabbing" : "grab",
            "&::-webkit-scrollbar": { display: "none" },
            touchAction: "pan-y",
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              data-category-card="true"
              sx={{
                flex: {
                  xs: "0 0 75%",
                  sm: "0 0 42%",
                  md: "0 0 32%",
                },
                minWidth: 0,
                scrollSnapAlign: "start",
              }}
            >
              <CardItem
                coverImage={product.images?.[0]}
                href={`/${locale}/products/${product.slug}`}
                title={product.title[locale]}
                wishlistProductSlug={product.slug}
                isNew={true}
                hasName={true}
                price={product.priceUsd}
              />
            </Box>
          ))}
        </Box>

        <Box display="flex" justifyContent="center" gap={1} mt={2}>
          {pages.map((page) => (
            <Box
              key={page}
              component="button"
              onClick={() => goToPage(page)}
              aria-label={`Go to page ${page + 1}`}
              sx={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                border: "none",
                p: 0,
                backgroundColor:
                  page === currentPage
                    ? "#555656"
                    : "#ffffff",
                transition: "all 220ms ease",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
