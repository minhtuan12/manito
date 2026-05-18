import Link from "next/link";
import { Button, Stack } from "@mui/material";
import type { Locale } from "@/types/domain";

type LocaleSwitcherProps = {
  locale: Locale;
  pathWithoutLocale: string;
  label: string;
};

export function LocaleSwitcher({
  locale,
  pathWithoutLocale,
  label
}: LocaleSwitcherProps) {
  const target = locale === "en" ? "vi" : "en";
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Button
        component={Link}
        href={`/${target}${pathWithoutLocale}`}
        size="small"
        variant="text"
        sx={{ color: 'gray', fontWeight: 600, fontSize: 18 }}
      >
        {target.toUpperCase()}
      </Button>
    </Stack>
  );
}
