import type { Locale } from "@/types/domain";
import type { ReturnTypeGetDictionary } from "@/lib/types-local";
import { getStorefrontCategoryTree } from "@/lib/storefront-data";
import { SiteHeaderClient, type HeaderNavItem } from "@/components/SiteHeaderClient";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: ReturnTypeGetDictionary;
  pathWithoutLocale: string;
};

export async function SiteHeader({
  locale,
  dictionary,
  pathWithoutLocale,
}: SiteHeaderProps) {
  const categories = await getStorefrontCategoryTree();

  const navItems: HeaderNavItem[] = categories.map((category) => ({
    id: category.id,
    label: category.title[locale],
    href: `/${locale}/category/${category.path}`,
    submenu: category.children.map((child) => ({
      id: child.id,
      heading: child.title[locale],
      href: `/${locale}/category/${child.path}`,
      image: child.coverImage,
    })),
  }));

  return (
    <SiteHeaderClient
      locale={locale}
      dictionary={dictionary}
      pathWithoutLocale={pathWithoutLocale}
      navItems={navItems}
    />
  );
}
