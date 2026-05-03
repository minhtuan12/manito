import Link from "next/link";
import { Box, Button, Stack } from "@mui/material";
import type { Locale } from "@/types/domain";
import type { ReturnTypeGetDictionary } from "@/lib/types-local";

type AdminNavProps = {
  locale: Locale;
  dictionary: ReturnTypeGetDictionary;
};

export function AdminNav({ locale, dictionary }: AdminNavProps) {
  const links = [
    { href: "admin", label: dictionary.admin.dashboard },
    { href: "admin/products", label: dictionary.admin.products },
    { href: "admin/categories", label: dictionary.admin.categories },
    { href: "admin/orders", label: dictionary.admin.orders },
    { href: "admin/customers", label: dictionary.admin.customers },
    { href: "admin/content", label: dictionary.admin.content },
    { href: "admin/media", label: dictionary.admin.media },
    { href: "admin/settings", label: dictionary.admin.settings }
  ];

  return (
    <Box sx={{ borderBottom: "1px solid #e7e5e4", py: 2 }}>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {links.map((link) => (
          <Button key={link.href} component={Link} href={`/${locale}/${link.href}`} variant="text" color="inherit">
            {link.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
