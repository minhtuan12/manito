import { Stack, TextField, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";

type AdminSettingsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminSettingsPage({ params }: AdminSettingsPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);

  return (
    <Stack spacing={2} sx={{ py: 3, maxWidth: 720 }}>
      <Typography variant="h4">{locale === "en" ? "Store Settings" : "Cài đặt cửa hàng"}</Typography>
      <TextField fullWidth label={locale === "en" ? "Store Name" : "Tên cửa hàng"} defaultValue="MANITO Clone" />
      <TextField fullWidth label={locale === "en" ? "Default Currency" : "Tiền tệ mặc định"} defaultValue="USD" />
      <TextField fullWidth label={locale === "en" ? "Support Email" : "Email hỗ trợ"} defaultValue="support@example.com" />
    </Stack>
  );
}
