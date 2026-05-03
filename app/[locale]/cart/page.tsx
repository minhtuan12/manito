import { Alert, Button, Stack, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

type CartPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CartPage({ params }: CartPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);

  return (
    <Stack spacing={2}>
      <Typography variant="h3">{dictionary.cart.title}</Typography>
      <Alert severity="info">{dictionary.cart.empty}</Alert>
      <Button variant="contained">{locale === "en" ? "Continue Shopping" : "Tiếp Tục Mua Sắm"}</Button>
    </Stack>
  );
}
