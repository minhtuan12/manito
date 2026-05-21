"use client";

import { useState } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import type { Locale } from "@/types/domain";

type AccountLogoutButtonProps = {
  locale: Locale;
  children: React.ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
  onLoggedOut?: () => void;
};

export function AccountLogoutButton({
  locale,
  children,
  className,
  sx,
  onLoggedOut,
}: AccountLogoutButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        cache: "no-store",
      });
    } finally {
      onLoggedOut?.();
      window.location.assign(`/${locale}/my-account/login`);
    }
  };

  return (
    <Box
      component="button"
      type="button"
      className={className}
      onClick={() => void handleLogout()}
      disabled={isSubmitting}
      sx={{
        appearance: "none",
        background: "none",
        border: 0,
        cursor: isSubmitting ? "default" : "pointer",
        font: "inherit",
        m: 0,
        p: 0,
        textAlign: "inherit",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
