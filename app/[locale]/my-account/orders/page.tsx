import Link from "next/link";
import { redirect } from "next/navigation";
import { Alert, Box, Divider, Stack, Typography } from "@mui/material";
import { ensureLocale } from "@/lib/i18n";
import { AccountShell } from "@/components/account/AccountShell";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import OrderModel from "@/models/order";
import { mapOrder } from "@/lib/account";
import { getDictionary } from "@/lib/dictionaries";

type OrdersPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const dictionary = getDictionary(locale);
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect(`/${locale}/my-account/login`);
  }

  await connectToDatabase();
  const orders = (await OrderModel.find({ userId: user._id }).sort({ placedAt: -1 })).map(mapOrder);

  return (
    <AccountShell locale={locale} activeSection="orders">
      {orders.length === 0 ? (
        <Stack spacing={3}>
          <Alert sx={{ bgcolor: "#de7b4d", color: "white", "& .MuiAlert-icon": { color: "white" } }} severity="info">
            {dictionary.account.ordersPage.empty}{" "}
            <Link href={`/${locale}`} style={{ color: "white", fontWeight: 700 }}>
              {dictionary.account.ordersPage.browseProducts}
            </Link>
          </Alert>
        </Stack>
      ) : (
        <Stack spacing={2}>
          {orders.map((order) => (
            <Box key={order.id} border="1px solid #e4dfd6" bgcolor="white" px={3} py={2.5}>
              <Stack spacing={1.5}>
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={1}>
                  <Typography fontWeight={700}>{dictionary.account.ordersPage.order} {order.orderNumber}</Typography>
                  <Typography color="#8d7d69" textTransform="uppercase" fontWeight={700}>
                    {order.status}
                  </Typography>
                </Stack>
                <Typography color="#666">
                  {dictionary.account.ordersPage.placedOn} {new Date(order.placedAt).toLocaleDateString(locale)}
                </Typography>
                <Divider />
                {order.items.map((item) => (
                  <Stack key={`${order.id}-${item.productSlug}`} direction="row" justifyContent="space-between">
                    <Typography>{item.productTitle} × {item.quantity}</Typography>
                    <Typography>${item.unitPriceUsd}</Typography>
                  </Stack>
                ))}
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={700}>{dictionary.account.ordersPage.total}</Typography>
                  <Typography fontWeight={700}>${order.totalUsd}</Typography>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </AccountShell>
  );
}
