import { redirect } from "next/navigation";
import { BadgePercent, Coins, Gift, TicketPercent } from "lucide-react";
import { Box, Grid2 as Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { AccountShell } from "@/components/account/AccountShell";
import { getAuthenticatedUser } from "@/lib/auth";
import { mapAuthenticatedUser } from "@/lib/account";
import { getDictionary } from "@/lib/dictionaries";

type RewardsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function RewardsPage({ params }: RewardsPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);
  const userDoc = await getAuthenticatedUser();

  if (!userDoc) {
    redirect(`/${locale}/my-account/login`);
  }

  const reward = mapAuthenticatedUser(userDoc).reward;
  const progress = reward.nextLevelThreshold
    ? Math.min(100, (reward.availablePoints / reward.nextLevelThreshold) * 100)
    : 0;

  return (
    <AccountShell locale={locale} activeSection="points-and-rewards">
      <Stack spacing={4}>
        <Box>
          <Typography fontSize={16} textTransform="uppercase" color="#8d7d69" mb={1}>
            {dictionary.account.pointsAndRewards.myPoints}
          </Typography>
          <Grid container spacing={2.5}>
            {[
              { title: dictionary.account.pointsAndRewards.availablePoints, value: reward.availablePoints, icon: Coins },
              { title: dictionary.account.pointsAndRewards.redeemedPoints, value: reward.redeemedPoints, icon: TicketPercent },
              {
                title: dictionary.account.pointsAndRewards.usedRewards,
                value: `${reward.usedRewards}`,
                subvalue: `${dictionary.account.pointsAndRewards.rewardsValue}: ${reward.rewardsValueUsd}`,
                icon: Gift,
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <Grid key={card.title} size={{ xs: 12, md: 4 }}>
                  <Box border="1px solid #ddd7cd" borderRadius={2} px={3} py={3} minHeight={160}>
                    <Icon size={34} color="#d0c6b8" />
                    <Typography fontSize={18} fontWeight={700} mt={2}>{card.title}</Typography>
                    <Typography fontSize={40} fontWeight={700} lineHeight={1.1} mt={1}>{card.value}</Typography>
                    {card.subvalue ? <Typography mt={1.5}>{card.subvalue}</Typography> : null}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Box>
          <Typography fontSize={16} textTransform="uppercase" color="#8d7d69" mb={1}>
            {dictionary.account.pointsAndRewards.myLevels}
          </Typography>
          <Box border="1px solid #ddd7cd" borderRadius={2} overflow="hidden">
            <Grid container>
              <Grid size={{ xs: 12, md: 6 }} p={3}>
                <Typography fontSize={24} fontWeight={700}>{reward.currentLevelLabel}</Typography>
                <Typography fontSize={18}>{dictionary.account.pointsAndRewards.currentLevel}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} p={3} textAlign={{ md: "right" }}>
                <Typography fontSize={24} fontWeight={700} color="#7a7d81">{reward.nextLevelLabel}</Typography>
                <Typography fontSize={18}>{dictionary.account.pointsAndRewards.nextLevel}</Typography>
              </Grid>
            </Grid>
            <Box borderTop="1px solid #ddd7cd" px={3} py={4}>
              <Typography textAlign="center" mb={2}>
                {Math.max(reward.nextLevelThreshold - reward.availablePoints, 0)} {dictionary.account.pointsAndRewards.pointsMoreNeeded}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 999,
                  bgcolor: "#ece7de",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#2f2f2f",
                  },
                }}
              />
              <Stack direction="row" justifyContent="space-between" mt={1.5}>
                <Typography fontWeight={700}>{reward.availablePoints}</Typography>
                <Typography fontWeight={700}>{reward.nextLevelThreshold}</Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography fontSize={16} textTransform="uppercase" color="#8d7d69" mb={1}>
            {dictionary.account.pointsAndRewards.myRewards}
          </Typography>
          <Grid container spacing={2.5}>
            {reward.coupons.map((coupon) => (
              <Grid key={coupon.code} size={{ xs: 12, md: 4 }}>
                <Box border="1px solid #ddd7cd" borderRadius={2} overflow="hidden">
                  <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
                    <BadgePercent color="#d0c6b8" />
                    <Typography fontWeight={700}>{coupon.discountLabel}</Typography>
                  </Box>
                  <Box px={2} pb={2}>
                    <Typography fontSize={18} fontWeight={700}>{coupon.title}</Typography>
                    <Box border="1px dashed #ff9d66" borderRadius={1} py={1.1} px={1.5} mt={2}>
                      <Typography textAlign="center" color="#ff8a42">{coupon.code}</Typography>
                    </Box>
                    <Box mt={3} bgcolor="#4f46e5" color="white" textAlign="center" py={1.25} borderRadius={1}>
                      {dictionary.account.pointsAndRewards.applyCoupon}
                    </Box>
                    <Typography mt={1.75}>
                      {dictionary.account.pointsAndRewards.expiresOn} {new Date(coupon.expiresAt).toLocaleDateString(locale)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </AccountShell>
  );
}
