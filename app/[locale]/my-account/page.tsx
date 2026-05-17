import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ClipboardList,
  CreditCard,
  Gift,
  Heart,
  LogOut,
  MapPin,
  UserCircle2,
  type LucideIcon,
} from "lucide-react";
import { Box, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { AccountShell } from "@/components/account/AccountShell";
import { getAuthenticatedUser } from "@/lib/auth";
import {
  getAccountSectionHref,
  getAccountSectionLabel,
  mapAuthenticatedUser,
  type AccountSection,
} from "@/lib/account";
import { getDictionary } from "@/lib/dictionaries";

type AccountDashboardPageProps = {
  params: Promise<{ locale: string }>;
};

const dashboardCards: Array<{
  key: AccountSection;
  icon: LucideIcon;
}> = [
  { key: "orders", icon: ClipboardList },
  { key: "addresses", icon: MapPin },
  { key: "payment-methods", icon: CreditCard },
  { key: "account-details", icon: UserCircle2 },
  { key: "points-and-rewards", icon: Gift },
  { key: "wishlist", icon: Heart },
  { key: "logout", icon: LogOut },
];

export default async function AccountDashboardPage({ params }: AccountDashboardPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);
  const userDoc = await getAuthenticatedUser();

  if (!userDoc) {
    redirect(`/${locale}/my-account/login`);
  }

  const user = mapAuthenticatedUser(userDoc);

  return (
    <AccountShell locale={locale} activeSection="dashboard">
      <Stack spacing={4}>
        <Typography fontSize={20}>
          {dictionary.account.dashboard.greetingPrefix} <strong>{user.displayName}</strong> ({dictionary.account.dashboard.notYou}{" "}
          <strong>{user.displayName}</strong>?{" "}
          <Link href={getAccountSectionHref(locale, "logout")} style={{ color: "inherit" }}>
            {dictionary.account.logout}
          </Link>
          )
        </Typography>
        <Typography fontSize={18} lineHeight={1.8}>
          {dictionary.account.dashboard.description}
        </Typography>
        <Grid container spacing={2.25}>
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <Grid key={card.key} size={{ xs: 12, md: 4 }}>
                <Box
                  component={Link}
                  href={getAccountSectionHref(locale, card.key)}
                  sx={{
                    textDecoration: "none",
                    color: "#111111",
                    border: "1px solid #e4dfd6",
                    minHeight: 148,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.5,
                    backgroundColor: "#fff",
                  }}
                >
                  <Icon size={44} color="#bdbab4" strokeWidth={1.4} />
                  <Typography fontSize={18} fontWeight={700}>
                    {getAccountSectionLabel(locale, card.key)}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </AccountShell>
  );
}
