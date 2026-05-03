import { Stack, Typography, Alert } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";

type AdminMediaPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminMediaPage({ params }: AdminMediaPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);

  return (
    <Stack spacing={2} sx={{ py: 3 }}>
      <Typography variant="h4">{locale === "en" ? "Media Library" : "Thư viện ảnh"}</Typography>
      <Alert severity="info">
        {locale === "en"
          ? "Media ingestion and optimization pipeline can be attached to this route."
          : "Pipeline nhập và tối ưu media có thể gắn vào route này."}
      </Alert>
    </Stack>
  );
}
