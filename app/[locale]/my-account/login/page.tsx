import { redirect } from "next/navigation";
import { ensureLocale } from "@/lib/i18n";
import { getAuthenticatedUser } from "@/lib/auth";
import { LoginForm } from "@/components/account/LoginForm";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const user = await getAuthenticatedUser();

  if (user) {
    redirect(`/${locale}/my-account`);
  }

  return <LoginForm locale={locale} />;
}
