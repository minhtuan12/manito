import { redirect } from "next/navigation";
import { ensureLocale } from "@/lib/i18n";
import { getAuthenticatedUser } from "@/lib/auth";
import { RegisterForm } from "@/components/account/RegisterForm";

type RegisterPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const user = await getAuthenticatedUser();

  if (user) {
    redirect(`/${locale}/my-account`);
  }

  return <RegisterForm locale={locale} />;
}
