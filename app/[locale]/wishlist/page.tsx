import { Alert, Stack, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

type WishlistPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function WishlistPage({ params }: WishlistPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);

  return (
    <Stack spacing={2}>
      <Typography variant="h3">{dictionary.wishlist.title}</Typography>
      <Alert severity="info">{dictionary.wishlist.empty}</Alert>
    </Stack>
  );
}
