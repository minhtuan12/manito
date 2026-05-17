import { redirect } from "next/navigation";
import { Stack, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { AccountShell } from "@/components/account/AccountShell";
import { getAuthenticatedUser } from "@/lib/auth";
import { getStorefrontProducts } from "@/lib/storefront-data";
import { WishlistGrid } from "@/components/account/WishlistGrid";
import { getDictionary } from "@/lib/dictionaries";

type AccountWishlistPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AccountWishlistPage({ params }: AccountWishlistPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect(`/${locale}/my-account/login`);
  }

  const products = await getStorefrontProducts();
  const wishlistProducts = products.filter((product) => user.wishlistProductSlugs.includes(product.slug));

  return (
    <AccountShell locale={locale} activeSection="wishlist">
      <Stack spacing={3}>
        <Typography fontSize={16} textTransform="uppercase" color="#8d7d69">
          {dictionary.account.wishlist.heading}
        </Typography>
        <WishlistGrid locale={locale} initialProducts={wishlistProducts} dictionary={dictionary.account.wishlist} />
      </Stack>
    </AccountShell>
  );
}
