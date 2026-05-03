import { Stack, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { AdminTable } from "@/components/AdminTable";

type AdminOrdersPageProps = {
  params: Promise<{ locale: string }>;
};

const orders = [
  ["ORD-1001", "Pending", "$189"],
  ["ORD-1002", "Confirmed", "$438"],
  ["ORD-1003", "Shipped", "$99"]
];

export default async function AdminOrdersPage({ params }: AdminOrdersPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);

  return (
    <Stack spacing={2} sx={{ py: 3 }}>
      <Typography variant="h4">{locale === "en" ? "Orders" : "Đơn hàng"}</Typography>
      <AdminTable
        title={locale === "en" ? "Recent Orders" : "Đơn hàng gần đây"}
        columns={locale === "en" ? ["Order", "Status", "Amount"] : ["Đơn", "Trạng thái", "Giá trị"]}
        rows={orders.map((order) => [
          order[0],
          locale === "en"
            ? order[1]
            : order[1] === "Pending"
              ? "Chờ xử lý"
              : order[1] === "Confirmed"
                ? "Đã xác nhận"
                : "Đã giao",
          order[2]
        ])}
      />
    </Stack>
  );
}
