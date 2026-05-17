import { redirect } from "next/navigation";
import { ensureLocale } from "@/lib/i18n";
import { AccountShell } from "@/components/account/AccountShell";
import { getAuthenticatedUser } from "@/lib/auth";
import { mapAuthenticatedUser } from "@/lib/account";
import { AddressForm } from "@/components/account/AddressForm";
import { getDictionary } from "@/lib/dictionaries";

type EditAddressPageProps = {
  params: Promise<{ locale: string; kind: "billing" | "shipping" }>;
};

export default async function EditAddressPage({ params }: EditAddressPageProps) {
  const { locale: localeParam, kind } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);
  const userDoc = await getAuthenticatedUser();

  if (!userDoc) {
    redirect(`/${locale}/my-account/login`);
  }

  const user = mapAuthenticatedUser(userDoc);
  const address = user.addresses.find((entry) => entry.kind === kind) ?? null;

  return (
    <AccountShell locale={locale} activeSection="addresses">
      <AddressForm kind={kind} initialAddress={address} dictionary={dictionary.account.addresses} />
    </AccountShell>
  );
}
