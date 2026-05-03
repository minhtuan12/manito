import { Stack, Typography } from "@mui/material";
import { products } from "@/data/products";
import { ensureLocale } from "@/lib/i18n";
import { AdminTable } from "@/components/AdminTable";

type AdminProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminProductsPage({ params }: AdminProductsPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);

  return (
    <Stack spacing={2} sx={{ py: 3 }}>
      <Typography variant="h4">{locale === "en" ? "Products" : "Sản phẩm"}</Typography>
      <AdminTable
        title={locale === "en" ? "Catalog" : "Danh mục sản phẩm"}
        columns={locale === "en" ? ["ID", "Title", "Category", "Price"] : ["Mã", "Tên", "Danh mục", "Giá"]}
        rows={products.map((item) => [item.id, item.title[locale], item.categorySlug, `$${item.priceUsd}`])}
      />
    </Stack>
  );
}
