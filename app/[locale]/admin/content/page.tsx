import { Stack, TextField, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { siteContent } from "@/data/site-content";

type AdminContentPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminContentPage({ params }: AdminContentPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);

  return (
    <Stack spacing={2} sx={{ py: 3, maxWidth: 760 }}>
      <Typography variant="h4">{locale === "en" ? "Homepage Content" : "Nội dung trang chủ"}</Typography>
      <TextField fullWidth label={locale === "en" ? "Hero title (EN)" : "Tiêu đề hero (EN)"} value={siteContent.heroTitle.en} />
      <TextField fullWidth label={locale === "en" ? "Hero title (VI)" : "Tiêu đề hero (VI)"} value={siteContent.heroTitle.vi} />
      <TextField fullWidth label={locale === "en" ? "Hero subtitle (EN)" : "Mô tả hero (EN)"} value={siteContent.heroSubtitle.en} multiline minRows={2} />
      <TextField fullWidth label={locale === "en" ? "Hero subtitle (VI)" : "Mô tả hero (VI)"} value={siteContent.heroSubtitle.vi} multiline minRows={2} />
    </Stack>
  );
}
