import { Stack, Typography } from "@mui/material";
import { categories } from "@/data/categories";
import { ensureLocale } from "@/lib/i18n";
import { AdminTable } from "@/components/AdminTable";

type AdminCategoriesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminCategoriesPage({ params }: AdminCategoriesPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);

  return (
    <Stack spacing={2} sx={{ py: 3 }}>
      <Typography variant="h4">{locale === "en" ? "Categories" : "Danh mục"}</Typography>
      <AdminTable
        title={locale === "en" ? "Category List" : "Danh sách danh mục"}
        columns={locale === "en" ? ["ID", "Slug", "Title"] : ["Mã", "Slug", "Tên danh mục"]}
        rows={categories.map((item) => [item.id, item.slug, item.title[locale]])}
      />
    </Stack>
  );
}
