import Link from "next/link";
import { Box, Grid2 as Grid, Stack, Typography } from "@mui/material";
import type { Locale } from "@/types/domain";
import {
  getAccountSectionHref,
  getAccountSectionLabel,
  type AccountSection,
} from "@/lib/account";

const sidebarSections: AccountSection[] = [
  "dashboard",
  "orders",
  "addresses",
  "payment-methods",
  "account-details",
  "points-and-rewards",
  "wishlist",
  "logout",
];

export function AccountShell({
  locale,
  activeSection,
  children,
}: {
  locale: Locale;
  activeSection: AccountSection;
  children: React.ReactNode;
}) {
  return (
    <>
      <Grid size={{ xs: 12, md: 3 }}>
        <Box pr={{ md: 3 }} pb={4}>
          <Typography fontSize={18} fontWeight={700} textTransform="uppercase" mb={2}>
            {locale === "en" ? "My Account" : "Tài khoản"}
          </Typography>
          <Box borderTop="1px solid #d6d1c8" pt={2}>
            <Stack spacing={1}>
              {sidebarSections.map((section) => {
                const href = getAccountSectionHref(locale, section);
                const isActive = section === activeSection;

                return (
                  <Box
                    key={section}
                    component={Link}
                    href={href}
                    sx={{
                      textDecoration: "none",
                      color: "#111111",
                      px: 1.75,
                      py: 1.2,
                      fontSize: 16,
                      fontWeight: isActive ? 700 : 600,
                      backgroundColor: isActive ? "#f0ede6" : "transparent",
                      transition: "background-color 180ms ease",
                      "&:hover": {
                        backgroundColor: "#f0ede6",
                      },
                    }}
                  >
                    {getAccountSectionLabel(locale, section)}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <Box
          pl={{ md: 4 }}
          sx={{
            borderLeft: { md: "1px solid #d6d1c8" },
            minHeight: 460,
          }}
        >
          {children}
        </Box>
      </Grid>
    </>
  );
}
