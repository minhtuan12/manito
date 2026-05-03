import { TextField, Typography, Stack } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

type SearchPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SearchPage({ params }: SearchPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);

  return (
    <Stack spacing={2}>
      <Typography variant="h3">{dictionary.common.search}</Typography>
      <TextField
        fullWidth
        placeholder={locale === "en" ? "Search for products..." : "Tìm kiếm sản phẩm..."}
      />
    </Stack>
  );
}
