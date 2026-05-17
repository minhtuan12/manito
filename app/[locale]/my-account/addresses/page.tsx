import Link from "next/link";
import { redirect } from "next/navigation";
import { Box, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { AccountShell } from "@/components/account/AccountShell";
import { getAuthenticatedUser } from "@/lib/auth";
import { formatAddressLines, mapAuthenticatedUser } from "@/lib/account";
import { getDictionary } from "@/lib/dictionaries";

type AddressesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AddressesPage({ params }: AddressesPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);
  const userDoc = await getAuthenticatedUser();

  if (!userDoc) {
    redirect(`/${locale}/my-account/login`);
  }

  const user = mapAuthenticatedUser(userDoc);
  const billing = user.addresses.find((address) => address.kind === "billing") ?? null;
  const shipping = user.addresses.find((address) => address.kind === "shipping") ?? null;

  return (
    <AccountShell locale={locale} activeSection="addresses">
      <Stack spacing={4}>
        <Typography fontSize={18} lineHeight={1.8}>
          {dictionary.account.addresses.defaultNotice}
        </Typography>
        <Grid container spacing={4}>
          {[
            { key: "billing", title: dictionary.account.addresses.billingAddress, address: billing },
            { key: "shipping", title: dictionary.account.addresses.shippingAddress, address: shipping },
          ].map((section) => {
            const address = section.address;

            return (
              <Grid key={section.key} size={{ xs: 12, md: 6 }}>
                <Stack spacing={1.25}>
                  <Typography fontSize={24} fontWeight={700} textTransform="uppercase">
                    {section.title}
                  </Typography>
                  <Typography
                    component={Link}
                    href={`/${locale}/my-account/addresses/${section.key}`}
                    sx={{ color: "#8d7d69", textDecoration: "none", fontWeight: 700, textTransform: "uppercase" }}
                  >
                    {address
                      ? `${dictionary.account.addresses.edit} ${section.title}`
                      : `${dictionary.account.addresses.add} ${section.title}`}
                  </Typography>
                  {address ? (
                    <Box>
                      {formatAddressLines(address).map((line) => (
                        <Typography key={line} fontSize={18} fontStyle={line === address.country ? "normal" : "italic"}>
                          {line}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    <Typography fontSize={18} fontStyle="italic">
                      {dictionary.account.addresses.notSet}
                    </Typography>
                  )}
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </AccountShell>
  );
}
