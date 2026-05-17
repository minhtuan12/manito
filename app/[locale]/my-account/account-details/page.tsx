import { redirect } from "next/navigation";
import { Stack } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { AccountShell } from "@/components/account/AccountShell";
import { getAuthenticatedUser } from "@/lib/auth";
import { mapAuthenticatedUser } from "@/lib/account";
import { AccountDetailsForm } from "@/components/account/AccountDetailsForm";
import { getDictionary } from "@/lib/dictionaries";

type AccountDetailsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AccountDetailsPage({ params }: AccountDetailsPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);
  const userDoc = await getAuthenticatedUser();

  if (!userDoc) {
    redirect(`/${locale}/my-account/login`);
  }

  return (
    <AccountShell locale={locale} activeSection="account-details">
      <Stack spacing={3}>
        <AccountDetailsForm initialUser={mapAuthenticatedUser(userDoc)} dictionary={dictionary.account.accountDetails} />
      </Stack>
    </AccountShell>
  );
}
