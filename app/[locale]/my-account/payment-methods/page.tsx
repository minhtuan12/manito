import { redirect } from "next/navigation";
import { Stack } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { AccountShell } from "@/components/account/AccountShell";
import { getAuthenticatedUser } from "@/lib/auth";
import { mapAuthenticatedUser } from "@/lib/account";
import { PaymentMethodsManager } from "@/components/account/PaymentMethodsManager";
import { getDictionary } from "@/lib/dictionaries";

type PaymentMethodsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PaymentMethodsPage({ params }: PaymentMethodsPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);
  const userDoc = await getAuthenticatedUser();

  if (!userDoc) {
    redirect(`/${locale}/my-account/login`);
  }

  const user = mapAuthenticatedUser(userDoc);

  return (
    <AccountShell locale={locale} activeSection="payment-methods">
      <Stack spacing={3}>
        <PaymentMethodsManager initialItems={user.paymentMethods} dictionary={dictionary.account.paymentMethods} />
      </Stack>
    </AccountShell>
  );
}
