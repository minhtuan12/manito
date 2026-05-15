"use client";

import Image from "next/image";
import {
  Box,
  Button,
  Collapse,
  Grid2 as Grid,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Locale, ProductProperty } from "@/types/domain";
import type { StorefrontCategory, StorefrontProduct } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries";
import { useRef, useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { sanitizeRichTextHtml } from "@/lib/richText";

type ProductInfoSectionKey =
  | "details"
  | "materialsAndCare"
  | "shippingAndReturns"
  | "giftPackaging";

function normalizeInfoItems(value: string) {
  const sanitized = sanitizeRichTextHtml(value ?? "").trim();

  if (!sanitized) {
    return [];
  }

  const listItems = Array.from(
    sanitized.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi),
    (match) =>
      match[1]
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
  ).filter(Boolean);

  if (listItems.length > 0) {
    return listItems;
  }

  return sanitized
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .split(/\n|•/)
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function renderInfoContent(value: string, options?: { asBullets?: boolean }) {
  const items = normalizeInfoItems(value);

  if (items.length === 0) {
    return null;
  }

  if (options?.asBullets || items.length > 1) {
    return (
      <Box component="ul" sx={{ m: 0, pl: 3, display: "grid", gap: 1.5 }}>
        {items.map((item) => (
          <Typography
            key={item}
            component="li"
            variant="subtitle1"
            color="#111111"
            fontSize={14}
            lineHeight={1.85}
          >
            {item}
          </Typography>
        ))}
      </Box>
    );
  }

  return (
    <Stack spacing={1.5}>
      {items.map((item) => (
        <Typography
          key={item}
          variant="subtitle1"
          color="#111111"
          fontSize={14}
          lineHeight={1.85}
        >
          {item}
        </Typography>
      ))}
    </Stack>
  );
}

function Property({
  property,
  locale,
}: {
  property: ProductProperty;
  locale: Locale;
}) {
  const [selectedValue, setSelectedValue] = useState("");
  const { name, slug, values } = property;
  return (
    <>
      <Typography color="black" variant="subtitle1" fontSize={16}>
        {/* TODO: add locale in admin for properties */}
        {name.toUpperCase()}:
      </Typography>
      <Grid2 container spacing={2}>
        {values.map((c, index) => (
          <Box
            key={index}
            fontSize={14}
            height={52}
            width={72}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              "&:hover": {
                background: "#d7d4c8",
              },
              background:
                selectedValue === c ? "#d7d4c8" : "transparent",
            }}
            onClick={() => setSelectedValue(c)}
          >
            <Typography variant="subtitle1" fontSize={16}>
              {c}
            </Typography>
          </Box>
        ))}
        {selectedValue && (
          <Box
            color={"#777777"}
            sx={{ cursor: "pointer" }}
            display={"flex"}
            gap={0.5}
            alignItems={"center"}
            onClick={() => {
              setSelectedValue("");
            }}
          >
            <X size={14} />
            <Typography variant="subtitle1" fontSize={12}>
              {locale === "en" ? "Clear" : "Xóa"}
            </Typography>
          </Box>
        )}
      </Grid2>
    </>
  );
}

export default function ProductDetail({
  locale,
  product,
  categoryAncestors,
  dictionary,
}: {
  locale: Locale;
  product: StorefrontProduct;
  categoryAncestors: StorefrontCategory[];
  dictionary: Dictionary;
}) {
  const [previewImage, setPreviewImage] = useState(product.primaryImage);
  const [expandedSection, setExpandedSection] =
    useState<ProductInfoSectionKey | null>(null);
  const thumbnailListRef = useRef<HTMLDivElement | null>(null);
  const productDescriptionHtml = sanitizeRichTextHtml(
    product.description[locale],
  );

  const scrollThumbnailList = (direction: "up" | "down") => {
    const list = thumbnailListRef.current;

    if (!list) {
      return;
    }

    const firstItem = list.firstElementChild as HTMLElement | null;
    const rowGap = Number.parseFloat(window.getComputedStyle(list).rowGap || "0");
    const itemHeight = firstItem?.getBoundingClientRect().height ?? 250;
    const scrollAmount = (itemHeight + rowGap) * 3;

    list.scrollBy({
      top: direction === "down" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const infoSections = [
    {
      key: "details" as const,
      title: locale === "en" ? "PRODUCT DETAILS" : "Chi Tiết Sản Phẩm",
      content: renderInfoContent(product.details?.[locale] ?? "", {
        asBullets: true,
      }),
    },
    {
      key: "materialsAndCare" as const,
      title:
        locale === "en"
          ? "MATERIALS AND CARE"
          : "Chất Liệu và Bảo Quản",
      content: renderInfoContent(
        product.materialsAndCare?.[locale] ?? "",
      ),
    },
    {
      key: "shippingAndReturns" as const,
      title:
        locale === "en"
          ? "SHIPPING AND RETURNS"
          : "Vận Chuyển và Đổi Trả",
      content:
        renderInfoContent(product.shipping?.[locale] ?? "") ||
          renderInfoContent(product.returns?.[locale] ?? "") ? (
          <Stack spacing={2.5}>
            {renderInfoContent(product.shipping?.[locale] ?? "") ? (
              <Box>
                <Typography
                  color="black"
                  fontSize={14}
                  letterSpacing={1}
                  textTransform="uppercase"
                  fontWeight={800}
                  mb={1}
                >
                  {locale === "en"
                    ? "Shipping"
                    : "Vận Chuyển"}
                </Typography>
                {renderInfoContent(
                  product.shipping?.[locale] ?? "",
                )}
              </Box>
            ) : null}
            {renderInfoContent(product.returns?.[locale] ?? "") ? (
              <Box mt={3}>
                <Typography
                  color="black"
                  fontSize={14}
                  letterSpacing={1}
                  textTransform="uppercase"
                  fontWeight={800}
                  mb={1}
                >
                  {locale === "en" ? "Returns" : "Đổi Trả"}
                </Typography>
                {renderInfoContent(
                  product.returns?.[locale] ?? "",
                )}
              </Box>
            ) : null}
          </Stack>
        ) : null,
    },
    {
      key: "giftPackaging" as const,
      title: locale === "en" ? "GIFT PACKAGING" : "Đóng Gói Quà Tặng",
      content: renderInfoContent(product.giftPackaging?.[locale] ?? ""),
    },
  ];

  return (
    <Grid sx={{ pb: 2, pt: 13, px: { xs: 4, xl: 20 }, background: "#f5f5f5" }}>
      <Box my={5}>
        <Breadcrumb
          items={[
            {
              href: `/${locale}`,
              label: locale === "en" ? "Home" : "Trang chủ",
            },
            ...categoryAncestors.map((category) => ({
              href: `/${locale}/category/${category.path}`,
              label: category.title[locale],
            })),
            { label: product.title[locale] },
          ]}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid height={825} size={{ xs: 12, md: 5.5 }} display={'flex'} gap={2}>
          <Grid
            display={{ xs: 'none', lg: "flex" }}
            flexDirection={"column"}
            gap={2}
            width={{ xs: 0, lg: 150 }}
          >
            <Grid sx={{
              overflowY: 'auto',
              scrollbarWidth: 'none',          // Firefox
              '&::-webkit-scrollbar': {
                display: 'none',               // Chrome, Safari, Edge
              },
              msOverflowStyle: 'none',
            }}
              ref={thumbnailListRef}
              height={'calc(100% - 35px)'}
              display={'flex'}
              flexDirection={'column'}
              gap={2}
            >
              {product.images.map((i, index) => (
                <Box
                  position={"relative"}
                  key={index}
                  width={"100%"}
                  minHeight={250}
                >
                  <Image
                    key={index}
                    src={i}
                    style={{ width: "100%", position: "absolute" }}
                    fill
                    alt={`${product.title.en} ${index}`}
                    quality={100}
                  />
                </Box>
              ))}
            </Grid>
            <Grid display={'flex'} gap={2} height={30}>
              <Button variant="contained"
                onClick={() => scrollThumbnailList("up")}
                sx={{
                  color: "#7A7D81",
                  width: "100%",
                  height: "100%",
                  fontWeight: 500,
                  fontSize: 16,
                  boxShadow: "none",
                }}><ChevronUp /></Button>
              <Button variant="contained"
                onClick={() => scrollThumbnailList("down")}
                sx={{
                  color: "#7A7D81",
                  width: "100%",
                  height: "100%",
                  fontWeight: 500,
                  fontSize: 16,
                  boxShadow: "none",
                }}><ChevronDown /></Button>
            </Grid>
          </Grid>
          <Grid flex={1}>
            <Box
              sx={{
                position: "relative",
                minHeight: '100%',
                width: "100%",
              }}
            >
              <Image
                src={previewImage}
                alt={product.title[locale]}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Information */}
        <Grid size={{ xs: 12, md: 6.5 }} px={{ xs: 0, md: 5, lg: 10 }}>
          <Stack spacing={2}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: 30, md: 34 } }}
              textAlign={"center"}
              color="#7a7d81"
              fontWeight={800}
            >
              {product.title[locale]}
            </Typography>
            <Typography
              variant="subtitle1"
              color="#7a7d81"
              textAlign={"center"}
              fontSize={20}
            >
              ${product.priceUsd}
            </Typography>
            <Typography
              color="#7a7d81"
              variant="subtitle1"
              fontSize={14}
              dangerouslySetInnerHTML={{
                __html: productDescriptionHtml,
              }}
            />

            {/* Colors */}
            <Typography
              color="black"
              variant="subtitle1"
              fontSize={16}
            >
              {locale === "en" ? "COLOR" : "MÀU SẮC"}:
            </Typography>
            <Grid2 container spacing={3}>
              {product.colors.map((c, index) => (
                <Image
                  onClick={() => setPreviewImage(c)}
                  alt="Product Colors"
                  src={c}
                  key={index}
                  width={90}
                  height={135}
                  style={{
                    border:
                      c === previewImage
                        ? "2px solid #d7d4c8"
                        : "none",
                    cursor: "pointer",
                    height: "135px",
                    width: "90px",
                  }}
                />
              ))}
            </Grid2>

            {/* Properties */}
            {product?.properties?.map((p) => (
              <Property locale={locale} property={p} />
            ))}

            {/* Actions */}
            <Grid2 container spacing={1.5} size={12} height={51}>
              <Grid size={6}>
                <Button
                  variant="contained"
                  sx={{
                    color: "#7A7D81",
                    width: "100%",
                    height: "100%",
                    fontWeight: 500,
                    fontSize: 16,
                    boxShadow: "none",
                  }}
                >
                  {dictionary.common.addToCart}
                </Button>
              </Grid>
              <Grid size={6}>
                <Button
                  variant="contained"
                  sx={{
                    color: "#7A7D81",
                    width: "100%",
                    height: "100%",
                    fontWeight: 500,
                    fontSize: 16,
                    boxShadow: "none",
                  }}
                >
                  {locale === "en" ? "BUY NOW" : "MUA NGAY"}
                </Button>
              </Grid>
            </Grid2>

            {/* Details */}
            {/* Material & Cares */}
            {/* Shipping & Returns */}
            {/* Gift Packaging */}
            <Box mt={2}>
              {infoSections.map((section, index) => {
                const isExpanded = expandedSection === section.key;

                return (
                  <Box key={section.key} borderBottom={index !== 3 ? "1px solid #d8d2c8" : ''}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      py={3}
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        setExpandedSection((current) =>
                          current === section.key
                            ? null
                            : section.key,
                        )
                      }
                    >
                      <Typography
                        color="#111111"
                        fontSize={{ xs: 18, md: 16 }}
                        letterSpacing={2}
                        fontWeight={600}
                        textTransform="uppercase"
                      >
                        {section.title}
                      </Typography>
                      <Box
                        color="#c9c0b4"
                        display="flex"
                        alignItems="center"
                      >
                        {isExpanded ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </Box>
                    </Box>
                    <Collapse in={isExpanded} timeout={250}>
                      <Box pb={4} pr={{ xs: 0, md: 4 }}>
                        {section.content}
                      </Box>
                    </Collapse>
                  </Box>
                );
              })}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
