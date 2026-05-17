"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import type { ReactNode } from "react";
import { appTheme } from "@/lib/theme";
import { StorefrontProvider } from "@/components/storefront/StorefrontContext";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <StorefrontProvider>{children}</StorefrontProvider>
    </ThemeProvider>
  );
}
