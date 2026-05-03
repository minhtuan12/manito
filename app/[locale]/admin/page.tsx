import { Grid2 as Grid, Paper, Stack, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

type AdminDashboardProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboard({ params }: AdminDashboardProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);

  const metrics = [
    {
      label: locale === "en" ? "Products" : "Sản phẩm",
      value: "124"
    },
    {
      label: locale === "en" ? "Orders (7 days)" : "Đơn hàng (7 ngày)",
      value: "58"
    },
    {
      label: locale === "en" ? "Revenue (USD)" : "Doanh thu (USD)",
      value: "$14,230"
    },
    {
      label: locale === "en" ? "Active Customers" : "Khách hàng hoạt động",
      value: "421"
    }
  ];

  return (
    <Stack spacing={3} sx={{ py: 3 }}>
      <Typography variant="h3">{dictionary.admin.title}</Typography>
      <Typography color="text.secondary">{dictionary.admin.subtitle}</Typography>
      <Grid container spacing={2}>
        {metrics.map((item) => (
          <Grid size={{ xs: 12, md: 3 }} key={item.label}>
            <Paper sx={{ p: 2, border: "1px solid #e7e5e4" }} elevation={0}>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.5 }}>
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
