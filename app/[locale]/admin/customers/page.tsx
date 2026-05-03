import { Stack, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { AdminTable } from "@/components/AdminTable";

type AdminCustomersPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminCustomersPage({ params }: AdminCustomersPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);

  const rows = [
    ["CUS-209", "alice@sample.com", "Gold"],
    ["CUS-193", "peter@sample.com", "Silver"],
    ["CUS-188", "mai@sample.com", "Bronze"]
  ];

  return (
    <Stack spacing={2} sx={{ py: 3 }}>
      <Typography variant="h4">{locale === "en" ? "Customers" : "Khách hàng"}</Typography>
      <AdminTable
        title={locale === "en" ? "Customer Segments" : "Phân nhóm khách hàng"}
        columns={locale === "en" ? ["Code", "Email", "Tier"] : ["Mã", "Email", "Hạng"]}
        rows={rows.map((row) => [row[0], row[1], row[2]])}
      />
    </Stack>
  );
}
