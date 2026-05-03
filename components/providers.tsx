"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import type { ReactNode } from "react";
import { appTheme } from "@/lib/theme";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
