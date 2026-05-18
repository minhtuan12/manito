"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import type { Locale } from "@/types/domain";
import { type AboutPageContent } from "@/lib/about-content";

export function AboutPageTemplate({
  locale,
  content,
  children,
  hasServices,
}: {
  locale: Locale;
  content: AboutPageContent;
  children: any;
  hasServices?: boolean;
}) {
  return (
    <Box bgcolor="#faf9f6">
      <Box
        position="relative"
        minHeight={{ xs: 420, md: 620 }}
        display="flex"
        alignItems="flex-end"
      >
        <Image
          src={content.heroImage}
          alt={content.heroAlt}
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <Box
          position="absolute"
          sx={{
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(23,23,23,0.18) 0%, rgba(23,23,23,0.48) 62%, rgba(23,23,23,0.68) 100%)",
          }}
        />
        <Stack
          spacing={2}
          color="#fff"
          sx={{
            textAlign: "center",
            position: "absolute",
            zIndex: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography fontWeight={800} color="white" fontSize={36}>
            {content?.subtitle?.[locale]}
          </Typography>
          {!!hasServices && (
            <Box display={'flex'} justifyContent={'center'} pt={10}>
              <Link
                href={"#"}
                style={{
                  border: "1px solid white",
                  height: 50,
                  textDecoration: 'none',
                  color: 'white',
                  width: 'fit-content',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingInline: 15,
                }}
              >
                {locale === "en"
                  ? "YAMOPAD SERVICES"
                  : "CÁC DỊCH VỤ CỦA YAMOPAD"}
              </Link>
            </Box>
          )}
        </Stack>
      </Box>

      {children}
    </Box>
  );
}
